## 🚀 Inicio Rápido de la Aplicación (Setup Local)

Esta guía te ayudará a configurar y ejecutar la aplicación en tu entorno de desarrollo.

### 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

* **Node.js** (versión recomendada).
* **npm** o **Yarn** (gestionadores de paquetes).
* **Expo Go** en tu dispositivo móvil (disponible en App Store y Google Play) si deseas probar la aplicación en un celular.

### ⚙️ Instalación

Sigue estos comandos en la terminal, dentro del directorio del proyecto, para preparar tu entorno:

1.  **Instalar el CLI de Expo (opcional, pero recomendado):**
    ```bash
    npm install -g expo-cli
    ```

2.  **Instalar las dependencias del proyecto:**
    ```bash
    npm install
    ```

3.  **Instalar dependencias específicas de Expo:**
    > **⚠️ Importante:** Este paso es crucial para asegurar que ciertos módulos funcionen correctamente.

    ```bash
    npx expo install expo-web-browser
    ```

---

### ▶️ Ejecución de la Aplicación

Para iniciar el servidor de desarrollo y alojar la aplicación, ejecuta el siguiente comando:

```bash
npx expo start
