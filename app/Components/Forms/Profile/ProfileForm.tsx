"use client";

import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { ProfileFormData as FormData, ProfileData } from "@/Lib/Types";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { ArrowRightCircle } from "@/app/Components/Icons";
import { Button } from "@/app/Components/Button";

export default function ProfileForm() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    about: "",
  });
  const [profileData, setProfileData] = useState<ProfileData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchFormInitialValues = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("Access token not found.");
        return;
      }
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setProfileData(response.data);
        setFormData(response.data);
      } catch (error) {
        setError("Failed to fetch user profile.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFormInitialValues();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Send form data to server
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setError("Access token not found.");
      return;
    }

    try {
      const response = (
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
      ).data;
      console.log("Form submitted: ", response);
      router.push("/profile/update/avatar");
    } catch (error) {
      console.error("Profile update failed: ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center md:items-start"
    >
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8 md:w-full">
        <h1 className="mb-3 text-2xl">Update your profile</h1>
        <div className="w-full">
          <div className="flex flex-row gap-2 justify-between">
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
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500 md:w-72"
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
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pr-2 text-sm outline-2 placeholder:text-gray-500 text-right md:w-72"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2 justify-between">
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
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500 md:w-72"
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
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pr-2 text-sm outline-2 placeholder:text-gray-500 text-right md:w-72"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2 justify-between">
            <div className="w-full">
              <label
                className="mb-2 mt-2 block text-xs font-medium text-gray-900"
                htmlFor="Bio"
              >
                Bio
              </label>
              <div className="relative">
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  placeholder="About me"
                  rows={4}
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500 text-start"
                />
              </div>
            </div>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-center mt-4">
          <UpdateProfileButton />
        </div>
      </div>
    </form>
  );
}

function UpdateProfileButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full text-white md:w-72" aria-disabled={pending}>
      Update profile{" "}
      <ArrowRightCircle className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
