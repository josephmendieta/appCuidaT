import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebaseConfig";


const PROFESIONALES_FAKE = [
  {
    id: "p1",
    nombre: "Dra. Valentina Ruiz",
    especialidad: "Psicología clínica",
  },
  {
    id: "p2",
    nombre: "Dr. Andrés Martínez",
    especialidad: "Psiquiatría",
  },
  {
    id: "p3",
    nombre: "Lic. Camila López",
    especialidad: "Psicología infantil",
  },
];

export default function CompartirHistorial({ navigation }) {
  const [seleccion, setSeleccion] = useState(null);

  const enviarHistorial = () => {
    if (!seleccion) {
      Alert.alert("Selecciona un profesional");
      return;
    }

    // 🟩 Simulación del envío
    console.log("📤 ENVIANDO HISTORIAL A:");
    console.log(seleccion);

    Alert.alert(
      "Historial enviado",
      `Se envió tu historial a ${seleccion.nombre}`,
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>Compartir con un Profesional</Text>

      <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
        {PROFESIONALES_FAKE.map((pro) => (
          <TouchableOpacity
            key={pro.id}
            style={[
              styles.card,
              seleccion?.id === pro.id && styles.cardSelected,
            ]}
            onPress={() => setSeleccion(pro)}
          >
            <Ionicons
              name="person-circle-outline"
              size={32}
              color={seleccion?.id === pro.id ? "#007AFF" : "#666"}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.cardTitle}>{pro.nombre}</Text>
              <Text style={styles.cardSub}>{pro.especialidad}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Botón confirmar */}
      <TouchableOpacity style={styles.btn} onPress={enviarHistorial}>
        <Ionicons name="share-social-outline" size={22} color="#fff" />
        <Text style={styles.btnText}>Enviar Historial</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  backBtn: {
    marginBottom: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardSelected: {
    borderColor: "#007AFF",
    backgroundColor: "#eaf3ff",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardSub: {
    fontSize: 14,
    color: "#666",
  },

  btn: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
});
