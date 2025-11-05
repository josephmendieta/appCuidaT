import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

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
  };

  // 🔹 Cambiar foto de perfil (base64)
  const cambiarFoto = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso denegado", "Se necesita acceso a la galería para cambiar la foto de perfil.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        allowsEditing: true,
        quality: 0.5,
      });

      if (!result.canceled) {
        const imagenBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
        const user = auth.currentUser;

        if (user) {
          const userRef = doc(db, "usuarios", user.uid);
          await updateDoc(userRef, { fotoPerfil: imagenBase64 });

          setUserData((prev) => ({ ...prev, fotoPerfil: imagenBase64 }));
          Alert.alert("Foto actualizada", "Tu foto de perfil ha sido actualizada correctamente.");
        }
      }
    } catch (error) {
      console.error("❌ Error al cambiar la foto:", error);
      Alert.alert("Error", "No se pudo cambiar la foto de perfil.");
    }
  };

  // 🔹 Mostrar loader mientras carga
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.loaderContainer}>
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
          {userData.fotoPerfil ? (
            <Image source={{ uri: userData.fotoPerfil }} style={styles.profileImage} />
          ) : (
            <Ionicons name="person-circle-outline" size={100} color="#ccc" />
          )}
          <TouchableOpacity onPress={cambiarFoto}>
            <Text style={styles.changePhotoText}>Cambiar foto</Text>
          </TouchableOpacity>
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

        {/* Privacidad */}
        <Text style={styles.sectionTitle}>Bienestar y Privacidad</Text>
        <View style={styles.sectionCard}>
          <OptionRow iconName="history" label="Historial de Bienestar" onPress={() => navigation.navigate("Historial")} />
          <OptionRow
            iconName="shield-lock-outline"
            label="Privacidad de Datos"
            onPress={() => navigation.navigate("ResumenPrivacidad")}
          />
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
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 15 },
  headerTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 20 },
  scrollView: { paddingHorizontal: 20 },
  profileImageContainer: { alignItems: "center", marginBottom: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  changePhotoText: { color: "#007AFF", marginTop: 8, fontWeight: "500" },
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
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  infoIcon: { marginRight: 15 },
  infoTextContainer: { flex: 1 },
  infoLabel: { fontSize: 14, color: "#999", marginBottom: 2 },
  infoValue: { fontSize: 16, color: "#333", fontWeight: "500" },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  optionContent: { flexDirection: "row", alignItems: "center" },
  optionIcon: { marginRight: 15 },
  optionLabel: { fontSize: 16, color: "#333" },
  dangerOption: { borderBottomWidth: 0 },
  dangerLabel: { color: "#E53935", fontWeight: "500" },
});
