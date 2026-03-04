import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { getOrders, clearOrders } from "../storage/storage";


export default function OrdersScreen({ navigation }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loadOrders = async () => {
            const storedOrders = await getOrders();
            setOrders(storedOrders);
        };

        const unsubscribe = navigation.addListener("focus", loadOrders);

        return unsubscribe;
    }, [navigation]);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.text}>Pizza: {item.pizza}</Text>
            <Text style={styles.text}>Cantidad: {item.quantity}</Text>
            <Text style={styles.date}>{item.date}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historial de Órdenes 📋</Text>

            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={
                    <Text>No hay órdenes registradas</Text>
                }
            />

            <TouchableOpacity
                style={styles.exitButton}
                onPress={() => navigation.replace("Login")}
            >
                <Text style={styles.exitText}>EXIT</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ marginTop: 15, alignItems: "center" }}
                onPress={async () => {
                    await clearOrders();
                    setOrders([]);
                }}
            >
                <Text style={{ color: "red", fontWeight: "bold" }}>
                    Borrar Órdenes (Prueba)
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
    },
    card: {
        backgroundColor: "#f2f2f2",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    text: { fontSize: 16 },
    date: { fontSize: 12, color: "#666", marginTop: 5 },
    exitButton: {
        marginTop: 20,
        alignItems: "center",
    },
    exitText: {
        color: "red",
        fontWeight: "bold",
    },
});