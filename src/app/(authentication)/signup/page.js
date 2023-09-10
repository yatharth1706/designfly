import SignupForm from "@/components/SignupComponent";
import React from "react";

function Login() {
  return (
    <div className="flex w-full h-screen">
      <div className="w-2/6 h-full">
        {/* image */}
        <img
          className="w-full h-full object-cover"
          src="/assets/AuthPreview.png"
          alt="Auth preview image"
        />
      </div>

      <div className="w-4/6 flex justify-center">
        {/* Form */}
        <SignupForm />
      </div>
    </div>
  );
}

export default Login;
