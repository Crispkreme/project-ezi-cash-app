import React from 'react';
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './app/pages/Main';
import RegisterOTP from './app/pages/auth/RegisterOTP';
import OpenAccount from './app/pages/auth/OpenAccount';
import RegisterAccount from './app/pages/auth/RegisterAccount';
import "./globals.css";
import Authentication from './app/components/Authentication';
import ConfirmAccount from './app/pages/auth/ConfirmAccount';
import SetMPIN from './app/pages/auth/SetMPIN';
import Dashboard from './app/pages/Dashboard';
import DashboardHeader from './app/components/DashboardHeader';
import EWallet from './app/pages/EWallet';
import HighHeader from './app/components/HighHeader';
import AddAmount from './app/pages/AddAmount';

const Stack = createStackNavigator({
  screens: {
    Main: {
      screen: Main,
      
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
    ConfirmAccount: {
      screen: ConfirmAccount
    },
    SetMPIN: {
      screen: SetMPIN
    },
    Dashboard: {
      screen: Dashboard,
      options: {
        header: () => <DashboardHeader />
      }
    },
    EWallet: {
      screen: EWallet,
      options: {
        header: () => <HighHeader title={"Link E-wallet"}/>
      }
    },
    AddAmount: {
      screen: AddAmount,
      options: {
        header: () => <HighHeader title={"Add Location and Amount"}/>
      }
    }
  }
});

const Navigation = createStaticNavigation(Stack);

export default function App() {
    return (
        <Navigation></Navigation>
    );
}
