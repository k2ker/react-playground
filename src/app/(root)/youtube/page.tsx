import api from "@/api/youtube/api";
import { getVideoPage } from "@/api/youtube/video";
import VideoList from "@/components/Youtube/VideoList";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Youtube() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["youtubeVideos"],
    queryFn: getVideoPage,
    initialPageParam: "",
    getNextPageParam: (lastPage, pages) => lastPage.nextPageToken || undefined,
    pages: 2,
  });

  return (
    <main className="main overflow-scroll overflow-x-hidden bg-[#000]">
      <div className="flex flex-col items-center p-8">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <VideoList />
        </HydrationBoundary>
      </div>
    </main>
  );
}
