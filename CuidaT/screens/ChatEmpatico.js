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

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = { id: Date.now(), sender: "user", text: input };
    setMessages([...messages, newMessage]);
    setInput("");

    // Simular respuesta IA
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
    console.log(isRecording ? "🛑 Grabación detenida" : "🎤 Grabando voz...");
  };

  const handleCamera = () => {
    navigation.navigate("CamaraScreen");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
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
          contentContainerStyle={{ paddingBottom: 80 }}
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
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="chatbubble-outline" size={24} color="#3da9fc" />
            <Text style={[styles.menuText, { color: "#3da9fc" }]}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="alert-circle-outline" size={24} color="#A0A0A0" />
            <Text style={styles.menuText}>Emergencia</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="person-outline" size={24} color="#A0A0A0" />
            <Text style={styles.menuText}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
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
  menuInferior: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
  menuItem: {
    alignItems: "center",
  },
  menuText: {
    fontSize: 12,
    color: "#A0A0A0",
  },
});
