import React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './app/pages/Main';
import RegisterOTP from './app/pages/auth/RegisterOTP';
import OpenAccount from './app/pages/auth/OpenAccount';
import RegisterAccount from './app/pages/auth/RegisterAccount';
import "./globals.css";
import Authentication from './app/components/Authentication';
import BusinessHour from './app/components/BusinessHour';
import ConfirmAccount from './app/pages/auth/ConfirmAccount';
import SetMPIN from './app/pages/auth/SetMPIN';
import Dashboard from './app/pages/Dashboard';
import DashboardHeader from './app/components/DashboardHeader';
import EWallet from './app/pages/EWallet';
import HighHeader from './app/components/HighHeader';
import AddAmount from './app/pages/AddAmount';
import SearchPartner from './app/pages/SearchPartner';
import SearchHeader from './app/components/SearchHeader';
import Partner from './app/pages/Partner';
import PaymentConfirm from './app/pages/PaymentConfirm';
import PayPalWebView from './app/pages/PayPalWebView';
import WaitingApproval from './app/pages/confirmation/WaitingApproval';
import PaymentConfirmationHeader from './app/components/PaymentConfirmationHeader';
import Approved from './app/pages/confirmation/Approved';
import Cancelled from './app/pages/confirmation/Cancelled';
import GoToStore from './app/pages/GoToStore';
import FinishTransaction from './app/pages/FinishTransaction';
import TransactionComplete from './app/pages/TransactionComplete';
import RatePartner from './app/pages/RatePartner';
import InitialLoading from './app/pages/InitialLoading';
import Login from './app/pages/Login';
import ResetMPINSuccessful from './app/pages/confirmation/ResetMPINSuccessful';
import LinkLogin from './app/pages/auth/LinkLogin';
import LinkAuthentication from './app/pages/auth/LinkAuthentication';
import LinkMPIN from './app/pages/auth/LinkMPIN';
import SuccessfulLink from './app/pages/confirmation/SuccessfulLink';
import SuccessfulLinkHeader from './app/components/SuccessfulLinkHeader';
import Profile from './app/pages/Profile';
import EziCashPartnerApplication from './app/pages/ezicash/EziCashPartnerApplication';
import PartnerDashboard from './app/pages/PartnerDashboard';
import PartnerRequests from './app/pages/PartnerRequests';
import PartnerTransactions from './app/pages/PartnerTransactions';
import PartnerCommissionFeeStatements from './app/pages/PartnerCommissionFeeStatements';
import PartnerSettledCommissions from './app/pages/PartnerSettledCommissions';
import PartnerLocate from './app/pages/PartnerLocate';
import PartnerServiceManagement from './app/pages/PartnerServiceManagement';
import SuccessfulApplication from './app/pages/ezicash/SuccessfulApplication';
import ApplicationStatus from './app/pages/ezicash/ApplicationStatus';

const Stack = createStackNavigator({
  screens: {
    InitialLoading: {
      screen: InitialLoading,
      options: {
        header: () => null
      }
    },
    Login: {
      screen: Login,
      options: {
        header: () => null
      }
    },
    Main: {
      screen: Main,
      options: {
        header: () => null
      }
      
    },
    RegisterOTP: {
      screen: RegisterOTP,
      options: {
        header: () => <Authentication/>
      }
    },
    OpenAccount: {
      screen: OpenAccount
    },
    RegisterAccount: {
      screen: RegisterAccount
    },
    EziCashPartnerApplication: {
      screen: EziCashPartnerApplication,
      options: {
        header: () => null
      }
    },
    ConfirmAccount: {
      screen: ConfirmAccount
    },
    BusinessHour: {
      screen: BusinessHour
    },
    SetMPIN: {
      screen: SetMPIN,
      options: {
        header: () => null
      }
    },
    ResetMPIN: {
      screen: SetMPIN,
      options: {
        header: () => null
      }
    },
    LinkLogin: {
      screen: LinkLogin,
      options: {
        header: () => null
      }
    },
    LinkAuthentication: {
      screen: LinkAuthentication,
      options: {
        header: () => null
      }
    },
    LinkMPIN: {
      screen: LinkMPIN,
      options: {
        header: () => null
      }
    },
    SuccessfulLink: {
      screen: SuccessfulLink,
      options: {
        header: () => <SuccessfulLinkHeader />
      }
    },
    ResetMPINSuccessful: {
      screen: ResetMPINSuccessful,
      options: {
        header: () => null
      }
    },
    Dashboard: {
      screen: Dashboard,
      options: {
        header: () => <DashboardHeader />
      }
    },
    PartnerDashboard: {
      screen: PartnerDashboard,
      options: {
        header: () => null
      }
    },
    PartnerRequests: {
      screen: PartnerRequests,
      options: {
        header: () => null
      }
    },
    PartnerTransactions: {
      screen: PartnerTransactions,
      options: {
        header: () => null
      }
    },
    PartnerCommissionFeeStatements: {
      screen: PartnerCommissionFeeStatements,
      options: {
        header: () => null
      }
    },
    PartnerSettledCommissions: {
      screen: PartnerSettledCommissions,
      options: {
        header: () => null
      }
    },
    PartnerLocate: {
      screen: PartnerLocate,
      options: {
        header: () => <HighHeader title="Locate" position={"high"}/>
      }
    },
    PartnerServiceManagement: {
      screen: PartnerServiceManagement,
      options: {
        header: () => null
      }
    },
    Profile: {
      screen: Profile,
      options: {
        header:() => <DashboardHeader profile={true} />
      }
    },
    EWallet: {
      screen: EWallet,
      options: {
        header: () => <HighHeader title={"Link E-wallet"} position={"high"}/>
      }
    },
    AddAmount: {
      screen: AddAmount,
      options: {
        header: () => <HighHeader title={"Add Location and Amount"} position={"high"}/>
      }
    },
    SearchPartner: {
      screen: SearchPartner,
      options: {
        header: () => <SearchHeader />
      }
    },
    Partner: {
      screen: Partner,
      options: {
        header: () => null
      }
    },
    PaymentConfirm: {
      screen: PaymentConfirm,
      options: {
        header: () => null
      }
    },
    PayPalWebView: {
      screen: PayPalWebView,
      options: {
        header: () => null
      }
    },
    WaitingApproval: {
      screen: WaitingApproval,
      options: {
        header: () => <PaymentConfirmationHeader title="Waiting for Approval" />
      }
    },
    Approved: {
      screen: Approved,
      options: {
        header: () => <PaymentConfirmationHeader title="Approved" />
      }
    },
    Cancelled: {
      screen: Cancelled,
      options: {
        header: () => <PaymentConfirmationHeader title="Cancelled" />
      }
    },
    GoToStore: {
      screen: GoToStore,
      options: {
        header: () => <HighHeader title="Go to the Store" position={"high"}/>
      }
    },
    FinishTransaction: {
      screen: FinishTransaction,
      options: {
        header: () => <HighHeader title="Transaction Completed!" position={"high"}/>
      }
    },
    TransactionComplete: {
      screen: TransactionComplete,
      options: {
        header: () => null
      }
    },
    RatePartner: {
      screen: RatePartner,
      options: {
        header: () => null
      }
    },
    SuccessfulApplication: {
      screen: SuccessfulApplication,
      options: {
        header: () => null
      }
    },
    ApplicationStatus: {
      screen: ApplicationStatus,
      options: {
        header: () => null
      }
    },
  }
});

const Navigation = createStaticNavigation(Stack);

export default function App() {
    return (
        <Navigation></Navigation>
    );
}
