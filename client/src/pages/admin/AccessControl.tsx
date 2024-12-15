import AdminLayout from "../../layout/AdminLayout";
import Modal from "../../components/Modal";
import { useEffect, useState } from "react";
import Form from "../../components/Form";

interface admin {
  admin_id: number,
  admin_name:string,
  admin_type: string,
  created_at: string,
  updated_at:string,
  user_id:number
}

export default function AccessControl() {

  const [users, setUsers] = useState<Array<admin>>([]);
  const [details, setDetails] = useState({
    admin: {id: 1, department: 'Admin', value: 'Admin', subText:'The Admin have complete control of the workspace', staff: 0},
    partnermanagement: {id: 2, department: 'Partner Mangement Team', value: 'Partner Management', subText:"Overseeing partnerships that expand Ezicash's reach and services.", staff: 0},
    finance: {id: 3, department: 'Finance Team', value: 'Finance Team', subText:"Managing Ezicash's financial health and ensuring its financial sustainability", staff: 0},
  });
  
  useEffect(() => {
    const getDt = async () => {
      const res = await fetch('/api/get-admins');

      if(res.ok) {
        const body = await res.json();
        setUsers([...body.data]);
        setSelected(body.data[0] || -1);

        console.log(body.data);
        const dt = [...body.data];
        
        let admin = 0;
        let partnermanagement = 0;
        let finance = 0;

        dt.forEach(d => {
          if(d.admin_type === 'Admin') admin += 1;
          if(d.admin_type === 'Partner Management') partnermanagement += 1;
          if(d.admin_type === 'Finance') finance += 1;
        });

        setDetails(prev => ({
          admin: {...prev.admin, staff: admin},
          partnermanagement: {...prev.partnermanagement, staff: partnermanagement},
          finance: {...prev.finance, staff: finance},
        }))
      }
    }

    getDt();
  },[]);
  
  const [state, setState] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [department, setDepartment] = useState("Admin");

  const toggleModal = (e:React.MouseEvent<HTMLButtonElement>) => {
    const t = e.currentTarget;
    const n = t.name.split("-")[1];
    setDepartment(n);
    setState(prev => !prev);
  }

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => setSelected(Number(e.currentTarget.value));
  const departmentSelect = (e: React.ChangeEvent<HTMLSelectElement>) => setDepartment(e.currentTarget.value);

  const addStaff = async () => {
    if(selected === -1) {
      alert('Select User!');
      return;
    }
    const res = await fetch('/api/add-admins', {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({admin_id: selected, department: department})
    });
    
    if(res.ok) {
      alert('Admin added!');
      setState(prev => !prev);
    }
  }

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
              Object.entries(details).map(([key, a]) => {
                return (
                  <div key={key} className="px-16 py-8 grid grid-cols-3 w-full border border-gray-200 justify-between">
                    <div>
                      <span className="flex justify-start items-center text-lg roboto-medium">{a.department}</span>
                      <span className="roboto-light text-sm">{a.subText}</span>
                    </div>
                    <span className="flex justify-center items-center text-lg roboto-medium">{a.staff} Staffs</span>
                    <span className="flex justify-end items-center roboto-regular text-right text-primary">
                      <button onClick={toggleModal} name={`key-${a.value}`} className="shadow-lg px-4 py-2 rounded-lg text-primary roboto-medium">+ Add Staff</button>
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
          <section className="min-w-max bg-white relative -top-48">
            <div className="bg-[#d4d4d4] robot-bold px-4 py-2 text-2xl pr-96">Add New Staff<div className="pr-64"></div></div>
            <div className="bg-white p-4 ">
              <div>
                <h1 className="text-xl roboto-medium">Department</h1>
                <input value={department} className="mt-2 mb-12 px-4 py-2 bg-white border border-gray-400 rounded-md" type="text" disabled name="" id="" />
              </div>
              <div>
                <h1 className="text-xl roboto-medium">Staff Information</h1>
                <div className="flex gap-6">
                  <div className="mt-2 flex flex-col gap-1 w-full">
                    <span className="leading-tight roboto-light">Name</span>
                    <select onChange={onSelect} className="w-full mt-2 mb-12 px-4 py-2 bg-white border border-gray-400 rounded-md" name="dept" id="dept">
                      <option disabled className="disabled:text-gray-400" value={-1}>Users</option>
                      {
                        users.map( u => {
                          return <option value={u.admin_id}>{u.admin_name}</option>
                        })
                      }
                    </select>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-end items-center gap-4 pt-16 pb-8">
                <button onClick={toggleModal} className="py-1 px-4 w-1/4 rounded-full bg-[#d4d4d4]">Cancel</button>
                <button onClick={addStaff} className="py-1 px-4 w-1/4 rounded-full bg-primary text-white">Add</button>
              </div>
            </div>
          </section>
        </Modal>
      </div>
    </AdminLayout>
  )
}