import TitleCard from "../Cards/TitleCard"

const userSourceData = [
    {email : "buingochuy1@gmail.com", totalAmount : "26,345 $", orderedQuantity : 10},
    {email : "buingochuy2@gmail.com", totalAmount : "21,341 $", orderedQuantity : 11},
    {email : "buingochuy3@gmail.com", totalAmount : "34,379 $", orderedQuantity : 12},
    {email : "buingochuy4@gmail.com", totalAmount : "12,359 $", orderedQuantity : 20},
    {email : "buingochuy5@gmail.com", totalAmount : "10,345 $", orderedQuantity : 10},
]

function UserChannels(){
    return(
        <TitleCard title={"Top 10 orders user"}>
             {/** Table Data */}
             <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th className="normal-case">Email</th>
                        <th className="normal-case">Total Amount</th>
                        <th className="normal-case">Ordered quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            userSourceData.map((u, k) => {
                                return(
                                    <tr key={k}>
                                        <th>{k+1}</th>
                                        <td>{u.email}</td>
                                        <td>{u.totalAmount}</td>
                                        <td>{`${u.orderedQuantity}`}</td>
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