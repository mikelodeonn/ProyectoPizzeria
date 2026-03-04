//screens\CustomerHome.js
import { View, Text, Button } from "react-native";


export default function CustomerHomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Bienvenido Cliente 🍕</Text>
      <Button
        title="Crear Orden"
        onPress={() => navigation.navigate("Order")}
      />

      <Button
        title="Ver Órdenes"
        onPress={() => navigation.navigate("Orders")}
      />
    </View>
  );
}