"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/firebase/confing";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  const links = (
    <>
      <div className="md:flex">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
       {
        user && <div className="flex">
          <li>
          <Link href="/addProduct">Add Products</Link>
        </li>
        <li>
          <Link href="/manageProduct">Manage Product</Link>
        </li>
        </div>
       }
      </div>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm md:w-7xl mx-auto">
      {/* Left */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <a className="btn btn-ghost text-xl">Products</a>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end gap-2">
        {user ? (
          <>
            <details className="dropdown mr-15">
              <summary className="btn m-1 mr-15">
                <img src={user.photoURL} className="h-[30px] w-[30px] rounded-2xl" alt="" />
              </summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm py-5">
                <li>
                  <span className="font-semibold">{user.displayName}</span>
                </li>
                <li>
                  <Link href="/products">Products</Link>
                </li>
                <li>
                  <Link href="/addProduct">Add Products</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn btn-error">
                    Logout
                  </button>
                </li>
              </ul>
            </details>
          </>
        ) : (
          <>
            <Link href="/auth/login" className="btn">
              Login
            </Link>
            <Link href="/auth/register" className="btn">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
