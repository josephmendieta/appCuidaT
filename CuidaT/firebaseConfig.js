// firebaseConfig.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCAaD_0ghb1wR3fpRg6A0VNzXLtHMgNa3k",
  authDomain: "cuidat-53565.firebaseapp.com",
  projectId: "cuidat-53565",
  storageBucket: "cuidat-53565.firebasestorage.app",
  messagingSenderId: "886948493233",
  appId: "1:886948493233:web:6fe255ac1f563a1f92ef90",
  measurementId: "G-0T0YQHEWXF",
};

// Inicializa la app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Inicializa Analytics solo si el entorno lo soporta (evita errores en Expo web)
isSupported().then((yes) => {
  if (yes) getAnalytics(app);
});

// Exporta Auth para usarlo en toda la app
export const auth = getAuth(app);
export default app;
