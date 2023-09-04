// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../sanity";
import { allPostsQuery } from "./../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const data = req.body;

    // client.delete(user._id).then(() => {
    //   console.log("Bike deleted");
    // });

    client
      .createIfNotExists(data.user)
      .then(() => {
        res.status(200).json("success");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
