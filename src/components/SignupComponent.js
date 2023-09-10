"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useAppContext } from "@/contexts/Provider";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const { signup } = useAppContext();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required")
        .min(4, "Name must be atleast 4 character"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Your password should contain atleast 6 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      performSignup(values);
    },
  });

  const performSignup = async (values) => {
    setLoading(true);
    const { name, email, password } = values;
    await signup(name, email, password);
    setLoading(false);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col px-32 py-40 space-y-8 w-full"
    >
      <h1 className="font-medium text-xl">Create new account at Designfly</h1>
      <div className="flex flex-col space-y-5">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="border rounded p-2"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-400 text-sm">{formik.errors.name}</div>
        ) : null}
      </div>

      <div className="flex flex-col space-y-5">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="border rounded p-2"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-400 text-sm">{formik.errors.email}</div>
        ) : null}
      </div>

      <div className="flex flex-col space-y-5">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="border rounded p-2"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-400 text-sm">{formik.errors.password}</div>
        ) : null}
      </div>

      <button
        type="submit"
        className="bg-[#03A9F4] rounded-full p-2 text-white font-semibold"
      >
        {loading ? "Signing up..." : "Sign up"}
      </button>
      <span className="flex justify-center text-sm text-gray-500">
        Already have an account. Login{" "}
        <Link href="/login">
          <strong>&nbsp;here</strong>
        </Link>
      </span>
    </form>
  );
}
