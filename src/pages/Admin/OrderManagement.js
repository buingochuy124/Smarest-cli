import React from 'react'
import React, { useEffect } from 'react'
import OrderContext from '../../context/order/orderContext';
import { useContext } from 'react';
import { useState } from 'react';



const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const orderContext = useContext(OrderContext);
    const { AdminGetOrders } = orderContext;
    
    const getOrders = async () => {
      try {
        const ordersData = await AdminGetOrders();
        if (Array.isArray(ordersData.data)) {
          setOrders(ordersData.data);
        } else {
          console.error("AdminGetOrders did not return an array.");
        }    
      
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    useEffect(() => { 
      getOrders();
    }, []);
    console.log(orders);
  
    return (
      !orders.length === 0  ? (<div className="h-screen text-white">loading</div> ):(
      <div className="h-auto max-w-5xl -mt-1 mx-auto  text-white">
        
        <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      NO.
                    </th>
                    <th scope="col" className="px-6 py-3">
                      UserName
                    </th>
  
                    <th scope="col" className="px-6 py-3">
                      Total Price 
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order,index) => (
                    <tr
                      key={order.id}
                      className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td
                        className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 "
                                         
                      >{index+1}</td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        {order.userName}
                      </td>
                      <td className="px-5 py-4 font-medium dark:text-white">{order.total} $</td>
                      <td className="px-5 py-4 font-medium dark:text-white">{new Date(order.date).getDate()}/{new Date(order.date).getMonth()+1}/{new Date(order.date).getFullYear()}</td>
                   
                      <td className="px-5 py-4"></td>
                    </tr>
                  ))}
  
                  
                </tbody>
              </table>
            </div>
          </div>
      )
    );
  };

export default OrderManagement