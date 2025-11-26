"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Products =  () => {
  const [products, setProducts] = useState([]);
const [searchText, setSearchText] = useState("");
 const handleSearch=(e)=>{
   e.preventDefault()
   const search_text = e.target.search.value  
   console.log(search_text);
   const filtered = products.filter(product=>product.title.toLowerCase().includes(search_text.toLowerCase()))
   setProducts(filtered)
  }

useEffect(() => {
  fetch("http://localhost:5000/products") // server থেকে data
    .then(res => res.json())
    .then(data => setProducts(data));
}, []);

  return (
    <div>
      <h1 className="md:text-center text-4xl font-bold py-10">All Products</h1>

      {/* search */}
      <form onSubmit={handleSearch} className="md:text-center">
        <label className="input rounded-2xl">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" name="search" required placeholder="Search" />
        </label>
        <button className="btn btn-primary rounded-2xl ml-2">search</button>
      </form>

      <div className="grid md:grid-cols-2 py-10 gap-10 md:w-4xl mx-auto text-black ">
        {products.map((product) => (
          <>
            <div className="">
              <div className="card shadow-sm bg-white hover:bg-amber-50  ">
                <figure>
                  <img
                    src={product.image}
                    className="w-full h-[300px]"
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-2xl">{product.title}</h2>
                  <p>{product.short_description}</p>
                  <div className="card-actions justify-end">
                    <p>
                      Price:{" "}
                      <strong className="text-md">{product.price}</strong>
                    </p>
                    <Link
                      href={`/products/${product._id}`}
                      className="btn btn-primary"
                    >
                      Product Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Products;
