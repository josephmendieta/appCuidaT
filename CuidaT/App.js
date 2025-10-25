import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, getRedirectResult } from "firebase/auth";
import { auth } from "./firebaseConfig";

// Pantallas
import Bienvenida from "./screens/Bienvenida";
import Inicio from "./screens/Inicio";
import Registro from "./screens/Registro";
import ConfPrivacidad from "./screens/ConfPrivacidad";
import ChatEmpatico from "./screens/ChatEmpatico";

// Contexto de inactividad
import { InactivityProvider } from "./context/InactivityContext";

const Stack = createNativeStackNavigator();

// 🔹 Flujo de autenticación (usuarios sin sesión iniciada)
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Bienvenida">
    <Stack.Screen name="Bienvenida" component={Bienvenida} />
    <Stack.Screen name="Inicio" component={Inicio} />
    <Stack.Screen name="Registro" component={Registro} />
  </Stack.Navigator>
);

// 🔹 Flujo principal (usuarios autenticados)
const AppStack = ({ navigation }) => (
  <InactivityProvider navigation={navigation}>
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ConfPrivacidad">
      <Stack.Screen name="ConfPrivacidad" component={ConfPrivacidad} />
      <Stack.Screen name="ChatEmpatico" component={ChatEmpatico} />
    </Stack.Navigator>
  </InactivityProvider>
);

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Recuperar sesión de redirección (ej. Google en móvil)
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          const user = result.user;
          console.log("✅ Usuario redirigido desde Google:", user.email);
          Alert.alert("Bienvenido", `Has iniciado sesión como ${user.displayName || user.email}`);
          setUsuario(user);
        }
      })
      .catch((error) => {
        if (error.message) console.warn("⚠️ Error en getRedirectResult:", error.message);
      });
  }, []);

  // Escucha el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user || null);
      setCargando(false);
    });
    return () => unsubscribe();
  }, []);

  // Pantalla de carga mientras se verifica la sesión
  if (cargando) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0066ff" />
      </View>
    );
  }

  // Renderizado condicional según autenticación
  return (
    <NavigationContainer>
      {usuario ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
