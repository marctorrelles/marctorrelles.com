import { kv } from "@vercel/kv"
import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { getRedisKey } from "../../../lib/claps"

type ResponseData = {
  message: string
}

const Query = z.object({
  slug: z.string().nonempty(),
  by: z.preprocess((s) => Number(s), z.number().max(99)),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let query: z.infer<typeof Query>

  try {
    query = Query.parse(req.query)
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
