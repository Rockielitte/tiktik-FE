import React, { useState } from "react";
import { Context } from "vm";
import client from "../sanity";
import {
  singleUserQuery,
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from "../utils/queries";
import { url } from "inspector";
import { IUser, Video } from "../utils/type";
import clsx from "clsx";
import { Video as VideoCom } from "../components";

type Props = {
  id: string;
  data: Video[];
  dataLiked: Video[];
  user: IUser;
};

const Profile = ({ id, data, dataLiked, user }: Props) => {
  const [type, setType] = useState<"post" | "liked">("post");

  return (
    <main className="bg-gray-100 bg-opacity-25">
      <div className="lg:w-8/12 lg:mx-auto mb-8">
        <header className="flex flex-wrap items-center p-4 md:py-8">
          <div className="md:w-3/12 md:ml-16">
            {/* <!-- profile image --> */}
            <img
              className="  w-12 md:w-28  rounded-full 
                       border-2 border-pink-600 p-1"
              src={user?.image}
              alt="profile"
            />
          </div>

          {/* <!-- profile meta --> */}
          <div className="w-8/12 md:w-7/12 ml-4">
            <div className="md:flex md:flex-wrap md:items-center mb-4">
              <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                {user.name}
              </h2>

              {/* <!-- badge --> */}
              <span
                className="inline-block fas fa-certificate fa-lg text-blue-500 
                                 relative mr-6 text-xl transform -translate-y-2"
                aria-hidden="true"
              >
                <i
                  className="fas fa-check text-white text-xs absolute inset-x-0
                                 ml-1 mt-px"
                ></i>
              </span>

              {/* <!-- follow button --> */}
            </div>

            {/* <!-- post, following, followers list for medium screens --> */}
            <ul className="flex space-x-8 mb-4">
              <li>
                <span className="font-semibold">{data.length}</span>
                posts
              </li>

              <li>
                <span className="font-semibold">{dataLiked.length}</span>
                liked
              </li>
            </ul>

            {/* <!-- user meta form medium screens --> */}
            <div className="block">
              <span className="text-sm italic">@{user._id}</span>
            </div>
          </div>

          {/* <!-- user meta form small screens --> */}
        </header>

        {/* <!-- posts --> */}
        <div className="px-px md:px-3">
          <ul
            className="flex items-center justify-around md:justify-center 
                      uppercase tracking-widest font-semibold  text-xs text-gray-600
                      border-t py-2"
          >
            {/* <!-- posts tab is active --> */}
            <button
              className={clsx(
                "md:text-lg py-3 transition-all border flex-1 text-center duration-100 ease-in ",
                type == "post" ? "bg-[#ef4c51] text-white" : ""
              )}
              onClick={() => {
                setType("post");
              }}
            >
              Post
            </button>
            <button
              className={clsx(
                "md:text-lg py-3 transition-all border flex-1 text-center duration-100 ease-in ",
                type == "liked" ? "bg-[#ef4c51] text-white" : ""
              )}
              onClick={() => {
                setType("liked");
              }}
            >
              Liked
            </button>
          </ul>
          {/* <!-- flexbox grid --> */}
          <div className="w-full flex flex-wrap ">
            {type == "post"
              ? data.map((da) => {
                  return (
                    <div
                      className="w-1/2 p-2 text-center shadow-sm"
                      key={da._id}
                    >
                      <video
                        loop
                        src={da.video}
                        className="w-[100%] md:h-[380px] h-[280px] rounded-xl m-0"
                        autoPlay
                        muted
                        controls
                      />
                    </div>
                  );
                })
              : dataLiked.map((da) => {
                  return (
                    <div
                      className="w-1/2 p-2 text-center shadow-sm"
                      key={da._id}
                    >
                      <video
                        loop
                        src={da.video}
                        className="w-[100%] md:h-[380px] h-[280px] rounded-xl m-0"
                        autoPlay
                        muted
                        controls
                      />
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;

export async function getServerSideProps(context: Context) {
  const id = context.params.id.replace("@", "");
  const data = await client.fetch(userCreatedPostsQuery(id));
  const user = await client.fetch(singleUserQuery(id));

  console.log(userLikedPostsQuery(id));
  const dataLiked = await client.fetch(userLikedPostsQuery(id));
  return {
    props: {
      data: data,
      id: id,
      user: user[0],
      dataLiked,
    }, // will be passed to the page component as props
  };
}
