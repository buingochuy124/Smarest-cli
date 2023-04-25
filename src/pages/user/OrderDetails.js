import React, { useContext, useEffect } from "react";
import OrderContext from "../../context/order/orderContext";

const OrderDetails = () => {
  const orderContext = useContext(OrderContext);
  const { orderDetails, OrderDetailList } = orderContext;
  useEffect(() => {
    OrderDetailList(window.location.pathname.substring(14));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return orderDetails ? (
    <div className="h-screen max-w-2xl mx-auto">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="p-4">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Cost
                  </th>
                  <th scope="col" className="px-6 py-3">
                    quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((i, index) => (
                  <tr
                    key={i.id}
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {i.item.name}
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      $ {i.item.cost}
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {i.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-screen text-white">Loading</div>
  );
};

export default OrderDetails;
