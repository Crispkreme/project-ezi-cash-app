import AdminLayout from "../../layout/AdminLayout";
import { useState } from "react";
import search from '../../assets/search.png';
import list from '../../assets/list.png';
import Modal from "../../components/Modal";

export default function CommissionPaymentProcessing() {

  const all = [
    {id: 1001, ttl_overdue_amt: 2050, days_past_due: 35, type: 'Store', status: 'Active', contact: '09123456789'},
    {id: 1007, ttl_overdue_amt: 2050, days_past_due: 35, type: 'Store', status: 'Active', contact: '09123456789'},
    {id: 1011, ttl_overdue_amt: 2050, days_past_due: 35, type: 'Store', status: 'Active', contact: '09123456789'},
  ]

  const open = [
    {id: 1001, name: 'Nicole Ayessa Alcover',days_past_due: 35,ttl_overdue_amt: 2050,type: 'Store', contact: '09123456789', case_creation: new Date(), status: 0, history: [
      {commission_payment: new Date(), payment: 3460},
      {commission_payment: new Date(), payment: 5010},
      {commission_payment: new Date(), payment: 3000},
    ]},
    {id: 1005, name: 'Nicole Ayessa Alcover',days_past_due: 35,ttl_overdue_amt: 2050,type: 'Store', contact: '09123456789', case_creation: new Date(), status: 0, history: [
      {commission_payment: new Date(), payment: 3460},
      {commission_payment: new Date(), payment: 5010},
      {commission_payment: new Date(), payment: 3000},
    ]},
    {id: 1011, name: 'Nicole Ayessa Alcover',days_past_due: 35,ttl_overdue_amt: 2050,type: 'Store', contact: '09123456789', case_creation: new Date(), status: 0, history: [
      {commission_payment: new Date(), payment: 3460},
      {commission_payment: new Date(), payment: 5010},
    ]},
  ]

  const [state, setState] = useState({
    all: true,
    open: false,
  });

  const viewSwitch = (category:keyof typeof state) => setState(prev => ({...prev, all: false, open: false, [category]: true}));

  const [m, setM] = useState(false);
  const [active, setActive] = useState(0);
  const view = (e:React.MouseEvent<HTMLButtonElement>) => {
    const t = e.currentTarget;
    const n = t.name;
    setActive(Number(n.split("-")[1]));
    setM(p => !p);
  }
  return (
    <AdminLayout>
      <div className="w-full p-8 flex flex-col justify-center gap-8 items-center h-full overflow-y-scroll text-primary">
        <div className="w-full flex gap-2">
          <button onClick={() => viewSwitch("all")} className={` py-4 ${state.all ? 'text-gray-400' : '' } underline rounded-full`}>View All Accounts</button>
          <button onClick={() => viewSwitch("open")} className={` py-4 ${state.open ? 'text-gray-400' : '' } ml-16 underline rounded-full`}>Manage Open Cases</button>
        </div>
        <div className="flex w-full justify-end gap-4">
          <div className="relative flex items-center">
            <img className="absolute right-2 w-1/12" src={search} alt="" />
            <input placeholder="Search" className="px-4 text-primary py-2 border border-primary bg-gray-300 shadow-lg text-sm rounded-full" type="text" name="search" id="search" />
          </div>
          <select className="px-4 py-2 border border-gray-200" defaultValue={""}>
            <option value="" disabled>Delinquency Period</option>
            <option value="month_1">1-30 Days</option>
            <option value="month_2">31-60 Days</option>
            <option value="month_3">More than 60 Days</option>
          </select>
        </div>
        <div className="flex flex-col border p-8 gap-4 border-gray-200 w-full h-full shadow-lg">
          <div className="flex flex-col gap-4">
            {
              state.all && (
                <div className="gap-4 grid grid-cols-6 w-full justify-between">
                  <span className="flex justify-center items-center text-xs text-gray-600 roboto-regular">Account ID</span>
                  <span className="flex justify-center items-center text-xs text-gray-600 roboto-regular">Total Overdue Amount</span>
                  <span className="flex justify-center items-center text-xs text-gray-600 roboto-regular">No. of days past due</span>
                  <span className="flex justify-center items-center text-xs text-gray-600 roboto-regular">Account Type</span>
                  <span className="flex justify-center items-center text-xs text-gray-600 roboto-regular">Account Status</span>
                  <span className="flex justify-center items-center text-xs text-gray-600 roboto-regular">Account Contact</span>
                </div>
              )
            }

            {
              state.open && (
                <div className="gap-4 grid grid-cols-7 w-full justify-between">
                  <span className="flex justify-center items-center text-xs text-gray-600 roboto-regular">Account ID</span>
                  <span className="flex justify-center items-center text-xs text-gray-600 roboto-regular">Name</span>
                  <span className="flex justify-center items-center text-xs text-gray-600 roboto-regular">Total Overdue Amount</span>
                  <span className="flex justify-center items-center text-xs text-gray-600 roboto-regular">Contact</span>
                  <span className="flex justify-center items-center text-xs text-gray-600 roboto-regular">Case Creation Date</span>
                  <span className="flex justify-center items-center text-xs text-gray-600 roboto-regular">Status</span>
                  <span className="flex justify-center items-center text-xs text-gray-600 roboto-regular">More Details</span>
                </div>
              )
            }

            {
              state.all && (
                all.map((a, idx) => {
                  return (
                    <div key={idx} className="gap-4 shadow-lg py-8 grid grid-cols-6 w-full border border-gray-200 justify-between">
                      <span className="flex justify-center items-center text-sm roboto-medium">{a.id}</span>
                      <span className="flex justify-center items-center text-sm roboto-regular">{a.ttl_overdue_amt.toFixed().toLocaleString()}</span>
                      <span className="flex justify-center items-center text-sm roboto-regular">{a.days_past_due} Days</span>
                      <span className="flex justify-center items-center text-sm roboto-regular">{a.type}</span>
                      <span className="flex justify-center items-center text-sm roboto-regular">{a.status}</span>
                      <span className="flex justify-center items-center text-sm roboto-regular">{a.contact}</span>
                    </div>
                  )
                })
              )
            }

            {
              state.open && (
                <div>
                  {open.map((a, idx) => {
                    return (
                      <div key={idx} className=" shadow-lg py-8 grid grid-cols-7 w-full border border-gray-200 justify-between">
                        <span className="flex justify-center items-center text-xs roboto-medium">{a.id}</span>
                        <span className="flex justify-center items-center text-xs roboto-medium">{a.name}</span>
                        <span className="flex justify-center items-center text-xs roboto-regular">{a.ttl_overdue_amt}</span>
                        <span className="flex justify-center items-center text-xs roboto-regular text-right text-primary">{a.contact}</span>
                        <span className="flex justify-center items-center text-xs roboto-regular text-right text-primary">{a.case_creation.toDateString()}</span>
                        <select className="flex justify-center px-4 py-1 border border-gray-300 shadow-lg items-center text-xs roboto-regular">
                          <option value={a.status}>In Progress</option>
                        </select>
                        <button onClick={view} name={'user-'+idx} className="flex justify-center items-center">
                          <img className="w-1/12" src={list} alt="" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              )
            }
          </div>
        </div>
        <Modal open={m} close={() => setM(false)}>
          <div className="bg-white p-8 relative -top-32">
            <div className="text-lg roboto-medium flex flex-col gap-4">
              <h1>Account Information</h1>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <div className="w-72 justify-between flex shadow-lg border-md  items-center text-xs p-4 border border-gray-200">
                  <span className="text-gray-500">Name</span>
                  <span>{open[active].name}</span>
                </div>

                <div className="w-72 justify-between flex shadow-lg border-md gap-16 items-center text-xs p-4 border border-gray-200">
                  <span className="text-gray-500">Type</span>
                  <span>{open[active].type}</span>
                </div>

                <div className="w-72 justify-between flex shadow-lg border-md gap-16 items-center text-xs p-4 border border-gray-200">
                  <span className="text-gray-500">ID</span>
                  <span>{open[active].id}</span>
                </div>

                <div className="w-72 justify-between flex shadow-lg border-md gap-16 items-center text-xs p-4 border border-gray-200">
                  <span className="text-gray-500">No. of days past due</span>
                  <span>{open[active].days_past_due} Days</span>
                </div>

                <div className="w-72 justify-between flex shadow-lg border-md gap-16 items-center text-xs p-4 border border-gray-200">
                  <span className="text-gray-500">Contact</span>
                  <span>{open[active].contact}</span>
                </div>

                <div className="w-72 justify-between flex shadow-lg border-md gap-16 items-center text-xs p-4 border border-gray-200">
                  <span className="text-gray-500">Overdue Amount</span>
                  <span>₱ {open[active].ttl_overdue_amt.toLocaleString()}</span>
                </div>
              </div>
              <h1 className="text-lg roboto-medium mt-8">Payment History</h1>
              <div className="flex gap-2 flex-col">
                {
                  open[active].history.map( h => {
                    return (
                      <div className="flex w-72 flex-col">
                        <span className="text-xs mb-1">2024 {h.commission_payment.getMonth()}</span>
                        <div className="flex border rounded-md p-2 items-center justify-between shadow-lg border-gray-400">
                          <span className="text-xs">Commission Payment</span>
                          <span>₱ {h.payment.toLocaleString()}</span>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </AdminLayout>
  )
}