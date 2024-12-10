import AdminLayout from "../../layout/AdminLayout";
import ezcashCustomer from '../../assets/ezcash-customers.png';
import commission from '../../assets/commission.png';

export default function Dashboard() {

  const activities = [
    {activity: 'New User', date: new Date(), time: new Date(), info: 'Ayessa Nicole'},
    {activity: 'Partner Registration', date: new Date(), time: new Date(), info: 'Individual'},
    {activity: 'New User', date: new Date(), time: new Date(), info: 'Ayessa Nicole'},
    {activity: 'New User', date: new Date(), time: new Date(), info: 'Ayessa Nicole'},
  ]
  return (
    <AdminLayout>
      <div className="w-full p-8 flex flex-col justify-center gap-8 items-center h-full overflow-y-scroll text-primary">
        <div className="flex w-full gap-4">
          <section className="p-4 w-9/12 flex flex-wrap gap-4 shadow-lg border border-gray-200">

            <div className="flex self-center flex-col gap-4 border border-gray-400 max-w-max p-4 px-6 pb-8 rounded-2xl shadow-xl">
              <span className="text-sm roboto-medium">eZiCash Customers</span>
              <h1 className="flex text-4xl items-center gap-4 roboto-bold">
                <img src={ezcashCustomer} alt="" />
                1000
              </h1>
            </div>
            
            <div className="flex self-center flex-col gap-4 border border-gray-400 max-w-max p-4 px-8 pb-8 rounded-2xl shadow-xl">
              <span className="text-sm roboto-medium">eZiCash Partners</span>
              <h1 className="flex text-4xl items-center gap-4 roboto-bold">
                <img src={ezcashCustomer} alt="" />
                969
              </h1>
            </div>

            <div className="flex self-center flex-col gap-4 border border-gray-400 max-w-max p-4 px-8 pb-8 rounded-2xl shadow-xl">
              <span className="text-sm roboto-medium">Active eZiCash Users</span>
              <h1 className="flex text-4xl items-center gap-4 roboto-bold">
                <img src={ezcashCustomer} alt="" />
                1078
              </h1>
            </div>

            <div className="flex self-center items-center gap-4 border border-gray-400 max-w-max p-8 px-8 pb-8 rounded-2xl shadow-xl">
              <img src={commission} alt="" />
              <div>
                <h1 className="flex text-4xl items-center gap-4 roboto-bold leading-4">
                  10k
                </h1>
                <span className="text-primary text-xs leading-tight">Commission</span>
              </div>
            </div>

          </section>
          <section className="w-3/12 flex gap-8 p-8 h-full flex-col justify-center items-center shadow-lg border border-gray-200">
            <div className="flex flex-col">
              <span className="text-primary roboto-bold">Commission Fee Collected</span>
              <span>April 17, 2024</span>
            </div>
            <div className="py-4 px-4 border border-gray-400 rounded-2xl">
              <h1 className="roboto-bold text-4xl">₱5465.00</h1>
            </div>
          </section>
        </div>
        <div className="flex flex-col border p-8 gap-4 border-gray-200 w-full h-full shadow-lg">
          <div className="flex justify-between">
            <span className="text-xl roboto-medium">Recent Activities</span>
            <span className="px-4 py-2 border border-gray-200 shadow-lg text-sm rounded-full">See All</span>
          </div>
          <div className="flex flex-col gap-4">
            {
              activities.map((a, idx) => {
                return (
                  <div key={idx} className="px-16 shadow-lg py-8 grid grid-cols-3 w-full border border-gray-200 justify-between">
                    <span className="text-lg roboto-medium">{a.activity}</span>
                    <div className="flex flex-col tap-2 justify-center items-center">
                      <span>{a.date.toDateString()}</span>
                      <span>{a.time.toLocaleTimeString(undefined,{hour: '2-digit', minute: '2-digit'})}</span>
                    </div>
                    <span className="roboto-regular text-right text-primary">{a.info}</span>
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