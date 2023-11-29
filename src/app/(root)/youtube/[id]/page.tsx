"use client";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export default function Youtube({ params }: { params: { id: string } }) {
  return (
    <main className="main">
      <div className="flex h-full w-full justify-center">
        <div className="h-full w-full max-w-[1024px] p-4">
          <iframe
            id="player"
            className="radius-lg aspect-video w-full rounded-lg border"
            src={`https://www.youtube.com/embed/${params.id}`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </main>
  );
}
