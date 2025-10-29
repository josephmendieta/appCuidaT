import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LineasAyuda = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={styles.container}>
          {/* Encabezado */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Líneas de Ayuda</Text>
          </View>

          {/* Sección principal */}
          <View style={styles.section}>
            <Text style={styles.title}>Contacta con Apoyo Inmediato</Text>
            <Text style={styles.description}>
              Si estás experimentando una crisis emocional severa o pensamientos de autolesión,
              presiona el botón para llamar a una línea de ayuda.
            </Text>

            <TouchableOpacity style={styles.mainButton}>
              <Ionicons name="call-outline" size={20} color="white" />
              <Text style={styles.mainButtonText}>Llamar a la Línea de Ayuda</Text>
            </TouchableOpacity>
          </View>

          {/* Recursos adicionales */}
          <View style={styles.additionalSection}>
            <Text style={styles.subTitle}>Recursos Adicionales</Text>

            <View style={styles.resourceCard}>
              <View style={styles.resourceInfo}>
                <Ionicons name="headset-outline" size={28} color="#4FA3FF" style={styles.icon} />
                <View>
                  <Text style={styles.resourceTitle}>Línea de Prevención del Suicidio</Text>
                  <Text style={styles.resourceSubtitle}>Disponible 24/7</Text>
                </View>
              </View>
              <Ionicons name="call-outline" size={24} color="#4FA3FF" />
            </View>

            <View style={styles.resourceCard}>
              <View style={styles.resourceInfo}>
                <Ionicons name="happy-outline" size={28} color="#4FA3FF" style={styles.icon} />
                <View>
                  <Text style={styles.resourceTitle}>Línea de Crisis Emocional</Text>
                  <Text style={styles.resourceSubtitle}>Disponible de 9am a 9pm</Text>
                </View>
              </View>
              <Ionicons name="call-outline" size={24} color="#4FA3FF" />
            </View>
          </View>
        </ScrollView>

        {/* ✅ Menú inferior fijo y visible */}
        <View style={styles.menuInferior}>
          {/* Chat */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("ChatEmpatico")}
          >
            <Ionicons name="chatbubble-outline" size={24} color="#A0A0A0" />
            <Text style={styles.menuText}>Chat</Text>
          </TouchableOpacity>

          {/* Ayuda */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Ayuda")}
          >
            <Ionicons name="heart-outline" size={24} color="#A0A0A0" />
            <Text style={[styles.menuText, { color: "#A0A0A0" }]}>Ayuda</Text>
          </TouchableOpacity>

          {/* Perfil */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Perfil")} // ¡Aquí va la función onPress!
          >
            <Ionicons name="person-outline" size={24} color="#A0A0A0" />
            <Text style={styles.menuText}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LineasAyuda;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  container: {
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4FA3FF',
    paddingVertical: 12,
    borderRadius: 10,
  },
  mainButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  additionalSection: {
    marginBottom: 80,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 15,
  },
  resourceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  resourceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  resourceTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  resourceSubtitle: {
    fontSize: 13,
    color: '#777',
  },
  // 🔹 Menú inferior fijo
  menuInferior: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  menuItem: {
    alignItems: "center",
  },
  menuText: {
    fontSize: 12,
    color: "#A0A0A0",
  },
});
