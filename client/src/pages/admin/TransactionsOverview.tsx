import AdminLayout from "../../layout/AdminLayout";
import { useState } from "react";

export default function TransactionsOverview() {

  const activities = [
    {service: 'Cash In',payment: 500, partner: 'Nicole Ayessa Alcover', customer: 'Jhyra Shynne Canada', date: new Date(), time: new Date(), fee: 15},
    {service: 'Cash In',payment: 500, partner: 'Nicole Ayessa Alcover', customer: 'Jhyra Shynne Canada', date: new Date(), time: new Date(), fee: 15},
    {service: 'Cash Out',payment: 500, partner: 'Victor Chiong', customer: 'Karen Gonzales', date: new Date(), time: new Date(), fee: 15},
    {service: 'Cash In',payment: 500, partner: 'Nicole Ayessa Alcover', customer: 'Jhyra Shynne Canada', date: new Date(), time: new Date(), fee: 15},
    {service: 'Cash Out',payment: 500, partner: 'Marvin Ramos', customer: 'Jhyra Shynne Canada', date: new Date(), time: new Date(), fee: 15},
    {service: 'Cash In',payment: 500, partner: 'Nicole Ayessa Alcover', customer: 'Karen Gonzales', date: new Date(), time: new Date(), fee: 15},
    {service: 'Cash Out',payment: 500, partner: 'Nicole Ayessa Alcover', customer: 'Karen Gonzales', date: new Date(), time: new Date(), fee: 15},
    {service: 'Cash In',payment: 500, partner: 'Nicole Ayessa Alcover', customer: 'Jhyra Shynne Canada', date: new Date(), time: new Date(), fee: 15},
    {service: 'Cash Out',payment: 500, partner: 'Nicole Ayessa Alcover', customer: 'Jhyra Shynne Canada', date: new Date(), time: new Date(), fee: 15},
  ]

  const [search, setSearch] = useState('');
  const [searchAct, setSearchAct] = useState([...activities]);

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const t = e.currentTarget;
    const val = t.value.toLowerCase()
    setSearch(t.value);

    const filter = activities.filter(u => u.service.toLowerCase().includes(val) || u.partner.toLowerCase().includes(val) || u.payment.toString().toLowerCase().includes(val)
      || u.customer.toLowerCase().includes(val) || u.fee.toString().toLowerCase().includes(val) );

      setSearchAct([...filter]);
  }

  return (
    <AdminLayout>
      <div className="w-full p-8 flex flex-col justify-center gap-8 items-center h-full overflow-y-scroll text-primary">
        <div className="flex flex-col border p-8 gap-4 border-gray-200 w-full h-full shadow-lg">
          <div className="flex justify-end">
            <div className="relative flex items-center">
              <img className="absolute right-2 w-1/12" src={search} alt="" />
              <input onChange={onChange} value={search} placeholder="Search" className="px-4 text-primary py-2 border border-primary bg-gray-300 shadow-lg text-sm rounded-full" type="text" name="search" id="search" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {
              searchAct.length > 0 && searchAct.map((a, idx) => {
                return (
                  <div key={idx} className="px-16 shadow-lg py-8 grid grid-cols-6 w-full border border-gray-200 justify-between">
                    <span className="text-lg roboto-medium">{a.service}</span>
                    <span className="text-lg roboto-medium">{a.payment.toFixed(2)}</span>
                    <div className="flex flex-col tap-2 justify-center items-center">
                      <span>{a.date.toDateString()}</span>
                      <span>{a.time.toLocaleTimeString(undefined,{hour: '2-digit', minute: '2-digit'})}</span>
                    </div>
                    <span className="roboto-regular text-right text-primary">Ezi- {a.partner}</span>
                    <span className="roboto-regular text-right text-primary">{a.customer}</span>
                    <span className="roboto-regular text-right text-primary">{a.fee.toFixed(2)}</span>
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