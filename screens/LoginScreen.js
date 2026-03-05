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
    ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // paquete de iconos de Expo
import { users } from "../data/usersData";
import { COLORS } from "../theme/colors";


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
    const backgroundImage = require("../assets/images/pizza.png");
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
        <ImageBackground
            source={backgroundImage}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <KeyboardAvoidingView 
                    style = {{flex: 1}}
                    behavior= {Platform.OS === "ios" ? "padding" : "height"}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.card}>
                            <View style={styles.header}>
                                <Text style={styles.title}>PizzApp</Text>

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
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)", // 50% oscuro
        padding: 20,
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
    },

    card: {
        backgroundColor: "rgba(11, 69, 77, 0.5)",
        borderRadius: 20,
        padding: 25,
        shadowColor:"rgba(11, 69, 77, 0.5)",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },

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
        marginBottom: 30,
        

    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        color: COLORS.white,
    },
    subtitle: {
        fontSize: 18,
        color: COLORS.white,
        marginTop: 8,
    },
    inputContainer: {
        marginBottom: 18,

    },
    label: {
        fontSize: 14,
        color: COLORS.white,
        fontWeight: "600",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 12,
        padding: 14,
        backgroundColor: "#fafafa",
        fontSize: 16,
    },
    inputError: {
        borderColor: COLORS.warning,
    },
    errorText: {
        color: COLORS.warning,
        fontSize: 12,
        marginTop: 4,
    },
    button: {
        backgroundColor: COLORS.warning,
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    buttonDisabled: {
        backgroundColor: "#363a3d",
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 1,
    },
});