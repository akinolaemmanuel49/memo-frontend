"use client";

import axios from "axios";
import React from "react";
import { useState } from "react";
import {
    AuthCredentials as FormData,
    AuthDataResponse,
} from "@/app/lib/types";
import { useFormStatus } from "react-dom";
import { Button } from "@/app/ui/button";
import { ArrowRightCircle } from "../icons";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SigninForm() {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: ""
    });

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Validate form data
        if (
            !formData.email ||
            !formData.password
        ) {
            setErrorMessage("All fields are required");
            return;
        }

        // Send form data to server
        try {
            const response: AuthDataResponse = (
                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/token`,
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
                <h1 className="mb-3 text-2xl">
                    Sign into your account
                </h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-2 mt-2 block text-xs font-medium text-gray-900"
                            htmlFor="email">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label
                            className="mb-2 mt-2 block text-xs font-medium text-gray-900"
                            htmlFor="password">
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
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <SigninButton />
            </div>
            <div>
                <p>Don&apos;t have an account? <Link href="/signup" className="mt-4 text-blue-600 hover:text-blue-900 hover:outline-blue-900">Sign up</Link></p>
            </div>
        </form >
    );
}

function SigninButton() {
    const { pending } = useFormStatus();

    return (
        <Button className="mt-4 w-full" aria-disabled={pending}>
            Sign in <ArrowRightCircle className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
    )
}