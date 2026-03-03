import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // paquete de iconos de Expo
import { users } from "../data/usersData";

const useForm = (initialValues, validate) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (name) => (value) => {
        setValues((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (onSubmit) => {
        const validationErrors = validate(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            try {
                await onSubmit(values);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return { values, errors, isSubmitting, handleChange, handleSubmit };
};

const validateLogin = (values) => {
    const errors = {};

    if (!values.username?.trim()) {
        errors.username = "El usuario es requerido";
    }

    if (!values.password) {
        errors.password = "La contraseña es requerida";
    }

    return errors;
};

export default function LoginScreen({ navigation }) {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const {
        values: { username, password },
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
    } = useForm({ username: "", password: "" }, validateLogin);

    const handleLogin = useCallback(async () => {
        const userFound = users.find(
            (user) =>
                user.username === username.trim() &&
                user.password === password
        );

        if (userFound) {
            navigation.replace("MainMenu");
        } else {
            Alert.alert("Error", "Credenciales incorrectas");
        }
    }, [username, password, navigation]);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Pizzería App</Text>
                    <Text style={styles.subtitle}>
                        Inicia sesión para continuar
                    </Text>
                </View>

                <View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Usuario</Text>
                        <TextInput
                            style={[styles.input, errors.username && styles.inputError]}
                            placeholder="Ingresa tu usuario"
                            value={username}
                            onChangeText={handleChange("username")}
                            autoCapitalize="none"
                        />
                        {errors.username && (
                            <Text style={styles.errorText}>{errors.username}</Text>
                        )}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Contraseña</Text>
                        <TextInput
                            style={[styles.input, errors.password && styles.inputError]}
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChangeText={handleChange("password")}
                            secureTextEntry={!passwordVisible}
                        />
                        <TouchableOpacity
                            onPress={() => setPasswordVisible(!passwordVisible)}
                        >
                            <Ionicons
                                name={passwordVisible ? "eye-off" : "eye"} // alterna entre iconos
                                size={24}
                                color="gray"
                            />
                        </TouchableOpacity>

                        {errors.password && (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        )}
                    </View>

                    <TouchableOpacity
                        style={[styles.button, isSubmitting && styles.buttonDisabled]}
                        onPress={() => handleSubmit(handleLogin)}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Ingresar</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
    },
    header: {
        alignItems: "center",
        marginBottom: 40,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#333",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginTop: 8,
    },
    inputContainer: {
        marginBottom: 20,
        
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        backgroundColor: "#fff",
    },
    inputError: {
        borderColor: "#e74c3c",
    },
    errorText: {
        color: "#e74c3c",
        fontSize: 12,
        marginTop: 4,
    },
    button: {
        backgroundColor: "#d35400",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonDisabled: {
        backgroundColor: "#bdc3c7",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});