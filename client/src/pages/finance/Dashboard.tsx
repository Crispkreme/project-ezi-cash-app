import AdminLayout from "../../layout/AdminLayout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale,ArcElement, BarElement, Title, Tooltip, Legend);

const monthsLabel = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function FinanceDashboard() {

  const [finances, setFinances] = useState({
    commissions: 0
  });

  const [m, setM] = useState<Array<string>>([]);
  const [trans, setTrans] = useState<Array<number>>([]);

  useEffect(() => {
    const getDt = async () => {
      const res = await fetch("/api/get-finances");
      if(res.ok) {
        const body = await res.json();
        
        const tr = [...body.data.transactions];
        const months: Array<number> = [];

        let commMonth = 0;
        tr.forEach( trs => {
          
          if(new Date(trs.created_at).getMonth() === new Date().getMonth()) {
            commMonth += (trs.amount * .03) * .4
          }
          months.push(new Date(trs.created_at).getMonth());
        })
        const t = [...new Set(months.sort((a,b) => a - b))];
        const lbl = t.map(t => monthsLabel[t]);
        setM(lbl);

        let transactions:Array<number> = [];
        t.forEach(c => {
          let curMonth = 0;
          tr.forEach(p => {
            const z = new Date(p.created_at).getMonth();
            if(z === c) {
              curMonth+= 1;
            }
          });
          transactions.push(curMonth);
        });
        
        setTrans(transactions);

        setFinances({
          commissions: commMonth,
        })
      }
    }

    getDt();
  },[]);

  const interaction = {
    labels: m,
    datasets: [{
      label: 'Partners Interaction with Ezi Cash',
      data: trans,
      backgroundColor: [
        '#00c4cd',
        '#000',
      ],
    }]
  };

  return (
    <AdminLayout>
      <div className="w-full p-8 flex flex-col justify-center gap-8 items-center h-full overflow-y-scroll text-primary">
        <div className="flex w-full flex-wrap gap-4">
          <div className="w-full">
            <div className="flex self-center flex-col gap-4 border border-gray-400 max-w-max p-4 px-8 pb-8 rounded-2xl shadow-xl">
              <div className="flex justify-end">
                <button className="shadow-lg px-4 py-1 text-sm border border-gray-200 rounded-full">
                  May
                </button>
              </div>
              <div className="flex gap-8">
                <div className="flex gap-2 flex-col items-center shadow-xl border border-gray-200 px-8 py-4 rounded-2xl">
                  <span className="roboto-medium text-sm ">Total Revenue Generated</span>
                  <h1 className="flex text-4xl items-center gap-4 roboto-bold">
                   ₱ {finances.commissions.toLocaleString()}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="flex self-center flex-col items-center gap-4 border border-gray-400 max-w-max p-4 px-8 rounded-2xl shadow-xl">
            <div className="flex justify-between w-full">
              <span className="text-lg roboto-medium">
                Revenue
              </span>
              <button className="shadow-lg px-4 py-1 text-sm border border-gray-200 rounded-full">
                May
              </button>
            </div>
            <span className="text-sm roboto-bold">₱ {finances.commissions.toLocaleString()} Commission out of this month.</span>
            <div className="flex">
              <div className="flex">
                <div className="flex flex-col items-center">
                  <Bar data={interaction}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}