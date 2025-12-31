"use client";
import { useEffect, useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let clicked = false;
    let startX = 0;
    let startY = 0;

    const rect = canvas.getBoundingClientRect();

    canvas.addEventListener("mousedown", (e) => {
      clicked = true;
      startX = e.clientX - rect.left;
      startY = e.clientY - rect.top;
    });

    canvas.addEventListener("mouseup", () => {
      clicked = false;
    });

    canvas.addEventListener("mousemove", (e) => {
      if (!clicked) return;

      const currX = e.clientX - rect.left;
      const currY = e.clientY - rect.top;

      const width = currX - startX;
      const height = currY - startY;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeRect(startX, startY, width, height);
    });
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width={500} height={500}></canvas>
    </div>
  );
}
