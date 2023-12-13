import dynamic from "next/dynamic";
import Loading from "./loading";

const Viewer = dynamic(() => import("@/components/ProjectViewer/Viewer"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function ViewerPage({ params }: { params: { id: string } }) {
  return (
    <main className="h-full w-full overflow-hidden bg-black">
      <Viewer id={params?.id} />
    </main>
  );
}
