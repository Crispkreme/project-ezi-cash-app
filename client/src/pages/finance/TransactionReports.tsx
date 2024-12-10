import AdminLayout from "../../layout/AdminLayout";
import Button from "../../components/Button";
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

ChartJS.register(CategoryScale, LinearScale,ArcElement, BarElement, Title, Tooltip, Legend);

export default function TransactionReports() {

  const activities = [
    {name: 'Aishli Store', role: 'Store', transactions: 942, revenue: 15800, avgVal: 16.60},
    {name: 'Nicole Ayessa Alcover', role: 'Individual', transactions: 500, revenue: 10245, avgVal: 20.49},
    {name: 'Aishli Store', role: 'Store', transactions: 942, revenue: 15800, avgVal: 16.60},
  ];

  const interaction = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [{
      label: 'Cash In',
      data: [40, 43, 50, 35, 55],
      backgroundColor: [
        '#00c4cd',
      ],
    },{
      label: 'Cash Out',
      data: [20, 22, 40, 55, 20],
      backgroundColor: [
        '#000',
      ],
    }]
  };

  const commissionfee = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [{
      label: 'Cash In',
      data: [4900, 5500, 5350, 5600, 5850],
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