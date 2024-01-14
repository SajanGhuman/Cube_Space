import "../App.css";
import { Routes, Route, Link } from "react-router-dom";
import Cube from "./cube";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Mask = ({ cursorVariant }) => {
  const size = 40;

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
      webkitMaskPosition: `${mousePosi.x - 20}px ${mousePosi.y - 20}px`,
      webkitMaskSize: `${size}px`,
    },
    text: {
      webkitMaskPosition: `${mousePosi.x - 120}px ${mousePosi.y - 120}px`,
      webkitMaskSize: `${size * 6}px`,
    },
  };
  return (
    <motion.div
      className="mask"
      variants={variants}
      animate={cursorVariant}
      transition={{ type: "tween", ease: "backOut" }}
    >
      <h1>I AM SO NOOB</h1>
    </motion.div>
  );
};

export default Mask;
