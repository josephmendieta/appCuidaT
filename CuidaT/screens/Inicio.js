import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function Inicio({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/images/logoCuidaT.jpg")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Campos de entrada */}
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#555"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#555"
        secureTextEntry
      />

      {/* Botón de iniciar sesión */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("Home")} // Ajusta el destino
      >
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* Enlace de contraseña olvidada */}
      <TouchableOpacity>
        <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      {/* Separador */}
      <View style={styles.separatorContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>o</Text>
        <View style={styles.line} />
      </View>

      {/* Botones sociales */}
      <TouchableOpacity style={styles.socialButton}>
        <Image
          source={require("../assets/iconos/google.png")}
          style={styles.icon}
        />
        <Text style={styles.socialText}>Continuar con Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Image
          source={require("../assets/iconos/facebook.png")}
          style={styles.icon}
        />
        <Text style={styles.socialText}>Continuar con Facebook</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: width * 0.07,
  },
  logo: {
    width: width * 1,
    height: height * 0.4,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    backgroundColor: "#d8eaff",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: "#3da9fc",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  forgotText: {
    color: "#3da9fc",
    fontSize: 14,
    marginTop: 10,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 10,
    color: "#555",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingVertical: 10,
    width: "100%",
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialText: {
    fontSize: 16,
    color: "#000",
  },
});
