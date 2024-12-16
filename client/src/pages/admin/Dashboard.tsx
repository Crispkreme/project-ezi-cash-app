import AdminLayout from "../../layout/AdminLayout";
import ezcashCustomer from '../../assets/ezcash-customers.png';
import commission from '../../assets/commission.png';
import { useEffect, useState } from "react";

interface activitiesDt {
  activity: string, 
  date: Date, 
  time: Date, 
  info: string
}
export default function Dashboard() {
  const [data, setData] = useState({
    customers: 0,
    partners: 0,
    active: 0,
    commission: 0,
    collected: 0
  });

  const [activities, setActivities] = useState<Array<activitiesDt>>([]);
  useEffect(() => {
    const getDt = async () => {

      const [res1, res2, res3] = await Promise.all([
        await fetch("/api/get-customers"), 
        await fetch("/api/get-partners-dashboard"),
        await fetch("/api/get-users")]);
      if(res1.ok && res2.ok && res3.ok) {
        const body1 = await res1.json();
        const body2 = await res2.json();
        const body3 = await res3.json();
        
        const customers = [...body1.data];
        const dtPrtner = [...body2.data.partners];
        const transactions = [...body2.data.transactions];
        const users = [...body3.data];

        let active = 0;
        const partners = dtPrtner.filter(p => p.business_permit_verify === 1 && p.government_id_verify === 1 && p.proof_of_address_verify === 1);

        const newUsers:Array<activitiesDt> = [];
        users.forEach(p => {
          const last_login = new Date(p.updated_at);
            const curDate = new Date();
            const diffTime = Math.abs(curDate.getTime() - last_login.getTime());
            const diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            if(diffDay < 30) {
              active += 1;
            }

            if(diffDay < 5) {
              newUsers.push({activity: 'New User', date: new Date(p.created_at), time: new Date(p.created_at), info: p.first_name + ' ' + p.middle_name + ' ' + p.last_name})
            }
        });
        
        dtPrtner.forEach(p => {
            const created = new Date(p.created_at);
            const curDate = new Date();
            const diffTime = Math.abs(curDate.getTime() - created.getTime());
            const diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            if(diffDay < 5) {
              newUsers.push({activity: 'Partner Registration', date: new Date(p.created_at), time: new Date(p.created_at), info: p.legal_name})
            }
        })

        let commissions = 0;
        let collected = 0;
        transactions.forEach(t => {
          commissions += (t.amount * .03) * .4
          const curDate = new Date();
          if(curDate.getMonth() === new Date(t.created_at).getMonth()) {
            collected += (t.amount * .03) * .4;
          }
        });

        setData({
          customers: customers.length,
          partners: partners.length,
          active: active,
          commission: commissions,
          collected: collected
        });
        
        const sortedAct = newUsers.sort((a,b) => {

          return Number(b.date.getTime()) - Number(a.date.getTime());
        });
        setActivities([...newUsers]);
      }
    }

    getDt();
  },[]);
  // const activities = [
  //   {activity: 'New User', date: new Date(), time: new Date(), info: 'Ayessa Nicole'},
  //   {activity: 'Partner Registration', date: new Date(), time: new Date(), info: 'Individual'},
  //   {activity: 'New User', date: new Date(), time: new Date(), info: 'Ayessa Nicole'},
  //   {activity: 'New User', date: new Date(), time: new Date(), info: 'Ayessa Nicole'},
  // ]
  return (
    <AdminLayout>
      <div className="w-full p-8 flex flex-col justify-center gap-8 items-center h-full overflow-y-scroll text-primary">
        <div className="flex w-full gap-4">
          <section className="p-4 w-9/12 flex flex-wrap gap-4 shadow-lg border border-gray-200">

            <div className="flex self-center flex-col gap-4 border border-gray-400 max-w-max p-4 px-6 pb-8 rounded-2xl shadow-xl">
              <span className="text-sm roboto-medium">eZiCash Customers</span>
              <h1 className="flex text-4xl items-center gap-4 roboto-bold">
                <img src={ezcashCustomer} alt="" />
                {data.customers}
              </h1>
            </div>
            
            <div className="flex self-center flex-col gap-4 border border-gray-400 max-w-max p-4 px-8 pb-8 rounded-2xl shadow-xl">
              <span className="text-sm roboto-medium">eZiCash Partners</span>
              <h1 className="flex text-4xl items-center gap-4 roboto-bold">
                <img src={ezcashCustomer} alt="" />
                {data.partners}
              </h1>
            </div>

            <div className="flex self-center flex-col gap-4 border border-gray-400 max-w-max p-4 px-8 pb-8 rounded-2xl shadow-xl">
              <span className="text-sm roboto-medium">Active eZiCash Users</span>
              <h1 className="flex text-4xl items-center gap-4 roboto-bold">
                <img src={ezcashCustomer} alt="" />
                {data.active}
              </h1>
            </div>

            <div className="flex self-center items-center gap-4 border border-gray-400 max-w-max p-8 px-8 pb-8 rounded-2xl shadow-xl">
              <img src={commission} alt="" />
              <div>
                <h1 className="flex text-4xl items-center gap-4 roboto-bold leading-4">
                  {data.commission.toLocaleString()}
                </h1>
                <span className="text-primary text-xs">Commission</span>
              </div>
            </div>

          </section>
          <section className="w-3/12 flex gap-8 p-8 h-full flex-col justify-center items-center shadow-lg border border-gray-200">
            <div className="flex flex-col">
              <span className="text-primary roboto-bold">Commission Fee Collected</span>
              <span>{new Date().toDateString()}</span>
            </div>
            <div className="py-4 px-4 border border-gray-400 rounded-2xl">
              <h1 className="roboto-bold text-4xl">₱ {data.collected.toLocaleString()}</h1>
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