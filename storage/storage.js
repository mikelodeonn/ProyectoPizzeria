import AsyncStorage from "@react-native-async-storage/async-storage";

const ORDERS_KEY = "ORDERS";

// Obtener órdenes
export const getOrders = async () => {
  try {
    const data = await AsyncStorage.getItem(ORDERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Error obteniendo órdenes:", error);
    return [];
  }
};

// Guardar nueva orden
export const saveOrder = async (newOrder) => {
  try {
    const existingOrders = await getOrders();
    const updatedOrders = [...existingOrders, newOrder];
    await AsyncStorage.setItem(
      ORDERS_KEY,
      JSON.stringify(updatedOrders)
    );
  } catch (error) {
    console.log("Error guardando orden:", error);
  }
};

// Limpiar órdenes (opcional, útil para pruebas)
export const clearOrders = async () => {
  await AsyncStorage.removeItem(ORDERS_KEY);
};