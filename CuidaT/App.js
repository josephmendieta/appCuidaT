import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

// RootNavigation
import { navigationRef } from "./RootNavigation";

// Screens
import Bienvenida from "./screens/Bienvenida";
import Inicio from "./screens/Inicio";
import Registro from "./screens/Registro";
import ChatEmpatico from "./screens/ChatEmpatico";
import CamaraScreen from "./screens/CamaraScreen";
import LineasAyuda from "./screens/LineasAyuda";
import Ayuda from "./screens/Ayuda";
import Perfil from "./screens/Perfil";
import ResumenPrivacidad from "./screens/ResumenPrivacidad";
import Historial from "./screens/Historial";
import CompartirHistorial from "./screens/CompartirHistorial";

// Context
import { InactivityProvider } from "./context/InactivityContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* ============================================================
   🔹 BOTTOM TABS (ChatEmpatico es la pantalla inicial)
   ============================================================ */
function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="ChatEmpatico"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3da9fc",
        tabBarInactiveTintColor: "#888",
      }}
    >
      <Tab.Screen
        name="Cámara"
        component={CamaraScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="camera-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="ChatEmpatico"
        component={ChatEmpatico}
        options={{
          title: "Chat",
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="LineasAyuda"
        component={LineasAyuda}
        options={{
          title: "Emergencia",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="warning-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/* ============================================================
   🔹 STACK PRINCIPAL (usuarios autenticados)
   ============================================================ */
function AppStack() {
  return (
    <InactivityProvider>
      <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{ headerShown: false }}
      >
        {/* Pantalla principal con Tabs */}
        <Stack.Screen name="MainTabs" component={AppTabs} />

        {/* Pantallas secundarias */}
        <Stack.Screen name="Ayuda" component={Ayuda} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="ResumenPrivacidad" component={ResumenPrivacidad} />
        <Stack.Screen name="Historial" component={Historial} />
        <Stack.Screen name="CompartirHistorial" component={CompartirHistorial} />

        {/* Acceso directo */}
        <Stack.Screen name="ChatEmpatico" component={ChatEmpatico} />
        <Stack.Screen name="LineasAyuda" component={LineasAyuda} />
        <Stack.Screen name="CamaraScreen" component={CamaraScreen} />

        {/* Autenticación por si navegan manualmente */}
        <Stack.Screen name="Bienvenida" component={Bienvenida} />
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Registro" component={Registro} />
      </Stack.Navigator>
    </InactivityProvider>
  );
}

/* ============================================================
   🔹 STACK DE AUTENTICACIÓN
   ============================================================ */
function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Bienvenida"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Bienvenida" component={Bienvenida} />
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Registro" component={Registro} />
    </Stack.Navigator>
  );
}

/* ============================================================
   🔹 APP PRINCIPAL
   ============================================================ */
export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  /* 🔥 Aquí se hace la redirección automática al Chat */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCargando(false);

      if (user) {
        console.log("➡ Usuario autenticado, navegando a ChatEmpatico…");

        // Redirección GLOBAL al chat
        setTimeout(() => {
          if (navigationRef.isReady()) {
            navigationRef.reset({
              index: 0,
              routes: [{ name: "ChatEmpatico" }],
            });
          }
        }, 200);
      }
    });

    return unsubscribe;
  }, []);

  if (cargando) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3da9fc" />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
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
