import { error, log } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../utils/sanity";
import { postDetailQuery } from "../../../utils/queries";
import { stringify } from "querystring";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const doc = req.body;
      const useDoc = {
        _type: "postedBy",
        _ref: doc.user,
      };
      if (doc.liked) {
        await client
          .patch(doc.id)
          // Ensure that the `reviews` arrays exists before attempting to add items to it
          .setIfMissing({ likes: [] })
          // Add the items after the last item in the array (append)
          .insert("after", "likes[-1]", [useDoc])
          .commit({
            // Adds a `_key` attribute to array items, unique within the array, to
            // ensure it can be addressed uniquely in a real-time collaboration context
            autoGenerateArrayKeys: true,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
        res.status(200).json("Commit like status");
      } else {
        const data = await client
          .fetch(`*[_type =="post"&& _id =='${doc.id}'].likes[]{_key,_ref}`)
          .then((resp: any) => {
            console.log(resp);
            const _key = resp.find((us: any) => us._ref == doc.user)._key;
            if (_key) {
              const likeToRemove = ["likes[0]", `likes[_key=="${_key}"]`];
              client
                .patch(doc.id)
                .unset(likeToRemove)
                .commit()
                .catch((err) => console.log(err))
                .then((resp) => {
                  console.log(resp);
                  res.status(200).json("Commit like status");
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
        // console.log(, "kkk");

        // const _key = data.likes.find((us: any) => us._ref == doc.user)._key;
        // if (_key) {
        //   const likeToRemove = ["likes[0]", `likes[_ref=="${doc.user}"`];
        //   client.patch(doc.id).unset(likeToRemove).commit();
        // }
      }
    } catch (error) {
      res.status(500).json("Internall error");
    }
  }
}
