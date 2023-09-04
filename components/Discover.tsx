import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { topics } from "../utils/constants";
function Discover() {
  const activeStyle =
    "inline-flex items-center gap-2 rounded-full cursor-pointer  md:p-[3px]  md:border-[2px] text-[#ef4c51] border-[#ef4c51] hover:bg-red-100 font-semibold md:text-xs text-xl ";
  const notActiveStyle =
    "inline-flex items-center gap-2 rounded-full cursor-pointer  md:p-[3px]  md:border-[2px] text-black border-black hover:bg-stone-200  font-semibold md:text-xs text-xl";
  const router = useRouter();
  return (
    <div className="flex md:flex-row md:flex-wrap flex-col flex-nowrap gap-2 ">
      {topics.map((topic) => {
        return (
          <Link key={topic.name} href={`${topic.name}`}>
            <div
              className={
                router.asPath == `/${topic.name}` ? activeStyle : notActiveStyle
              }
            >
              {topic.icon}
              <span className="hidden md:inline-block">{topic.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Discover;
