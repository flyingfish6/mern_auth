import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [err, seterr] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    console.log(formData);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      console.log(data);
      setIsloading(false);
      if (data.success === false) {
        seterr(true);
        return;
      }
      navigate("/signin");
    } catch (error) {
      console.log(error);
      seterr(true);
      setIsloading(false);
    }
  };
  return (
    <div className="flex flex-col max-w-xl mx-auto">
      <div className="text-4xl font-semibold items-center flex justify-center mt-16">
        Sign Up
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-10">
        <input
          type="text"
          className="border w-full px-6  py-2 text-xl bg-slate-200 rounded-lg"
          placeholder="username"
          id="username"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <input
          type="text"
          className="border w-full px-6  py-2 text-xl bg-slate-200 rounded-lg"
          placeholder="email"
          id="email"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <input
          type="password"
          className="border w-full px-6  py-2 text-xl bg-slate-200 rounded-lg"
          placeholder="password"
          id="password"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className="bg-slate-700 disabled:cursor-not-allowed disabled:opacity-80 hover:opacity-85 py-2 mt-4 rounded-lg text-white uppercase"
        >
          {isLoading ? "loading..." : "Sign up"}
        </button>
      </form>
      <div>
        <p className="text-gray-500 mt-2">
          Have a account{" "}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
        {err && <p className="text-red-700 mt-8">something went wrong</p>}
      </div>
    </div>
  );
}
