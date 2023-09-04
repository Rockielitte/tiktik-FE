import React, { useState } from "react";
import Image from "next/image";
import logo from "../utils/tiktik-logo.png";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../utils/oauth";
import { useUserStore } from "../store";
import { MdAdd } from "react-icons/md";
import Link from "next/link";
import { AiOutlineLogout } from "react-icons/ai";
import { GoogleLogout } from "react-google-login";
import { useRouter } from "next/router";
function NavBar() {
  const user = useUserStore((state) => state.user);
  const addUser = useUserStore((state) => state.setUser);
  const [term, setTerm] = useState("");
  const router = useRouter();
  return (
    <div className="w-full px-5 md:px-20 py-2 flex justify-between items-center border-b-[1px] border-gray-200 ">
      <Link href={"/"} className="hidden lg:block">
        <a>
          <Image
            src={logo}
            width={120}
            height={40}
            className="object-contain cursor-pointer "
          />
        </a>
      </Link>
      <div className="flex-1 lg:block hidden px-4">
        <div>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ringg[#ef4c51] focus:border-red-400 outline-none"
              placeholder="Search video..."
              onChange={(e) => {
                setTerm(e.target.value);
              }}
            />
            <button
              type="button"
              className="text-white absolute right-2.5 bottom-2.5 bg-[#ef4c51] hover:opacity-70 transition-all  font-medium rounded-lg text-sm px-4 py-2   focus:ring[#ef4c51]"
              onClick={() => {
                router.push(`/search?term=${term}`);
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="text-center">
        {user ? (
          <div className="flex gap-4 items-center text-sm font-medium text-gray-500">
            <Link href={"upload"}>
              <a>
                <button
                  type="button"
                  className="flex gap-2 items-center border-[0.5px] border-gray-200 bg-gray-100 hover:bg-gray-300  px-1 md:px-6 font-medium text-black text-base md:py-1 transition duration-100 ease-in "
                >
                  <MdAdd size={30} />
                  <span>Upload</span>
                </button>
              </a>
            </Link>
            <Link href={`@${user._id}`}>
              <a>
                <Image
                  src={user.image}
                  width={30}
                  height={30}
                  className="rounded-full object-fit"
                />
              </a>
            </Link>
            <button
              type="button"
              className="rounded-full p-1 shadow-md text-red-600"
              onClick={() => {
                googleLogout();
                addUser();
              }}
            >
              <AiOutlineLogout size={29} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            text={"signin_with"}
            onSuccess={(credentialResponse) => {
              createOrGetUser(credentialResponse.credential, addUser);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        )}
      </div>
    </div>
  );
}

export default NavBar;
