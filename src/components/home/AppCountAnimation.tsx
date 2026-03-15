"use client";

import { useEffect, useState } from "react";

interface AppCountAnimationProps {
  target: number;
}

export function AppCountAnimation({ target }: AppCountAnimationProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= target) return;
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= target) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 80);
    return () => clearInterval(timer);
  }, [target, count]);

  return <>{count}</>;
}
