import AdminLayout from "../../layout/AdminLayout";
import customerrating from '../../assets/customer-rating.png';
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
import { Bar, Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale,ArcElement, BarElement, Title, Tooltip, Legend);

export default function PerformingMonitoring() {

  const [cashIn, setCashIn] = useState({
    pending: 0,
    complete: 0
  });
  const [cashOut, setCashOut] = useState({
    pending: 0,
    complete: 0
  });

  const [successRate, setSuccessRate] = useState(0);

  useEffect(() => {
    const getDt = async () => {
      const res = await fetch('/api/transactions');

      if(res.ok) {
        const body = await res.json();
        const arr = [...body.data];

        const pendingcin = arr.filter(a => a.service === 'Cash In' && a.transaction_status === 'Pending').length;
        const completedcin = arr.filter(a => a.service === 'Cash In' && a.transaction_status !== 'Pending').length;
        const pendingcout = arr.filter(a => a.service === 'Cash Out' && a.transaction_status === 'Pending').length;
        const completedcout = arr.filter(a => a.service === 'Cash Out' && a.transaction_status !== 'Pending').length;

        const successR = ((completedcin + completedcout) / (completedcin + completedcout + pendingcin + pendingcout)) * 100;

        setCashIn({pending: pendingcin, complete: completedcin});
        setSuccessRate(successR);
        setCashOut({pending: pendingcout, complete: completedcout});
        
      }
    }

    getDt();
  },[]);

  const cashin = {
    labels: [],
    datasets: [{
      label: 'Cash In',
      data: [cashIn.complete, cashIn.pending],
      backgroundColor: [
        '#00c4cd',
        '#000',
      ],
    }]
  };

  const cashout = {
    labels: [],
    datasets: [{
      label: 'Cash Out',
      data: [cashOut.complete, cashOut.pending],
      backgroundColor: [
        '#00c4cd',
        '#000',
      ],
    }]
  };

  const successrate = {
    labels: [],
    datasets: [{
      label: '',
      data: [successRate, Math.abs(successRate - 100)],
      backgroundColor: [
        '#00c4cd',
        '#000',
      ],
    }]
  };

  const interaction = {
    labels: ["January", "February", "March", "April"],
    datasets: [{
      label: 'Partners Interaction with Ezi Cash',
      data: [20, 43, 15, 70],
      backgroundColor: [
        '#00c4cd',
        '#000',
      ],
    }]
  };

  useEffect(() => {
    return () => {
      console.log(ChartJS.instances);
    };
  }, []);
  return (
    <AdminLayout>
      <div className="w-full p-8 flex flex-col justify-center gap-8 items-center h-full overflow-y-scroll text-primary">
        <div className="flex w-full flex-wrap gap-4">
          <div className="flex flex-col gap-4">
            <div className="">
              <span className="text-sm roboto-bold">Cash in and Cash out Processed </span>
              <div className="flex self-center flex-col gap-4 border border-gray-400 max-w-max p-4 px-8 pb-8 rounded-2xl shadow-xl">
                <div className="flex gap-8">
                  <div className="flex flex-col w-[150px] items-center">
                    <Doughnut data={cashin}/>
                    <span>Cash In</span>
                  </div>

                  <div className="flex flex-col w-[150px] items-center">
                    <Doughnut data={cashout}/>
                    <span>Cash Out</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-sm roboto-bold">Partners Interaction with Ezi Cash</span>
              <div className="flex self-center flex-col items-center gap-4 border border-gray-400 max-w-max p-4 px-8 rounded-2xl shadow-xl">
                
                <div className="flex">
                  <div className="flex flex-col items-center">
                    <Bar data={interaction}/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="text-sm roboto-bold">Partners Interaction with Ezi Cash</span>
            <div className="flex self-center flex-col items-center gap-4 border border-gray-400 max-w-max p-4 px-8 rounded-2xl shadow-xl">
              
              <div className="flex">
                <div className="flex flex-col items-center">
                  <img src={customerrating} alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <span className="text-sm roboto-bold">Transaction Success Rates </span>
            <div className="flex self-center flex-col gap-4 border border-gray-400 max-w-max p-4 px-8 pb-8 rounded-2xl shadow-xl">
              <div className="flex gap-8">
                <div className="flex flex-col w-full items-center">
                  <Doughnut data={successrate}/>
                  <span>Cash In</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  )
}