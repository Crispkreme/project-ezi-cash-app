import AdminLayout from "../../layout/AdminLayout";
import ezcashCustomer from '../../assets/ezcash-customers.png';
import commission from '../../assets/commission.png';
import Button from "../../components/Button";

export default function ManagementDashboard() {

  const activities = [
    {name: 'Aishli Store', role: 'Store', transactions: 942, revenue: 15800, avgVal: 16.60},
    {name: 'Nicole Ayessa Alcover', role: 'Individual', transactions: 500, revenue: 10245, avgVal: 20.49},
    {name: 'Aishli Store', role: 'Store', transactions: 942, revenue: 15800, avgVal: 16.60},
  ]
  return (
    <AdminLayout>
      <div className="w-full p-8 flex flex-col justify-center gap-8 items-center h-full overflow-y-scroll text-primary">
        <div className="flex w-full flex-wrap gap-4">
          <div className="w-full">
            <div className="flex self-center flex-col gap-4 border border-gray-400 max-w-max p-4 px-8 pb-8 rounded-2xl shadow-xl">
              <span className="text-xl roboto-bold">Total eZiCash Partners</span>
              <div className="flex gap-8">
                <div className="flex flex-col items-center">
                  <h1 className="flex mb-4 shadow-xl border border-gray-200 px-4 py-2 rounded-2xl text-4xl items-center gap-4 roboto-bold">
                    <img src={ezcashCustomer} alt="" />
                    969
                  </h1>
                  <span className="roboto-medium text-sm">Active</span>
                </div>

                <div className="flex flex-col items-center">
                  <h1 className="flex mb-4 shadow-xl border border-gray-200 px-4 py-2 rounded-2xl text-4xl items-center gap-4 roboto-bold">
                    <img src={ezcashCustomer} alt="" />
                    969
                  </h1>
                  <span className="roboto-medium text-sm">Inactive</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex self-center flex-col items-center gap-4 border border-gray-400 max-w-max p-4 px-8 rounded-2xl shadow-xl">
            <span className="text-sm roboto-bold">Number of Pending Applications</span>
            <div className="flex">
              <div className="flex flex-col items-center">
                <h1 className="flex px-4 py-2 rounded-2xl text-4xl items-center gap-4 roboto-bold">
                  <img src={ezcashCustomer} alt="" />
                  30
                </h1>
              </div>
            </div>
          </div>

          <div className="flex self-center flex-col items-center gap-4 border border-gray-400 max-w-max p-4 px-8 rounded-2xl shadow-xl">
            <span className="text-sm roboto-bold">Number of Recently Added eZiCash Partner</span>
            <div className="flex">
              <div className="flex flex-col items-center">
                <h1 className="flex px-4 py-2 rounded-2xl text-4xl items-center gap-4 roboto-bold">
                  <img src={ezcashCustomer} alt="" />
                  10
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col border p-8 gap-4 border-gray-200 w-full h-full shadow-lg">
          <div className="flex justify-between">
            <span className="text-xl roboto-medium">Top Performing eZiCash Partner</span>
            <Button text="See All" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="px-16 grid grid-cols-5 w-full text-gray-500 justify-between">
              <span className="text-sm roboto-regular">Name</span>
              <span className="text-sm roboto-regular">Role</span>
              <span className="text-sm roboto-regular">Total Transactions</span>
              <span className="text-sm roboto-regular">Revenue</span>
              <span className="text-sm roboto-regular">Average Transaction Value</span>
            </div>
            {
              activities.map((a, idx) => {
                return (
                  <div key={idx} className="px-16 shadow-lg py-4 grid grid-cols-5 w-full border border-gray-200 justify-between">
                    <span className="text-lg roboto-medium">{a.name}</span>
                    <span className="text-lg roboto-medium">{a.role}</span>
                    <span className="text-lg roboto-medium">{a.transactions.toLocaleString()}</span>
                    <span className="text-lg roboto-medium">{a.revenue.toLocaleString()}</span>
                    <span className="text-lg roboto-medium">{a.avgVal.toFixed(2)}%</span>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}