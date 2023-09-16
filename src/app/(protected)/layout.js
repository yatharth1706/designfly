"use client";

import { useAppContext } from "@/contexts/Provider";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({ children }) {
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const { getLoggedInUser, getUserDetails, getPicPreview, logout } =
    useAppContext();
  const [user, setUser] = useState();

  const router = useRouter();

  useEffect(() => {
    getCurrUser();
  }, []);

  const getCurrUser = async () => {
    setLoading(true);
    let user = await getLoggedInUser();

    console.log(user);
    setUser(user);
    let userId = user?.$id;

    if (userId) {
      // get user information from appwrite users collection
      let userDetails = await getUserDetails(userId);
      if (userDetails?.ProfilePic) {
        handleImagePreview(userDetails?.ProfilePic);
      }
      setUserDetails(userDetails);
    }
    setLoading(false);
  };

  const handleImagePreview = async (fileId) => {
    const url = await getPicPreview(fileId);
    setImagePreview(url);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (user) {
    return (
      <html lang="en">
        <body>
          <div className="w-full flex justify-between bg-[#1B1B1B] text-white p-10">
            <Link href="/dashboard">
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
            <Link href="/profile">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="cursor-pointer w-10 h-10 rounded-full flex justify-center items-center bg-white text-gray-500">
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
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile">
                    <DropdownMenuItem>My Profile</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Link>
          </div>
          {children}
        </body>
      </html>
    );
  }
}
