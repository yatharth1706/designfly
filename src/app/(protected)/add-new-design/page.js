"use client";
import { useAppContext } from "@/contexts/Provider";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function AddDesign() {
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const { createDesign, storePic, getLoggedInUser } = useAppContext();

  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    console.log(file);

    if (file) {
      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        setImagePreview(fileReader.result);
      };

      fileReader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  const publish = async () => {
    if (!title || !description || !imagePreview) {
      alert("All fields are mandatory while publishing design");
      return;
    }

    setLoading(true);
    // store the design pic and gets its id
    const file = document.getElementById("designPic").files[0];

    const id = await storePic(file);

    // store the design document in appwrite collection
    let user = await getLoggedInUser();
    let userId = user.$id;
    await createDesign(id, title, description, userId);

    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1B1B1B] text-white px-10 space-y-10">
      <div className="flex justify-between w-full">
        <Link href="/dashboard">
          <button className="bg-[#4F4F4F] rounded-full px-8 py-2">
            Cancel
          </button>
        </Link>
        <button
          className="bg-[#4F4F4F] rounded-full px-8 py-2"
          style={{
            background:
              "linear-gradient(91deg, #2FBEFF 7.38%, #1A67DC 92.4%, rgba(255, 255, 255, 0.90) 126.21%, rgba(44, 189, 255, 0.29) 161.04%, rgba(38, 13, 192, 0.00) 224.67%, rgba(108, 84, 255, 0.00) 224.67%)",
          }}
          onClick={publish}
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
      </div>

      <div className="w-full flex flex-col space-y-8">
        {/* Image */}

        <div className="relative w-full border border-dashed border-gray-200 h-96 rounded-lg flex flex-col justify-center items-center">
          {imagePreview && (
            <img src={imagePreview} className="w-full h-full object-cover" />
          )}
          {!imagePreview && (
            <>
              <img
                src="assets/ImageLogo.png"
                alt="Image logo"
                className="w-32 h-32"
              />
              <span className="mt-6 text-sm text-gray-300">
                Upload photo of your design here
              </span>
            </>
          )}
          <input
            type="file"
            className="opacity-0 w-full h-full absolute"
            onChange={handleFileChange}
            id="designPic"
          />
        </div>
        {imagePreview && (
          <span
            className="text-right text-[#2FBEFF] cursor-pointer"
            onClick={() => setImagePreview("")}
          >
            Clear image
          </span>
        )}
        {/* Title */}
        <div className="flex flex-col space-y-4">
          <label>Title</label>
          <input
            type="text"
            className="border border-gray-500 rounded p-2 bg-transparent"
            placeholder="Enter title for your design"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* Description */}
        <div className="flex flex-col space-y-4">
          <label>Description</label>
          <textarea
            className="border border-gray-500 rounded p-2 bg-transparent"
            placeholder="Enter description for your design"
            rows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default AddDesign;
