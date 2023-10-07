import React, { useState } from "react";
import { toast } from "react-toastify";
const Booking = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [table, setTable] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");


  const [booking, setBooking] = useState({
    firstName: "",
    lastName: "",
    table:"",
    date:"",
    time:"",
  });

  const BookingButtonHandler = () => {

    if (!booking.firstName) {
      toast.error("Please enter your first name");
      return;
    }
    if (!booking.lastName) {
      toast.error("Please enter your last name");
      return;
    }
    if (!booking.table) {
      toast.error("Please choose your table");
      return;
    }

    if (!booking.date) {
      toast.error("Please choose your date");
      return;
    }
    if (!booking.time) {
      toast.error("Please choose your time");
      return;
    }
    console.log(booking);
  };



  return (
    <div className ='h-screen' >
      <h1 className="w-48 h-2 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700 mt-3"></h1>
      <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
      <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 dark:bg-gray-700"></p>
      <div className="flex justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <div onSubmit={BookingButtonHandler}>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-white">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="fName"
                    placeholder="First Name"
                    defaultValue={booking.firstName}              
                    onChange={(e) => setBooking({ ...booking, firstName: e.target.value })}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-white">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lName"
                    defaultValue={booking.lastName}              
                    onChange={(e) => setBooking({ ...booking, lastName: e.target.value })}
                    placeholder="Last Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an option
              </label>
              <select
                defaultValue={booking.table}              
                onChange={(e) => setBooking({ ...booking, table: e.target.value })}
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option  value={booking.table}>Choose a table</option>
                <option value="Table 1">Table 1</option>
                <option value="Table 2">Table 2</option>
                <option value="Table 3">Table 3</option>
                <option value="Table 4">Table 4</option>
                <option value="Table 5">Table 5</option>
              </select>
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-white">
                    Date
                  </label>
                  <input
                    defaultValue={booking.date}              
                    onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                    type="date"
                    id="date"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="time"
                    className="mb-3 block text-base font-medium text-white"
                  >
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    defaultValue={booking.time}              
                    onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={BookingButtonHandler}
                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
