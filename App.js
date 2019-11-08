import React from 'react';
import SignUp from './src/Screens/SignUp';
import SignIn from './src/Screens/SignIn';
import Main from './src/Screens/Main';
import Location from './src/Screens/Location';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
const Login_StackNavigator = createStackNavigator(
  {
    SignUp: {screen: SignUp},
    Login: {screen: SignIn},
  },
  {
    headerMode: 'none',
  },
);
const Location_stack = createStackNavigator({
  Main: {screen: Main},
  Location: {screen: Location},
});
const PrimaryNav = createSwitchNavigator(
  {
    Login: {screen: Login_StackNavigator},
    Location_stack: {screen: Location_stack},
  },
  {
    headerMode: 'none',
    initialRouteName: 'Login',
  },
);
const App = createAppContainer(PrimaryNav);

export default App;
