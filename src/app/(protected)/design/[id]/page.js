"use client";
import { useAppContext } from "@/contexts/Provider";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HeartIcon } from "lucide-react";

function DesignPage() {
  const [loading, setLoading] = useState(false);
  const [designs, setDesigns] = useState([]);
  const [user, setUser] = useState({});
  const params = useParams();
  const id = params.id;

  const { fetchDesignsFromAppwrite, fetchUsers } = useAppContext();

  useEffect(() => {
    fetchDesignsDetails();
  }, []);

  const fetchDesignsDetails = async () => {
    setLoading(true);

    const design = await fetchDesignsFromAppwrite("", id);
    console.log(design.documents);
    let all_designs = design.documents;
    if (all_designs.length > 0) {
      let design1 = all_designs[0];
      let userId = design1["UserId"];

      let response = await fetchUsers(userId);
      console.log(response);
      setUser(response.documents);
    }
    setDesigns(design.documents);

    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full px-10 bg-[#1B1B1B] text-white min-h-screen pb-20">
      {loading ? (
        <span>Loading...</span>
      ) : designs.length === 0 ? (
        <span>No design for this id</span>
      ) : (
        <div className="w-full flex flex-col p-2 space-y-10 ">
          <DesignImageComponent imageId={designs[0]["DesignPic"]} />
          <div className="flex justify-between w-full">
            <div>
              <UserImageComponent
                imageId={user?.[0]?.["ProfilePic"]}
                userName={user?.[0]?.["Name"]}
              />
            </div>
            <div className="flex flex-col space-y-2 ml-4">
              <span>{user?.[0]?.Name}</span>
              <p className="text-sm text-gray-500">{user?.[0]?.Bio}</p>
            </div>
            <div className="flex space-x-2 ml-auto">
              <HeartIcon className="w-4" />
              <span>0</span>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <h1 className="font-semibold text-4xl">{designs[0]["Title"]}</h1>
            <p>{designs[0]["Description"]}</p>
          </div>
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

  return <img className="rounded w-full" src={pic} />;
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

export default DesignPage;
