import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { db, auth } from "../firebaseConfig";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";


export default function Historial({ navigation }) {
  const [interacciones, setInteracciones] = useState([]);
  const [emociones, setEmociones] = useState([]);
  const [compartidos, setCompartidos] = useState([]);

  // 🔥 Cargar datos desde Firestore
  useEffect(() => {
    cargarHistorial();
  }, []);

  const cargarHistorial = async () => {
    try {
      const uid = auth.currentUser.uid;

      // 🔹 1. Interacciones
      const interRef = collection(db, "usuarios", uid, "interacciones");
      const interQ = query(interRef, orderBy("fecha", "desc"));
      const interSnap = await getDocs(interQ);
      setInteracciones(interSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      // 🔹 2. Registros emocionales
      const emoRef = collection(db, "usuarios", uid, "registros_emocionales");
      const emoQ = query(emoRef, orderBy("fecha", "desc"));
      const emoSnap = await getDocs(emoQ);
      setEmociones(emoSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      // 🔹 3. Compartidos con profesionales
      const compRef = collection(db, "usuarios", uid, "historial_compartido");
      const compQ = query(compRef, orderBy("fecha_compartido", "desc"));
      const compSnap = await getDocs(compQ);
      setCompartidos(compSnap.docs.map(d => ({ id: d.id, ...d.data() })));

    } catch (e) {
      console.log("Error cargando historial:", e);
    }
  };

  const handleShare = () => {
    Alert.alert("Historial compartido", "Tu historial fue enviado al profesional.");
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi Historial</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 🟦 INTERACCIONES */}
        <Text style={styles.sectionTitle}>Interacciones</Text>
        <View style={styles.sectionCard}>
          {interacciones.length === 0 ? (
            <Text style={{ color: "#777" }}>No hay interacciones registradas.</Text>
          ) : (
            interacciones.map((i) => (
              <View key={i.id} style={styles.row}>
                <Ionicons name="chatbubble-outline" size={22} color="#007AFF" />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.rowTitle}>{i.tipo}</Text>
                  <Text style={styles.rowDate}>
                    {i.fecha?.toDate().toLocaleString()}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* 🟩 REGISTROS EMOCIONALES */}
        <Text style={styles.sectionTitle}>Registros Emocionales</Text>
        <View style={styles.sectionCard}>
          {emociones.length === 0 ? (
            <Text style={{ color: "#777" }}>Aún no registras emociones.</Text>
          ) : (
            emociones.map((e) => (
              <View key={e.id} style={styles.row}>
                <Ionicons
                  name={
                    e.emocion.categoria === "Negativa"
                      ? "sad-outline"
                      : "happy-outline"
                  }
                  size={26}
                  color={e.emocion.color_categoria}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.rowTitle}>{e.emocion.nombre}</Text>
                  <Text style={styles.rowSub}>
                    Intensidad: {e.intensidad}/10
                  </Text>
                  <Text style={styles.rowDate}>
                    {e.fecha?.toDate().toLocaleString()}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* 🟧 COMPARTIDOS */}
        <Text style={styles.sectionTitle}>Historial Compartido</Text>
        <View style={styles.sectionCard}>
          {compartidos.length === 0 ? (
            <Text style={{ color: "#777" }}>No has compartido tu historial.</Text>
          ) : (
            compartidos.map((c) => (
              <View key={c.id} style={styles.row}>
                <Ionicons
                  name="person-circle-outline"
                  size={28}
                  color="#E67E22"
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.rowTitle}>
                    {c.profesional.nombre} ({c.profesional.especialidad})
                  </Text>
                  <Text style={styles.rowDate}>
                    {c.fecha_compartido?.toDate().toLocaleString()}
                  </Text>
                </View>
              </View>
            ))
          )}

          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => navigation.navigate("CompartirHistorial")}
          >
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
    </SafeAreaView>
  );
}

/* ======== ESTILOS ======== */
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 120 },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
  sectionCard: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
  },
  rowTitle: { fontSize: 15, fontWeight: "bold", color: "#333" },
  rowSub: { fontSize: 13, color: "#666" },
  rowDate: { fontSize: 12, color: "#777" },

  shareButton: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  shareText: { color: "#fff", fontWeight: "bold", marginLeft: 6 },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    paddingVertical: 10,
    backgroundColor: "#FFF",
    paddingBottom: Platform.OS === "ios" ? 30 : 15,
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, color: "#999" },
  navTextActive: { color: "#007AFF", fontWeight: "600" },
});
