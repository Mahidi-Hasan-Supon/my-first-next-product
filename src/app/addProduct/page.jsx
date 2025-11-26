"use client";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { auth } from "../firebase/confing";
import { onAuthStateChanged } from "firebase/auth";

const AddProducts = () => {
    const [user , setUser] = useState(null)

      useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      title: e.target.title.value,
      sort_description: e.target.sort_description.value,
      full_description: e.target.full_description.value,
      price: e.target.price.value,
      photo: e.target.photo.value,
      email:user?.email
    };
    console.log(product.photo);

    // Backend kaj
    const res = await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const data = await res.json();
    console.log("data:", data);
    toast('Added Product')
  };

  return (
    <div className="text-white py-25">
      <div className="card bg-base-100 md:mx-auto w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset">
              <label className="label">Title</label>
              <input
                type="text"
                name="title"
                className="input"
                placeholder="Title"
                required
              />
              <label className="label">Sort Description</label>
              <textarea
                className="textarea"
                name="sort_description"
                placeholder="Sort description"
                required
              ></textarea>
              <label className="label">Full Description</label>
              <textarea
                className="textarea"
                name="full_description"
                placeholder="Full description"
                required
              ></textarea>

              <label className="label">Price</label>
              <input
                type="number"
                name="price"
                className="input"
                placeholder="Price"
                required
              />

              <label className="label">Image URL</label>
              <input
                type="text"
                name="photo"
                className="input"
                placeholder="Image URL"
                
              />
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
                defaultValue={user?.email || ''}
                readOnly
              />
              <button type="submit" className="btn btn-neutral mt-4">
                Submit
              </button>
            </fieldset>
          </form>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default AddProducts;
