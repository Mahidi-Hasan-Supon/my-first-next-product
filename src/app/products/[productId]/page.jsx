import Link from "next/link";
import React from "react";

async function ProductId({ params }) {
  const { productId } = await params;
  const res = await fetch(
    `https://my-product-next-server.vercel.app/products/${productId}`
  );
  const product = await res.json();
  console.log(product);

  return (
    <div className="text-black w-xl mx-auto py-30 ">
      <div>
        <div className="card card-side shadow-sm bg-amber-50">
          <figure>
            <img
              src={product.image}
              className="h-[400px] w-[400px]"
              alt="Movie"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-2xl ">{product.title}</h2>
            <p className="text-md opacity-70 ">{product.short_description}</p>
            <p className="text-md">
              Price:৳ <span className="text-xl font-bold">{product.price}</span>
            </p>
            <div className="justify-end card-actions ">
              <Link href="/products" className="btn btn-primary">
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductId;
