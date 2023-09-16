"use client";
import React, { useEffect, useState } from "react";
import DesignsComponent from "@/components/DesignsComponent";
import Link from "next/link";
import { useAppContext } from "@/contexts/Provider";

function Dashboard() {
  const [activeNav, setActiveNav] = useState("All Designs");
  const [loading, setLoading] = useState(false);
  const [finalRecords, setFinalRecords] = useState([]);
  const [userRecords, setUserRecords] = useState({});

  const { fetchDesignsFromAppwrite, getLoggedInUser, fetchUsers } =
    useAppContext();

  useEffect(() => {
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    setLoading(true);

    const records = await fetchDesignsFromAppwrite();
    const finalRecords1 = records?.documents ?? [];

    let userIds = new Set();

    finalRecords1.forEach((item) => {
      let userId = item?.UserId;
      userIds.add(userId);
    });
    userIds = [...userIds];
    console.log(userIds);
    if (userIds.length > 0) {
      createUserRecordsObject(userIds);
    }
    setFinalRecords(finalRecords1);
    setLoading(false);
  };

  const getUserDesigns = async () => {
    setLoading(true);

    let user = await getLoggedInUser();
    let userId = user.$id;
    console.log(userId);

    const records = await fetchDesignsFromAppwrite(userId);
    console.log(records);
    const finalRecords1 = records?.documents ?? [];
    console.log(finalRecords1);
    let userIds = new Set();

    finalRecords1.forEach((item) => {
      let userId = item?.UserId;
      userIds.add(userId);
    });
    userIds = [...userIds];
    console.log(userIds);

    if (userIds.length > 0) {
      createUserRecordsObject(userIds);
    }

    setFinalRecords(finalRecords1);
    setLoading(false);
  };

  const createUserRecordsObject = async (userIds) => {
    const records = await fetchUsers(userIds);
    console.log(records);

    let obj = {};

    records?.documents.forEach((item) => (obj[item.$id] = item));
    console.log(obj);
    setUserRecords(obj);
  };

  return (
    <div className="flex flex-col w-full px-10 bg-[#1B1B1B] text-white min-h-screen">
      <div className="flex justify-between">
        <div className="flex space-x-8">
          <span
            className={
              "cursor-pointer" +
              (activeNav === "All Designs"
                ? " border-b pb-4 border-blue-400"
                : "")
            }
            onClick={() => {
              setActiveNav("All Designs");
              fetchDesigns();
            }}
          >
            All Designs
          </span>
          <span
            className={
              "cursor-pointer" +
              (activeNav === "Your Designs"
                ? " border-b pb-4 border-blue-400"
                : "")
            }
            onClick={() => {
              setActiveNav("Your Designs");
              getUserDesigns();
            }}
          >
             Your Designs
          </span>
        </div>

        <Link href="/add-new-design">
          <button
            className="rounded-full py-2 px-8 text-white"
            style={{
              background:
                "linear-gradient(91deg, #2FBEFF 7.38%, #1A67DC 92.4%, rgba(255, 255, 255, 0.90) 126.21%, rgba(44, 189, 255, 0.29) 161.04%, rgba(38, 13, 192, 0.00) 224.67%, rgba(108, 84, 255, 0.00) 224.67%)",
            }}
          >
            Add Design
          </button>
        </Link>
      </div>

      <div className="flex flex-col mt-10">
        {loading ? (
          <span className="-mt-5">Loading...</span>
        ) : (
          <DesignsComponent
            finalRecords={finalRecords}
            userRecords={userRecords}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
