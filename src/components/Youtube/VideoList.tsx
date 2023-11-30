"use client";

import { getVideoPage } from "@/api/youtube/video";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const sizeVariants = {
  medium: "max-w-[320px]",
};

const VideoList = () => {
  const router = useRouter();
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["youtubeVideos"],
    queryFn: getVideoPage,
    initialPageParam: "",
    getNextPageParam: (lastPage: YoutubeVideoList, pages) => {
      return lastPage.nextPageToken || "";
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-5">
        {data?.pages?.map((group, i) => (
          <React.Fragment key={i}>
            {group?.items?.map((video: Video) => (
              <div
                key={video.id}
                className={`flex cursor-pointer flex-col rounded-lg ${sizeVariants.medium}`}
                onClick={() => router.push(`/youtube/${video.id}`)}
              >
                <Image
                  className=" rounded-lg "
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  width={video.snippet.thumbnails.medium.width}
                  height={video.snippet.thumbnails.medium.height}
                />
                <div className="flex flex-col p-4">
                  <h3 className="mb-2 line-clamp-2 text-[1rem] font-bold text-white">
                    {video.snippet.title}
                  </h3>

                  <p className="line-clamp-1 text-[0.8rem] text-[#aaa]">
                    {video.snippet.channelTitle}
                  </p>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div ref={ref} className=" h-4 w-full bg-transparent"></div>
    </>
  );
};

export default VideoList;
