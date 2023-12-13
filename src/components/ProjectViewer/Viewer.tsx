"use client";

import { useRef, useEffect, memo, useState, HTMLAttributes } from "react";
import "@kitware/vtk.js/Rendering/Profiles/Geometry";
import vtkFullScreenRenderWindow from "@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow";
import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor";
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper";
import vtkConeSource from "@kitware/vtk.js/Filters/Sources/ConeSource";
import Loading from "@/app/(root)/viewer/[[...id]]/loading";

interface Props extends HTMLAttributes<HTMLDivElement> {
  source: any;
}

const Viewer = ({ source }: Props) => {
  const vtkContainerRef = useRef(null);
  const context = useRef<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (!context.current) {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
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
  }, [vtkContainerRef]);

  return (
    <>
      {loading && <Loading />}
      <div ref={vtkContainerRef} />
    </>
  );
};

export default memo(Viewer);
