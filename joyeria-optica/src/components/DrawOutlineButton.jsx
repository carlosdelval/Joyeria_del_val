import React, { useState } from "react";

const DrawOutlineButton = ({ children, className = "", ...rest }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      {...rest}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative px-6 py-2 font-medium text-black transition-colors duration-500 ${className}`}
    >
      <span>{children}</span>

      {/* TOP */}
      <span
        className={`absolute left-0 top-0 h-[2px] ${
          hovered ? "w-full bg-black" : "w-0 bg-black"
        } transition-all duration-200`}
      />

      {/* RIGHT */}
      <span
        className={`absolute right-0 top-0 w-[2px] ${
          hovered ? "h-full bg-black" : "h-0 bg-black"
        } transition-all delay-100 duration-200`}
      />

      {/* BOTTOM */}
      <span
        className={`absolute bottom-0 right-0 h-[2px] ${
          hovered ? "w-full bg-black" : "w-0 bg-black"
        } transition-all delay-200 duration-200`}
      />

      {/* LEFT */}
      <span
        className={`absolute bottom-0 left-0 w-[2px] ${
          hovered ? "h-full bg-black" : "h-0 bg-black"
        } transition-all delay-300 duration-200`}
      />
    </button>
  );
};

export default DrawOutlineButton;
