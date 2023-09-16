import React, { useState, useEffect } from "react";
import { HeartIcon } from "lucide-react";
import { useAppContext } from "@/contexts/Provider";
import Link from "next/link";

function DesignsComponent({ finalRecords, userRecords }) {
  return (
    <div className="flex flex-col justify-center items-center grow">
      {finalRecords.length === 0 ? (
        <span>No designs yet</span>
      ) : (
        <div className="w-full grid grid-cols-3 gap-10">
          {finalRecords.map((item) => (
            <Link href={"/design/" + item["$id"]}>
              <div className="flex flex-col space-y-3 w-full h-auto rounded">
                <DesignImageComponent imageId={item["DesignPic"]} />
                <div className="flex justify-between">
                  <div className="flex space-x-2 items-center">
                    {/* Profile pic of user */}
                    <UserImageComponent
                      imageId={userRecords[item?.UserId]?.["ProfilePic"]}
                      userName={userRecords[item?.UserId]?.["Name"]}
                    />
                    <span>{userRecords[item?.UserId]?.["Name"]}</span>
                  </div>
                  <div className="flex space-x-1">
                    <HeartIcon className="w-4" />
                    <span>0</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
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

  return (
    <img
      src={pic}
      className="w-full h-[300px] rounded object-cover object-center"
    />
  );
};

const UserImageComponent = ({ imageId, userName }) => {
  const [pic, setPic] = useState("");
  const { getPicPreview } = useAppContext();

  useEffect(() => {
    if (imageId) {
      findPicUrl();
    }
  }, [imageId]);

  const findPicUrl = async () => {
    console.log(imageId);
    const url = await getPicPreview(imageId);
    setPic(url);
  };

  return pic ? (
    <img className="w-6 h-6 rounded-full" src={pic} />
  ) : (
    <div className="w-6 h-6 bg-white text-gray-600 rounded-full flex flex-col justify-center items-center">
      {userName?.[0]}
    </div>
  );
};

export default DesignsComponent;
