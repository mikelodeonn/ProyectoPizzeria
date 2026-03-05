
//navigation\AppNavigator.js
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainMenuScreen from "../screens/MainMenu";
import EmployeeHome from "../screens/EmployeeHome";
import CustomerHome from "../screens/CustomerHome";
import LoginScreen from "../screens/LoginScreen";
import OrderScreen from "../screens/OrderScreen";
import OrdersScreen from "../screens/OrdersScreen";
import MenuScreen from "../screens/MenuScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component= {LoginScreen}
          options={{headerShown:false }}
        />
        <Stack.Screen
          name="MainMenu"
          component={MainMenuScreen}
          options={{headerShown:false }}
        />
        <Stack.Screen
          name="CustomerHome"
          component={CustomerHome}
          options={{headerShown:false }}
        />
        <Stack.Screen
          name="EmployeeHome"
          component={EmployeeHome}
          options={{headerShown:false }}
        />
        <Stack.Screen
          name="Order" 
          component={OrderScreen}
          options={{headerShown:false }}
        />
        <Stack.Screen
          name="Orders" 
          component={OrdersScreen}
          options={{headerShown:false }}
        /> 
        <Stack.Screen 
          name="Menu" 
          component={MenuScreen} 
          options={{headerShown:false }}
          />       
      </Stack.Navigator>
    </NavigationContainer>
  );
}