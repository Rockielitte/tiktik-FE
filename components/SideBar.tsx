import React from "react";
import { AiFillHome } from "react-icons/ai";
import { SlPeople } from "react-icons/sl";
import { RiLiveLine } from "react-icons/ri";
import { Discover, Footer } from "../components";
import { useUserStore } from "../store";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../utils/oauth";

function SideBar() {
  const user = useUserStore((state) => state.user);
  const addUser = useUserStore((state) => state.setUser);
  return (
    <div className="  h-full flex flex-col md:w-[25vw] text-[16px] scroll-pt-2 snap-y pt-2 overflow-y-auto pr-4">
      <div className="flex flex-col w-full border-b-[1px] py-2  border-gray-200">
        <div className="flex  w-full items-center gap-2 rounded-md text-[#ef4c51] hover:bg-stone-100 cursor-pointer font-semibold text-xl py-3 snap-start">
          <AiFillHome />
          <span className="hidden md:inline-block">For You</span>
        </div>
        <div className="flex w-full items-center gap-2 rounded-md text-black hover:bg-stone-100 cursor-pointer font-semibold text-xl py-3 snap-start">
          <SlPeople />
          <span className="hidden md:inline-block">Following</span>
        </div>
        <div className="flex w-full items-center gap-2 rounded-md text-black hover:bg-stone-100 cursor-pointer font-semibold text-xl py-3 snap-start">
          <RiLiveLine />
          <span className="hidden md:inline-block">LIVE</span>
        </div>
      </div>
      {!user && (
        <div className=" flex-col w-full hidden pb-2  md:inline-block border-b-[1px] text-base font-light border-gray-200">
          <div className="flex w-full items-center gap-2  text-gray-800 font-medium py-3 snap-start">
            Log in to follow creators, like videos, and view comments.
          </div>
          <GoogleLogin
            text={"signin_with"}
            onSuccess={(credentialResponse) => {
              createOrGetUser(credentialResponse.credential, addUser);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      )}
      <div className="flex flex-col w-full border-b-[1px] py-2 border-gray-200">
        <h2 className="py-4 font-medium text-sm hidden md:inline-block text-slate-600">
          Discover
        </h2>
        <Discover />
      </div>
      <div className="flex flex-col w-full border-b-[1px] py-2  border-gray-200">
        <Footer />
      </div>
    </div>
  );
}

export default SideBar;
