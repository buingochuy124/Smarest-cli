import React from 'react'
import { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';



const Transaction = () => {
    const [orders, setOrders] = useState([]);

    const authContext = useContext(AuthContext);
    const { userToken } = authContext;

    useEffect(() => {
        axios
            .get("https://localhost:44307/api/orders/AdminGetOrders", {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => setOrders(response.data))
            .catch((error) => console.log(error));
    }, []);



    return (
        <div className="h-screen text-white">
        <div className="overflow-x-auto w-full">
            <table className="w-4/5 text-left text-sm font-light bg-slate-800 rounded-md ml-28 mt-6 ">
                <thead>
                    <tr>
                        <th className="px-6 py-4 font-semibold">Email</th>
                        <td className="px-6 py-4 font-semibold">Total price</td>
                        <td className="px-6 py-4 font-semibold">Order Date</td>
                        <td className="px-6 py-4 font-semibold"></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((user, k) => {
                            return (
                                <tr key={k}>
                                    <td className="px-6 py-4 font-semibold">
                                        <div className="flex items-center space-x-3">

                                            <div>
                                                <div className="font-bold">{user.userName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold" >{user.total}</td>
                                    <td className="px-6 py-4 font-semibold">
                                        {new Date(user.createdDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit'
                                        })}
                                    </td>
                                    <td className="px-6 py-4 font-semibold">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                            Detail
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>

    </div>
    )
}

export default Transaction