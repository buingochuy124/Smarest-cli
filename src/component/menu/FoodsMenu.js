/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/authContext";
/* eslint-disable jsx-a11y/heading-has-content */

const FoodsMenu = () => {
  const [foods, setFoods] = useState([]);

  const authContext = useContext(AuthContext);
  const { userCurrentTable, isLoggedIn, userToken } = authContext;

  const [foodOrder, setFoodOrder] = useState({
    Id: "",
    tableId: "",
  });

  useEffect(() => {
    axios
      .get("https://localhost:44307/api/items/foods", {
        withCredentials: true,
      })
      .then((response) => setFoods(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    console.log(foodOrder.Id);
    if (foodOrder.Id !== "") {
      console.log(foodOrder.Id);
      axios
        .post("https://localhost:44307/api/carts/addtocart", foodOrder, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [foodOrder]);

  const handleOrder = async (foodId) => {
    setFoodOrder({ ...foodOrder, Id: foodId, tableId: userCurrentTable });
    console.log(foodOrder.Id);
  };

  return (
    <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
      {foods.map((food) => (
        <div key={food.id} className="w-full ">
          <div>
            <h2 className="text-white">
              {food.name}: {food.cost}$
            </h2>
            {isLoggedIn && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleOrder(food.id)}
              >
                Order
              </button>
            )}
          </div>
          <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600">
            <img
              src={food.imageUrl}
              alt={food.name}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodsMenu;
