"use client";
import { io } from "socket.io-client";
import { useEffect } from "react";

export default function Socket() {
  const socket = io("https://hong-ground.com", {
    path: "/api/socket.io",
    transports: ["websocket"],
    upgrade: false,
    autoConnect: false,
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("disconnect", (res) => {
      console.log("disconnected");
    });
    socket.on("connect_error", (err) => {
      console.log("connect_error", err);
    });
    socket.on("msgToClient", (msg) => {
      console.log(msg);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMsg = () => {
    socket.emit("msgToServer", "hello");
  };

  const sendMsg2 = () => {
    socket.emit("msgToServer", "hello2");
  };

  const disconnect = () => {
    socket.disconnect();
  };

  const connect = () => {
    socket.connect();
  };

  return (
    <main className="main  bg-[#000]">
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <button onClick={sendMsg} className="h-10 w-20 bg-white">
          send
        </button>
        <button onClick={sendMsg2} className="h-10 w-20 bg-white">
          send2
        </button>
        <button onClick={disconnect} className="h-10 w-20 bg-white">
          disconnect
        </button>
        <button onClick={connect} className="h-10 w-20 bg-white">
          connect
        </button>
      </div>
    </main>
  );
}
