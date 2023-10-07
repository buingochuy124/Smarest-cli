import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const CategoryMenu = ({onChooseCategory}) => {

  const [categories, setCategories] = useState([]);

  const chooseCategory = (categoryId) => {
      onChooseCategory(categoryId);
  }

  useEffect(() => {
    axios
      .get(" https://localhost:44307/api/categories", {
        withCredentials: true,
      })
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error));
  }, []);


  return (
    <div className='text-white text-left dark:bg-gray-800 rounded-lg -ml-20'>

      <ul className="w-60 h-screen">
        <li  className="w-full rounded-lg p-4 text-primary-600  font-semibold	">
          Category
        </li>

        {categories.map((category) => (

          <button onClick={() => chooseCategory(category.id)} key={category.id} className="w-full p-4  font-semibold	 text-white text-left hover:dark:bg-gray-700">{category.name}</button>

        ))}
      </ul>
    </div>
  )
}

export default CategoryMenu