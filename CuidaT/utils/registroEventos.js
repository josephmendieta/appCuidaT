export const registrarInteraccion = async (tipo, detalle, canal = "app") => {
  try {
    const uid = auth.currentUser.uid;

    await addDoc(collection(db, "usuarios", uid, "interacciones"), {
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


export const registrarRegistroEmocional = async (nombreEmocion, intensidad, descripcion) => {
  try {
    const uid = auth.currentUser.uid;

    await addDoc(collection(db, "usuarios", uid, "registros_emocionales"), {
      fecha: serverTimestamp(),
      emocion: {
        nombre: nombreEmocion,
        categoria: ["ansiedad","tristeza","enojo"].includes(nombreEmocion) ? "Negativa" : "Neutral",
        color_categoria: "#0000FF"
      },
      intensidad,
      descripcion
    });
  } catch (e) {
    console.error("Error guardando emoción:", e);
  }
};


export const registrarCompartido = async (profesional) => {
  try {
    const uid = auth.currentUser.uid;

    await addDoc(collection(db, "usuarios", uid, "historial_compartido"), {
      profesional,
      fecha_compartido: serverTimestamp(),
      medio: "App",
      confirmado: true
    });
  } catch (e) {
    console.error("Error guardando compartido:", e);
  }
};
