import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ← 🧠 Importante

export default function ConfPrivacidad({ navigation }) {
  const [aceptaPolitica, setAceptaPolitica] = useState(false);
  const [aceptaTratamiento, setAceptaTratamiento] = useState(false);
  const [cargando, setCargando] = useState(true);

  // ✅ Verifica si ya se aceptaron las políticas anteriormente
  useEffect(() => {
    const verificarAceptacion = async () => {
      try {
        const aceptado = await AsyncStorage.getItem("politicasAceptadas");
        if (aceptado === "true") {
          // Si ya aceptó antes, va directo al chat
          navigation.replace("ChatEmpatico");
        } else {
          setCargando(false);
        }
      } catch (error) {
        console.log("Error al verificar aceptación:", error);
        setCargando(false);
      }
    };
    verificarAceptacion();
  }, []);

  // ✅ Guarda la aceptación y redirige
  const handleContinuar = async () => {
  if (aceptaPolitica && aceptaTratamiento) {
    try {
      await AsyncStorage.setItem("politicasAceptadas", "true"); // Guarda preferencia
      Alert.alert("Privacidad confirmada", "Gracias por aceptar nuestras políticas.");
      // 🔹 Redirige al chat inmediatamente después del alert
      setTimeout(() => {
        navigation.replace("ChatEmpatico");
      }, 500);
    } catch (error) {
      console.log("Error al guardar aceptación:", error);
    }
  } else {
    Alert.alert("Aviso", "Por favor, acepta ambas políticas antes de continuar.");
  }
};


  if (cargando) return null; // Evita parpadeos mientras se verifica

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.tituloSeccion}>Configuración de Privacidad</Text>
      <Text style={styles.tituloPrincipal}>Tu Privacidad es Nuestra Prioridad</Text>
      <Text style={styles.descripcion}>
        Antes de continuar, por favor, lee y acepta nuestras políticas para asegurar la
        confidencialidad de tus datos.
      </Text>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <Feather name="file-text" size={24} color="#007AFF" />
          </View>
          <Text style={styles.cardTitle}>Política de Privacidad de Datos</Text>
          <TouchableOpacity onPress={() => Linking.openURL("https://tu-politica.com")}>
            <Feather name="external-link" size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxRow}>
          <CheckBox
            value={aceptaPolitica}
            onValueChange={setAceptaPolitica}
            color={aceptaPolitica ? "#007AFF" : undefined}
          />
          <Text style={styles.checkboxLabel}>
            He leído y acepto la{" "}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL("https://tu-politica.com")}
            >
              Política de Privacidad de Datos.
            </Text>
          </Text>
        </View>

        <View style={styles.checkboxRow}>
          <CheckBox
            value={aceptaTratamiento}
            onValueChange={setAceptaTratamiento}
            color={aceptaTratamiento ? "#007AFF" : undefined}
          />
          <Text style={styles.checkboxLabel}>
            Entiendo que mis datos serán tratados de forma anónima y confidencial
            para mejorar el servicio.
          </Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Ionicons name="lock-closed-outline" size={22} color="#007AFF" />
        <Text style={styles.infoText}>
          Tus datos están seguros y son confidenciales.{"\n"}
          No compartimos tu información con terceros sin tu consentimiento.
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.boton,
          !(aceptaPolitica && aceptaTratamiento) && styles.botonDeshabilitado,
        ]}
        onPress={handleContinuar}
        disabled={!(aceptaPolitica && aceptaTratamiento)}
      >
        <Text style={styles.botonTexto}>Confirmar y Continuar al Chat</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
  },
  tituloSeccion: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  tituloPrincipal: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 10,
  },
  descripcion: {
    fontSize: 15,
    color: "#4B5563",
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 22,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    backgroundColor: "#E6F0FF",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  cardTitle: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
    fontWeight: "600",
  },
  checkboxContainer: {
    marginBottom: 25,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: "#374151",
    flex: 1,
  },
  link: {
    color: "#007AFF",
    textDecorationLine: "underline",
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#E6F0FF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 25,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 13,
    color: "#1E3A8A",
  },
  boton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  botonDeshabilitado: {
    backgroundColor: "#9CA3AF",
  },
  botonTexto: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
