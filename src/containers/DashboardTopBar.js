import React from 'react'
import { useState } from 'react';
import Datepicker from "react-tailwindcss-datepicker"; 
import { toast } from "react-toastify";




const DashboardTopBar = ({updateDashboardPeriod}) => {
    const [dateValue, setDateValue] = useState({ 
        StartDate: new Date(), 
        EndDate: new Date() 
    }); 
    const handleDatePickerValueChange = (newValue) => {

        setDateValue(newValue); 
        updateDashboardPeriod(newValue)
        toast.success(`Period updated to ${dateValue.StartDate} to ${dateValue.EndDate}`);

    } 

   
  return (
    <div className="grid grid-cols-1 sm:grid-cols-22 gap-4">
            <Datepicker 
                type="button"
                containerClassName="w-1/4 mb-12" 
                value={dateValue} 
                inputClassName="input input-bordered w-72  py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" 
                popoverDirection={"down"}
                toggleClassName="invisible"
                onChange={handleDatePickerValueChange} 
                class=""
                showShortcuts={true} 
                primaryColor={"white"} 
            /> 
            {/* <SelectBox 
                options={periodOptions}
                labelTitle="Period"
                placeholder="Select date range"
                containerStyle="w-72"
                labelStyle="hidden"
                defaultValue="TODAY"
                updateFormValue={updateSelectBoxValue}
            /> */}
            
        </div>
  )
}

export default DashboardTopBar