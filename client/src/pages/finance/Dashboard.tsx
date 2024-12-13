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

export default function FinanceDashboard() {

  const activities = [
    {name: 'Aishli Store', role: 'Store', transactions: 942, revenue: 15800, avgVal: 16.60},
    {name: 'Nicole Ayessa Alcover', role: 'Individual', transactions: 500, revenue: 10245, avgVal: 20.49},
    {name: 'Aishli Store', role: 'Store', transactions: 942, revenue: 15800, avgVal: 16.60},
  ];

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

  const valueGenerated = 50430;
  const transactionVol = 5903;
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
                   ₱ {valueGenerated.toLocaleString()}
                  </h1>
                </div>

                <div className="flex gap-2 flex-col items-center shadow-xl border border-gray-200 px-8 py-4 rounded-2xl">
                  <span className="roboto-medium text-sm ">Total Revenue Generated</span>
                  <h1 className="flex text-4xl items-center gap-4 roboto-bold">
                   {transactionVol.toLocaleString()}
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
            <span className="text-sm roboto-bold">₱ {valueGenerated.toLocaleString()} Commission out of this month.</span>
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