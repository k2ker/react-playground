import { getVideo } from "@/api/youtube/video";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const convertTextToHTML = (text: string) => {
  const withBreaks = text.replace(/\n/g, "<br>");
  const withLinks = withBreaks.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>',
  );

  return withLinks;
};

export default async function Youtube({ params }: { params: { id: string } }) {
  const data = await getVideo(params?.id);

  return (
    <main className="main overflow-scroll overflow-x-hidden bg-[#000]">
      <div className="flex h-full w-full flex-col items-center ">
        <div className="flex w-full max-w-[1024px] flex-col p-4">
          <iframe
            id="player"
            className="radius-lg aspect-video w-full rounded-lg "
            src={`https://www.youtube.com/embed/${params.id}`}
            allowFullScreen
          ></iframe>
          <div className="mt-4 text-white">
            <h1 className="text-3xl font-bold">
              {data.items[0].snippet.title}
            </h1>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm">
                {new Date(
                  data.items[0].snippet.publishedAt,
                ).toLocaleDateString()}
              </span>
              <span className="text-sm">
                {data.items[0].snippet.channelTitle}
              </span>
            </div>
            <div
              className="mt-4 text-sm"
              dangerouslySetInnerHTML={{
                __html: convertTextToHTML(data.items[0].snippet.description),
              }}
            ></div>
          </div>
        </div>
      </div>
    </main>
  );
}
