import React from "react";

function Tag({ title }) {
  return (
    <div className="bg-gray-200 text-black text-xs hover:bg-gray-300/80 px-1.5 rounded-lg cursor-pointer">
      {title}
    </div>
  );
}

export default Tag;
