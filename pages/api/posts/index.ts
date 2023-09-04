// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../sanity";
import { allPostsQuery } from "./../../../utils/queries";
import { client2 } from "../../../utils/sanity";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    console.log(allPostsQuery());

    const data = await client.fetch(allPostsQuery());
    console.log(data);
    res.status(200).json(data);
  } else if (req.method === "POST") {
    const doc = req.body;

    client2.create(doc).then(() => {
      console.log("created");

      res.status(200).json("video created");
    });
  }
}
