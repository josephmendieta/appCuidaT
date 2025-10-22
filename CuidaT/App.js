import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

// Pantallas
import Bienvenida from "./screens/Bienvenida";
import Inicio from "./screens/Inicio";
import Registro from "./screens/Registro";
import ConfPrivacidad from "./screens/confPrivacidad";

// Contexto de inactividad
import { InactivityProvider } from "./context/InactivityContext";

const Stack = createNativeStackNavigator();

// 🔹 Flujo de autenticación (sin sesión iniciada)
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Bienvenida">
    <Stack.Screen name="Bienvenida" component={Bienvenida} />
    <Stack.Screen name="Inicio" component={Inicio} />
    <Stack.Screen name="Registro" component={Registro} />
  </Stack.Navigator>
);

// 🔹 Flujo principal (cuando hay sesión activa)
const AppStack = ({ navigation }) => (
  <InactivityProvider navigation={navigation}>
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ConfPrivacidad">
      <Stack.Screen name="ConfPrivacidad" component={ConfPrivacidad} />
    </Stack.Navigator>
  </InactivityProvider>
);

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Escucha el estado de autenticación del usuario
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("✅ Usuario autenticado:", user.email);
        setUsuario(user);
      } else {
        console.log("⚠️ No hay sesión iniciada");
        setUsuario(null);
      }
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
