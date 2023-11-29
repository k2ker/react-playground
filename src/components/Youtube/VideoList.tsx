"use client";

import { getVideoPage } from "@/api/youtube/video";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const getMaxWidth = (width: number) => {
  return `max-w-[${width}px]`;
};

const VideoList = () => {
  const router = useRouter();
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
    getNextPageParam: (lastPage: YoutubeVideoList, pages) =>
      lastPage.nextPageToken || undefined,
    staleTime: Infinity,
  });
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  출처: https: return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {data?.pages?.map((group, i) => (
        <React.Fragment key={i}>
          {group?.items?.map((video: Video) => (
            <div
              key={video.id}
              className={`flex cursor-pointer ${getMaxWidth(
                video.snippet.thumbnails.standard.width,
              )}  flex-col rounded-lg border`}
              onClick={() => router.push(`/youtube/${video.id}`)}
            >
              <Image
                className="rounded-t-lg"
                src={video.snippet.thumbnails.standard.url}
                alt={video.snippet.title}
                width={video.snippet.thumbnails.standard.width}
                height={video.snippet.thumbnails.standard.height}
              />
              <div className="flex flex-col p-4">
                <p className="mb-2 text-sm text-gray-500">
                  Duration: {video.contentDetails.duration}
                </p>
                <h3 className="mb-2 line-clamp-1 text-lg font-bold">
                  {video.snippet.title}
                </h3>

                <p className="line-clamp-1 text-gray-600">
                  {video.snippet.description}
                </p>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
      <button
        ref={ref}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
    </div>
  );
};

export default VideoList;
