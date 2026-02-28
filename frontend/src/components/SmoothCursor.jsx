import { useEffect, useRef } from "react";
import "./styles/cursor.css";

export default function SmoothCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mouseX = 0,
      mouseY = 0;
    let ringX = 0,
      ringY = 0;

    const offset = 12; 

    const moveMouse = (e) => {
      mouseX = e.clientX + offset;
      mouseY = e.clientY + offset;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (cursorRef.current && ringRef.current) {
        cursorRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }

      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", moveMouse);

    return () => window.removeEventListener("mousemove", moveMouse);
  }, []);

  useEffect(() => {
    const hoverables = document.querySelectorAll(
      "a, button, .cursor-hover"
    );

    const handleEnter = () => {
      cursorRef.current?.classList.add("cursor-active");
      ringRef.current?.classList.add("ring-active");
    };

    const handleLeave = () => {
      cursorRef.current?.classList.remove("cursor-active");
      ringRef.current?.classList.remove("ring-active");
    };

    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={cursorRef} className="cursor-dot" />
    </>
  );
}