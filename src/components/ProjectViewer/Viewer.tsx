"use client";

import { useRef, useEffect, memo, useState, HTMLAttributes } from "react";
import "@kitware/vtk.js/Rendering/Profiles/Geometry";
import vtkFullScreenRenderWindow from "@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow";
import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor";
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper";

interface Props extends HTMLAttributes<HTMLDivElement> {
  source: any;
}

const Viewer = ({ source }: Props) => {
  const vtkContainerRef = useRef<HTMLDivElement | null>(null);
  const context = useRef<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (!context.current) {
        setLoading(true);
        const randomDelay = Math.floor(Math.random() * 3000);
        await new Promise((resolve) => setTimeout(resolve, randomDelay));

        const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
          container: vtkContainerRef.current!,
        });

        const projectSource = source?.newInstance({ height: 1.0 });
        const mapper = vtkMapper.newInstance();
        mapper.setInputConnection(projectSource.getOutputPort());

        const actor = vtkActor.newInstance();
        actor.setMapper(mapper);

        const renderer = fullScreenRenderer.getRenderer();
        const renderWindow = fullScreenRenderer.getRenderWindow();
        renderer.setBackground(0.14, 0.18, 0.21);
        renderer.addActor(actor);
        renderer.resetCamera();
        renderWindow.render();

        requestAnimationFrame(() => {
          setLoading(false);
        });

        context.current = {
          fullScreenRenderer,
          renderWindow,
          renderer,
          projectSource,
          actor,
          mapper,
        };
      }
    };

    getData();

    return () => {
      if (context.current) {
        const { fullScreenRenderer, projectSource, actor, mapper } =
          context.current;
        actor.delete();
        mapper.delete();
        projectSource.delete();
        fullScreenRenderer.delete();
        context.current = null;
      }
    };
  }, [vtkContainerRef, source]);

  return (
    <div className="h-full w-full">
      {loading && (
        <div className="flex h-full min-h-[20rem] animate-pulse items-center justify-center rounded-lg bg-gray-800 p-4 text-xl font-bold text-white shadow-lg">
          <span className="loader-viewer"></span>
        </div>
      )}
      <div className="overflow-hidden rounded-lg" ref={vtkContainerRef} />
    </div>
  );
};

export default memo(Viewer);
