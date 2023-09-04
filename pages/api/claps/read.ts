import { kv } from "@vercel/kv"
import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { getRedisKey } from "./_helpers"

type ResponseData = {
  message: string
  claps?: number
}

const Query = z.object({
  slug: z.string().nonempty(),
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
  const result = await kv.get(key)
  const claps = z.number().nullable().parse(result)

  res.status(200).json({ message: "Success", claps })
}
