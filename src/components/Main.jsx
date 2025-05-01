import React from "react";

function Main({ children }) {
  return (
    <div className="flex-1 p-2 lg:p-6 lg:px-24 overflow-y-auto">{children}</div>
  );
}

export default Main;
