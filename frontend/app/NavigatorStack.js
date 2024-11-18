import { createStackNavigator } from "react-navigation-stack";
import {createAppContainer} from 'react-navigation';


const { default: OpenAccount } = require("./pages/auth/OpenAccount");
const { default: RegisterAccount } = require("./pages/auth/RegisterAccount");
const { default: RegisterOTP } = require("./pages/auth/RegisterOTP");
const { default: Main } = require("./pages/Main");

const screens = {
  Main: {
    screen: Main
  },
  RegisterOTP: {
    screen: RegisterOTP
  },
  RegisterAccount: {
    screen: RegisterAccount
  },
  OpenAccount: {
    screen: OpenAccount
  }
}
const NavigatorStack = createStackNavigator(screens);

export default createAppContainer(NavigatorStack);