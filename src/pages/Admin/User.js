import React from 'react'
import { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const User = () => {
    const [users, setUsers] = useState([]);

    const authContext = useContext(AuthContext);
    const { userToken } = authContext;


    const UserOrdersListButtonHandle = (userId) => {
        window.location.replace("/profile/" + userId);
    }
    useEffect(() => {
        axios
            .get(" https://localhost:44307/api/Users", {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    "Content-Type": "application/json",
                },
            })
            .then(
                (response) => setUsers(response.data)
                // (response) => console.log(response.data)
                )
            .catch((error) => console.log(error));
    }, []);
    return (
        <div className="h-screen text-white">
            <div className="overflow-x-auto w-full">
                <table className="w-4/5 text-left text-sm font-light bg-slate-800 rounded-md ml-28 mt-6 ">
                    <thead>
                        <tr>
                            <th className="px-6 py-4 font-semibold">Email</th>
                            <th className="px-6 py-4 font-semibold">FirstName</th>
                            <td className="px-6 py-4 font-semibold">LastName</td>
                            <td className="px-6 py-4 font-semibold">CreatedDate</td>
                            <td className="px-6 py-4 font-semibold"></td>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, k) => {
                                return (
                                    <tr key={k}>
                                        <td className="px-6 py-4 font-semibold">
                                            <div className="flex items-center space-x-3">

                                                <div>
                                                    <div className="font-bold">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold">{user.firstName}</td>
                                        <td className="px-6 py-4 font-semibold">{user.lastName}</td>
                                        <td className="px-6 py-4 font-semibold">
                                            {new Date(user.createdDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 font-semibold">
                                            <button  onClick={() => UserOrdersListButtonHandle(user.id)}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                            Order history
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

export default User