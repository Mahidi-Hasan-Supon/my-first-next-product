"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth } from "@/app/firebase/confing";

const googleProvider = new GoogleAuthProvider()
const Register = () => {
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const casePattern = /(?=.*[A-Z])/;
  const smallLetter = /(?=.*[a-z])/;

  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Validation
    if (!casePattern.test(password)) {
      return setError("Password must contain at least one uppercase letter!");
    }
    if (!smallLetter.test(password)) {
      return setError("Password must contain at least one lowercase letter!");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters long!");
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(res.user, {
        displayName: name,
        photoURL: photo,
      });

      toast.success("Registration Successful!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Google Login
  const handleGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      toast.success("Login Successful");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="py-30 flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body">
          <h1 className="text-center text-2xl font-bold">Register</h1>

          <form onSubmit={handleRegister}>
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input type="text" name="name" className="input" placeholder="Name" />

              <label className="label">Photo URL</label>
              <input type="text" name="photo" className="input" placeholder="Photo URL" />

              <label className="label">Email</label>
              <input type="email" name="email" className="input" placeholder="Email" />

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
                Register
              </button>
            </fieldset>

            <p className="font-semibold mt-2">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-red-500">
                Login
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

export default Register;
