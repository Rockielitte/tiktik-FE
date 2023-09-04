import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MdCloudUpload } from "react-icons/md";
import { Spinner } from "../components";
import { topics } from "../utils/constants";
import { useUserStore } from "../store";
import { client2 } from "../utils/sanity";
import Router, { useRouter } from "next/router";
import axios from "axios";
import { Cloudinary } from "@cloudinary/url-gen";

function Upload() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  const activeStyle =
    "p-2 md:py-3  md:min-w-[140px] min-w-[80px] justify-center flex gap-2 items-center border-[0.5px] border-red-500 bg-[#fe2c55] text-white hover:scale-110 cursor-pointer  px-1 md:px-6 font-medium  text-base md:py-1 transition duration-100 ease-in";
  const notActiveStyle =
    "p-2 md:py-3  md:min-w-[140px] min-w-[80px] justify-center flex gap-2 items-center border-[0.5px] border-gray-200 opacity-50 bg-gray-200 text-black  cursor-not-allowed  px-1 md:px-6 font-medium text-black text-base md:py-1 transition duration-100 ease-in";
  const [video, setVideo] = useState<File | undefined>();
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("development");
  const [isloading, setIsloading] = useState(false);
  const [posting, setPosting] = useState(false);
  const isValidated = video && description && category && caption;
  const localUrl = useMemo(() => {
    if (video) return window.URL.createObjectURL(video);
  }, [video]);

  const handleInput = (e: any, type: string) => {
    const payload = e?.target?.value;

    switch (type) {
      case "caption": {
        setCaption(payload);
        break;
      }
      case "desc": {
        setDescription(payload);
        break;
      }
      case "topic": {
        setCategory(payload);
        break;
      }
    }
  };
  const handleVideo = (e: any) => {
    const selectedFile = e.target.files[0];
    setIsloading(true);
    setTimeout(() => {
      setVideo(() => selectedFile);
      setIsloading(false);
    }, 500);
  };

  const handleDiscard = () => {
    setCaption("");
    setCategory("");
    setDescription("");
    setVideo(undefined);
  };

  const handlePost = async () => {
    try {
      if (isValidated) {
        setPosting(true);
        const formData = new FormData();

        formData.append("file", video);

        formData.append("upload_preset", "tiktik");

        const data = await fetch(
          "https://api.cloudinary.com/v1_1/dtourf1sr/video/upload",
          {
            method: "POST",
            body: formData,
          }
        ).then((r) => r.json());
        // Upload it

        const doc = {
          _type: "post",
          caption,
          video: data.secure_url,

          postedBy: {
            _type: "postedBy",
            _ref: user?._id,
          },

          description,
        };
        console.log(doc);
        await client2
          .create(doc)
          .then(() => {
            console.log("success");
          })
          .catch((err) => {
            console.log(err, "looi");
          });
        // await axios.post("http://localhost:3000/api/posts", doc);

        Router.push("/");
      }
    } catch (error) {
      setVideo(undefined);
    }
  };
  return (
    <div className="w-full h-full px-6 py-3 overflow-y-auto  bg-gray-100">
      <div className="w-full h-full p-6 overflow-y-auto shadow-2xl text-base rounded-md bg-white">
        <h1 className="text-2xl font-medium">Upload video</h1>
        <p className="font-light text-md  text-gray-500">
          Post a video to your account
        </p>
        <div className="mt-5 gap-5 flex flex-col items-center md:flex-row w-full">
          <div className="w-full  md:w-3/5 h-[400px] border-[2px] rounded-xl border-dashed border-gray-300 hover:border-[#fe2c55] hover:bg-gray-100 transition duration-100 ease-in">
            {isloading ? (
              <Spinner mess="Loading video . . ." />
            ) : video ? (
              <div className="w-full h-full p-2">
                <video
                  src={localUrl}
                  className={"w-full h-full"}
                  controls
                  autoPlay
                  loop
                />
              </div>
            ) : (
              <label className="w-full" htmlFor="video">
                <div className="w-full text-sm cursor-pointer font-light text-gray-500 h-full flex justify-center flex-col gap-2 items-center">
                  <MdCloudUpload className="font-semibold text-6xl pb-2" />
                  <span className="font-semibold text-base text-black">
                    Select video to upload
                  </span>
                  <span className="mb-2">Or drag and drop the file</span>
                  <span>MP4 or WebM</span>
                  <span>720x1280 or higher </span>
                  <span>Up to 30 minutes </span>
                  <span>Less than 100MB </span>
                  <div className="rounded-sm text-white bg-[#fe2c55] px-10 py-2 font-medium text-base mt-4">
                    Select file
                  </div>
                  <input
                    id="video"
                    type="file"
                    name="video"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => {
                      handleVideo(e);
                    }}
                  />
                </div>
              </label>
            )}
          </div>
          <div className="w-full md:flex-auto flex flex-col items-center gap-5 justify-center ">
            <label className="flex flex-col w-full gap-2">
              <h1 className="font-medium  text-base">Caption</h1>
              <input
                value={caption}
                type="text"
                className="outline-none w-full px-4 py-2  rounded-md border-[0.5px] border-gray-200"
                onChange={(e) => {
                  handleInput(e, "caption");
                }}
              />
            </label>
            <label className="flex flex-col w-full gap-2">
              <h1 className="font-medium  text-base">Description</h1>
              <textarea
                rows={3}
                value={description}
                className="outline-none w-full px-4 py-2  rounded-md border-[0.5px] border-gray-200"
                onChange={(e) => {
                  handleInput(e, "desc");
                }}
              />
            </label>
            <label className="flex flex-col w-full gap-2">
              <h1 className="font-medium  text-base">Categories</h1>
              <select
                value={category}
                name="categories"
                className="capitalize  active:font-light outline-none w-full px-4 py-2  rounded-md border-[0.5px] border-gray-200 bg-white hover:bg-gray-200 cursor-pointer"
                onChange={(e) => {
                  handleInput(e, "topic");
                }}
              >
                {topics.map((topic: any) => {
                  return (
                    <option
                      key={topic?.name}
                      className="hover:bg-gray-300 text-black hover:scale-120  "
                      value={topic?.name}
                    >
                      {topic?.name}
                    </option>
                  );
                })}
              </select>
            </label>
            {posting ? (
              <Spinner mess="Processing, please wait a second . . ." />
            ) : (
              <div className="flex gap-5 self-start mt-5">
                <button
                  type="button"
                  className="p-2  hover:scale-110 md:min-w-[140px] min-w-[80px] justify-center flex gap-2 items-center border-[0.5px] border-gray-200  hover:bg-gray-200  px-1 md:px-6 font-medium text-black text-base md:py-1 transition duration-100 ease-in "
                  onClick={() => {
                    handleDiscard();
                  }}
                >
                  <span>Discard</span>
                </button>
                <button
                  type="button"
                  className={isValidated ? activeStyle : notActiveStyle}
                  onClick={() => {
                    handlePost();
                  }}
                >
                  <span>Post</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
