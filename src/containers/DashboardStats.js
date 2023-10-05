function DashboardStats({title, value, description, colorIndex}){

    const COLORS = ["primary", "primary"]

    const getDescStyle = () => {
        if(description.includes("↗︎"))return "font-bold text-green-700 dark:text-green-300"
        else if(description.includes("↙"))return "font-bold text-rose-500 dark:text-red-400"
        else return "font-bold text-white "
    }
    
    return(
        <div className=" ml-12 mr-12 stats shadow rounded-xl" style={{backgroundColor:"#2A303C"}}>
            <div className="stat mt-2 mb-2 ml-10 text-left	">
                <div className="stat-title dark:text-slate-300" style={{color:"#CBD5E1"}}>{title}</div>
                <div className={`stat-value font-bold dark:text-slate-300 text-5xl text-${COLORS[colorIndex%2]}`}>{value}</div>
                <div className={"stat-desc  " + getDescStyle()} >{description}</div>
            </div>
        </div>
    )
}

export default DashboardStats