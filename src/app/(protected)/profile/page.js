"use client";
import ProfileDiaglog from "@/components/ProfileDiaglog";
import { useAppContext } from "@/contexts/Provider";
import { HeartIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function UsersPage() {
  const {
    getLoggedInUser,
    getUserDetails,
    getPicPreview,
    fetchDesignsFromAppwrite,
  } = useAppContext();
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [profileModalState, setProfileModalState] = useState(false);
  const [userId, setUserId] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    getCurrUser();
  }, []);

  const getCurrUser = async () => {
    setLoading(true);
    let user = await getLoggedInUser();
    let userId = user?.$id;
    if (userId) {
      fetchAllDesignsOfUser(userId);
      setUserId(userId);
      // get user information from appwrite users collection
      let userDetails = await getUserDetails(userId);
      if (userDetails?.ProfilePic) {
        handleImagePreview(userDetails?.ProfilePic);
      }
      setUserDetails({ ...userDetails });
    }
    setLoading(false);
  };

  const fetchAllDesignsOfUser = async (userId) => {
    const records = await fetchDesignsFromAppwrite(userId);
    console.log(records.documents);
    setDesigns(records.documents ?? []);
  };

  const handleImagePreview = async (fileId) => {
    const url = await getPicPreview(fileId);
    setImagePreview(url);
  };

  return (
    <div className="flex flex-col w-full px-10 bg-[#1B1B1B] text-white min-h-screen">
      {loading ? (
        <div>
          <span>Loading...</span>{" "}
        </div>
      ) : (
        <>
          <div className="flex space-x-6 mx-auto my-28 items-center">
            <div className="w-32 h-32 rounded-full bg-white flex flex-col justify-center items-center text-gray-800">
              {/* Profile pic */}
              {!imagePreview && (
                <span>{userDetails && userDetails?.Name?.[0]}</span>
              )}
              {imagePreview && (
                <img
                  src={imagePreview}
                  className="w-full h-full object-cover object-center rounded-full"
                />
              )}
            </div>
            <div className="flex flex-col space-y-3">
              <h2>{userDetails?.Name}</h2>
              <span className="text-gray-400 text-xs">
                {userDetails?.Email}
              </span>
              <p className="text-gray-400">{userDetails?.Bio}</p>
              <span
                className="text-sm text-cyan-500 cursor-pointer"
                onClick={() => setProfileModalState(true)}
              >
                Edit Profile
              </span>
            </div>
          </div>

          <div className="flex flex-col space-y-3 mx-32">
            <h2 className="text-md font-semibold">Work</h2>
            <div className="flex">
              {designs.length === 0 ? (
                <span className="text-sm">No Designs Yet</span>
              ) : (
                <div className="w-full grid grid-cols-3 gap-10">
                  {designs.map((item) => (
                    <Link href={"/design/" + item["$id"]}>
                      <div className="flex flex-col space-y-3 w-full h-[300px] rounded">
                        <DesignImageComponent imageId={item["DesignPic"]} />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <ProfileDiaglog
        profileModalState={profileModalState}
        setProfileModalState={setProfileModalState}
        userDetails={userDetails}
        userId={userId}
        getCurrUser={getCurrUser}
      />
    </div>
  );
}

const DesignImageComponent = ({ imageId }) => {
  const [pic, setPic] = useState("");
  const { getPicPreview } = useAppContext();

  useEffect(() => {
    if (imageId) {
      findPicUrl();
    }
  }, [imageId]);

  const findPicUrl = async () => {
    const url = await getPicPreview(imageId);
    setPic(url);
  };

  return <img src={pic} className="w-full h-[250px] rounded" />;
};

export default UsersPage;
