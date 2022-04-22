import React from "react";
import LoginScreen from "../accounts/LoginScreen";
import SignupScreen from "../accounts/SignupScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// define stack Here
const Stack = createNativeStackNavigator();
// screenOptions={{headerShown:false}}
export default function AppAuth(){
    return(
            <Stack.Navigator initialRouteName="login" >
                <Stack.Screen
                name='login'
                component={LoginScreen}
                options={{headerShown:false}}/>
                <Stack.Screen
                name='register'
                component={SignupScreen}
                options={{headerShown:false}}/>
            </Stack.Navigator>
    );
}