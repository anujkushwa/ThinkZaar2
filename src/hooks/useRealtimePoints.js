"use client";

import { io } from "socket.io-client";
import { useEffect } from "react";

export default function useRealtimePoints(setPoints, userId) {
  useEffect(() => {
    if (!userId) return;

    const socket = io("http://localhost:3000");

    // 🔥 Join user room
    socket.emit("join", userId);

    socket.on("pointsUpdated", (data) => {
      if (data.userId === userId) {
        setPoints(data.points);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);
}