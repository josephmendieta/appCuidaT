import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function CamaraScreen({ navigation }) {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef(null);

  const emociones = [
    { nombre: "Ansiedad", icono: "sad-outline" },
    { nombre: "Tristeza", icono: "sad" },
    { nombre: "Enojo", icono: "alert-circle-outline" },
    { nombre: "Felicidad", icono: "happy-outline" },
  ];

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  const iniciarAnalisis = () => {
    if (!selectedEmotion) {
      alert("Selecciona una emoción antes de iniciar el análisis.");
      return;
    }
    console.log("🎭 Emoción seleccionada:", selectedEmotion);
    Alert.alert("Análisis iniciado", `Detectando: ${selectedEmotion}`);
  };

  if (!permission) {
    return (
      <View style={styles.permissionContainer}>
        <Text>Cargando permisos...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={{ textAlign: "center", marginBottom: 10 }}>
          Necesitamos permiso para acceder a tu cámara.
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>
            Conceder permiso
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Encabezado */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={26} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Análisis Facial</Text>
        </View>

        {/* Título y descripción */}
        <Text style={styles.title}>Detecta tus emociones</Text>
        <Text style={styles.description}>
          Esta herramienta utilizará tu cámara para analizar tus expresiones
          faciales y detectar emociones.
        </Text>

        {/* Vista previa real de la cámara */}
        <View style={styles.cameraContainer}>
          <CameraView
            style={StyleSheet.absoluteFillObject}
            facing="front"
            ref={cameraRef}
            onCameraReady={() => setIsCameraReady(true)}
          />
        </View>

        {/* Tarjetas de emociones */}
        <View style={styles.emotionsContainer}>
          {emociones.map((e, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.emotionCard,
                selectedEmotion === e.nombre && styles.emotionSelected,
              ]}
              onPress={() => setSelectedEmotion(e.nombre)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={e.icono}
                size={30}
                color={selectedEmotion === e.nombre ? "#fff" : "#555"}
              />
              <Text
                style={[
                  styles.emotionText,
                  selectedEmotion === e.nombre && { color: "#fff" },
                ]}
              >
                {e.nombre}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botón de análisis */}
        <TouchableOpacity
          style={[
            styles.startButton,
            !selectedEmotion && { opacity: 0.6 },
          ]}
          onPress={iniciarAnalisis}
          disabled={!selectedEmotion}
        >
          <Text style={styles.startText}>Iniciar Análisis</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    minHeight: height,
    backgroundColor: "#fff",
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
    width: "100%",
    height: 300,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  emotionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  emotionCard: {
    width: "47%",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  emotionSelected: {
    backgroundColor: "#3da9fc",
    borderColor: "#3da9fc",
  },
  emotionText: {
    marginTop: 8,
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
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
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  permissionButton: {
    backgroundColor: "#3da9fc",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
