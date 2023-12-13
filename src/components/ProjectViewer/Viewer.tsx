"use client";

import { useRef, useEffect, memo, useState } from "react";
import "@kitware/vtk.js/Rendering/Profiles/Geometry";
import vtkFullScreenRenderWindow from "@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow";
import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor";
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper";
import vtkConeSource from "@kitware/vtk.js/Filters/Sources/ConeSource";
import Loading from "@/app/(root)/viewer/[[...id]]/loading";

interface Props {
  id?: string;
}

const Viewer = ({ id }: Props) => {
  //   const { data: project } = useProjectGet(id ?? "");
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
        const coneSource = vtkConeSource.newInstance({ height: 1.0 });

        const mapper = vtkMapper.newInstance();
        mapper.setInputConnection(coneSource.getOutputPort());

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
          coneSource,
          actor,
          mapper,
        };
      }
    };

    getData();

    return () => {
      if (context.current) {
        const { fullScreenRenderer, coneSource, actor, mapper } =
          context.current;
        actor.delete();
        mapper.delete();
        coneSource.delete();
        fullScreenRenderer.delete();
        context.current = null;
      }
    };
  }, [vtkContainerRef]);

  return (
    <>
      {loading && <Loading />}
      <div className="h-full w-full" ref={vtkContainerRef} />
    </>
  );
};

export default memo(Viewer);
