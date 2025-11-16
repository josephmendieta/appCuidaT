import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

// Screens
import Bienvenida from "./screens/Bienvenida";
import Inicio from "./screens/Inicio";
import Registro from "./screens/Registro";
import ChatEmpatico from "./screens/ChatEmpatico";
import CamaraScreen from "./screens/CamaraScreen";
import LineasAyuda from "./screens/LineasAyuda";
import Ayuda from "./screens/Ayuda";
import Perfil from "./screens/Perfil.js";
import ResumenPrivacidad from "./screens/ResumenPrivacidad.js";
import Historial from "./screens/Historial";

// Contexto
import { InactivityProvider } from "./context/InactivityContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


// 🔹 Tabs principales (aquí ChatEmpatico es la pantalla inicial)
function AppTabs({ navigation, route }) {
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
          tabBarStyle: { display: "none" }, // 👈 SE OCULTA AQUÍ — NO EN EL NAVIGATOR
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


// 🔹 Stack principal para usuarios autenticados
function AppStack() {
  return (
    <InactivityProvider>
      <Stack.Navigator
        // 🟢 ChatEmpatico será la primera pantalla porque es la ruta inicial
        // de MainTabs, que a su vez es la ruta inicial de AppStack.
        initialRouteName="MainTabs"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="MainTabs" component={AppTabs} />

        {/* Otras pantallas */}
        <Stack.Screen name="Ayuda" component={Ayuda} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="ResumenPrivacidad" component={ResumenPrivacidad} />
        <Stack.Screen name="Historial" component={Historial} />
        <Stack.Screen name="Bienvenida" component={Bienvenida} />
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Registro" component={Registro} />
      </Stack.Navigator>
    </InactivityProvider>
  );
}


// 🔹 Flujo de autenticación (NO toca ChatEmpatico)
function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Bienvenida" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Bienvenida" component={Bienvenida} />
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Registro" component={Registro} />
    </Stack.Navigator>
  );
}


// 🔹 App principal
export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCargando(false);
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