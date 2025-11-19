import { auth, db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/* ============================================================
   🟦 Registrar interacción del usuario
   ============================================================ */
export const registrarInteraccion = async (tipo, detalle, canal = "app") => {
  try {
    const user = auth.currentUser; // ✅ auth correcto

    if (!user) {
      console.warn("⚠️ No hay usuario autenticado, no se registra interacción.");
      return;
    }

    await addDoc(collection(db, "usuarios", user.uid, "interacciones"), {
      fecha: serverTimestamp(),
      tipo,
      detalle,
      canal,
      duracion_minutos: 0
    });

  } catch (e) {
    console.error("Error guardando interacción:", e);
  }
};

/* ============================================================
   🟦 Registrar un registro emocional
   ============================================================ */
export const registrarRegistroEmocional = async (nombreEmocion, intensidad, descripcion) => {
  try {
    const user = auth.currentUser; // ✅ auth correcto

    if (!user) {
      console.warn("⚠️ No hay usuario autenticado, no se registra emoción.");
      return;
    }

    await addDoc(collection(db, "usuarios", user.uid, "registros_emocionales"), {
      fecha: serverTimestamp(),
      emocion: {
        nombre: nombreEmocion,
        categoria: ["ansiedad", "tristeza", "enojo"].includes(nombreEmocion)
          ? "Negativa"
          : "Neutral",
        color_categoria: "#0000FF"
      },
      intensidad,
      descripcion
    });

  } catch (e) {
    console.error("Error guardando emoción:", e);
  }
};

/* ============================================================
   🟦 Registrar compartir historial con un profesional
   ============================================================ */
export const registrarCompartido = async (profesional) => {
  try {
    const user = auth.currentUser; // ✅ auth correcto

    if (!user) {
      console.warn("⚠️ No hay usuario autenticado, no se registra compartido.");
      return;
    }

    await addDoc(collection(db, "usuarios", user.uid, "historial_compartido"), {
      profesional,
      fecha_compartido: serverTimestamp(),
      medio: "App",
      confirmado: true
    });

  } catch (e) {
    console.error("Error guardando compartido:", e);
  }
};
