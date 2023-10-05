import React, { useContext, useEffect } from 'react';
import DashboardStats from '../../containers/DashboardStats';
import DashboardTopBar from '../../containers/DashboardTopBar';
import BarChart from '../../component/dashboard/BarChart';
import LineChart from '../../component/dashboard/LineChart';
import UserChannels from '../../component/dashboard/UserChannels';
import DoughnutChart from '../../component/dashboard/DoughnutChart';
import StatisticContext from '../../context/statistic/statisticContext';
import { useState } from 'react';





const AdminPanel = () => {


  const [apiResponse, setApiResponse] = useState({
    totalSales: 123.45,
    userCount: 107,
    ordersCount: 26
  });
  const [lineData, setLineData] = useState([600, 400, 900]);



  const [statsData, setStatsData] = useState([
    { title: 'Users', value: '34.7k', description: '↗︎ 2300 (22%)' },
    { title: 'Total Sales', value: '34,545', description: 'Current month' },
    { title: 'Orders', value: '450', description: '1 in hot leads' },
  ]);
  

  const statisticContext = useContext(StatisticContext);
  const { getOrdersInRange ,getDashBoardLineData} = statisticContext;

  useEffect(() => {



  }, []);


  const updateDashboardPeriod = async (newRange) => {

    const newData = await getOrdersInRange(newRange);
    setApiResponse(newData);
    const updatedStatsData = [...statsData]; // Create a copy of the statsData array
    updatedStatsData[0].value = apiResponse.userCount.toLocaleString();
    updatedStatsData[1].value = `$${apiResponse.totalSales.toFixed(2)}`;
    updatedStatsData[2].value = apiResponse.ordersCount.toLocaleString();
    setStatsData(updatedStatsData); 

    const lineDataApiResponse = await getDashBoardLineData();
    setLineData(lineDataApiResponse);
  };


  return (
    <div className="h-auto -mt-1" style={{ backgroundColor: '#242933' }}>
      <div className="drawer drawer-mobile">

        <br />
        <br />
        <br />
        {/** ---------------------- Select Period Content ------------------------- */}

        <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod} />


        {/** ---------------------- Different stats content 1 ------------------------- */}

        <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-1 ">
          {statsData.map((d, k) => {
            return <DashboardStats key={k} {...d} colorIndex={k} />;
          })}
        </div>

        {/** ---------------------- Different charts ------------------------- */}

        <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-9  m-12 text-white" style={{ backgroundColor: "#2A303C" }}>
          <LineChart lineData={lineData} />
          <BarChart />
        </div>
        {/** ---------------------- Different stats content 2 ------------------------- */}

        {/* <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6  m-12 text-white" style={{backgroundColor:"#2A303C"}}>
          <AmountStats />
          <PageStats />
        </div> */}
      </div>

      {/** ---------------------- User source channels table  ------------------------- */}

      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6   m-12 text-white" style={{ backgroundColor: "#2A303C" }}>
        <UserChannels />
        <DoughnutChart />
      </div>
    </div>
  );
};

export default AdminPanel;
