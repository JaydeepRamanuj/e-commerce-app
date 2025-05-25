import React from "react";

function Footer() {
  return (
    <div className="mt-12 bg-black border-t border-yellow-500/20 shadow-inner shadow-yellow-500/5 text-gray-300 text-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col items-center gap-4">
        {/* <hr className="border-yellow-500/30 w-full shadow-md shadow-yellow-500/5" /> */}

        <div className="text-yellow-400 text-lg font-semibold flex items-center gap-2">
          <span>Thank you for visiting</span>
          <span className="animate-wave text-xl">👋</span>
        </div>

        <div className="text-xs text-gray-500 mt-2">
          © 2025 Next Baazar. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;
