import "../App.css";
import { Routes, Route, Link } from "react-router-dom";
import Cube from "./cube";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Cursor = ({ cursorVariant }) => {
  const [mousePosi, setMousePosi] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosi({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  const variants = {
    default: {
      x: mousePosi.x -25,
      y: mousePosi.y - 25,
    },
    text: {
      x: mousePosi.x - 75,
      y: mousePosi.y -75,
      height: 150,
      width: 150,
      backgroundColor: "#5F7470",
      mixBlendMode: "difference",
    },
  };

  return (
    <motion.div
      className="cursor"
      variants={variants}
      animate={cursorVariant}
    ></motion.div>
  );
};

export default Cursor;
