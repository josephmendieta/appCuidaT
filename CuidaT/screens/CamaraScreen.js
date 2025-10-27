import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";

export default function CamaraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const cameraRef = useRef(null);

  // ✅ Pedir permisos solo en dispositivos nativos
  useEffect(() => {
    if (Platform.OS !== "web") {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    } else {
      setHasPermission(true); // En web, asumimos permiso pero sin cámara
    }
  }, []);

  const iniciarCamara = () => {
    if (Platform.OS === "web") {
      Alert.alert("No disponible", "La cámara solo funciona en Android o iOS.");
      return;
    }
    if (hasPermission === false) {
      Alert.alert("Permiso denegado", "Debes habilitar la cámara en los ajustes.");
      return;
    }
    setIsCameraActive(true);
  };

  const detenerCamara = () => {
    setIsCameraActive(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Análisis Facial</Text>
      </View>

      {!isCameraActive ? (
        <>
          <Text style={styles.title}>Detecta tus emociones</Text>
          <Text style={styles.description}>
            Esta herramienta utiliza la cámara para analizar tus expresiones faciales.
            Puedes iniciar la cámara cuando estés listo.
          </Text>

          {/* Imagen central */}
          <View style={styles.cameraContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
              }}
              style={{ width: "100%", height: 220 }}
            />
            <TouchableOpacity style={styles.playButton} onPress={iniciarCamara}>
              <Ionicons name="play-circle" size={60} color="#555" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.startButton} onPress={iniciarCamara}>
            <Text style={styles.startText}>Iniciar Cámara</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {Platform.OS === "web" ? (
            <Text style={styles.notSupported}>
              ⚠️ La cámara no está disponible en el navegador web.
            </Text>
          ) : (
            <Camera
              ref={cameraRef}
              style={styles.cameraView}
              type={CameraType.front}
            />
          )}

          <TouchableOpacity style={styles.stopButton} onPress={detenerCamara}>
            <Text style={styles.stopText}>Detener Cámara</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
    marginBottom: 20,
  },
  cameraContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
    position: "relative",
    marginBottom: 20,
  },
  playButton: {
    position: "absolute",
    alignSelf: "center",
  },
  startButton: {
    backgroundColor: "#3da9fc",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  startText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  cameraView: {
    width: "100%",
    height: 400,
    borderRadius: 15,
    overflow: "hidden",
  },
  stopButton: {
    marginTop: 25,
    backgroundColor: "#EF4444",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  stopText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  notSupported: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 16,
    marginTop: 20,
  },
});
