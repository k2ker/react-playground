"use client";

import vtkConeSource from "@kitware/vtk.js/Filters/Sources/ConeSource";
import { Fragment } from "react";
import { useProjectGet } from "@/api/viewer/project";
import dynamic from "next/dynamic";
import Loading from "./loading";

const Viewer = dynamic(() => import("@/components/ProjectViewer/Viewer"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function ViewerPage({ params }: { params: { id: string } }) {
  const { data } = useProjectGet(params?.id);

  const vtkConeSourceArray = [
    vtkConeSource,
    vtkConeSource,
    vtkConeSource,
    vtkConeSource,
    vtkConeSource,
    vtkConeSource,
    vtkConeSource,
    vtkConeSource,
  ];
  return (
    <main className="main bg-black">
      <div className="grid h-full w-full gap-4 p-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {vtkConeSourceArray.map((source, idx) => (
          <Fragment key={idx}>
            <Viewer source={source} />
          </Fragment>
        ))}
      </div>
    </main>
  );
}
