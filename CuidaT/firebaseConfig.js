// firebaseConfig.js
import { initializeApp, getApps } from "firebase/app";
import { 
  initializeAuth, 
  getReactNativePersistence 
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// 🔥 Tu configuración
const firebaseConfig = {
  apiKey: "AIzaSyCAaD_0ghb1wR3fpRg6A0VNzXLtHMgNa3k",
  authDomain: "cuidat-53565.firebaseapp.com",
  projectId: "cuidat-53565",
  storageBucket: "cuidat-53565.firebasestorage.app",
  messagingSenderId: "886948493233",
  appId: "1:886948493233:web:6fe255ac1f563a1f92ef90",
  measurementId: "G-0T0YQHEWXF",
};

// 🟢 Inicializar Firebase solo una vez
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// 🟢 Inicializar Auth SOLO aquí (NO getAuth())
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// 🟢 Inicializar Firestore
const db = getFirestore(app);

export { auth, app, db };
