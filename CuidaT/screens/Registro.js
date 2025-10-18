import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  CheckBox,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function Registro({ navigation }) {
  const [terminos, setTerminos] = useState(false);
  const [politica, setPolitica] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Encabezado */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Regístrate</Text>
        </View>

        {/* Campos de entrada */}
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          placeholderTextColor="#555"
        />
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
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          placeholderTextColor="#555"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Número de teléfono (opcional)"
          placeholderTextColor="#555"
          keyboardType="phone-pad"
        />

        {/* Checkboxes */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setTerminos(!terminos)}
          >
            <View style={[styles.checkbox, terminos && styles.checkedBox]} />
            <Text style={styles.checkboxText}>
              Acepto los{" "}
              <Text style={styles.link}>términos y condiciones</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setPolitica(!politica)}
          >
            <View style={[styles.checkbox, politica && styles.checkedBox]} />
            <Text style={styles.checkboxText}>
              Acepto la{" "}
              <Text style={styles.link}>política de privacidad</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Botón de crear cuenta */}
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Crear cuenta</Text>
        </TouchableOpacity>

        {/* Enlace a iniciar sesión */}
        <Text style={styles.loginText}>
          ¿Ya tienes una cuenta?{" "}
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate("Inicio")}
          >
            Inicia sesión
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#F9FAFB", // tono gris muy suave, igual al mockup
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    width: "88%",
    alignSelf: "center",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 35, // mucho más cercano al espaciado del mockup
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
    marginRight: 24, // centra el texto respecto al ícono
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderColor: "#E5E7EB", // gris claro más realista
    borderWidth: 1.2,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#111",
    marginBottom: 14,
  },
  checkboxContainer: {
    width: "100%",
    marginTop: 10,
    marginBottom: 25,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: "#ccc",
    borderRadius: 5,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedBox: {
    backgroundColor: "#3da9fc",
    borderColor: "#3da9fc",
  },
  checkboxText: {
    fontSize: 14,
    color: "#333",
    flexShrink: 1, // evita desbordamiento del texto
  },
  link: {
    color: "#3da9fc",
    fontWeight: "500",
  },
  createButton: {
    backgroundColor: "#3da9fc",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16.5,
    fontWeight: "600",
  },
  loginText: {
    fontSize: 14,
    color: "#666",
    marginTop: 25,
    marginBottom: 25,
  },
  loginLink: {
    color: "#3da9fc",
    fontWeight: "600",
  },
});
