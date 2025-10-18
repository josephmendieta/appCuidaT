import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Inicio from "./Inicio";

const { width, height } = Dimensions.get("window");

export default function Bienvenida({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logoCuidaT-removebg-preview.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Texto */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>CuidaT</Text>
        <Text style={styles.subtitle}>
          Primeros Auxilios Digitales con un Toque Humano.
        </Text>
      </View>

      {/* Botón */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Inicio")}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Comenzar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: height * 0.02, // margen adaptable al alto del dispositivo
  },
  logoContainer: {
    flex: 3, // ocupa más espacio
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: width * 1,
    height: undefined,
    aspectRatio: 1,       // mantiene la proporción original
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: width * 0.1, // padding relativo
  },
  title: {
    fontSize: width * 0.08, // tamaño de fuente adaptable
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: width * 0.04,
    color: "gray",
    textAlign: "center",
    marginTop: 8,
  },
  button: {
    backgroundColor: "#3da9fc",
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.25,
    borderRadius: 30,
    marginBottom: height * 0.04,
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "600",
  },
});
