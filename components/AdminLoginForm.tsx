"use client";

import Image from "next/image";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function AdminLoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  const response = await fetch("/api/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  console.log(data);
};
  return (
    <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl border border-pink-100">

      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Image
          src="/logo.jpeg"
          alt="TorSecure Logo"
          width={80}
          height={80}
        />
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-center">
        Admin Portal
      </h1>

      {/* Subtitle */}
      <p className="text-center text-gray-500 mt-2">
        Sign in to access the administrator dashboard
      </p>

<form onSubmit={handleLogin} className="mt-8 space-y-6">
      {/* Email */}
<div className="mt-8">
  <label
    htmlFor="email"
    className="block text-sm font-medium text-gray-700 mb-2"
  >
    Email Address
  </label>

  <div className="flex items-center rounded-xl border border-gray-300 px-4 py-3 focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-200 transition">
    <Mail className="w-5 h-5 text-gray-400 mr-3" />

    <input
  id="email"
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full outline-none bg-transparent"
/>
  </div>
</div>
{/* Password */}
<div className="mt-6">
  <div className="flex justify-between items-center mb-2">
    <label
      htmlFor="password"
      className="block text-sm font-medium text-gray-700"
    >
      Password
    </label>

    <button
      type="button"
      className="text-sm text-blue-600 hover:underline"
    >
      Forgot Password?
    </button>
  </div>

  <div className="flex items-center rounded-xl border border-gray-300 px-4 py-3 focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-200 transition">

    <Lock className="w-5 h-5 text-gray-400 mr-3" />

    <input
  id="password"
  type={showPassword ? "text" : "password"}
  placeholder="Enter your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full outline-none bg-transparent"
/>

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? (
        <EyeOff className="w-5 h-5 text-gray-500" />
      ) : (
        <Eye className="w-5 h-5 text-gray-500" />
      )}
    </button>
    

  </div>
  <br/>
  <button
  type="submit"
  className="w-full rounded-xl bg-blue-600 py-3 text-white font-semibold shadow-md hover:bg-pink-700 transition duration-300"
>
  Sign In
</button>
</div>
</form>

    </div>
  );
}