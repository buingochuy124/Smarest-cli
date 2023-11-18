import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import TitleCard from '../Cards/TitleCard';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import AuthContext from '../../context/auth/authContext';
import { useContext } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);


function LineChart({ dateValue }) {
  const [lineData, setLineData] = useState([]);
  const authContext = useContext(AuthContext);
  const { userCurrentTable, isLoggedIn, userToken, role } = authContext;

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
      .post("https://localhost:44307/api/statistic/DashBoardLineData", dateValue, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json', 
        },
      })
      .then((response) => setLineData(response.data));

  }, [dateValue]);

  const labels = ['September', 'October', 'November'];
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Total orders ',
        data: lineData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };


  return (
    <TitleCard title={"Montly"}>
      <Line options={options} data={data} />
    </TitleCard>
  )
}
export default LineChart