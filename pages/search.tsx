import React from "react";
import { Context } from "vm";
import client from "../sanity";
import { searchPostsQuery } from "../utils/queries";
import { Video } from "../utils/type";
import { Video as VideoComp } from "../components";

type Props = {
  videos: Video[];
};

const Search = ({ videos }: Props) => {
  return (
    <div>
      <div className="flex flex-col w-full h-full overflow-y-auto items-start">
        {videos?.map((video) => {
          return <VideoComp data={video} key={video._id} />;
        })}
      </div>
    </div>
  );
};

export default Search;

export async function getServerSideProps(context: Context) {
  const query = context.query;
  const data = await client.fetch(searchPostsQuery(query.term));

  return {
    props: {
      videos: data,
    }, // will be passed to the page component as props
  };
}
