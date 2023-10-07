/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";

import AuthContext from "../../context/auth/authContext";
/* eslint-disable jsx-a11y/heading-has-content */

const FoodsMenu = ({ category }) => {
  const [foods, setFoods] = useState([]);

  const authContext = useContext(AuthContext);
  const { userCurrentTable, isLoggedIn, userToken, role } = authContext;
  const isGuest = role.includes("Guest");
  const isManager = role.includes("Manager");
  const isAdmin = role[0] === "Admin";

  const [foodOrder, setFoodOrder] = useState({
    Id: "",
    tableId: "",
  });
 
  useEffect(() => {

    if (category) {
      axios
        .get("https://localhost:44307/api/items/" + category, {
          withCredentials: true,
        })
        .then((response) => setFoods(response.data))
        .catch((error) => console.log(error));
      return;
    }
    else {
      axios
        .get("https://localhost:44307/api/items/MainDishes", {
          withCredentials: true,
        })
        .then((response) => setFoods(response.data))
        .catch((error) => console.log(error));
    }

  }, [category]);

  useEffect(() => {
    if (foodOrder.Id !== "") {
      axios
        .post("https://localhost:44307/api/carts/addtocart", foodOrder, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Added to cart !!!");
          } else {
            toast.error("Some thing wrong !!!");
          }
        })
        .catch((error) => {
          toast.error("Some thing wrong !!!");
        });
    }
  }, [foodOrder]);

  const handleOrder = async (foodId) => {
    setFoodOrder({ ...foodOrder, Id: foodId, tableId: userCurrentTable });
  };

  return (
    <div>
      {isAdmin &&(
        
        <Button className="flex  py-3 px-5  text-black font-bold bg-amber-300 hover:bg-amber-400"> Add a new item </Button>
      )}

      <div className=" grid grid-cols-1 gap-1 mt-8 xl:mt-12 xl:gap-2 sm:grid-cols-2 xl:grid-cols-5 lg:grid-cols-3">

        {foods.map((food) => (
          <div key={food.id} className="w-64 ">
            <div>
              <h2 className="text-white text-left font-semibold	">
                {food.name}
              </h2>
              <h2 className="text-white text-left font-medium	">
                Price: {food.cost}$
              </h2>
              {isGuest && !isManager  && !isAdmin && (
                <button
                  className="bg-amber-300 hover:bg-amber-400 text-black font-bold py-2 px-3 rounded flex mb-2"
                  onClick={() => handleOrder(food.id)}
                >
                  Order
                </button>
              )}
            </div>
            <div className="w-4/5 h-48 rounded-lg ">
              <img
                src={food.imageUrl}
                alt={food.name}
                style={{ width: "100%", height: "100%" }}

              />
            </div>
          </div>
        ))}
        <div className="h-screen">

        </div>

      </div>
    </div>
  );
};

export default FoodsMenu;
