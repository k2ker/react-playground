"use client";

import axios from "axios";

export default function Product() {
  const handleClickTest = () => {
    axios
      .post(
        "https://04e4-211-179-11-20.ngrok-free.app/api/set-cookie",
        {}, // ← 요청 바디 (필요 없으면 빈 객체)
        {
          withCredentials: true, // ✅ 올바른 위치
        },
      )
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
