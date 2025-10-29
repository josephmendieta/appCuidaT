// screens/Registro.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, app } from "../firebaseConfig"; // asegúrate que firebaseConfig exporte `auth` y `app`

const db = getFirestore(app);

export default function Registro({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [checkTerminos, setCheckTerminos] = useState(false);
  const [checkPrivacidad, setCheckPrivacidad] = useState(false);
  const [correoDuplicado, setCorreoDuplicado] = useState(false);
  const [loading, setLoading] = useState(false);

  const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  const contrasenasCoinciden =
    password && confirmarPassword && password === confirmarPassword;
  const passwordValidaLongitud = password.length >= 6;

  const validarFormulario = () => {
    if (!nombre || !correo || !password || !confirmarPassword) {
      Alert.alert("Campos incompletos", "Por favor llena todos los campos obligatorios.");
      return false;
    }

    if (!validarCorreo(correo)) {
      Alert.alert("Correo inválido", "Por favor ingresa un correo electrónico válido.");
      return false;
    }

    if (!passwordValidaLongitud) {
      Alert.alert(
        "Contraseña débil",
        "La contraseña debe tener al menos 6 caracteres."
      );
      return false;
    }

    if (password !== confirmarPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return false;
    }

    if (!checkTerminos || !checkPrivacidad) {
      Alert.alert("Aviso", "Debes aceptar los Términos y la Política de Privacidad.");
      return false;
    }

    return true;
  };

  const handleRegistro = async () => {
    if (!validarFormulario()) return;

    setLoading(true);
    try {
      // 1) Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, correo, password);
      const user = userCredential.user;

      // 2) Guardar datos adicionales en Firestore (colección 'usuarios')
      //    el documento se llamará con el UID del usuario
      const usuarioDocRef = doc(db, "usuarios", user.uid);
      await setDoc(usuarioDocRef, {
        nombre: nombre,
        email: correo,
        telefono: telefono || null,
        createdAt: serverTimestamp(),
        // puedes agregar aquí otros campos que quieras guardar por defecto
      });

      setCorreoDuplicado(false);
      setLoading(false);
      Alert.alert("Registro exitoso", "Tu cuenta ha sido creada correctamente.");
      // Llevar al usuario a la pantalla de inicio de sesión o al flujo autenticado
      navigation.navigate("Inicio");
    } catch (error) {
      setLoading(false);
      console.error("Error al registrar:", error);

      // Mapear errores comunes
      if (error.code === "auth/email-already-in-use") {
        setCorreoDuplicado(true);
        Alert.alert(
          "Correo en uso",
          "El correo ingresado ya está registrado. Por favor inicia sesión o usa otro correo."
        );
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Correo inválido", "Por favor ingresa un correo electrónico válido.");
      } else if (error.code === "auth/weak-password") {
        Alert.alert("Contraseña débil", "La contraseña debe tener al menos 6 caracteres.");
      } else {
        Alert.alert("Error", "No se pudo completar el registro. Intenta nuevamente.");
      }
    }
  };

  const formularioValido =
    nombre &&
    correo &&
    password &&
    confirmarPassword &&
    contrasenasCoinciden &&
    checkTerminos &&
    checkPrivacidad &&
    validarCorreo(correo) &&
    passwordValidaLongitud;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo *"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={[
          styles.input,
          correo.length > 0 && !validarCorreo(correo) && styles.inputError,
          correoDuplicado && styles.inputError,
        ]}
        placeholder="Correo electrónico *"
        keyboardType="email-address"
        value={correo}
        onChangeText={(text) => {
          setCorreo(text);
          setCorreoDuplicado(false); // se limpia si el usuario cambia el correo
        }}
      />
      {correo.length > 0 && !validarCorreo(correo) && (
        <Text style={styles.errorText}>Correo inválido.</Text>
      )}
      {correoDuplicado && (
        <Text style={styles.errorText}>
          Este correo ya está registrado. Usa otro o inicia sesión.
        </Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Teléfono (opcional)"
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
      />

      <TextInput
        style={[
          styles.input,
          confirmarPassword.length > 0 && !passwordValidaLongitud && styles.inputError,
          confirmarPassword.length > 0 && !contrasenasCoinciden && styles.inputError,
        ]}
        placeholder="Contraseña *"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {password.length > 0 && !passwordValidaLongitud && (
        <Text style={styles.errorText}>La contraseña debe tener al menos 6 caracteres.</Text>
      )}

      <TextInput
        style={[
          styles.input,
          confirmarPassword.length > 0 && !contrasenasCoinciden && styles.inputError,
        ]}
        placeholder="Confirmar contraseña *"
        secureTextEntry
        value={confirmarPassword}
        onChangeText={setConfirmarPassword}
      />
      {confirmarPassword.length > 0 && !contrasenasCoinciden && (
        <Text style={styles.errorText}>Las contraseñas no coinciden.</Text>
      )}

      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setCheckTerminos(!checkTerminos)} style={styles.checkbox}>
          <View style={[styles.box, checkTerminos && styles.boxChecked]} />
          <Text style={styles.checkboxText}>Acepto los Términos de Uso</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCheckPrivacidad(!checkPrivacidad)} style={styles.checkbox}>
          <View style={[styles.box, checkPrivacidad && styles.boxChecked]} />
          <Text style={styles.checkboxText}>Acepto la Política de Privacidad</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.boton, (!formularioValido || loading) && styles.botonDesactivado]}
        onPress={handleRegistro}
        disabled={!formularioValido || loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.botonTexto}>Registrarme</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Inicio")}>
        <Text style={styles.link}>¿Ya tienes una cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0066cc",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  inputError: {
    borderColor: "#ff4d4d",
  },
  errorText: {
    color: "#ff4d4d",
    fontSize: 13,
    marginBottom: 10,
    marginLeft: 4,
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  box: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: "#666",
    borderRadius: 5,
    marginRight: 10,
  },
  boxChecked: {
    backgroundColor: "#0066cc",
  },
  checkboxText: {
    fontSize: 15,
  },
  boton: {
    backgroundColor: "#0066cc",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  botonDesactivado: {
    backgroundColor: "#aac7e0",
  },
  botonTexto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "#0066cc",
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
  },
});
