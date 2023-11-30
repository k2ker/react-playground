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
    getNextPageParam: (lastPage: any) => lastPage.nextPageToken || undefined,
  });

  return (
    <main className="main  bg-[#000]">
      <div className="flex flex-col items-center p-8">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <VideoList />
        </HydrationBoundary>
      </div>
    </main>
  );
}
