import React, { createContext, useEffect, useRef, useState } from "react";
import { AppState, Modal, Text, TouchableOpacity, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export const InactivityContext = createContext();

/**
 * Proveedor global de detección de inactividad con advertencia y cierre automático.
 */
export function InactivityProvider({ navigation, children, timeout = 60000 }) {
  const mainTimerRef = useRef(null);
  const warningTimerRef = useRef(null);
  const countdownRef = useRef(null);

  const [showWarning, setShowWarning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(30);

  const resetTimers = () => {
    clearTimeout(mainTimerRef.current);
    clearTimeout(warningTimerRef.current);
    clearInterval(countdownRef.current);
    setShowWarning(false);
    setSecondsLeft(30);

    // Mostrar advertencia 30 segundos antes del cierre
    warningTimerRef.current = setTimeout(() => {
      setShowWarning(true);
      startCountdown();
    }, timeout - 30000);

    // Cierre automático al cumplirse el tiempo
    mainTimerRef.current = setTimeout(handleLogout, timeout);
  };

  const startCountdown = () => {
    countdownRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          handleLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleLogout = async () => {
    clearTimeout(mainTimerRef.current);
    clearTimeout(warningTimerRef.current);
    clearInterval(countdownRef.current);
    setShowWarning(false);

    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: "Bienvenida" }],
      });
    } catch (error) {
      console.error("Error al cerrar sesión automáticamente:", error);
    }
  };

  // Detectar cambios de estado de la app (fondo / activo)
  useEffect(() => {
    resetTimers();

    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") resetTimers();
      else {
        clearTimeout(mainTimerRef.current);
        clearTimeout(warningTimerRef.current);
        clearInterval(countdownRef.current);
      }
    });

    return () => {
      clearTimeout(mainTimerRef.current);
      clearTimeout(warningTimerRef.current);
      clearInterval(countdownRef.current);
      subscription.remove();
    };
  }, []);

  return (
    <InactivityContext.Provider value={{ resetTimers }}>
      <TouchableWithoutFeedback onPress={resetTimers}>
        <View style={{ flex: 1 }}>
          {children}

          {/* Modal de advertencia */}
          <Modal visible={showWarning} transparent animationType="fade">
            <View style={styles.overlay}>
              <View style={styles.modal}>
                <Text style={styles.title}>Inactividad detectada</Text>
                <Text style={styles.message}>
                  Tu sesión se cerrará automáticamente en{" "}
                  <Text style={styles.timer}>{secondsLeft}</Text> segundos.
                </Text>

                <TouchableOpacity style={styles.button} onPress={resetTimers}>
                  <Text style={styles.buttonText}>Seguir conectado</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </InactivityContext.Provider>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0066cc",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
    color: "#333",
  },
  timer: {
    fontWeight: "bold",
    color: "#ff4444",
  },
  button: {
    backgroundColor: "#0066cc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
