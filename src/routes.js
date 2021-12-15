import React from 'react';
import checkAuth from './helpers/checkAuth';
import { StoreProvider } from './config/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import dashRoutes from './screen/dashRoutes';
import WelcomeScreen from './screen/welcomeScreen';
import LoginScreen from './screen/auth/Login';
import SignUpScreen from './screen/auth/Signup';
import ForgotScreen from './screen/auth/forgotpassword';
// import NetworkScreen from './screen/pages/Network';
import PostScreen from './screen/pages/Post';

const Stack = createStackNavigator();

const routes = () => (
  <StoreProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="landing" screenOptions={{headerShown:false}}>
        <Stack.Screen 
          name="landing"
          component={WelcomeScreen} 
          listeners={ ({ navigation }) => ({ 
            focus: ()=> checkAuth(true,()=> navigation.replace("dash")) 
          })}
        />
        <Stack.Screen name="dash" component={dashRoutes} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signup" component={SignUpScreen} />
        <Stack.Screen name="forgot" component={ForgotScreen} />
        {/* <Stack.Screen name="network" component={NetworkScreen} /> */}
        <Stack.Screen name="specificPost" component={PostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </StoreProvider>
)


export default routes
