"use client";

import vtkConeSource from "@kitware/vtk.js/Filters/Sources/ConeSource";
import Viewer from "@/components/ProjectViewer/Viewer";
import { Fragment, Suspense } from "react";
import { useProductGet } from "@/api/fake/product";

export default function ViewerPage({ params }: { params: { id: string } }) {
  const { data } = useProductGet(params?.id);

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
            <Suspense>
              <Viewer source={source} />
            </Suspense>
          </Fragment>
        ))}
      </div>
    </main>
  );
}
