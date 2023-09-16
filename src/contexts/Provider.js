"use client";
import React, { createContext, useContext } from "react";
import { ID, Client, Account, Databases, Storage, Query } from "appwrite";
import { useRouter } from "next/navigation";

const AppContext = createContext(null);

function Provider({ children }) {
  const router = useRouter();
  // Initialize appwrite sdk
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID); // Your project ID

  const account = new Account(client);
  const database = new Databases(client);
  const storage = new Storage(client);

  // Login
  const login = async (email, password) => {
    try {
      const response = await account.createEmailSession(email, password);
      alert("You are logged in successfully");
      //   route to dashboard will do that in future
      router.push("/dashboard");
    } catch (err) {
      alert(err);
    }
  };

  // Signup
  const signup = async (name, email, password) => {
    try {
      const response = await account.create(ID.unique(), email, password, name);

      console.log(response);

      let id = response.$id;
      console.log(id);
      await createUser(id, name, email);
      alert("Your account was created successfully");
      // redirect user to dashboard
      router.push("/login");
    } catch (err) {
      alert(err);
    }
  };

  // Create User Document
  const createUser = async (
    id,
    fullName,
    emailAddress,
    bio = "",
    profilePic = ""
  ) => {
    try {
      const response = await database.createDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
        id,
        {
          Name: fullName,
          Bio: bio,
          ProfilePic: profilePic,
          Email: emailAddress,
        }
      );
    } catch (err) {
      alert(err);
    }
  };

  const getLoggedInUser = async () => {
    try {
      const user = await account.get();
      return user;
    } catch (err) {
      router.push("/");
      return null;
    }
  };

  const getUserDetails = async (id) => {
    try {
      // try to fetch user details from users collection
      const user = await database.getDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
        id
      );
      return user;
    } catch (err) {
      alert(err);
    }
  };

  // this function will store profilePic in appwrite storage service
  const storePic = async (file) => {
    try {
      const response = await storage.createFile(
        process.env.NEXT_PUBLIC_BUCKET_ID,
        ID.unique(),
        file
      );
      return response.$id;
    } catch (err) {
      alert(err);
    }
  };

  // function will store records in users collection
  const updateUser = async (id, name, email, bio, profilePic) => {
    try {
      await database.updateDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
        id,
        {
          Name: name,
          Bio: bio,
          ProfilePic: profilePic,
          Email: email,
        }
      );
    } catch (err) {
      alert(err);
    }
  };

  // fetch users
  const fetchUsers = async (userIds = []) => {
    try {
      if (userIds) {
        const records = await database.listDocuments(
          process.env.NEXT_PUBLIC_DATABASE_ID,
          process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
          [Query.equal("$id", userIds)]
        );

        return records;
      } else {
        const records = await database.listDocuments(
          process.env.NEXT_PUBLIC_DATABASE_ID,
          process.env.NEXT_PUBLIC_USER_COLLECTION_ID
        );

        return records;
      }
    } catch (err) {
      alert(err);
    }
  };

  // get profile pic preview
  const getPicPreview = async (fileId) => {
    try {
      const response = await storage.getFilePreview(
        process.env.NEXT_PUBLIC_BUCKET_ID,
        fileId
      );
      return response.href;
    } catch (err) {
      alert(err);
    }
  };

  // function will store the desings in designs collection

  const createDesign = async (pictureId, title, description, userId) => {
    try {
      const response = await database.createDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_DESIGN_COLLECTION_ID,
        ID.unique(),
        {
          DesignPic: pictureId,
          Title: title,
          Description: description,
          UserId: userId,
        }
      );
    } catch (err) {
      alert(err);
    }
  };

  //  fetch designs from appwrite database

  const fetchDesignsFromAppwrite = async (userId = "", designId = "") => {
    try {
      if (userId) {
        const response = await database.listDocuments(
          process.env.NEXT_PUBLIC_DATABASE_ID,
          process.env.NEXT_PUBLIC_DESIGN_COLLECTION_ID,
          [Query.equal("UserId", [userId])]
        );
        return response;
      } else {
        if (designId) {
          const response = await database.listDocuments(
            process.env.NEXT_PUBLIC_DATABASE_ID,
            process.env.NEXT_PUBLIC_DESIGN_COLLECTION_ID,
            [Query.equal("$id", [designId])]
          );

          return response;
        } else {
          const response = await database.listDocuments(
            process.env.NEXT_PUBLIC_DATABASE_ID,
            process.env.NEXT_PUBLIC_DESIGN_COLLECTION_ID
          );

          return response;
        }
      }
    } catch (err) {
      alert(err);
    }
  };

  const logout = async () => {
    await account.deleteSession("current");
  };

  const exposedValues = {
    signup,
    login,
    getLoggedInUser,
    getUserDetails,
    storePic,
    updateUser,
    getPicPreview,
    createDesign,
    fetchDesignsFromAppwrite,
    fetchUsers,
    logout,
  };

  return (
    <AppContext.Provider value={exposedValues}>{children}</AppContext.Provider>
  );
}

export default Provider;

export const useAppContext = () => useContext(AppContext);
