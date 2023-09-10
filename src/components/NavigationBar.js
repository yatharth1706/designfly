import React from "react";
import Link from "next/link";

function NavigationBar() {
  return (
    <div className="flex justify-between w-full">
      <Link href="/">
        <div className="flex space-x-4 w-2/5">
          {/* Logo */}
          <img
            src="/assets/DesignflyLogo.png"
            className="w-6 h-6"
            alt="Designfly Logo"
          />
          <span>Designfly</span>
        </div>
      </Link>

      <div className="flex space-x-10 items-center">
        {/* buttons */}
        <Link href="/signup">
          <button className="cursor-pointer">Sign up</button>
        </Link>
        <Link href="/login">
          <button className="bg-[#444444] px-10 py-2 rounded-full cursor-pointer">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NavigationBar;
