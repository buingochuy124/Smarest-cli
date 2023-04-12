/* eslint-disable jsx-a11y/alt-text */
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import OrderContext from "../../context/order/orderContext";

const CheckOut = () => {
  const CLIENT_ID =
    "AQbgalQpKrywEM6fuU_VlZd9I2iT3CZ_qCeXrsmt8Rngi4MF1ozAnQm8jWHkShIaN_Nt0Fi_bEtvmUpf";
  const CURRENCY = "USD";

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: (totalHandle() / 10) * 11,
            currency_code: CURRENCY,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture();
  };

  const authContext = useContext(AuthContext);
  const { userToken } = authContext;
  const [cartItems, setCartItems] = useState([]);
  const orderContext = useContext(OrderContext);
  const { checkOut } = orderContext;

  const paypalClick = () => {
    checkOut();
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

  const userEmail = () => {
    let userEmail = "";
    cartItems.forEach((element) => {
      userEmail = element.user.email;
    });
    return userEmail;
  };

  const totalHandle = () => {
    let totalEach = 0;
    cartItems.forEach((element) => {
      totalEach += element.cost * element.itemQuantity;
    });

    return totalEach;
  };
  return (
    <div className="h-screen">
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium text-white">Order Summary</p>
          <p className="text-gray-400">Check your items.</p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {cartItems.map((item) => (
              <div
                className="flex flex-col rounded-lg bg-white sm:flex-row"
                key={item.id}
              >
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={item.itemImageUrl}
                />
                <div className="flex w-full flex-col px-4 py-4 text-start">
                  <span className="font-semibold w-full">{item.itemName}</span>
                  <span className="float-right text-gray-400">
                    Quantity: {item.itemQuantity}
                  </span>
                  <span className="float-right text-gray-400">
                    Each cost: $ {item.cost}
                  </span>
                </div>
                <div className="flex w-full flex-col px-4 py-4">
                  <p className="text-lg font-bold">
                    $ {item.cost * item.itemQuantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-9 bg-gray-50 px-4 pt-8 lg:mt-0 rounded-lg	">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="text-left ">
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email: {userEmail()}
            </label>
          </div>

          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Subtotal</p>
              <p className="font-semibold text-gray-900">$ {totalHandle()}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">VAT</p>
              <p className="font-semibold text-gray-900">
                ${totalHandle() / 10}
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">
              ${(totalHandle() / 10) * 11} (Included VAT tax)
            </p>
          </div>
          <br></br>
          <PayPalButtons
            onClick={paypalClick}
            createOrder={createOrder}
            onApprove={onApprove}
            options={{
              clientId: CLIENT_ID,
              currency: CURRENCY,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
