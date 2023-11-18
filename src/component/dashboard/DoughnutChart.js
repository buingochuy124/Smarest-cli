import {
  Chart as ChartJS,
  Filler,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import TitleCard from '../Cards/TitleCard';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/auth/authContext';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend,
  Tooltip,
  Filler,
  Legend);

function DoughnutChart({ dateValue }) {
  const authContext = useContext(AuthContext);
  const { userCurrentTable, isLoggedIn, userToken, role } = authContext;
  const [dataSet, setDataSet] = useState([]);


  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      const color = `rgba(${r}, ${g}, ${b}, 0.8)`;
      colors.push(color);
    }
    return colors;
  };
  
  const colors = generateColors(dataSet.length);
  const itemNames = dataSet.map((item) => item.itemName);
  const totalQuantities = dataSet.map((item) => item.quantity);



  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const labels = ['Fried rice', 'Turkey and ham pie', 'Santa Maria Grilled Tri-Tip Beef', 'Crispy pork', 'Steak with chips'];

  const data = {
    labels : itemNames,
    datasets: [
      {
        label: 'Quantity of Orders',
        data: totalQuantities,
        backgroundColor: colors,
        borderColor: colors.map((color) => color.replace('0.8', '1')),
        borderWidth: 1,
      }
    ],
  };



  useEffect(() => {
    axios
      .post("https://localhost:44307/api/statistic/DashBoardDoughnutData", dateValue, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setDataSet(response.data); 
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dateValue, userToken]);



  return (
    <TitleCard title={"Main Dishes"} >
      <Doughnut className='m-16' options={options} data={data} />
    </TitleCard>
  )
}


export default DoughnutChart