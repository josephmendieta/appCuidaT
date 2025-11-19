import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// Importamos los iconos
import { Ionicons } from '@expo/vector-icons';
import { auth } from "../firebaseConfig";

// --- Componente Reutilizable para cada punto de Privacidad ---
const PrivacyPoint = ({ iconName, title, description, isLink = false }) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <Ionicons 
        name={iconName} 
        size={30} 
        color="#007AFF" // Color de ícono (azul)
        style={styles.icon} 
      />
      <View style={styles.textContainer}>
        <Text style={[styles.cardTitle, isLink && styles.linkTitle]}>
          {title}
        </Text>
        <Text style={styles.cardDescription}>
          {description}
        </Text>
      </View>
    </View>
  </View>
);

// --- Componente Principal de la Pantalla ---
const ResumenPrivacidad = ({ navigation }) => {
  
  const handleAcknowledge = () => {
    // Aquí puedes añadir la lógica para cerrar el modal o navegar a la siguiente pantalla
    console.log('Botón Entendido presionado');
    // Ejemplo de navegación si estás usando React Navigation
    navigation.goBack(); 
  };

  const handleFullPolicyPress = () => {
    console.log('Ir a Política de Privacidad completa');
    // Aquí podrías abrir un enlace con Linking o navegar a otra pantalla
  };

  return (
    <View style={styles.container}>
      
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Resumen de Privacidad</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Título Principal */}
        <Text style={styles.mainTitle}>
          Tu Privacidad es {'\n'}
          <Text style={styles.mainTitleBold}>Importante</Text>
        </Text>
        <Text style={styles.subtitle}>
          Tu privacidad es una prioridad para nosotros. Este es un resumen de los puntos más importantes de nuestra política.
        </Text>

        {/* --- Puntos de Privacidad --- */}
        <View style={styles.pointsContainer}>
          
          <PrivacyPoint
            iconName="eye-outline"
            title="¿Qué información recopilamos?"
            description="Recopilamos datos de uso anónimos para mejorar la app e información que proporcionas voluntariamente."
          />

          <PrivacyPoint
            iconName="settings-outline"
            title="¿Cómo usamos tu información?"
            description="Para personalizar tu experiencia, mejorar la aplicación y sus servicios, y garantizar la seguridad de la cuenta."
          />
          
          <PrivacyPoint
            iconName="lock-closed-outline"
            title="Seguridad de tus datos"
            description="Tomamos medidas robustas para proteger tu información contra acceso no autorizado."
          />

          <PrivacyPoint
            iconName="share-social-outline"
            title="¿Con quién compartimos tu información?"
            description="No compartimos tu información personal con terceros, excepto para cumplir la ley."
            isLink={true} // Aplica el estilo de subrayado al título
          />
        </View>

        {/* Enlace a Política Completa */}
        <Text style={styles.policyText}>
          Para conocer todos los detalles, puedes leer nuestra
          {' '}
          <Text 
            style={styles.policyLink}
            onPress={handleFullPolicyPress}
          >
            Política de Privacidad completa aquí.
          </Text>
        </Text>

      </ScrollView>

      {/* Botón Principal (Entendido) */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleAcknowledge}
        >
          <Text style={styles.buttonText}>Entendido</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

// --- Estilos de la Pantalla ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 50, // Ajuste inicial para la barra de estado
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  mainTitle: {
    fontSize: 30,
    marginTop: 10,
    lineHeight: 38,
    fontWeight: '300', // Delgado para la primera línea
  },
  mainTitleBold: {
    fontWeight: 'bold', // Negrita para "Importante"
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    marginBottom: 20,
  },
  pointsContainer: {
    marginBottom: 20,
  },
  // Estilos de la tarjeta de privacidad
  card: {
    backgroundColor: '#F7F9FC', // Fondo ligeramente azul/gris para las tarjetas
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  cardContent: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 15,
    marginTop: 5,
    // El color se define en el componente
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  linkTitle: {
    textDecorationLine: 'underline',
  },
  cardDescription: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  // Estilos del enlace a la política completa
  policyText: {
    fontSize: 15,
    color: '#555',
    marginBottom: 20,
    lineHeight: 22,
  },
  policyLink: {
    color: '#007AFF',
    fontWeight: '600',
  },
  // Estilos del botón Entendido
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  button: {
    backgroundColor: '#3498DB', // Color azul vibrante
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResumenPrivacidad;