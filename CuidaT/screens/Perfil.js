import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, ActivityIndicator } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function Perfil({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notificaciones, setNotificaciones] = useState(true);

  // 🔹 Cargar datos del usuario desde Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "usuarios", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("⚠️ No se encontró el documento del usuario.");
          }
        }
      } catch (error) {
        console.error("❌ Error al obtener los datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // 🔹 Cerrar sesión
  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Seguro que quieres salir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Salir",
        style: "destructive",
        onPress: async () => {
          await auth.signOut();
          navigation.reset({
            index: 0,
            routes: [{ name: "Bienvenida" }],
          });
        },
      },
    ]);
  };

  // 🔹 Cambiar estado de notificaciones
  const toggleNotificaciones = () => {
    setNotificaciones((prev) => !prev);
    console.log(`🔔 Notificaciones ${!notificaciones ? "activadas" : "desactivadas"}`);
  };

  // 🔹 Navegar
  const handleHistorial = () => navigation.navigate("Historial");
  const handlePrivacidad = () => navigation.navigate("ResumenPrivacidad");

  // 🔹 Mostrar loader mientras carga
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  // 🔹 Si no hay datos
  if (!userData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No se encontraron datos del usuario.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Imagen de perfil */}
        <View style={styles.profileImageContainer}>
          <Ionicons name="person-circle-outline" size={100} color="#ccc" />
          <Text style={styles.userName}>{userData.nombre}</Text>
          <Text style={styles.userSubtitle}>Usuario de CuidaT</Text>
        </View>

        {/* Cuenta */}
        <Text style={styles.sectionTitle}>Cuenta</Text>
        <View style={styles.sectionCard}>
          <InfoRow iconName="mail-outline" label="Correo electrónico" value={userData.email} />
          <InfoRow iconName="call-outline" label="Teléfono" value={userData.telefono || "No registrado"} />
          <InfoRow
            iconName="calendar-outline"
            label="Fecha de nacimiento"
            value={userData.fechaNacimiento || "No registrada"}
          />
        </View>

        {/* Bienestar y Privacidad */}
        <Text style={styles.sectionTitle}>Bienestar y Privacidad</Text>
        <View style={styles.sectionCard}>
          <OptionRow iconName="history" label="Historial de Bienestar" onPress={handleHistorial} />
          <OptionRow iconName="shield-lock-outline" label="Privacidad de Datos" onPress={handlePrivacidad} />
        </View>

        {/* Configuración */}
        <Text style={styles.sectionTitle}>Configuración</Text>
        <View style={styles.sectionCard}>
          <OptionRow
            iconName="bell-outline"
            label={`Notificaciones ${notificaciones ? "activadas" : "desactivadas"}`}
            customRight={
              <Switch
                value={notificaciones}
                onValueChange={toggleNotificaciones}
                trackColor={{ false: "#ccc", true: "#007AFF" }}
                thumbColor="#fff"
              />
            }
          />
          <OptionRow iconName="logout" label="Cerrar sesión" isDanger onPress={handleLogout} />
        </View>
      </ScrollView>

      {/* Menú inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("ChatEmpatico")}>
          <Ionicons name="chatbubbles-outline" size={24} color="#999" />
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("LineasAyuda")}>
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

/* 🔸 COMPONENTES REUTILIZABLES 🔸 */
const InfoRow = ({ iconName, label, value }) => (
  <View style={styles.infoRow}>
    <Ionicons name={iconName} size={22} color="#666" style={styles.infoIcon} />
    <View style={styles.infoTextContainer}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const OptionRow = ({ iconName, label, isDanger = false, onPress, customRight }) => (
  <TouchableOpacity style={[styles.optionRow, isDanger && styles.dangerOption]} onPress={onPress}>
    <View style={styles.optionContent}>
      <MaterialCommunityIcons name={iconName} size={24} color={isDanger ? "#E53935" : "#666"} style={styles.optionIcon} />
      <Text style={[styles.optionLabel, isDanger && styles.dangerLabel]}>{label}</Text>
    </View>
    {customRight || <Ionicons name="arrow-forward" size={20} color="#999" />}
  </TouchableOpacity>
);

/* 🔸 ESTILOS 🔸 */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", paddingTop: 50 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 15 },
  headerTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 20 },
  scrollView: { paddingHorizontal: 20 },
  profileImageContainer: { alignItems: "center", marginBottom: 20 },
  userName: { fontSize: 18, fontWeight: "600", color: "#000", marginTop: 10 },
  userSubtitle: { fontSize: 14, color: "#777" },
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
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: "#EEE" },
  infoIcon: { marginRight: 15 },
  infoTextContainer: { flex: 1 },
  infoLabel: { fontSize: 14, color: "#999", marginBottom: 2 },
  infoValue: { fontSize: 16, color: "#333", fontWeight: "500" },
  optionRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: "#EEE" },
  optionContent: { flexDirection: "row", alignItems: "center" },
  optionIcon: { marginRight: 15 },
  optionLabel: { fontSize: 16, color: "#333" },
  dangerOption: { borderBottomWidth: 0 },
  dangerLabel: { color: "#E53935", fontWeight: "500" },
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
