"use client";
import React, { createContext, useContext } from "react";
import { ID, Client, Account } from "appwrite";

const AppContext = createContext(null);

function Provider({ children }) {
  // Initialize appwrite sdk
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID); // Your project ID

  const account = new Account(client);

  // Login
  const login = async (email, password) => {
    try {
      const response = await account.createEmailSession(email, password);
      alert("You are logged in successfully");
      //   route to dashboard will do that in future
    } catch (err) {
      alert(err);
    }
  };

  // Signup
  const signup = async (name, email, password) => {
    try {
      const response = await account.create(ID.unique(), email, password, name);
      alert("Your account was created successfully");
    } catch (err) {
      alert(err);
    }
  };

  const exposedValues = {
    signup,
    login,
  };

  return (
    <AppContext.Provider value={exposedValues}>{children}</AppContext.Provider>
  );
}

export default Provider;

export const useAppContext = () => useContext(AppContext);
