"use client";

import axios from "axios";
import React from "react";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/Components/Button";
import { ArrowRightCircle } from "@/Components/Icons";
import { CreateUserFormData as FormData, AuthDataResponse } from "@/Lib/Types";

export default function SignupForm() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const router = useRouter();
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate form data
    if (
      !formData.username ||
      !formData.email ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.password ||
      !confirmPassword
    ) {
      setErrorMessage("All fields are required");
      return;
    }
    if (formData.password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    }

    // Send form data to server
    try {
      const response: AuthDataResponse = (
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`,
          formData
        )
      ).data;
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      console.log("Form submitted: ", response);
      router.push("/home");
    } catch (error) {
      console.error("Signup failed: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Create your account</h1>
        <div className="w-full">
          <div className="flex flex-row gap-2">
            <div>
              <label
                className="mb-2 mt-2 block text-xs font-medium text-gray-900"
                htmlFor="username"
              >
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
            <div>
              <label
                className="mb-2 mt-2 block text-xs font-medium text-gray-900 text-right"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pr-2 text-sm outline-2 placeholder:text-gray-500 text-right"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div>
              <label
                className="mb-2 mt-2 block text-xs font-medium text-gray-900"
                htmlFor="firstName"
              >
                First Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
            <div>
              <label
                className="mb-2 mt-2 block text-xs font-medium text-gray-900 text-right"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pr-2 text-sm outline-2 placeholder:text-gray-500 text-right"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div>
              <label
                className="mb-2 mt-2 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
            <div>
              <label
                className="mb-2 mt-2 block text-xs font-medium text-gray-900 text-right"
                htmlFor="confirmPassword"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pr-2 text-sm outline-2 placeholder:text-gray-500 text-right"
                />
              </div>
            </div>
          </div>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <SignupButton />
      </div>
      <div>
        <p>
          Already have an account?{" "}
          <Link
            href="/signin"
            className="mt-4 text-blue-600 hover:text-blue-900 hover:outline-blue-900"
          >
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}

function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full text-white" aria-disabled={pending}>
      Sign up <ArrowRightCircle className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
