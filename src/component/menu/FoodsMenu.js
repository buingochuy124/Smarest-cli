/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
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
      .get("http://103.179.189.219/api/items/foods", {
        withCredentials: true,
      })
      .then((response) => setFoods(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    //userRole();
    if (foodOrder.Id !== "") {
      axios
        .post("http://103.179.189.219/api/carts/addtocart", foodOrder, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Added to cart !!!");
          } else {
            toast.error("Some thing wrong2 !!!");
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
