import AdminLayout from "../../layout/AdminLayout";
import search from '../../assets/search.png';
import { useState } from "react";
import stats from '../../assets/stats.png';
import edit from '../../assets/edit.png';
import threedots from '../../assets/3dots.png';
import Button from "../../components/Button";
import { Link } from "react-router-dom";

export default function PartnerManagement() {

  const user = [
    {id: 1, type: 'Individual', name: 'Nicole Ayessa Alcover', address: '79 Cabreros St Cebu City, Cebu', email: 'ayessaalc@gmail.com', contact: '09273622933'},
    {id: 2, type: 'Individual', name: 'Jeanette Alcover', address: 'Carcar City, Cebu', email: 'jeanette123@gmail.com', contact: '09273622933'},
    {id: 3, type: 'Store', name: 'Shynne Canada', address: 'Sambag 1, Urgello Cebu City', email: 'shyjhye@gmail.com', contact: '09273622933'},
    {id: 4, type: 'Individual', name: 'Nicole Ayessa Alcover', address: '79 Cabreros St Cebu City, Cebu', email: 'ayessaalc@gmail.com', contact: '09273622933'},
    {id: 5, type: 'Store', name: 'Nicole Ayessa Alcover', address: '79 Cabreros St Cebu City, Cebu', email: 'ayessaalc@gmail.com', contact: '09273622933'},
    {id: 1, type: 'Individual', name: 'Nicole Ayessa Alcover', address: '79 Cabreros St Cebu City, Cebu', email: 'ayessaalc@gmail.com', contact: '09273622933'},
    {id: 2, type: 'Store', name: 'Jeanette Alcover', address: 'Carcar City, Cebu', email: 'jeanette123@gmail.com', contact: '09273622933'},
    {id: 3, type: 'Individual', name: 'Shynne Canada', address: 'Sambag 1, Urgello Cebu City', email: 'shyjhye@gmail.com', contact: '09273622933'},
    {id: 4, type: 'Store', name: 'Nicole Ayessa Alcover', address: '79 Cabreros St Cebu City, Cebu', email: 'ayessaalc@gmail.com', contact: '09273622933'},
    {id: 5, type: 'Individual', name: 'Nicole Ayessa Alcover', address: '79 Cabreros St Cebu City, Cebu', email: 'ayessaalc@gmail.com', contact: '09273622933'},

  ]

  const dept = [
    {id: 1, name: 'Jaeglaiys Iwayan', dept: 'Parnter Management Team', lastlogin: '5 minutes ago', date_added: new Date()},
    {id: 2, name: 'Jeanie Mae', dept: 'Finance Team', lastlogin: '5 minutes ago', date_added: new Date()},
    {id: 3, name: 'Nicole Ayessa Alcover', dept: 'Parnter Management Team', lastlogin: '5 minutes ago', date_added: new Date()},
    {id: 4, name: 'Shynne Canada', dept: 'Finance Team', lastlogin: '5 minutes ago', date_added: new Date()},

  ]


  return (
    <AdminLayout>
      <div className="w-full p-8 flex flex-col justify-center items-center h-full overflow-y-scroll text-primary">
        <div className="w-full flex gap-2 bg-gray-300">
          <h1 className={`flex justify-center items-center text-lg roboto-bold w-2/12 py-4 text-primary bg-white`}>Partner</h1>
        </div>
        <div className="flex flex-col border p-8 gap-4 border-gray-200 w-full h-full shadow-lg">
          <div className="flex justify-end gap-2">
            <div className="relative flex items-center">
              <img className="absolute right-2 w-1/12" src={search} alt="" />
              <input placeholder="Search" className="px-4 text-primary py-2 border border-primary bg-gray-300 shadow-lg text-sm rounded-full" type="text" name="search" id="search" />
            </div>
            <Button text="Add"/>
            <Button text="Suspend"/>
            <Button text="Unsuspend"/>
            <Button text="Remove"/>
            <Link to="/partnermanagement/application" className="underline ml-16">Application List</Link>
          </div>
          <div className="flex flex-col gap-4">
            {
              user.map((a, idx) => {
                return (
                  <div key={idx} className="gap-4 shadow-lg py-8 grid grid-cols-6 w-full border border-gray-200 justify-between">
                    <span className="flex justify-center items-center text-sm roboto-regular">{a.type}</span>
                    <span className="flex justify-center items-center text-sm roboto-regular">{a.name}</span>
                    <span className="flex justify-center items-center text-sm roboto-regular">{a.address}</span>
                    <span className="flex justify-center items-center text-sm roboto-regular text-primary">{a.email}</span>
                    <span className="flex justify-center items-center text-sm roboto-regular text-primary">{a.contact}</span>
                    <span className="flex justify-center items-center gap-2">
                      <img src={threedots} alt="" />
                      <img src={edit} alt="" />
                      <img src={stats} alt="" />
                    </span>
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