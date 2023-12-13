"use client";

import vtkConeSource from "@kitware/vtk.js/Filters/Sources/ConeSource";
import Viewer from "@/components/ProjectViewer/Viewer";
import { Suspense } from "react";

export default function ViewerPage({ params }: { params: { id: string } }) {
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
          <Suspense>
            <Viewer key={idx} source={source} />
          </Suspense>
        ))}
      </div>
    </main>
  );
}
