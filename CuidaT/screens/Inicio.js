import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const { width, height } = Dimensions.get("window");

export default function Login({ navigation }) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const auth = getAuth();

  const handleLogin = () => {
    if (!correo || !contrasena) {
      Alert.alert("Campos incompletos", "Por favor ingresa tu correo y contraseña.");
      return;
    }

    signInWithEmailAndPassword(auth, correo, contrasena)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Sesión iniciada:", user.email);
        Alert.alert("Bienvenido", "Has iniciado sesión correctamente.");
        navigation.navigate("Home"); // pantalla principal después del login
      })
      .catch((error) => {
        let mensaje = "Error al iniciar sesión.";
        if (error.code === "auth/invalid-email") mensaje = "Correo electrónico inválido.";
        else if (error.code === "auth/user-not-found") mensaje = "Usuario no encontrado.";
        else if (error.code === "auth/wrong-password") mensaje = "Contraseña incorrecta.";
        Alert.alert("Error", mensaje);
      });
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inicia sesión</Text>
      </View>

      {/* Campos */}
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#555"
        keyboardType="email-address"
        value={correo}
        onChangeText={setCorreo}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#555"
        secureTextEntry
        value={contrasena}
        onChangeText={setContrasena}
      />

      {/* Botón de inicio de sesión */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      {/* Enlace a registro */}
      <Text style={styles.registerText}>
        ¿No tienes cuenta?{" "}
        <Text
          style={styles.registerLink}
          onPress={() => navigation.navigate("Registro")}
        >
          Regístrate
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  header: {
    position: "absolute",
    top: 60,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
    marginLeft: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderColor: "#E5E7EB",
    borderWidth: 1.2,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#111",
    marginBottom: 14,
  },
  loginButton: {
    backgroundColor: "#3da9fc",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16.5,
    fontWeight: "600",
  },
  registerText: {
    fontSize: 14,
    color: "#666",
    marginTop: 25,
  },
  registerLink: {
    color: "#3da9fc",
    fontWeight: "600",
  },
});
