import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/splash/SplashScreen";
import AppAuthStack from './screens/auth/AppAuthStack';
import Home from "./screens/main/Home";
// define stack Here

const Stack = createNativeStackNavigator();


export default function App(){
  return(
    <NavigationContainer >
     <Stack.Navigator initialRouteName="Splash" screenOptions={{
      headerShown:false}}>
        <Stack.Screen
        name="Splash"
        component={SplashScreen}/>
         <Stack.Screen
        name='Auth'
        component={AppAuthStack}/>
       <Stack.Screen
        name='Home'
        component={Home} /> 
    </Stack.Navigator> 
    </NavigationContainer>
  );
}