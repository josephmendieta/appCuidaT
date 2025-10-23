import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const { width } = Dimensions.get("window");

export default function Inicio({ navigation }) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const auth = getAuth();

  // --- LOGIN CON CORREO ---
  const handleLogin = () => {
    if (!correo || !contrasena) {
      Alert.alert("Campos incompletos", "Por favor ingresa tu correo y contraseña.");
      return;
    }

    signInWithEmailAndPassword(auth, correo, contrasena)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("✅ Sesión iniciada:", user.email);
        Alert.alert("Bienvenido", "Has iniciado sesión correctamente.");
        navigation.navigate("ConfPrivacidad");
      })
      .catch((error) => {
        let mensaje = "Error al iniciar sesión.";
        if (error.code === "auth/invalid-email") mensaje = "Correo electrónico inválido.";
        else if (error.code === "auth/user-not-found") mensaje = "Usuario no encontrado.";
        else if (error.code === "auth/wrong-password") mensaje = "Contraseña incorrecta.";
        Alert.alert("Error", mensaje);
      });
  };

  // --- LOGIN CON GOOGLE ---
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");

      if (Platform.OS === "web") {
        // 🔹 Web → ventana emergente
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        Alert.alert("Bienvenido", `Has iniciado sesión como ${user.displayName}`);
        navigation.navigate("ConfPrivacidad");
      } else {
        // 🔹 Móvil → redirección
        await signInWithRedirect(auth, provider);
      }
    } catch (error) {
      console.error("❌ Error Google:", error);
      Alert.alert("Error", "No se pudo iniciar sesión con Google.");
    }
  };

  // --- LOGIN CON FACEBOOK ---
  const handleFacebookLogin = async () => {
    try {
      const provider = new FacebookAuthProvider();
      provider.addScope("email");
      provider.addScope("public_profile");
      provider.setCustomParameters({ display: "popup" });

      if (Platform.OS === "web") {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        Alert.alert("Bienvenido", `Has iniciado sesión como ${user.displayName}`);
        navigation.navigate("ConfPrivacidad");
      } else {
        await signInWithRedirect(auth, provider);
      }
    } catch (error) {
      console.error("❌ Error Facebook:", error);
      Alert.alert("Error", "No se pudo iniciar sesión con Facebook.");
    }
  };

  // --- PROCESAR RESULTADOS DE REDIRECCIÓN (para móvil) ---
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          const user = result.user;
          Alert.alert("Bienvenido", `Has iniciado sesión como ${user.displayName}`);
          navigation.navigate("ConfPrivacidad");
        }
      })
      .catch((error) => {
        if (error.code) console.error("⚠️ Error redirección:", error.message);
      });
  }, []);

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inicia sesión</Text>
      </View>

      {/* Campos de entrada */}
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

      {/* Botón principal */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      {/* Separador */}
      <View style={styles.separatorContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>o</Text>
        <View style={styles.line} />
      </View>

      {/* Botón Google */}
      <TouchableOpacity style={styles.socialButtonGoogle} onPress={handleGoogleLogin}>
        <Ionicons name="logo-google" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.socialButtonText}>Continuar con Google</Text>
      </TouchableOpacity>

      {/* Botón Facebook */}
      <TouchableOpacity style={styles.socialButtonFacebook} onPress={handleFacebookLogin}>
        <Ionicons name="logo-facebook" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.socialButtonText}>Continuar con Facebook</Text>
      </TouchableOpacity>

      {/* Enlace de registro */}
      <Text style={styles.registerText}>
        ¿No tienes cuenta?{" "}
        <Text style={styles.registerLink} onPress={() => navigation.navigate("Registro")}>
          Regístrate
        </Text>
      </Text>
    </View>
  );
}

// --- ESTILOS ---
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
  socialButtonGoogle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DB4437",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 25,
    marginBottom: 10,
  },
  socialButtonFacebook: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1877f2",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 25,
  },
  socialButtonText: {
    color: "#fff",
    fontSize: 16,
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
