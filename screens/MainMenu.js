//screens\MainMenu.js

import { View, Text, TouchableOpacity } from 'react-native'

export default function MainMenuScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>
                Pizzeria App
            </Text>

            <TouchableOpacity
                onPress={() => navigation.navigate("CustomerHome")}
                style={{
                    backgroundColor: "#FF0000",
                    padding: 10,
                    borderRadius: 5,
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Entrar como cliente</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("EmployeeLogin")}
                style={{
                    backgroundColor: "#FF0000",
                    padding: 10,
                    borderRadius: 5,
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Entrar como empleado</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.replace("Login")}
                style={{
                    backgroundColor: "#FF0000",
                    padding: 10,
                    borderRadius: 5,
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>EXIT</Text>
            </TouchableOpacity>

        </View>
    );
}