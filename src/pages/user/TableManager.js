import { QRCodeCanvas } from "qrcode.react";
import React, { useContext, useEffect } from "react";
import TableContext from "../../context/table/tableContext";

const TableManager = () => {
  const tableContext = useContext(TableContext);
  const url = "http://localhost:3000/table/";
  const { listTable, tablesData, refreshTokenIfNeeded } = tableContext;
  // const [tables, setTables] = useState({
  //   id: "",
  //   name: "",
  // });

  useEffect(() => {
    refreshTokenIfNeeded();
    listTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl text-white font-semibold leading-tight">
            Table Manager
          </h2>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Table Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Table QR Code
                  </th>
                </tr>
              </thead>
              <tbody>
                {tablesData.map((item) => (
                  <tr key={item.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p
                            className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap"
                            style={{ textAlign: "center" }}
                          >
                            {item.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
                      <div className="flex items-center">
                        <div className="ml-3">
                          {item.isAvailable ? (
                            <p
                              className="px-5 py-4 font-medium text-rose-500 whitespace-nowrap"
                              style={{ textAlign: "center" }}
                            >
                              Occupied
                            </p>
                          ) : (
                            <p
                              className="px-5 py-4 font-medium text-emerald-600   whitespace-nowrap"
                              style={{ textAlign: "center" }}
                            >
                              Available
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className=" border-b border-gray-200 bg-white text-sm ">
                      <div
                        className="ml-10 items-center"
                        style={{ display: "inline-flex" }}
                      >
                        <div className="flex-shrink-0  h-10 hidden sm:table-cell ">
                          <QRCodeCanvas
                            className="m-10"
                            value={url + item.id}
                          />
                          ,
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableManager;
