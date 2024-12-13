import AdminLayout from "../../layout/AdminLayout";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AgreementManagement() {

  const user = [
    {id: 1, name: 'Nicole Ayessa Alcover', agreementType: 'Partner Agreement', date: new Date(), docLink: 'ayessaalc@gmail.com'},
    {id: 1, name: 'Jerald Alc', agreementType: 'Partner Agreement', date: new Date(), docLink: 'ayessaalc@gmail.com'},
    {id: 1, name: 'Nicole Ayessa Alcover', agreementType: 'Partner Agreement', date: new Date(), docLink: 'ayessaalc@gmail.com'},
  ]

  const signed = [
    {id: 1, name: 'Nicole Ayessa Alcover', agreementType: 'Partner Agreement', date: new Date(), renewalOption: 'Optional Renewal'},
    {id: 1, name: 'Jerald Alc', agreementType: 'Partner Agreement', date: new Date(), renewalOption: 'Optional Renewal'},
    {id: 1, name: 'Nicole Ayessa Alcover', agreementType: 'Partner Agreement', date: new Date(), renewalOption: 'Optional Renewal'},
  ]

  const [state, setState] = useState({
    upcoming: true,
    signed: false,
  });

  const viewSwitch = (category:keyof typeof state) => setState(prev => ({...prev, upcoming: false, signed: false, [category]: true}));

  return (
    <AdminLayout>
      <div className="w-full p-8 flex flex-col justify-center gap-8 items-center h-full overflow-y-scroll text-primary">
        <div className="w-full flex gap-2">
          <button onClick={() => viewSwitch("upcoming")} className={` py-4 ${state.upcoming ? 'text-gray-400' : '' } underline rounded-full`}>Upcoming Partner Agreement Review</button>
          <button onClick={() => viewSwitch("signed")} className={` py-4 ${state.signed ? 'text-gray-400' : '' } ml-16 underline rounded-full`}>Recently Signed Agreement</button>
        </div>
        <div className="flex flex-col border p-8 gap-4 border-gray-200 w-full h-full shadow-lg">
          <div className="flex flex-col gap-4">
            {
              state.upcoming && (
                <div className="gap-4 grid grid-cols-4 w-full justify-between">
                  <span className="flex justify-center items-center text-sm text-gray-600 roboto-regular">Partner</span>
                  <span className="flex justify-center items-center text-sm text-gray-600 roboto-regular">Agreement Type</span>
                  <span className="flex justify-center items-center text-sm text-gray-600 roboto-regular">Effective Date</span>
                  <span className="flex justify-center items-center text-sm text-gray-600 roboto-regular">Document Link</span>
                </div>
              )
            }

            {
              state.signed && (
                <div className="gap-4 grid grid-cols-5 w-full justify-between">
                  <span className="flex justify-center items-center text-sm text-gray-600 roboto-regular">Partner</span>
                  <span className="flex justify-center items-center text-sm text-gray-600 roboto-regular">Agreement Type</span>
                  <span className="flex justify-center items-center text-sm text-gray-600 roboto-regular">Review Due Date</span>
                  <span className="flex justify-center items-center text-sm text-gray-600 roboto-regular">Renewal Option</span>
                </div>
              )
            }

            {
              state.upcoming && (
                user.map((a, idx) => {
                  return (
                    <div key={idx} className="gap-4 shadow-lg py-8 grid grid-cols-4 w-full border border-gray-200 justify-between">
                      <span className="flex justify-center items-center text-lg roboto-medium">{a.name}</span>
                      <span className="flex justify-center items-center text-sm roboto-regular">{a.agreementType}</span>
                      <span className="flex justify-center items-center text-sm roboto-regular">{a.date.toDateString()}</span>
                      <Link className="flex justify-center items-center text-sm roboto-regular" to={a.docLink}>Document Link</Link>
                    </div>
                  )
                })
              )
            }

            {
              state.signed && (
                <div>
                  {signed.map((a, idx) => {
                    return (
                      <div key={idx} className="px-16 shadow-lg py-8 grid grid-cols-5 w-full border border-gray-200 justify-between">
                        <span className="flex justify-start items-center text-lg roboto-medium">{a.name}</span>
                        <span className="flex justify-center items-center roboto-regular">{a.agreementType}</span>
                        <span className="flex justify-center items-center roboto-regular text-right text-primary">{a.date.toDateString()}</span>
                        <span className="flex justify-center items-center roboto-regular text-right text-primary">{a.renewalOption}</span>
                        <div className="flex flex-col gap-2">
                          <span className="text-xs py-1 px-4 bg-gray-300 rounded-full">Schedule Review Meeting</span>
                          <span className="text-xs py-1 px-4 bg-gray-300 rounded-full">Initiate renewal negotiation</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            }
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}