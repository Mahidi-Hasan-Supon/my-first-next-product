"use client";
import { onAuthStateChanged } from "firebase/auth";
import React, { use, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { auth } from "../firebase/confing";

const ManageProduct = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const viewRef = useRef(null);
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unSubscribe();
    };
  }, []);
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/products?email=${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
        });
    }
  }, [user]);

  const handleDelete = (_id) => {
    console.log("e");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/products/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("delete", data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Cancel!",
                text: "Your booking has been cancel.",
                icon: "success",
              });
              const remainingProducts = products.filter(
                (product) => product._id !== _id
              );
              setProducts(remainingProducts);
            }
          });
      }
    });
  };

  const handleView = () => {
    console.log("search");
    viewRef.current.showModal();
  };
  return (
    <div className="overflow-x-auto md:w-7xl mx-auto py-30">
      {products.length === 0 ? (
        <div>
          <p className="text-center text-primary font-bold text-3xl py-30">
            No bookings found.
          </p>
        </div>
      ) : (
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 4 */}
            {products.map((product, index) => (
              <tr key={product._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{product.email}</div>
                    </div>
                  </div>
                </td>
                <td>{product.title}</td>

                <td>{product.price}</td>
                <th className="space-y-2">
                  <button onClick={handleView} className="btn btn-primary mr-2">
                    View
                  </button>
                  {/* modal */}

                  {/* Open the modal using react  */}
                  <dialog id="my_modal_1" ref={viewRef} className="modal">
                    <div className="modal-box">
                      <form>
                        <fieldset className="fieldset">

                          <input
                            type="text"
                            name="title"
                            className="input"
                            placeholder="Title"
                            defaultValue={product.title}
                            readOnly
                          />

                          <textarea
                            className="textarea"
                            name="sort_description"
                            placeholder="Sort description"
                             defaultValue={product.sort_description}
                            readOnly
                          ></textarea>

                          <textarea
                            className="textarea"
                            name="full_description"
                            placeholder="Full description"
                             defaultValue={product.full_description}
                            readOnly
                          ></textarea>


                          <input
                            type="number"
                            name="price"
                            className="input"
                            placeholder="Price"
                             defaultValue={product.price}
                            readOnly
                          />


                          <input
                            type="text"
                            name="photo"
                            className="input"
                            placeholder="Image URL"
                             defaultValue={product.photo}
                            readOnly
                          />

                          <input
                            type="email"
                            name="email"
                            className="input"
                            placeholder="Email"
                            defaultValue={user?.email || ""}
                            readOnly
                          />
                       
                        </fieldset>
                      </form>
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-primary"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageProduct;
