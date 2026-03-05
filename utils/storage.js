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

export const clearOrders = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.log("Error clearing orders:", error);
  }
};