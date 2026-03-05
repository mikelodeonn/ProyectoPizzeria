
//navigation\AppNavigator.js
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainMenuScreen from "../screens/MainMenu";
import EmployeeHome from "../screens/EmployeeHome";
import CustomerHome from "../screens/CustomerHome";
import LoginScreen from "../screens/LoginScreen";
import OrderScreen from "../screens/OrderScreen";
import OrdersScreen from "../screens/OrdersScreen";

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
          options={{ title: "Inicio" }}
        />
        <Stack.Screen
          name="CustomerHome"
          component={CustomerHome}
          options={{ title: "Cliente" }}
        />
        <Stack.Screen
          name="EmployeeHome"
          component={EmployeeHome}
          options={{ title: "Empleado" }}
        />
        <Stack.Screen
          name="Order" 
          component={OrderScreen}
          options={{title: "Ordenar"}}
        />
        <Stack.Screen
          name="Orders" 
          component={OrdersScreen}
          options={{title: "Ordenes"}}
        />        
      </Stack.Navigator>
    </NavigationContainer>
  );
}