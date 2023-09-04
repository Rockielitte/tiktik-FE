import axios from "axios";
import { Video } from "../components";
import client from "../sanity";
import { allPostsQuery } from "../utils/queries";
import { Video as videoType } from "../utils/type";
import { useState } from "react";
require("dotenv").config();
export default function Home({ videos }: { videos: Array<videoType> }) {
  return (
    <div className="flex flex-col w-full h-full overflow-y-auto items-start">
      {videos.map((video) => {
        return <Video data={video} key={video._id} />;
      })}
    </div>
  );
}
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getServerSideProps() {
  const data = await axios.get(`${BASE_URL}/api/posts`);

  return {
    props: { videos: data.data }, // will be passed to the page component as props
  };
}
