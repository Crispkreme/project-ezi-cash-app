import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.tsx'
import Signup from './pages/Signup.tsx'
import ForgotPassword from './pages/ForgotPassword.tsx'
import ResetPassword from './pages/ResetPassword.tsx'
import Verification from './pages/Verification.tsx'
import Dashboard from './pages/admin/Dashboard.tsx'
import TransactionsOverview from './pages/admin/TransactionsOverview.tsx'
import UserManagement from './pages/admin/UserManagement.tsx'
import AccessControl from './pages/admin/AccessControl.tsx'
import ManagementDashboard from './pages/partnermanagement/Dashboard.tsx'
import PartnerManagement from './pages/partnermanagement/PartnerManagement.tsx'
import ApplicationManagement from './pages/partnermanagement/ApplicationManagement.tsx'
import AgreementManagement from './pages/partnermanagement/AgreementManagement.tsx'
import PerformingMonitoring from './pages/partnermanagement/PerformingMonitoring.tsx'
import FinanceDashboard from './pages/finance/Dashboard.tsx'
import TransactionsMonitoring from './pages/finance/TransactionsMonitoring.tsx'
import TransactionReports from './pages/finance/TransactionReports.tsx'
import CommissionPaymentProcessing from './pages/finance/CommissionPaymentProcessing.tsx'

const session = sessionStorage.getItem('session');
console.log(session);
const isLoggedIn = session !== null;
console.log(isLoggedIn);
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/forgot',
    element: <ForgotPassword />
  },
  {
    path: '/reset',
    element: <ResetPassword />
  },
  {
    path: '/verification',
    element: <Verification />
  },
  {
    path: '/admin/dashboard',
    element: isLoggedIn ? <Dashboard /> : <Navigate to="/login"/>
  },
  {
    path: '/admin/transactions',
    element: isLoggedIn ? <TransactionsOverview /> : <Navigate to="/login"/>
  },
  {
    path: '/admin/management',
    element: isLoggedIn ? <UserManagement /> : <Navigate to="/login"/>
  },
  {
    path: '/admin/access',
    element: isLoggedIn ? <AccessControl /> : <Navigate to="/login"/>
  },
  {
    path: '/partnermanagement/dashboard',
    element: isLoggedIn ? <ManagementDashboard /> : <Navigate to="/login"/>
  },
  {
    path: '/partnermanagement/partner',
    element: isLoggedIn ? <PartnerManagement /> : <Navigate to="/login"/>
  },
  {
    path: '/partnermanagement/application',
    element: isLoggedIn ? <ApplicationManagement /> : <Navigate to="/login"/>
  },
  {
    path:'/partnermanagement/agreements',
    element:isLoggedIn ? <AgreementManagement /> : <Navigate to="/login"/>
  },
  {
    path: '/partnermanagement/monitoring',
    element: isLoggedIn ? <PerformingMonitoring /> : <Navigate to="/login"/>
  },
  {
    path: '/finance/dashboard',
    element: isLoggedIn ? <FinanceDashboard /> : <Navigate to="/login"/>
  },
  {
    path: '/finance/monitoring',
    element: isLoggedIn ? <TransactionsMonitoring /> : <Navigate to="/login"/>
  },
  {
    path: '/finance/reports',
    element: isLoggedIn ? <TransactionReports /> : <Navigate to="/login"/>
  },
  {
    path: '/finance/processing',
    element: isLoggedIn ? <CommissionPaymentProcessing /> : <Navigate to="/login"/>
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
