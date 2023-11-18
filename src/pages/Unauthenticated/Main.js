/* eslint-disable jsx-a11y/heading-has-content */
import React, { useState } from "react";
import FoodsMenu from "../../component/menu/FoodsMenu";
import CategoryMenu from "../../component/menu/CategoryMenu";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";


const Main = () => {
  const [category,setCategory] = useState();

  
  const onChooseCategory = (categoryId) => {
    

    if(categoryId == 101){
      setCategory('MainDishes');

    }
    else if(categoryId == 102) {
      setCategory('Drink');

    }
    else if(categoryId == 103) {
      setCategory('Other');
    }
    else{
      toast.error("Some thing wrong !!!");
    }
  }



  return (
    <section className="bg-white dark:bg-gray-900 h-max">
      <div className="container px-6 py-10 mx-auto animate-pulse ">


        <h1 className="w-48 h-2 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700"></h1>

        <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
        <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 dark:bg-gray-700"></p>
        <div className="flex gap-20">

          <div className="w-44">
            <CategoryMenu onChooseCategory={onChooseCategory} />
          </div>
          <div className=" flex-grow">
            <FoodsMenu category={category} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
