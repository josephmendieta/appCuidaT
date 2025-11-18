import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ChatEmpatico({ navigation }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ia",
      text: "Hola, soy tu asistente de apoyo. Estoy aquí para escucharte y ayudarte a manejar tus emociones. ¿Cómo te sientes hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { id: Date.now(), sender: "user", text: input };
    setMessages([...messages, newMessage]);

    const userMsg = input;
    setInput("");

    try {
      const resp = await fetch("https://us-central1-TU_PROYECTO.cloudfunctions.net/cuidatChat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          emocion: "ansiedad" // si quieres conectar con la cámara luego
        }),
      });

      const data = await resp.json();

      const aiResponse = {
        id: Date.now() + 1,
        sender: "ia",
        text: data.respuesta,
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "ia",
          text: "Lo siento, tuve un problema para responder. ¿Intentamos de nuevo?",
        },
      ]);
    }
  };

  const handleVoiceInput = () => {
    setIsRecording((prev) => !prev);
    console.log(isRecording ? "🛑 Grabación detenida" : "🎤 Grabando voz...");
  };

  const handleCamera = () => {
    navigation.navigate("CamaraScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chat con IA Empática</Text>
        </View>

        {/* Chat */}
        <ScrollView
          style={styles.chatContainer}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.message,
                msg.sender === "user" ? styles.userMsg : styles.aiMsg,
              ]}
            >
              {msg.sender === "ia" && (
                <Ionicons
                  name="person-circle-outline"
                  size={32}
                  color="#555"
                  style={{ marginRight: 8 }}
                />
              )}
              <View style={{ flexShrink: 1 }}>
                <Text
                  style={{
                    color: msg.sender === "user" ? "#fff" : "#000",
                    fontSize: 15,
                    lineHeight: 21,
                  }}
                >
                  {msg.text}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Barra de escritura */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escribe tu mensaje..."
            placeholderTextColor="#999"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity
            style={[
              styles.iconButton,
              isRecording && { backgroundColor: "#ff4d4d" },
            ]}
            onPress={handleVoiceInput}
          >
            <Ionicons
              name={isRecording ? "mic" : "mic-outline"}
              size={22}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleCamera}>
            <Ionicons name="camera-outline" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleSend}>
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Menú inferior */}
        <View style={styles.menuInferior}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("ChatEmpatico")}
          >
            <Ionicons name="chatbubble" size={24} color="#3da9fc" />
            <Text style={[styles.menuText, styles.activeText]}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("LineasAyuda")}
          >
            <Ionicons name="alert-circle-outline" size={24} color="#A0A0A0" />
            <Text style={styles.menuText}>Emergencia</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Perfil")}
          >
            <Ionicons name="person-outline" size={24} color="#A0A0A0" />
            <Text style={styles.menuText}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* 🎨 Estilos mejorados para iPhone 13 */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  message: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
    maxWidth: "85%",
  },
  userMsg: {
    alignSelf: "flex-end",
    backgroundColor: "#3da9fc",
    borderRadius: 18,
    padding: 12,
    marginLeft: 50,
  },
  aiMsg: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f1f1",
    borderRadius: 18,
    padding: 12,
    flexDirection: "row",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
    color: "#000",
  },
  iconButton: {
    marginLeft: 8,
    backgroundColor: "#3da9fc",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  menuInferior: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  menuText: {
    fontSize: 12,
    color: "#A0A0A0",
    marginTop: 4,
  },
  activeText: {
    color: "#3da9fc",
    fontWeight: "600",
  },
});
