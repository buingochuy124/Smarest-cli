/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="max-w-2xl mx-auto">
        <footer className="p-4 rounded-lg shadow md:px-6 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="#"
              target="_blank"
              className="flex items-center mb-4 sm:mb-0"
            >
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Smarest
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 sm:mb-0">
              <li>
                <a
                  href="/booking"
                  className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
                >
                  Booking
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
                >
                  Licensing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:underline dark:text-gray-400"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            ©2023 developed by Huy Bui
          </span>
        </footer>
      </div>
    </footer>
  );
};

export default Footer;
