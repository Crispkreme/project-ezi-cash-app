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

export default function TransactionReports() {

  const [finances, setFinances] = useState({
    earnings: 0,
    commissions: 0
  });

  const [m, setM] = useState<Array<string>>([]);
  const [comM, setComM] = useState<Array<string>>([]);
  const [comPM, setComPM] = useState<Array<number>>([]);
  const [trans, setTrans] = useState<Array<number>>([]);
  const [cashin, setCashin] = useState<Array<number>>([]);
  const [cashout, setCashout] = useState<Array<number>>([]);

  useEffect(() => {
    const getDt = async () => {
      const res = await fetch("/api/get-finances");
      if(res.ok) {
        const body = await res.json();
        
        const dt = [...body.data.result];
        const tr = [...body.data.transactions];
        let comm = 0;
        let earnings = 0;
        let commMonth: Array<number> = [];
        dt.forEach(p => {
          comm += p.comission;
          earnings += p.earnings;
          commMonth.push(new Date(p.created_at).getMonth());
        });

        const sm = [...new Set(commMonth.sort((a,b) => a - b))];
        const commLbl = sm.map(t => monthsLabel[t]);
        setComM(commLbl);

        let commissionsPerMonth:Array<number> = [];

        sm.forEach(c => {
          let curMonth = 0;
          dt.forEach(p => {
            const z = new Date(p.created_at).getMonth();
            if(z === c) {
              curMonth+= p.comission;
            }
          });
          
          commissionsPerMonth.push(curMonth);
        });
        setComPM(commissionsPerMonth);

        const months: Array<number> = [];
        tr.forEach( trs => {
          months.push(new Date(trs.created_at).getMonth());
        })
        const t = [...new Set(months.sort((a,b) => a - b))];
        const lbl = t.map(t => monthsLabel[t]);
        setM(lbl);

        let transactions:Array<number> = [];
        let cashin:Array<number> = [];
        let cashout:Array<number> = [];
        t.forEach(c => {
          let curMonth = 0;
          let curCashin = 0;
          let curCashout = 0;
          tr.forEach(p => {
            const z = new Date(p.created_at).getMonth();
            if(z === c) {
              curMonth+= 1;

              if(p.service === 'Cash In') curCashin += 1;
              if(p.service === 'Cash Out') curCashout += 1;
            }
          });
          transactions.push(curMonth);
          cashin.push(curCashin);
          cashout.push(curCashout);
        });
        
        setTrans(transactions);
        setCashin(cashin);
        setCashout(cashout);

        setFinances({
          commissions: comm,
          earnings: earnings
        })
      }
    }

    getDt();
  },[]);

  const interaction = {
    labels: m,
    datasets: [{
      label: 'Cash In',
      data: cashin,
      backgroundColor: [
        '#00c4cd',
      ],
    },{
      label: 'Cash Out',
      data: cashout,
      backgroundColor: [
        '#000',
      ],
    }]
  };

  const commissionfee = {
    labels: comM,
    datasets: [{
      label: 'Commissions',
      data: comPM,
      backgroundColor: [
        '#00c4cd',
      ],
    }]
  };

  return (
    <AdminLayout>
      <div className="w-full p-8 flex flex-col justify-center gap-8 items-center h-full overflow-y-scroll text-primary">
        <div className="flex w-full flex-wrap gap-4">
          <div className="flex w-full self-center flex-col items-center gap-4 border border-gray-400 p-4 px-8 rounded-2xl shadow-xl">
            <span className="text-sm roboto-bold">Transactions Volume Report</span>
            <div className="flex w-full">
              <div className="flex w-full">
                <div className="flex w-full flex-col items-center">
                  <Bar width={'100%'} data={interaction} options={{maintainAspectRatio: false}}/>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full self-center flex-col items-center gap-4 border border-gray-400 p-4 px-8 rounded-2xl shadow-xl">
            <span className="text-sm roboto-bold">Commission Fee Report</span>
            <div className="flex w-full">
              <div className="flex w-full">
                <div className="flex w-full flex-col items-center">
                  <Bar width={'100%'} data={commissionfee} options={{maintainAspectRatio: false}}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}