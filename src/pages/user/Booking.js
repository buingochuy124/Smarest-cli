import React, { useState } from "react";
import { toast } from "react-toastify";
const Booking = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [table, setTable] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const BookingButtonHandler = () => {
    if (!firstName) {
      toast.error("Please enter your first name");
      return;
    }
    if (!lastName) {
      toast.error("Please enter your last name");
      return;
    }
    if (!table) {
      toast.error("Please choose your table");
      return;
    }

    if (!date) {
      toast.error("Please choose your date");
      return;
    }
    if (!time) {
      toast.error("Please choose your time");
      return;
    }
    toast.promise(
      new Promise((resolve) => setTimeout(() => resolve(1), 2000)),
      {
        pending: "Check Out is pending",
        success: "Checked Out",
        error: "error",
      }
    );
  };
  return (
    <div class="flex justify-center p-12 h-screen">
      <div class="mx-auto w-full max-w-[550px]">
        <div onSubmit={BookingButtonHandler}>
          <div class="-mx-3 flex flex-wrap">
            <div class="w-full px-3 sm:w-1/2">
              <div class="mb-5">
                <label class="mb-3 block text-base font-medium text-white">
                  First Name
                </label>
                <input
                  type="text"
                  id="fName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div class="w-full px-3 sm:w-1/2">
              <div class="mb-5">
                <label class="mb-3 block text-base font-medium text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <div class="mb-5">
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select an option
            </label>
            <select
              value={table}
              onChange={(e) => setTable(e.target.value)}
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose a table</option>
              <option value="Table 1">Table 1</option>
              <option value="Table 2">Table 2</option>
              <option value="Table 31">Table 3</option>
              <option value="Table 41">Table 4</option>
              <option value="Table 5">Table 5</option>
            </select>
          </div>

          <div class="-mx-3 flex flex-wrap">
            <div class="w-full px-3 sm:w-1/2">
              <div class="mb-5">
                <label class="mb-3 block text-base font-medium text-white">
                  Date
                </label>
                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  id="date"
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div class="w-full px-3 sm:w-1/2">
              <div class="mb-5">
                <label
                  for="time"
                  class="mb-3 block text-base font-medium text-white"
                >
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={BookingButtonHandler}
              class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
