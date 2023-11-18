import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TitleCard from '../Cards/TitleCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../context/auth/authContext';
import { useContext } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart({ dateValue }) {
  const authContext = useContext(AuthContext);
  const { userToken } = authContext;
  const [dataSet, setDataSet] = useState([]);
  const labels = [];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  useEffect(() => {
    axios
      .post("https://localhost:44307/api/statistic/DashBoardBarData", dateValue, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setDataSet(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dateValue, userToken]);

  const itemNames = dataSet.map((item) => item.itemName);
  const totalQuantities = dataSet.map((item) => item.totalQuantitySold);
  const colors = ['rgba(255, 99, 132, 1)', 'rgba(53, 162, 235, 1)', 'rgba(255,0,255,0.3)'];

  const data  = {
    labels: itemNames,
    datasets: [
      {
        label: "Total Quantity Sold",
        data: totalQuantities, 
        backgroundColor: colors, 
      },
    ],
  };

  return (
    <TitleCard title={"Best Seller"}>
      <Bar options={options} data={data} />
    </TitleCard>
  );
}

export default BarChart;
