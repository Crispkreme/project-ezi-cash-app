import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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
    element: <Dashboard />
  },
  {
    path: '/admin/transactions',
    element: <TransactionsOverview />
  },
  {
    path: '/admin/management',
    element: <UserManagement />
  },
  {
    path: '/admin/access',
    element: <AccessControl />
  },
  {
    path: '/partnermanagement/dashboard',
    element: <ManagementDashboard />
  },
  {
    path: '/partnermanagement/partner',
    element: <PartnerManagement />
  },
  {
    path: '/partnermanagement/application',
    element: <ApplicationManagement />
  },
  {
    path:'/partnermanagement/agreements',
    element:<AgreementManagement />
  },
  {
    path: '/partnermanagement/monitoring',
    element: <PerformingMonitoring />
  },
  {
    path: '/finance/dashboard',
    element: <FinanceDashboard />
  },
  {
    path: '/finance/monitoring',
    element: <TransactionsMonitoring />
  },
  {
    path: '/finance/reports',
    element: <TransactionReports />
  },
  {
    path: '/finance/processing',
    element: <CommissionPaymentProcessing />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
