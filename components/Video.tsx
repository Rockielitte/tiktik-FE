import Image from "next/image";
import Link from "next/link";
import React, { useCallback } from "react";
import { AiFillCheckCircle, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { urlFor } from "../sanity";
import { useState, useRef, useEffect } from "react";
import { Video as videoType } from "../utils/type";
import {
  BsFillVolumeUpFill,
  BsPlayFill,
  BsStopFill,
  BsVolumeMuteFill,
} from "react-icons/bs";
import { useUserStore } from "../store";
import axios from "axios";

function Video({ data }: { data: videoType }) {
  const audioRef = useRef<HTMLVideoElement>(null);
  const [isPlay, setIsPlay] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [show, setShow] = useState(false);
  const user = useUserStore((state) => state.user);
  const [isLiked, setIsLiked] = useState<boolean>(
    user && !!data.likes?.find((us: any) => us._ref == user._id)
  );

  const handlePlay = async () => {
    if (isPlay) {
      setIsPlay(!isPlay);
      await audioRef?.current?.pause();
    } else {
      setIsPlay(!isPlay);
      await audioRef?.current?.play();
    }
  };

  const handleLike = useCallback(async () => {
    axios
      .post("/api/like", {
        user: user._id,
        id: data._id,
        liked: !isLiked,
      })
      .then((res) => {
        setIsLiked(!isLiked);
      });
  }, [data, isLiked]);

  useEffect(() => {
    if (audioRef?.current) {
      // audioRef.current.crossOrigin = "anonymous";
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className=" flex  w-full gap-5 pt-5 font-normal text-sm border-b-[1px] border-gray-200 items-start">
      <div>
        <Image
          width={70}
          height={70}
          src={data.postedBy.image}
          className="object-fit rounded-full  "
          alt="Avatar"
        />
      </div>
      <div className="flex flex-col h-full gap-1 flex-auto md:flex-none md:w-3/5">
        <Link href={`@${data.postedBy._id}`}>
          <div className="flex  gap-1 items-center cursor-pointer">
            <span className="font-semibold text-base hover:underline underline-offset-2">
              {data.postedBy.name}
            </span>
            <AiFillCheckCircle
              color="#66e2f2"
              className="font-base text-base self-start"
            />
            <span className="capitalize">{data.postedBy.name}</span>
          </div>
        </Link>
        <div className="flex flex-col gap-1">
          <span className="font-bold md:text-xl">{data.caption} </span>
          <span>{data.description}</span>
        </div>
        <div className="flex w-full pb-5">
          <div
            onMouseEnter={() => {
              setShow(true);
            }}
            onMouseLeave={() => {
              setShow(false);
            }}
            className="w-full md:w-4/5  md:p-4 pb-[40px] md:pb-[40px] rounded-xl bg-gray-100 flex items-center justify-center relative"
          >
            <video
              loop
              ref={audioRef}
              src={data.video}
              className="w-[95%] md:h-[380px] h-[280px] rounded-xl"
            />
            {show && (
              <div className="absolute flex inset-x-0 bottom-[5px] text-2xl text-black justify-between px-[60px]">
                <div
                  className="cursor-pointer p-1 rounded-full transition duration-200 ease-in hover:bg-gray-300"
                  onClick={handlePlay}
                >
                  {isPlay ? <BsStopFill /> : <BsPlayFill />}
                </div>
                <div
                  className="cursor-pointer p-1 rounded-full transition duration-200 ease-in hover:bg-gray-300"
                  onClick={() => {
                    setIsMuted(!isMuted);
                  }}
                >
                  {isMuted ? <BsVolumeMuteFill /> : <BsFillVolumeUpFill />}
                </div>
              </div>
            )}
            {user && show && (
              <div
                onClick={handleLike}
                className="absolute inset-y-0 right-0 translate-x-[90%] flex flex-col justify-center px-4 "
              >
                {!isLiked ? (
                  <AiOutlineHeart
                    size={45}
                    color="white"
                    className="text-center p-2 bg-gray-200 cursor-pointer rounded-full shadow-sm"
                  ></AiOutlineHeart>
                ) : (
                  <AiFillHeart
                    size={45}
                    color="#ef4c51"
                    className="text-center p-2 bg-gray-200 cursor-pointer rounded-full shadow-sm"
                  ></AiFillHeart>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
