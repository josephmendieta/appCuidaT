import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useNavigation } from "@react-navigation/native";

// Pantallas
import Bienvenida from "./screens/Bienvenida";
import Inicio from "./screens/Inicio";
import Registro from "./screens/Registro";
import ConfPrivacidad from "./screens/confPrivacidad";
import ChatEmpatico from "./screens/ChatEmpatico";
import CamaraScreen from "./screens/CamaraScreen";

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
const AppStack = () => {
  const navigation = useNavigation();

  return (
    <InactivityProvider navigation={navigation}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ConfPrivacidad">
        <Stack.Screen name="ConfPrivacidad" component={ConfPrivacidad} />
        <Stack.Screen name="ChatEmpatico" component={ChatEmpatico} />
        <Stack.Screen name="CamaraScreen" component={CamaraScreen} />
      </Stack.Navigator>
    </InactivityProvider>
  );
};

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // ✅ Escucha el estado de autenticación (sin getRedirectResult)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user || null);
      setCargando(false);
    });
    return unsubscribe;
  }, []);

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
