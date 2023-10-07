/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";

import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/authContext";

const Cart = () => {
  const authContext = useContext(AuthContext);
  const { userToken } = authContext;
  const [cartItems, setCartItems] = useState([]);

  const totalHandle = () => {
    let totalEach = 0;
    cartItems.forEach((element) => {
      totalEach += element.cost * element.itemQuantity;
    });

    return totalEach;
  };
  const CheckOutButtonHandle = () => {
    window.location.href = "/checkout";
  };

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

  return (
    <div className="h-screen max-w-screen-2xl mx-auto">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="p-4">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3">
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {item.itemName}
                    </th>
                    <td className="px-5 py-4">
                      <div>
                        <label htmlFor="Quantity" className="sr-only"> Quantity </label>
                        <div className="flex items-center gap-1">
                          {/* <button
                          type="button"
                          className="w-10 h-10 leading-10 text-white  transition hover:opacity-75"
                        >
                          &minus;
                        </button> */}
                          <input
                            type="number"
                            id="Quantity"
                            disabled
                            defaultValue={item.itemQuantity}
                            className="bg-slate-400 text-black h-10 w-16 rounded border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          {/* <button
                          type="button"
                          className="text-base w-10 h-10 leading-10 text-white  transition hover:opacity-75">
                          +
                        </button> */}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">$ {item.cost}</td>
                    <td className="px-5 py-4">
                      $ {item.cost * item.itemQuantity}
                    </td>
                    <td className="px-5 py-4"></td>

                  </tr>
                ))}

                <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-36 py-4 dark:text-white"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4 "> </td>
                  <td className="px-6 py-4 "> </td>
                  <td className="px-5 py-4 "></td>
                </tr>
                <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 dark:text-white font-medium">
                    {" "}
                    Total
                  </td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4  dark:text-white font-medium">
                    $ {totalHandle()}
                  </td>

                  <td className="px-6 py-4 font-medium dark:text-white">
                    <button
                      onClick={CheckOutButtonHandle}
                      className="bg-amber-300 hover:bg-amber-400 text-black font-bold py-3 px-5 rounded"
                    >
                      Check Out
                    </button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
