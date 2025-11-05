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
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, app, db } from "../firebaseConfig";

export default function Registro({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [genero, setGenero] = useState("");
  const [checkTerminos, setCheckTerminos] = useState(false);
  const [checkPrivacidad, setCheckPrivacidad] = useState(false);
  const [correoDuplicado, setCorreoDuplicado] = useState(false);
  const [loading, setLoading] = useState(false);

  const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  const contrasenasCoinciden =
    password && confirmarPassword && password === confirmarPassword;
  const passwordValidaLongitud = password.length >= 6;

  const validarFormulario = () => {
    if (!nombre || !correo || !password || !confirmarPassword || !genero || !fechaNacimiento) {
      Alert.alert("Campos incompletos", "Por favor llena todos los campos obligatorios.");
      return false;
    }
    if (!validarCorreo(correo)) {
      Alert.alert("Correo inválido", "Por favor ingresa un correo electrónico válido.");
      return false;
    }
    if (!passwordValidaLongitud) {
      Alert.alert("Contraseña débil", "La contraseña debe tener al menos 6 caracteres.");
      return false;
    }
    if (!contrasenasCoinciden) {
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
      // 1️⃣ Crear el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, correo, password);
      const user = userCredential.user;

      // 2️⃣ Crear documento en Firestore con el mismo UID
      const usuarioDocRef = doc(db, "usuarios", user.uid);
      await setDoc(usuarioDocRef, {
        uid: user.uid,
        nombre,
        email: correo,
        telefono: telefono || null,
        fechaNacimiento: fechaNacimiento
          ? fechaNacimiento.toISOString().split("T")[0]
          : null, // formato YYYY-MM-DD
        genero: genero || null,
        fechaRegistro: serverTimestamp(),
      });

      // 3️⃣ Limpieza y feedback visual
      setCorreoDuplicado(false);
      setLoading(false);
      Alert.alert("✅ Registro exitoso", "Tu cuenta ha sido creada correctamente.");
      navigation.navigate("Inicio");

    } catch (error) {
      setLoading(false);
      console.error("Error al registrar:", error);

      // 4️⃣ Manejo de errores más claros
      if (error.code === "auth/email-already-in-use") {
        setCorreoDuplicado(true);
        Alert.alert("Correo en uso", "El correo ingresado ya está registrado.");
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
    validarCorreo(correo) &&
    password &&
    confirmarPassword &&
    contrasenasCoinciden &&
    passwordValidaLongitud &&
    genero &&
    fechaNacimiento &&
    checkTerminos &&
    checkPrivacidad;

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
          setCorreoDuplicado(false);
        }}
      />
      {correo.length > 0 && !validarCorreo(correo) && (
        <Text style={styles.errorText}>Correo inválido.</Text>
      )}
      {correoDuplicado && (
        <Text style={styles.errorText}>Este correo ya está registrado.</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Teléfono (opcional)"
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
      />

      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
        <Text style={{ color: fechaNacimiento ? "#000" : "#999" }}>
          {fechaNacimiento
            ? `Fecha de nacimiento: ${fechaNacimiento.toLocaleDateString()}`
            : "Selecciona tu fecha de nacimiento *"}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={fechaNacimiento}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setFechaNacimiento(selectedDate);
          }}
        />
      )}

      <Text style={styles.subtitle}>Género *</Text>
      <View style={styles.genderContainer}>
        {["Masculino", "Femenino", "Otro"].map((g) => (
          <TouchableOpacity
            key={g}
            style={[styles.genderButton, genero === g && styles.genderSelected]}
            onPress={() => setGenero(g)}
          >
            <Text style={genero === g ? styles.genderTextSelected : styles.genderText}>
              {g}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={[
          styles.input,
          password.length > 0 && !passwordValidaLongitud && styles.inputError,
        ]}
        placeholder="Contraseña *"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {password.length > 0 && !passwordValidaLongitud && (
        <Text style={styles.errorText}>Debe tener al menos 6 caracteres.</Text>
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
          <Text>Acepto los Términos de Uso</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCheckPrivacidad(!checkPrivacidad)} style={styles.checkbox}>
          <View style={[styles.box, checkPrivacidad && styles.boxChecked]} />
          <Text>Acepto la Política de Privacidad</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.boton, (!formularioValido || loading) && styles.botonDesactivado]}
        onPress={handleRegistro}
        disabled={!formularioValido || loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.botonTexto}>Registrarme</Text>
        )}
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
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#0066cc",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  genderSelected: {
    backgroundColor: "#0066cc",
  },
  genderText: {
    color: "#0066cc",
  },
  genderTextSelected: {
    color: "#fff",
    fontWeight: "bold",
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
