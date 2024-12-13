import { Link, useLocation } from 'react-router-dom';
import dashboardLogo from '../assets/dashboard-logo.png';
import headerLogo from '../assets/header-logo.png';
import notification from '../assets/notification.png';
import settings from '../assets/settings.png';

export default function AdminLayout({children}: {children: React.ReactElement}) {

  const location = useLocation();

  const activePath = {
    dashboard: location.pathname.includes("dashboard") ? true: false,
    transactions: location.pathname.includes("transactions") ? true: false,
    management: location.pathname.includes("management") ? true: false,
    access: location.pathname.includes("access") ? true: false,
    profile: location.pathname.includes("profile") ? true: false,
  }

  const managementActivePath = {
    dashboard: location.pathname.includes("dashboard") ? true: false,
    application: location.pathname.includes("application") ? true: false,
    partner: location.pathname.includes("management/partner") ? true: false,
    monitoring: location.pathname.includes("monitoring") ? true: false,
    agreements: location.pathname.includes("agreements") ? true: false,
    profile: location.pathname.includes("profile") ? true: false,
  }

  const financeActivePath = {
    dashboard: location.pathname.includes("dashboard") ? true: false,
    monitoring: location.pathname.includes("monitoring") ? true: false,
    reports: location.pathname.includes("reports") ? true: false,
    processing: location.pathname.includes("processing") ? true: false,
  }

  const activeRole = {
    admin: location.pathname.includes("/admin/"),
    partnerManagement: location.pathname.includes("/partnermanagement/"),
    finance: location.pathname.includes("/finance/"),
  }

  const dt = sessionStorage.getItem('session');
  const parsed = JSON.parse(String(dt));
  
  return (
    <main className="flex min-h-screen text-white">
      <div className="w-[300px] bg-primary flex flex-col px-8">
        <div>
          <img className='bg-white mx-auto mt-8 p-1 rounded-lg' src={dashboardLogo} alt="" />
        </div>
        <div className='mt-8 flex flex-col'>
          <span className='text-white text-xl px-4'>{parsed.admin_name}</span>
          <div className='flex gap-2 items-center mt-2 px-4'>
            <span className='text-gray-400 text-xs'>Role</span>
            <span className='bg-white text-primary roboto-medium rounded-md p-1 px-2 text-xs'>
              {location.pathname.includes("/admin") && "Admin"}
              {location.pathname.includes("/partnermanagement") && "Partner Management Team"}
              {location.pathname.includes("/finance") && "Finance Team"}
            </span>
          </div>
          <div className='flex flex-col mt-16 gap-2'>
            {
              activeRole.admin && (
                <>
                  <Link className={`w-full px-4 rounded-full py-2 ${activePath.dashboard ? 'bg-white text-primary' : ''}`} to="/admin/dashboard">Dashboard</Link>
                  <Link className={`w-full px-4 rounded-full py-2 ${activePath.transactions ? 'bg-white text-primary' : ''}`} to="/admin/transactions">Transactions Overview</Link>
                  <Link className={`w-full px-4 rounded-full py-2 ${activePath.management ? 'bg-white text-primary' : ''}`} to="/admin/management">User Management</Link>
                  <Link className={`w-full px-4 rounded-full py-2 ${activePath.access ? 'bg-white text-primary' : ''}`} to="/admin/access">Access Control</Link>
                </>
              )
            }

            {
              activeRole.partnerManagement && (
                <>
                  <Link className={`w-full px-4 rounded-full py-2 ${managementActivePath.dashboard ? 'bg-white text-primary' : ''}`} to="/partnermanagement/dashboard">Dashboard</Link>
                  <Link className={`w-full px-4 rounded-full py-2 ${managementActivePath.application ? 'bg-white text-primary' : ''}`} to="/partnermanagement/application">Application Management</Link>
                  <Link className={`w-full px-4 rounded-full py-2 ${managementActivePath.partner ? 'bg-white text-primary' : ''}`} to="/partnermanagement/partner">Partner Management</Link>
                  <Link className={`w-full px-4 rounded-full py-2 ${managementActivePath.monitoring ? 'bg-white text-primary' : ''}`} to="/partnermanagement/monitoring">Performing Monitoring</Link>
                  <Link className={`w-full px-4 rounded-full py-2 ${managementActivePath.agreements ? 'bg-white text-primary' : ''}`} to="/partnermanagement/agreements">Agreements Management</Link>
                </>
              )
            }

            {
              activeRole.finance && (
                <>
                  <Link className={`w-full px-4 rounded-full py-2 ${financeActivePath.dashboard ? 'bg-white text-primary' : ''}`} to="/finance/dashboard">Dashboard</Link>
                  <Link className={`w-full px-4 rounded-full py-2 ${financeActivePath.monitoring ? 'bg-white text-primary' : ''}`} to="/finance/monitoring">Transactions Monitoring</Link>
                  <Link className={`w-full px-4 rounded-full py-2 ${financeActivePath.reports ? 'bg-white text-primary' : ''}`} to="/finance/reports">Transaction Reports</Link>
                  <Link className={`w-full px-4 rounded-full py-2 ${financeActivePath.processing ? 'bg-white text-primary' : ''}`} to="/finance/processing">Commission Payment Processing</Link>
                </>
              )
            }

            <Link className={`w-full px-4 rounded-full py-2 ${activePath.profile ? 'bg-white text-primary' : ''}`} to="/admin/dashboard">Profile</Link>
            <Link className='w-full px-4 rounded-full py-2' to="/login">Logout</Link>
          </div>
        </div>
      </div>
      <div className="w-[calc(100%-300px)]">
        <div className='p-4 h-[180px] border-b shadow-xl border-gray-400 flex flex-col gap-8'>
          <div className='flex justify-between items-center'>
            <img className='w-2/12' src={headerLogo} alt="" />
            <div className='text-primary flex items-center gap-2'>
              <img className='w-2/12' src={notification} alt="" />
              <img className='w-2/12' src={settings} alt="" />
              <span className='shadow-lg px-2 rounded-lg bg-gray-200 roboto-bold py-1 border border-gray-400 text-xs'>Admin</span>
            </div>
          </div>
          <div className='text-primary flex flex-col'>
            {
              activeRole.admin && (
                <>
                { activePath.dashboard && <><span className='roboto-bold text-xl'>Dashboard Overview</span>
                  <span className='text-gray-600 text-xs robot-medium'>Hi {parsed.name}, Welcome back!</span></>}
                { activePath.transactions && <><span className='roboto-bold text-xl'>All Transaction!</span></>}
                { activePath.management && <><span className='roboto-bold text-xl'>User Management</span></>}
                { activePath.access && <><span className='roboto-bold text-xl'>Access Control</span></>}
                </>
              )
            }

            {
              activeRole.partnerManagement && (
                <>
                { managementActivePath.dashboard && <><span className='roboto-bold text-xl'>Dashboard Overview</span></>}
                { managementActivePath.application && <><span className='roboto-bold text-xl'>Application List</span></>}
                { managementActivePath.partner && <><span className='roboto-bold text-xl'>eZiCash Partners</span></>}
                { managementActivePath.monitoring && <><span className='roboto-bold text-xl'>Analytics and Reports</span></>}
                { managementActivePath.agreements && <><span className='roboto-bold text-xl'>Agreement Management</span></>}
                </>
              )
            }
          </div>
        </div>
        <div className='h-[100%-180px]'>
          {children}
        </div>
      </div>
    </main>
  )
}