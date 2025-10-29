import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const Ayuda = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={styles.container}>
          {/* Encabezado */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Recursos y Ayuda</Text>
          </View>

          {/* Artículos y Consejos */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Artículos y Consejos</Text>

            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("DetalleAyuda", {
                  titulo: "Técnicas de relajación para manejar el estrés",
                  descripcion:
                    "Aprende ejercicios simples de respiración y relajación muscular para aliviar el estrés diario y mejorar tu bienestar general.",
                  enlace: "https://www.mayoclinic.org/es/healthy-lifestyle/stress-management/in-depth/relaxation-technique/art-20045368",
                })
              }
            >
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4284/4284560.png' }}
                style={styles.cardIcon}
              />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>Técnicas de relajación para manejar el estrés</Text>
                <Text style={styles.cardSubtitle}>Aprende técnicas efectivas para reducir el estrés diario.</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("DetalleAyuda", {
                  titulo: "Cómo encontrar el terapeuta adecuado en Suba",
                  descripcion:
                    "Te mostramos cómo identificar profesionales confiables en salud mental cerca de ti y qué aspectos considerar antes de elegir un terapeuta.",
                  enlace: "https://www.psychologytoday.com/co/psicologos/dc/bogota?gad_source=1&gad_campaignid=11313160308&gclid=Cj0KCQjwsPzHBhDCARIsALlWNG2b-3G5uYE61nz0q_IF4TAoSOmbH_svHkz7FA8NA90NF4-Kbu3g6KQaAvizEALw_wcB",
                })
              }
            >
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4206/4206233.png' }}
                style={styles.cardIcon}
              />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>Cómo encontrar el terapeuta adecuado en Suba</Text>
                <Text style={styles.cardSubtitle}>Guía para seleccionar un profesional de salud mental en tu área.</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("DetalleAyuda", {
                  titulo: "Ejercicios de mindfulness para la ansiedad",
                  descripcion:
                    "Aprende técnicas de atención plena que te ayudarán a mantenerte presente, reducir la ansiedad y mejorar tu equilibrio emocional.",
                  enlace: "https://www.youtube.com/watch?v=rgU1HQ6MYWQ",
                })
              }
            >
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4228/4228728.png' }}
                style={styles.cardIcon}
              />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>Ejercicios de mindfulness para la ansiedad</Text>
                <Text style={styles.cardSubtitle}>Prácticas de atención plena para calmar la mente.</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Preguntas Frecuentes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>

            <TouchableOpacity
              style={styles.faqItem}
              onPress={() =>
                navigation.navigate("DetalleAyuda", {
                  titulo: "¿Qué hacer en una crisis de ansiedad?",
                  descripcion:
                    "En una crisis de ansiedad, intenta respirar profundamente, busca un lugar tranquilo, y recuerda que la sensación pasará. Si se repite con frecuencia, contacta un profesional.",
                  enlace: "https://centromedicoabc.com/revista-digital/recupera-tu-control-ante-un-ataque-de-ansiedad",
                })
              }
            >
              <Text style={styles.faqText}>¿Qué hacer en una crisis de ansiedad?</Text>
              <Ionicons name="chevron-forward" size={20} color="#777" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.faqItem}
              onPress={() =>
                navigation.navigate("DetalleAyuda", {
                  titulo: "¿Cómo apoyar a un ser querido con depresión?",
                  descripcion:
                    "Escucha sin juzgar, ofrece tu compañía, y anima a la persona a buscar ayuda profesional. Evita minimizar sus emociones o decir que 'todo estará bien'.",
                  enlace: "https://www.mayoclinic.org/es/diseases-conditions/depression/in-depth/depression/art-20045943",
                })
              }
            >
              <Text style={styles.faqText}>¿Cómo apoyar a un ser querido con depresión?</Text>
              <Ionicons name="chevron-forward" size={20} color="#777" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.faqItem}
              onPress={() =>
                navigation.navigate("DetalleAyuda", {
                  titulo: "¿Cuáles son los recursos disponibles en Suba?",
                  descripcion:
                    "En Suba puedes acceder a líneas locales de apoyo psicológico, centros de atención comunitaria y programas gratuitos del distrito.",
                  enlace: "https://bogota.gov.co/mi-ciudad/salud/bogota-el-distrito-ofrece-ayuda-psicologica-gratis-cuales-son",
                })
              }
            >
              <Text style={styles.faqText}>¿Cuáles son los recursos disponibles en Suba?</Text>
              <Ionicons name="chevron-forward" size={20} color="#777" />
            </TouchableOpacity>
          </View>

          {/* Soporte Técnico */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Soporte Técnico</Text>

            <TouchableOpacity style={styles.supportCard}>
              <View style={styles.supportInfo}>
                <Ionicons name="headset-outline" size={26} color="#4FA3FF" />
                <Text style={styles.supportText}>Contactar Soporte</Text>
              </View>
              <Ionicons name="call-outline" size={22} color="#4FA3FF" />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* ✅ Menú inferior */}
        <View style={styles.menuInferior}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("ChatEmpatico")}
          >
            <Ionicons name="chatbubble-outline" size={24} color="#A0A0A0" />
            <Text style={styles.menuText}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("LineasAyuda")}
          >
            <Ionicons name="alert-circle-outline" size={24} color="#A0A0A0" />
            <Text style={[styles.menuText, { color: "#A0A0A0" }]}>Emergencia</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Perfil")} 
          >
            <Ionicons name="person-outline" size={24} color="#A0A0A0" />
            <Text style={styles.menuText}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Ayuda;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#666",
  },
  faqItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  faqText: {
    fontSize: 14,
  },
  supportCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#E6F0FF",
    borderRadius: 10,
    marginBottom: 10,
  },
  supportInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  supportText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  menuInferior: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  menuItem: {
    alignItems: "center",
  },
  menuText: {
    fontSize: 12,
    marginTop: 2,
  },
});
