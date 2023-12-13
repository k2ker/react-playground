"use client";
import { memo } from "react";

const Loading = () => {
  return (
    <div className=" absolute left-0 top-0 flex h-screen w-full items-center justify-center  bg-[#263038]">
      <span className="loader-viewer"></span>
    </div>
  );
};

export default memo(Loading);
