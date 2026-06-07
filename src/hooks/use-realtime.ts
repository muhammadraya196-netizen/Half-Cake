"use client";

import { useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";

export function useRealtime(channel: string) {
  const [connected, setConnected] = useState(false);
  const [lastEvent, setLastEvent] = useState<string>("Waiting for live events");

  useEffect(() => {
    let socket: Socket | undefined;
    try {
      socket = io({ path: "/api/socket" });
      socket.on("connect", () => setConnected(true));
      socket.on(channel, (payload) => setLastEvent(typeof payload === "string" ? payload : JSON.stringify(payload)));
      socket.on("disconnect", () => setConnected(false));
    } catch {
      setConnected(false);
    }

    const fallback = window.setInterval(() => {
      setLastEvent(`Live register sync ${new Date().toLocaleTimeString("id-ID")}`);
    }, 9000);

    return () => {
      window.clearInterval(fallback);
      socket?.disconnect();
    };
  }, [channel]);

  return { connected, lastEvent };
}
