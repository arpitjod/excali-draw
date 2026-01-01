"use client";

import { useEffect, useRef } from "react";

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    };

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement|null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")
;
    if (!ctx) return;
    const context: CanvasRenderingContext2D = ctx;

    const existingShapes: Shape[] = [];

    let clicked = false;
    let startX = 0;
    let startY = 0;

    const rect = canvas.getBoundingClientRect();

    function redraw () {
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (const shape of existingShapes) {
        if (shape.type === "rect") {
          context.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }
      }
    }

    canvas.addEventListener("mousedown", (e) => {
      clicked = true;
      startX = e.clientX - rect.left;
      startY = e.clientY - rect.top;
    });

    canvas.addEventListener("mouseup", (e) => {
      if (!clicked) return;
      clicked = false;

      const width = e.clientX - rect.left - startX;
      const height = e.clientY - rect.top - startY;

      existingShapes.push({
        type: "rect",
        x: startX,
        y: startY,
        width,
        height,
      });

      redraw();
    });

    canvas.addEventListener("mousemove", (e) => {
      if (!clicked) return;

      const currX = e.clientX - rect.left;
      const currY = e.clientY - rect.top;

      redraw();
      context.strokeRect(startX, startY, currX - startX, currY - startY);
    });
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width={500} height={500} />
    </div>
  );
}
