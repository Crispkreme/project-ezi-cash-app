import AdminLayout from "../../layout/AdminLayout";
import search from '../../assets/search.png';
import { useEffect, useState } from "react";
import stats from '../../assets/stats.png';
import edit from '../../assets/edit.png';
import threedots from '../../assets/3dots.png';
import Button from "../../components/Button";
import { Link } from "react-router-dom";

interface user {
  id: number, 
  type: string, 
  name: string, 
  address: string, 
  email: string, 
  contact: string,
  is_suspended: boolean,
  partner_application_id: number
}
export default function PartnerManagement() {

  const [users, setUsers] = useState<Array<user>>([]);

  useEffect(() => {
    const getDt = async () => {
      const dt = await fetch("/api/ezicash-partners");
      
      if(dt.ok) {
        const body = await dt.json();
        const data = [...body.data];

        const temp = data.map(p => {
          return {
            id: p.user_id, 
            type: p.partnership_type, 
            name: p.legal_name, 
            address: p.business_zip + ' ' + p.business_city + ' ' + p.business_state, 
            email: p.email, 
            contact: p.phone_no,
            is_suspended: p.is_suspended === 0 ? false : true,
            partner_application_id: p.partner_application_id
          }
        });

        setUsers([...temp]);
        setSearchRes([...temp]);
      }
    }

    getDt();
  },[]);

  const dept = [
    {id: 1, name: 'Jaeglaiys Iwayan', dept: 'Parnter Management Team', lastlogin: '5 minutes ago', date_added: new Date()},
    {id: 2, name: 'Jeanie Mae', dept: 'Finance Team', lastlogin: '5 minutes ago', date_added: new Date()},
    {id: 3, name: 'Nicole Ayessa Alcover', dept: 'Parnter Management Team', lastlogin: '5 minutes ago', date_added: new Date()},
    {id: 4, name: 'Shynne Canada', dept: 'Finance Team', lastlogin: '5 minutes ago', date_added: new Date()},

  ]

  const [search,setSearch] = useState('');
  const [searchRes, setSearchRes] = useState([...users]);
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const t = e.currentTarget;
    setSearch(t.value);
    const temp = [...users];
    const f = temp.filter(c => c.type.toLowerCase().includes(t.value) || c.name.toLowerCase().includes(t.value) || c.address.toLowerCase().includes(t.value)
    || c.email.toLowerCase().includes(t.value) || c.contact.toLowerCase().includes(t.value));

    setSearchRes([...f]);
  };

  const suspend = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const t = e.currentTarget;
    const n = t.name;
    const idx = Number(n.split("-")[1]);
    const partner_application_id = n.split("-")[3];
    
    const res = await fetch("/api/suspend-partner", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({partner_application_id, is_suspended: 1})
    });

    if(res.ok) {
      const temp = [...users];
      temp[idx].is_suspended = true;
      setUsers([...temp]);
    }
  }

  const unsuspend = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const t = e.currentTarget;
    const n = t.name;
    const idx = Number(n.split("-")[1]);
    const partner_application_id = n.split("-")[3];
    
    const res = await fetch("/api/suspend-partner", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({partner_application_id, is_suspended: 0})
    });

    if(res.ok) {
      const temp = [...users];
      temp[idx].is_suspended = false;
      setUsers([...temp]);
    }
  }


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
              <input onChange={handleChange} value={search} placeholder="Search" className="px-4 text-primary py-2 border border-primary bg-gray-300 shadow-lg text-sm rounded-full" type="text" name="search" id="search" />
            </div>
            <Link to="/partnermanagement/application" className="underline ml-16">Application List</Link>
          </div>
          <div className="flex flex-col gap-4">
            {
              searchRes.length > 0 && searchRes.map((a, idx) => {
                return (
                  <div key={idx} className={`gap-4 ${a.is_suspended ? 'bg-red-400' : ''} shadow-lg py-8 grid grid-cols-6 w-full border border-gray-200 justify-between`}>
                    <span className="flex justify-center items-center text-sm roboto-regular">{a.type}</span>
                    <span className="flex justify-center items-center text-sm roboto-regular">{a.name}</span>
                    <span className="flex justify-center items-center text-sm roboto-regular">{a.address}</span>
                    <span className="flex justify-center items-center text-sm roboto-regular text-primary">{a.email}</span>
                    <span className="flex justify-center items-center text-sm roboto-regular text-primary">{a.contact}</span>
                    <span className="flex flex-col justify-center items-center gap-2">
                      {a.is_suspended && <button className={`px-4 bg-white py-1 rounded-full border-gray-400 shadow-lg`} onClick={unsuspend} name={`idx-${idx}-partnerid-` + a.partner_application_id} >Unsuspend</button>}
                      {!a.is_suspended && <button className={`px-4 text-white bg-red-400 py-1 rounded-full border-gray-400 shadow-lg`} onClick={suspend} name={`idx-${idx}-partnerid-` + a.partner_application_id} >Suspend</button>}
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