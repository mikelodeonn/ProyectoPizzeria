import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "orders";

export const getOrders = async () => {
  try {
    const orders = await AsyncStorage.getItem(STORAGE_KEY);
    return orders ? JSON.parse(orders) : [];
  } catch (error) {
    console.log("Error getting orders:", error);
    return [];
  }
};

export const saveOrder = async (order) => {
  try {
    const orders = await getOrders();
    orders.push(order);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.log("Error saving order:", error);
  }
};

export const deleteOrder = async (id) => {
  try {
    const orders = await getOrders();

    const filteredOrders = orders.filter((order) => order.id !== id);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredOrders));
  } catch (error) {
    console.log("Error eliminando orden", error);
  }
};