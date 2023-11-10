import React, { useEffect, useRef } from "react";
import "../App.css";

const COLOR_BG = "black";
const COLOR_CUBE = "yellow";
const SPEED_X = 0.15;
const SPEED_Y = 0.15;
const SPEED_Z = 0.15;

const POINT3D = function (x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
};

const Cube = () => {
  const canvasRef = useRef(null);
  const size = 100; // Set the desired size for the canvas

  const vertices = [
    new POINT3D(size / 2, size / 2, size / 2),
    new POINT3D(size / 2, size / 2, -size / 2),
    new POINT3D(size / 2, -size / 2, size / 2),
    new POINT3D(size / 2, -size / 2, -size / 2),
    new POINT3D(-size / 2, size / 2, size / 2),
    new POINT3D(-size / 2, size / 2, -size / 2),
    new POINT3D(-size / 2, -size / 2, size / 2),
    new POINT3D(-size / 2, -size / 2, -size / 2),
  ];

  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.height = size;
    canvas.width = size;
    ctx.fillStyle = COLOR_BG;
    ctx.strokeStyle = COLOR_CUBE;
    ctx.lineWidth = size / 25;
    ctx.lineCap = "round";

    let cx = size / 2;
    let cy = size / 2;
    let cz = size / 2;

    let timeDelta;
    let timeLast = 0;
    requestAnimationFrame(loop);

    function loop(timeNow) {
      timeDelta = timeNow - timeLast;
      timeLast = timeNow;

      ctx.fillRect(0, 0, size, size);

      let angle = timeDelta * 0.001 * SPEED_Z * Math.PI * 2;
      for (let v of vertices) {
        let dx = v.x - cx;
        let dy = v.y - cy;
        let x = dx * Math.cos(angle) - dy * Math.sin(angle);
        let y = dx * Math.sin(angle) + dy * Math.cos(angle);
        v.x = x + cx;
        v.y = y + cy;
      }

      angle = timeDelta * 0.001 * SPEED_X * Math.PI * 2;
      for (let v of vertices) {
        let dy = v.y - cy;
        let dz = v.z - cz;
        let y = dy * Math.cos(angle) - dz * Math.sin(angle);
        let z = dy * Math.sin(angle) + dz * Math.cos(angle);
        v.y = y + cy;
        v.z = z + cz;
      }

      angle = timeDelta * 0.001 * SPEED_Y * Math.PI * 2;
      for (let v of vertices) {
        let dx = v.x - cx;
        let dz = v.z - cz;
        let x = dz * Math.sin(angle) + dx * Math.cos(angle);
        let z = dz * Math.cos(angle) - dx * Math.sin(angle);
        v.x = x + cx;
        v.z = z + cz;
      }

      for (let edge of edges) {
        ctx.beginPath();
        ctx.moveTo(vertices[edge[0]].x, vertices[edge[0]].y);
        ctx.lineTo(vertices[edge[1]].x, vertices[edge[1]].y);
        ctx.stroke();
      }

      requestAnimationFrame(loop);
    }
  }, [size]);

  return (
    <canvas id="cube-canvas" ref={canvasRef} className="cube-canvas"></canvas>
  );
};

export default Cube;
