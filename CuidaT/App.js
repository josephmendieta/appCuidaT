import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importa tus pantallas
import Bienvenida from "./screens/Bienvenida";
import Inicio from "./screens/Inicio";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Bienvenida"
        screenOptions={{
          headerShown: false, // Oculta la barra superior
        }}
      >
        <Stack.Screen name="Bienvenida" component={Bienvenida} />
        <Stack.Screen name="Inicio" component={Inicio} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
