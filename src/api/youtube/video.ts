import { useSuspenseQuery } from "@tanstack/react-query";
import api from "./api";

export const videoKeys = {
  all: ["video"] as const,
};

export const getVideoPage = async ({
  pageParam = "",
}: {
  pageParam: string | undefined;
}) => {
  const response = await api.get(`/youtube/v3/videos`, {
    params: {
      key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
      part: "snippet,contentDetails",
      chart: "mostPopular",
      // videoCategoryId: 28,
      regionCode: "KR",
      maxResults: 15,
      pageToken: pageParam,
    },
  });
  return response.data;
};

export const getVideo = async (id: string) => {
  const response = await api.get(`/youtube/v3/videos`, {
    params: {
      key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
      part: "snippet,contentDetails",
      id: id,
    },
  });
  return response.data;
};

export const getVideos = async () => {
  const response = await api.get(`/youtube/v3/videos`, {
    params: {
      key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
      part: "snippet,contentDetails",
      chart: "mostPopular",
      myRating: "like",
      videoCategoryId: 28,
      regionCode: "KR",
      maxResults: 20,
    },
  });
  return response.data;
};
export const useVideosGet = () =>
  useSuspenseQuery({
    queryKey: videoKeys.all,
    queryFn: () => getVideos(),
  });
