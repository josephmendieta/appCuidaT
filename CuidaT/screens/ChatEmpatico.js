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

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = { id: Date.now(), sender: "user", text: input };
    setMessages([...messages, newMessage]);
    setInput("");
    // Simular respuesta de la IA
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        sender: "ia",
        text: "Entiendo. A veces, la vida puede ser así. ¿Hay algo en particular que te esté causando este sentimiento?",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1200);
  };

  const handleVoiceInput = () => {
    setIsRecording((prev) => !prev);

    if (!isRecording) {
      console.log("🎤 Grabando voz...");
      // Aquí conectarás la IA de análisis de voz (por ejemplo, usando Whisper, Azure o Google Speech)
    } else {
      console.log("🛑 Grabación detenida. Procesando audio...");
      // Aquí podrías mostrar un texto transcrito o analizar tono emocional
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat con IA Empática</Text>
      </View>

      <ScrollView style={styles.chatContainer}>
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
                }}
              >
                {msg.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu mensaje..."
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
        <TouchableOpacity style={styles.iconButton} onPress={handleSend}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 15,
    color: "#000",
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  message: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    maxWidth: "90%",
  },
  userMsg: {
    alignSelf: "flex-end",
    backgroundColor: "#3da9fc",
    borderRadius: 16,
    padding: 10,
    marginLeft: 50,
  },
  aiMsg: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f1f1",
    borderRadius: 16,
    padding: 10,
    flexDirection: "row",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
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
  },
  iconButton: {
    marginLeft: 8,
    backgroundColor: "#3da9fc",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
