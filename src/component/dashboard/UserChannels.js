import TitleCard from "../Cards/TitleCard"
import { useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../context/auth/authContext';
import { useContext } from 'react';



function UserChannels({ dateValue }){
    const authContext = useContext(AuthContext);
    const { userToken } = authContext;

    const [userSourceData,setUserSourceData] = useState([
        {email : "buingochuy1@gmail.com", totalAmount : "26,345 $", orderedQuantity : 10},
        {email : "buingochuy2@gmail.com", totalAmount : "21,341 $", orderedQuantity : 11},
        {email : "buingochuy3@gmail.com", totalAmount : "34,379 $", orderedQuantity : 12},
        {email : "buingochuy4@gmail.com", totalAmount : "12,359 $", orderedQuantity : 20},
        {email : "buingochuy5@gmail.com", totalAmount : "10,345 $", orderedQuantity : 10},
    ]);
    useEffect(() => {
        axios
          .post("https://localhost:44307/api/statistic/DashBoardUserData", dateValue, {
            headers: {
              Authorization: `Bearer ${userToken}`,
              'Content-Type': 'application/json',
            },
          })
          .then((response) => {
           setUserSourceData(response.data); 

          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, [dateValue, userToken]);



    
    return(
        <TitleCard title={"Top 5 orders user"}>
             {/** Table Data */}
             <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th className="normal-case text-left">No.</th>
                        <th className="normal-case text-left">Email</th>
                        <th className="normal-case text-left">Total Amount</th>
                        <th className="normal-case text-left">Ordered quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            userSourceData.map((u, k) => {
                                return(
                                    <tr className="normal-case" key={k}>
                                        <th className="normal-case text-left">{k+1}</th>
                                        <td className="normal-case text-left">{u.email}</td>
                                        <td className="normal-case text-left">{u.totalAmount}</td>
                                        <td className="normal-case text-left">{`${u.orderedQuantity}`}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </TitleCard>
    )
}

export default UserChannels