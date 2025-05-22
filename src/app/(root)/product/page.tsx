"use client";

import axios from "axios";

export default function Product() {
  const handleClickTest = () => {
    axios
      .post("https://04e4-211-179-11-20.ngrok-free.app/api/set-cookie")
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <main className="main flex flex-grow flex-col gap-4 px-4  md:flex-row">
      <div>PRODUCT</div>
      <div>
        <button onClick={handleClickTest}>Open App</button>
      </div>
    </main>
  );
}
