import AdminLayout from "../../layout/AdminLayout";
import ezcashCustomer from '../../assets/ezcash-customers.png';
import Button from "../../components/Button";
import { useEffect, useState } from "react";

interface activitiesDt {
  name: string, 
  role: string, 
  transactions: number, 
  revenue: number, 
  avgVal: number
}
export default function ManagementDashboard() {

  const [users, setUsers] = useState({
    active: 0,
    inactive: 0,
    pending: 0,
    added: 0,
  });

  const [activities,setActivities] = useState<Array<activitiesDt>>([]);

  useEffect(() => {
    const getDt = async () => {
      const res = await fetch('/api/get-partners-dashboard');

      if(res.ok) {
        const body = await res.json();

        const partners = [...body.data.partners];

        let active = 0;
        let inactive = 0;
        let pending = 0;
        let added = 0;

        partners.forEach(p => {
          if(p.business_permit_verify === 0 && p.government_id_verify === 0 && p.proof_of_address_verify === 0) {
            pending += 1;
          }

          if(p.business_permit_verify === 1 && p.government_id_verify === 1 && p.proof_of_address_verify === 1) {
            const last_login = new Date(p.updated_at);
            const created = new Date(p.created_at);
            const curDate = new Date();
            const diffTime = Math.abs(curDate.getTime() - last_login.getTime());
            const diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            if(diffDay > 30) {
              inactive += 1;
            } else {
              active += 1;
            }

            const createdDiffTime = Math.abs(curDate.getTime() - created.getTime());
            const createdDiffDay = Math.floor(createdDiffTime / ( 1000 * 60 * 60 * 24));

            if(createdDiffDay < 30) {
              added += 1;
            }
          }
        });

        setUsers({
          active: active,
          inactive: inactive,
          pending: pending,
          added: added
        });

        // Transactions
        const transactions = [...body.data.transactions];
        const prtnr = transactions.map(t => t.partner_id);

        const unqPartner = [...new Set(prtnr)];
        const unqPartnerDetails = unqPartner.map( up => partners.filter(p => p.partner_application_id === up)[0]);

        const performers = unqPartnerDetails.map(p => {
          let count = 0;
          let revenue = 0;
          let total = 0;
          transactions.forEach( t => {
            if(t.partner_id === p.partner_application_id) {
              count+= 1;
              
              if(t.transaction_status === 'Complete') {
                revenue += t.amount;
              }

              total+= t.amount;
            }
          })
          
          return {...p, transactionCount: count, revenue: revenue, avg: (revenue / total) * 100}
        });


        const temp = performers.map(p => {
          return {name: p.legal_name, role: p.partner_type, transactions: p.transactionCount, revenue: p.revenue, avgVal: p.avg}
        });

        const filt = temp.filter(t => t.revenue > 100);

        const sorted = filt.sort((a,b) => {
          return Number(b.revenue) - Number(a.revenue);
        });

        setActivities(sorted);

      }
    }

    getDt();
  },[]);

  // const activities = [
  //   {name: 'Aishli Store', role: 'Store', transactions: 942, revenue: 15800, avgVal: 16.60},
  //   {name: 'Nicole Ayessa Alcover', role: 'Individual', transactions: 500, revenue: 10245, avgVal: 20.49},
  //   {name: 'Aishli Store', role: 'Store', transactions: 942, revenue: 15800, avgVal: 16.60},
  // ]
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
                    {users.active}
                  </h1>
                  <span className="roboto-medium text-sm">Active</span>
                </div>

                <div className="flex flex-col items-center">
                  <h1 className="flex mb-4 shadow-xl border border-gray-200 px-4 py-2 rounded-2xl text-4xl items-center gap-4 roboto-bold">
                    <img src={ezcashCustomer} alt="" />
                    {users.inactive}
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
                  {users.pending}
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
                  {users.added}
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