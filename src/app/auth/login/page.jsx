"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth } from "@/app/firebase/confing";

const googleProvider = new GoogleAuthProvider()
const Login = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      return setError("Email & Password required!");
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful!");
      setError("");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Google Login Successful!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="py-30 flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body">
          <h1 className="text-center text-2xl font-bold">Login</h1>

          <form onSubmit={handleLogin}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
              />

              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  className="input w-full"
                  placeholder="Password"
                />

                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-5 top-3 cursor-pointer"
                >
                  {show ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>

              <p className="text-red-500">{error}</p>

              <button type="submit" className="btn btn-neutral mt-4">
                Login
              </button>
            </fieldset>

            <p className="font-semibold mt-2">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-red-500">
                Register
              </Link>
            </p>
          </form>

          {/* Google Login */}
          <button
            onClick={handleGoogle}
            className="btn bg-white text-black border mt-2"
          >
            Login with Google
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
