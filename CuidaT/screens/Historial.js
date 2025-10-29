import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Historial({ navigation }) {
  // 🔹 Datos quemados
  const interactionData = [
    { week: "Sem 1", value: 30 },
    { week: "Sem 2", value: 50 },
    { week: "Sem 3", value: 20 },
    { week: "Sem 4", value: 65 },
  ];

  const emotionalRecords = [
    { date: "20 de Mayo", state: "Ansiedad moderada", icon: "sad-outline", color: "#E74C3C" },
    { date: "15 de Mayo", state: "Estado de ánimo bajo", icon: "sad-outline", color: "#F39C12" },
    { date: "10 de Mayo", state: "Estrés alto", icon: "alert-circle-outline", color: "#E67E22" },
    { date: "5 de Mayo", state: "Estado estable", icon: "happy-outline", color: "#2ECC71" },
    { date: "1 de Mayo", state: "Ansiedad leve", icon: "happy-outline", color: "#3498DB" },
  ];

  const handleShare = () => {
    Alert.alert("Historial compartido", "Tu historial fue enviado al profesional (simulado)");
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi Historial</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Sección 1: Resumen de interacciones */}
        <Text style={styles.sectionTitle}>Resumen de Interacciones</Text>
        <View style={styles.sectionCard}>
          <Text style={styles.subText}>Interacciones con la IA</Text>
          <Text style={styles.bigNumber}>15</Text>
          <Text style={styles.smallText}>Últimos 30 días</Text>
          <View style={styles.chartContainer}>
            {interactionData.map((d, i) => (
              <View key={i} style={styles.chartBarContainer}>
                <View style={[styles.chartBar, { height: d.value * 1.2 }]} />
                <Text style={styles.chartLabel}>{d.week}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Sección 2: Estados emocionales */}
        <Text style={styles.sectionTitle}>Registro de Estados Emocionales</Text>
        <View style={styles.sectionCard}>
          {emotionalRecords.map((rec, i) => (
            <View key={i} style={styles.emotionRow}>
              <Ionicons name={rec.icon} size={24} color={rec.color} style={{ width: 30 }} />
              <Text style={styles.emotionDate}>{rec.date}:</Text>
              <Text style={[styles.emotionState, { color: rec.color }]}>{rec.state}</Text>
            </View>
          ))}
        </View>

        {/* Sección 3: Compartir historial */}
        <Text style={styles.sectionTitle}>Compartir con Profesional</Text>
        <View style={styles.sectionCard}>
          <Text style={styles.subText}>
            Puedes compartir tu historial con un profesional autorizado. La información será
            tratada de forma segura y confidencial.
          </Text>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={20} color="#fff" />
            <Text style={styles.shareText}>Compartir Historial</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Menú inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("ChatEmpatico")}
        >
          <Ionicons name="chatbubbles-outline" size={24} color="#999" />
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("LineasAyuda")}
        >
          <Ionicons name="alert-circle-outline" size={24} color="#999" />
          <Text style={styles.navText}>Emergencia</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="#007AFF" />
          <Text style={[styles.navText, styles.navTextActive]}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", paddingTop: 50 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 15 },
  headerTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 20 },
  scrollView: { paddingHorizontal: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#333", marginTop: 20, marginBottom: 10 },
  sectionCard: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 10,
  },
  subText: { fontSize: 14, color: "#555", marginBottom: 8 },
  smallText: { fontSize: 12, color: "#aaa" },
  bigNumber: { fontSize: 40, fontWeight: "bold", color: "#007AFF", textAlign: "center" },
  chartContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  chartBarContainer: { alignItems: "center", width: 40 },
  chartBar: { width: 15, backgroundColor: "#007AFF", borderRadius: 5 },
  chartLabel: { fontSize: 10, color: "#888", marginTop: 5 },
  emotionRow: { flexDirection: "row", alignItems: "center", marginVertical: 6 },
  emotionDate: { fontSize: 14, color: "#444", marginHorizontal: 8 },
  emotionState: { fontSize: 14, fontWeight: "bold" },
  shareButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  shareText: { color: "#fff", fontWeight: "bold", marginLeft: 6 },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    paddingVertical: 10,
    backgroundColor: "#FFF",
    paddingBottom: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, color: "#999" },
  navTextActive: { color: "#007AFF", fontWeight: "600" },
});
