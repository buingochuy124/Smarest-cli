/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/authContext";

const CheckOut = () => {
  const authContext = useContext(AuthContext);
  const { userToken } = authContext;
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:44307/api/carts/usercart", {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => setCartItems(response.data))
      .catch((error) => console.log(error));
  }, [userToken]);
  const totalHandle = () => {
    let totalEach = 0;
    cartItems.forEach((element) => {
      totalEach += element.cost * element.itemQuantity;
    });

    return totalEach;
  };
  return (
    <div className="h-screen">
      <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div class="px-4 pt-8">
          <p class="text-xl font-medium text-white">Order Summary</p>
          <p class="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {cartItems.map((item) => (
              <div
                class="flex flex-col rounded-lg bg-white sm:flex-row"
                key={item.id}
              >
                <img
                  class="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={item.itemImageUrl}
                />
                <div class="flex w-full flex-col px-4 py-4 text-start">
                  <span class="font-semibold w-full">{item.itemName}</span>
                  <span class="float-right text-gray-400">
                    Quantity: {item.itemQuantity}
                  </span>
                  <span class="float-right text-gray-400">
                    Each cost: $ {item.cost}
                  </span>
                </div>
                <div class="flex w-full flex-col px-4 py-4">
                  <p class="text-lg font-bold">
                    $ {item.cost * item.itemQuantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div class="mt-9 bg-gray-50 px-4 pt-8 lg:mt-0 rounded-lg	">
          <p class="text-xl font-medium">Payment Details</p>
          <p class="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div class="">
            <label for="email" class="mt-4 mb-2 block text-sm font-medium">
              Email
            </label>
            <div class="relative">
              <input
                type="text"
                id="email"
                name="email"
                class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder=""
              />
              <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"></div>
            </div>
          </div>

          <div class="mt-6 border-t border-b py-2">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">Subtotal</p>
              <p class="font-semibold text-gray-900">$ {totalHandle()}</p>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">VAT</p>
              <p class="font-semibold text-gray-900">${totalHandle() / 10}</p>
            </div>
          </div>
          <div class="mt-6 flex items-center justify-between">
            <p class="text-sm font-medium text-gray-900">Total</p>
            <p class="text-2xl font-semibold text-gray-900">
              ${(totalHandle() / 10) * 11} (Included VAT tax)
            </p>
          </div>
          <br></br>
          <button className="bg-gray-500 hover:bg-slate-900 text-white font-bold py-2 px-2 rounded ">
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
