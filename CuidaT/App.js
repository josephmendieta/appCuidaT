import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

// Screens
import Bienvenida from "./screens/Bienvenida";
import Inicio from "./screens/Inicio";
import Registro from "./screens/Registro";
import ConfPrivacidad from "./screens/confPrivacidad";
import ChatEmpatico from "./screens/ChatEmpatico";
import CamaraScreen from "./screens/CamaraScreen";
import LineasAyuda from "./screens/LineasAyuda";
import Ayuda from "./screens/Ayuda";
import Perfil from "./screens/Perfil.js";
import ResumenPrivacidad from "./screens/ResumenPrivacidad.js";
import Historial from "./screens/Historial";

// Contexto de inactividad
import { InactivityProvider } from "./context/InactivityContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


// 🔹 Tabs principales (una especie de menú inferior)
function AppTabs() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3da9fc",
        tabBarInactiveTintColor: "#888",
      }}
    >
      <Tab.Screen
        name="Privacidad"
        component={ConfPrivacidad}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="lock-closed-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Cámara"
        component={CamaraScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="camera-outline" color={color} size={size} />
          ),
        }}
      />

      {/* 🔹 Tab especial que redirige al ChatEmpatico */}
      <Tab.Screen
        name="Chat"
        component={ConfPrivacidad} // componente “dummy”
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-ellipses-outline" color={color} size={size} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // evita que cambie de tab
            navigation.navigate("ChatEmpatico"); // navega al screen real
          },
        }}
      />
      {/* 🔹 Nuevo Tab para Emergencia */}
      <Tab.Screen
        name="Emergencia"
        component={ConfPrivacidad} // placeholder igual que el Chat
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="warning-outline" color={color} size={size} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("LineasAyuda"); // va al screen real
          },
        }}
      />
    </Tab.Navigator>
  );
}


// 🔹 Stack principal (donde existe ChatEmpatico)
function AppStack() {
  return (
    <InactivityProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={AppTabs} />
        <Stack.Screen name="ConfPrivacidad" component={ConfPrivacidad} />
        <Stack.Screen name="ChatEmpatico" component={ChatEmpatico} />
        <Stack.Screen name="CamaraScreen" component={CamaraScreen} />
        <Stack.Screen name="LineasAyuda" component={LineasAyuda} />
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


// 🔹 Flujo de autenticación
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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
