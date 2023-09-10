"use client";
import React, { useState } from "react";
import DesignsComponent from "@/components/DesignsComponent";

function Dashboard() {
  const [activeNav, setActiveNav] = useState("New Designs");

  return (
    <div className="flex flex-col w-full px-10 bg-[#1B1B1B] text-white min-h-screen">
      <div className="flex justify-between">
        <div className="flex space-x-8">
          <span
            className={
              "cursor-pointer" +
              (activeNav === "New Designs"
                ? " border-b pb-4 border-blue-400"
                : "")
            }
            onClick={() => setActiveNav("New Designs")}
          >
            New Designs
          </span>
          <span
            className={
              "cursor-pointer" +
              (activeNav === "Your Designs"
                ? " border-b pb-4 border-blue-400"
                : "")
            }
            onClick={() => setActiveNav("Your Designs")}
          >
             Your Designs
          </span>
        </div>

        <button
          className="rounded-full py-2 px-8 text-white"
          style={{
            background:
              "linear-gradient(91deg, #2FBEFF 7.38%, #1A67DC 92.4%, rgba(255, 255, 255, 0.90) 126.21%, rgba(44, 189, 255, 0.29) 161.04%, rgba(38, 13, 192, 0.00) 224.67%, rgba(108, 84, 255, 0.00) 224.67%)",
          }}
        >
          Add Design
        </button>
      </div>

      <div className="flex flex-col mt-20">
        <DesignsComponent />
      </div>
    </div>
  );
}

export default Dashboard;
