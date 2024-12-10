import AdminLayout from "../../layout/AdminLayout";
import search from '../../assets/search.png';
import Modal from "../../components/Modal";
import { useState } from "react";
import Form from "../../components/Form";

export default function AccessControl() {

  const activities = [
    {id: 1, department: 'Admin', subText:'The Admin have complete control of the workspace', staff: 5},
    {id: 2, department: 'Project Partner Team', subText:"Overseeing partnerships that expand Ezicash's reach and services.", staff: 5},
    {id: 3, department: 'Finance Team', subText:"Managing Ezicash's financial health and ensuring its financial sustainability", staff: 5},

  ]

  const [staff, setStaff] = useState({
    name: '',
    email:'',
    contact_no: '',
    dept: ''
  })
  
  const [state, setState] = useState(false);

  const toggleModal = () => setState(prev => !prev);

  return (
    <AdminLayout>
      <div className="relative w-full p-8 flex flex-col justify-center gap-8 items-center h-full overflow-y-scroll text-primary">
        <div className="flex flex-col border p-8 gap-4 border-gray-200 w-full h-full shadow-lg">
          <div className="flex justify-end">
            <div className="relative flex items-center">
              <button className="shadow-lg px-4 py-2 rounded-lg text-primary roboto-medium">+ Create New Department</button>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="px-16 py-4 grid grid-cols-3 w-full border border-gray-200 bg-gray-300 justify-between">
              <div>
                <span className="flex justify-start items-center text-lg roboto-medium">Departments</span>
              </div>
              <span className="flex justify-center items-center text-lg roboto-medium">Staff</span>
              <span className="flex justify-end items-center roboto-regular text-right text-primary">
              </span>
            </div>
            {
              activities.map((a, idx) => {
                return (
                  <div key={idx} className="px-16 py-8 grid grid-cols-3 w-full border border-gray-200 justify-between">
                    <div>
                      <span className="flex justify-start items-center text-lg roboto-medium">{a.department}</span>
                      <span className="roboto-light text-sm">{a.subText}</span>
                    </div>
                    <span className="flex justify-center items-center text-lg roboto-medium">{a.staff} Staffs</span>
                    <span className="flex justify-end items-center roboto-regular text-right text-primary">
                      <button onClick={toggleModal} className="shadow-lg px-4 py-2 rounded-lg text-primary roboto-medium">+ Add Staff</button>
                    </span>
                  </div>
                )
              })
            }
          </div>
        </div>
        <Modal open={state} close={() => {
          setState(false)
        }}>
          <section className="min-w-max bg-white relative -top-16">
            <div className="bg-[#d4d4d4] robot-bold px-4 py-2 text-2xl pr-96">Add New Staff<div className="pr-64"></div></div>
            <div className="bg-white p-4 ">
              <div>
                <h1 className="text-xl roboto-medium">Department</h1>
                <select className="mt-4 mb-12 px-4 py-2 bg-white border border-gray-400 rounded-md" name="dept" id="dept">
                  <option disabled className="disabled:text-gray-400" value="">Department/Team</option>
                  <option value="admin">Admin</option>
                  <option value="admin">Finance Team</option>
                  <option value="admin">Partner Management Team</option>
                </select>
              </div>
              <div>
                <h1 className="text-xl roboto-medium">Staff Information</h1>
                <div className="flex gap-6">
                  <Form className="w-full" title="Name" formKey="name" setState={setStaff}/>
                  <Form className="w-full" title="Phone Number" formKey="contact_no" setState={setStaff}/>
                </div>
                <Form title="Email" formKey="email" className="w-1/2" setState={setStaff}/>
              </div>
              <div className="w-full flex justify-end items-center gap-4 pt-16 pb-8">
                <button onClick={toggleModal} className="py-1 px-4 w-1/4 rounded-full bg-[#d4d4d4]">Cancel</button>
                <button onClick={toggleModal} className="py-1 px-4 w-1/4 rounded-full bg-primary text-white">Add</button>
              </div>
            </div>
          </section>
        </Modal>
      </div>
    </AdminLayout>
  )
}