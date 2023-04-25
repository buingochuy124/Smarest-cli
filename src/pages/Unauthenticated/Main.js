/* eslint-disable jsx-a11y/heading-has-content */
import React from "react";
import FoodsMenu from "../../component/menu/FoodsMenu";

const Main = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto animate-pulse">
        <h1 className="w-48 h-2 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700"></h1>

        <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
        <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 dark:bg-gray-700"></p>

        <FoodsMenu />
      </div>
    </section>
  );
};

export default Main;
