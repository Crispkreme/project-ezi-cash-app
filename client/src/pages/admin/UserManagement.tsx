import AdminLayout from "../../layout/AdminLayout";
import search from '../../assets/search.png';
import { useState } from "react";
import stats from '../../assets/stats.png';
import edit from '../../assets/edit.png';

export default function UserManagement() {

  const user = [
    {id: 1, type: 'Partner', name: 'Nicole Ayessa Alcover', address: '79 Cabreros St Cebu City, Cebu', email: 'ayessaalc@gmail.com', contact: '09273622933'},
    {id: 2, type: 'Customer', name: 'Jeanette Alcover', address: 'Carcar City, Cebu', email: 'jeanette123@gmail.com', contact: '09273622933'},
    {id: 3, type: 'Partner', name: 'Shynne Canada', address: 'Sambag 1, Urgello Cebu City', email: 'shyjhye@gmail.com', contact: '09273622933'},
    {id: 4, type: 'Customer', name: 'Nicole Ayessa Alcover', address: '79 Cabreros St Cebu City, Cebu', email: 'ayessaalc@gmail.com', contact: '09273622933'},
    {id: 5, type: 'Customer', name: 'Nicole Ayessa Alcover', address: '79 Cabreros St Cebu City, Cebu', email: 'ayessaalc@gmail.com', contact: '09273622933'},
    {id: 1, type: 'Partner', name: 'Nicole Ayessa Alcover', address: '79 Cabreros St Cebu City, Cebu', email: 'ayessaalc@gmail.com', contact: '09273622933'},
    {id: 2, type: 'Partner', name: 'Jeanette Alcover', address: 'Carcar City, Cebu', email: 'jeanette123@gmail.com', contact: '09273622933'},
    {id: 3, type: 'Customer', name: 'Shynne Canada', address: 'Sambag 1, Urgello Cebu City', email: 'shyjhye@gmail.com', contact: '09273622933'},
    {id: 4, type: 'Customer', name: 'Nicole Ayessa Alcover', address: '79 Cabreros St Cebu City, Cebu', email: 'ayessaalc@gmail.com', contact: '09273622933'},
    {id: 5, type: 'Partner', name: 'Nicole Ayessa Alcover', address: '79 Cabreros St Cebu City, Cebu', email: 'ayessaalc@gmail.com', contact: '09273622933'},
  ]

  const dept = [
    {id: 1, name: 'Jaeglaiys Iwayan', dept: 'Parnter Management Team', lastlogin: '5 minutes ago', date_added: new Date()},
    {id: 2, name: 'Jeanie Mae', dept: 'Finance Team', lastlogin: '5 minutes ago', date_added: new Date()},
    {id: 3, name: 'Nicole Ayessa Alcover', dept: 'Parnter Management Team', lastlogin: '5 minutes ago', date_added: new Date()},
    {id: 4, name: 'Shynne Canada', dept: 'Finance Team', lastlogin: '5 minutes ago', date_added: new Date()},
  ]

  const [search, setSearch] = useState('');
  const [searchRes, setSearchRes] = useState([...user]);
  const [searchDept, setSearchDept] = useState([...dept]);

  const [state, setState] = useState({
    user: true,
    dept: false,
  });

  const viewSwitch = (category:keyof typeof state) => setState(prev => ({user: false, dept: false, [category]: !prev[category as keyof typeof state]}));

  const searchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const t = e.currentTarget;
    const val = t.value.toLowerCase();

    setSearch(t.value);

    if(state.user) {
      const filter = user.filter(u => u.type.toLowerCase().includes(val) || u.name.toLowerCase().includes(val) || u.email.toLowerCase().includes(val) || u.contact.toLowerCase().includes(val)
      || u.address.toLowerCase().includes(val))

      setSearchRes([...filter]);

    } else {
      const filter = dept.filter(u => u.name.toLowerCase().includes(val) || u.dept.toLowerCase().includes(val) || u.date_added.toDateString().toLowerCase().includes(val)
      || u.lastlogin.toLowerCase().includes(val));

      setSearchDept([...filter]);
    }
  }

  return (
    <AdminLayout>
      <div className="w-full p-8 flex flex-col justify-center gap-8 items-center h-full overflow-y-scroll text-primary">
        <div className="w-full flex gap-2">
          <button onClick={() => viewSwitch("user")} className={`w-2/12 py-4 ${state.user ? 'bg-primary text-white' : '' } rounded-full`}>User</button>
          <button onClick={() => viewSwitch("dept")} className={`w-2/12 py-4 ${state.dept ? 'bg-primary text-white' : '' } rounded-full`}>Department</button>
        </div>
        <div className="flex flex-col border p-8 gap-4 border-gray-200 w-full h-full shadow-lg">
          <div className="flex justify-end">
            <div className="relative flex items-center">
              <img className="absolute right-2 w-1/12" src={search} alt="" />
              <input onChange={searchChange} value={search} placeholder="Search" className="px-4 text-primary py-2 border border-primary bg-gray-300 shadow-lg text-sm rounded-full" type="text" name="search" id="search" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {
              state.user && (
                searchRes.length > 0 && searchRes.map((a, idx) => {
                  return (
                    <div key={idx} className="gap-4 shadow-lg py-8 grid grid-cols-6 w-full border border-gray-200 justify-between">
                      <span className="flex justify-center items-center text-lg roboto-medium">{a.type}</span>
                      <span className="flex justify-center items-center text-sm roboto-regular">{a.name}</span>
                      <span className="flex justify-center items-center text-sm roboto-regular">{a.address}</span>
                      <span className="flex justify-center items-center text-sm roboto-regular text-primary">{a.email}</span>
                      <span className="flex justify-center items-center text-sm roboto-regular text-primary">{a.contact}</span>
                      <span className="flex justify-center items-center gap-2">
                        <img src={edit} alt="" />
                        <img src={stats} alt="" />
                      </span>
                    </div>
                  )
                })
              )
            }

            {
              state.dept && (
                <div>
                  <div className="px-16 shadow-lg py-8 grid grid-cols-4 w-full border border-gray-200 justify-between">
                    <span className="flex justify-start items-center text-lg roboto-medium">Name</span>
                    <span className="flex justify-center items-center text-lg roboto-medium">Department/Team</span>
                    <span className="flex justify-center items-center roboto-regular text-right text-primary">Last Log In</span>
                    <span className="flex justify-center items-center roboto-regular text-right text-primary">Date Added</span>
                  </div>
                  {searchDept.length > 0 && searchDept.map((a, idx) => {
                    return (
                      <div key={idx} className="px-16 shadow-lg py-8 grid grid-cols-4 w-full border border-gray-200 justify-between">
                        <span className="flex justify-start items-center text-lg roboto-medium">{a.name}</span>
                        <span className="flex justify-center items-center roboto-regular">{a.dept}</span>
                        <span className="flex justify-center items-center roboto-regular text-right text-primary">{a.lastlogin}</span>
                        <span className="flex justify-center items-center roboto-regular text-right text-primary">{a.date_added.toDateString()}</span>
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