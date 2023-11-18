import React, { useContext, useEffect } from "react";
import OrderContext from "../../context/order/orderContext";

const UserOrdersProfile = () => {
    const orderContext = useContext(OrderContext);
    const { orders, UserOrdersList } = orderContext;
    const DetailButtonHandle = (orderId) => {
        window.location.replace("/orderdetails/" + orderId);
    };

    const GetUserId = () => {
        const currentURL = window.location.href;
        const parts = currentURL.split('/');
        const userId = parts[parts.length - 1];
        return userId;
    }
    useEffect(() => {

        UserOrdersList(GetUserId());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return orders ? (
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
                                        Total
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                            {index + 1}
                                        </td>
                                        <td className="px-5 py-4">$ {item.total}</td>
                                        <td className="px-5 py-4">{item.date}</td>
                                        <td>
                                            <button
                                                onClick={() => DetailButtonHandle(item.id)}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
                                            >
                                                Detail
                                            </button>
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

export default UserOrdersProfile;
