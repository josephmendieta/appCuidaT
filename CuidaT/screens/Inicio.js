import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function Inicio({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.loginButtonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        {/* Enlace de registro */}
        <Text style={styles.registerText}>
          ¿No tienes una cuenta?{" "}
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate("Registro")}
          >
            Registrarse
          </Text>
        </Text>

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

        {/* Botón Google */}
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/iconos/google.png")}
            style={styles.icon}
          />
          <Text style={styles.socialText}>Continuar con Google</Text>
        </TouchableOpacity>

        {/* Botón Facebook */}
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/iconos/facebook.png")}
            style={styles.icon}
          />
          <Text style={styles.socialText}>Continuar con Facebook</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  container: {
    width: "85%",
    alignItems: "center",
  },
  logo: {
    width: width * 1,
    height: height * 0.4,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    backgroundColor: "#e8f1ff",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontSize: 16,
    marginBottom: 12,
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
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  registerText: {
    fontSize: 14,
    marginTop: 12,
    color: "#333",
  },
  registerLink: {
    color: "#3da9fc",
    fontWeight: "600",
  },
  forgotText: {
    color: "#3da9fc",
    fontSize: 14,
    marginTop: 8,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 10,
    color: "#555",
    fontSize: 15,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingVertical: 12,
    width: "100%",
    marginBottom: 12,
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  socialText: {
    fontSize: 16,
    color: "#000",
  },
});
