import { kv } from "@vercel/kv"
import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { getRedisKey } from "../../lib/claps"

type GetResponse = {
  message: string
  claps?: number
}

const GetQuery = z.object({
  slug: z.string().nonempty(),
})

async function handleGet(
  req: NextApiRequest,
  res: NextApiResponse<GetResponse>
) {
  let query: z.infer<typeof GetQuery>

  try {
    query = GetQuery.parse(req.query)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }

  const key = getRedisKey(query.slug)
  const result = await kv.get(key)
  const claps = z.number().nullable().parse(result)

  res.status(200).json({ message: "Success", claps })
}

const PostQuery = z.object({
  slug: z.string().nonempty(),
  by: z.preprocess((s) => Number(s), z.number().max(99)),
})

type PostResponse = {
  message: string
}

async function handlePost(
  req: NextApiRequest,
  res: NextApiResponse<PostResponse>
) {
  let query: z.infer<typeof PostQuery>

  try {
    query = PostQuery.parse(JSON.parse(req.body))
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }

  const key = getRedisKey(query.slug)
  await kv.incrby(key, query.by)

  // NOTE: We don't return the number of claps, we only increment in Redis. This is because the UX
  // would be weird if the number of claps was updated between the user made the first request and
  // the it actually clapped.
  res.status(200).json({ message: "Success" })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetResponse | PostResponse>
) {
  if (req.method === "GET") {
    return handleGet(req, res)
  }

  if (req.method === "POST") {
    return handlePost(req, res)
  }

  return res.status(405).json({ message: "Method Not Allowed" })
}
