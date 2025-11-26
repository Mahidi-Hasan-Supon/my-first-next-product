import Link from 'next/link';
import React from 'react';

const  Products =async () => {
    const res = await fetch('http:localhost:5000/products')
    const products =await res.json()
    console.log(products);
    return (
        <div>
            <div className="grid md:grid-cols-2 py-10 gap-10 w-4xl mx-auto text-black">
        {products.map((product) => (
          <>
            <div className="hover:shadow-2xl bg-white">
              <div className="card shadow-sm">
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
                      Price: <strong className="text-md">{product.price}</strong>
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

export default  Products;