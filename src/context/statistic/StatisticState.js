import React from 'react'
import StatisticContext from '../statistic/statisticContext'
import StatisticApi from '../../api/StatisticApi';


const StatisticState = (props) => {

    const statisticApi = new StatisticApi();


    const getOrdersInRange = async (newRange) => {
        const response = await statisticApi.dashboardStats(newRange);
        if (response.status === 200) {
            return response.data;
        }
    };


    const getDashBoardLineData= async () => {
        const response = await statisticApi.dashBoardLineData();
        if (response.status === 200) {
            return response.data;
        }
    };
    return (
        <StatisticContext.Provider
            value={{
                getOrdersInRange,
                getDashBoardLineData,
            }}
        >
            {props.children}
        </StatisticContext.Provider>
    )
}

export default StatisticState