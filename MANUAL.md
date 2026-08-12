# 📖 Manual de Instrucciones y Guía del Usuario - GymTracker v1.0

¡Bienvenido a **GymTracker**! Este manual ha sido creado para documentar en detalle la arquitectura, el funcionamiento y el uso paso a paso de tu aplicación web móvil de seguimiento de entrenamientos de gimnasio.

---

## 🎯 ¿Qué estamos construyendo?

**GymTracker** es una Aplicación Web Progresiva (PWA) diseñada para deportistas y atletas que buscan llevar un control riguroso, rápido y eficiente de sus entrenamientos directamente desde su teléfono celular.

### 🚀 Características Principales
- **100% Mobile-First**: Diseñada para operarse fácilmente a una sola mano en el gimnasio.
- **Sin necesidad de internet continuo**: Los datos se guardan en la memoria local de tu dispositivo (`localStorage`).
- **Base de Datos Dinámica**: Más de 30 ejercicios organizados por grupos musculares de Tren Superior y Tren Inferior.
- **Medición de volumen (kg totales)** e historial acumulado de entrenamientos.
- **Temporizador de descanso interactivo** con alerta al finalizar las pausas.
- **Almacenamiento de Récords Personales (PRs)** por cada ejercicio.

---

## 📱 Guía de Uso Paso a Paso

### 1. Pantalla de Inicio (Dashboard)
Al abrir la aplicación, te encontrarás con la pantalla principal:
- **Resumen rápido**: Muestra el total de sesiones realizadas y el volumen de kilos levantados acumulados.
- **Acceso rápido**: Tarjetas de acceso directo para **Superior**, **Pierna** y **Mi Progreso**.

### 2. Selección de Entrenamiento y Músculo
1. Toca en **Superior** o **Pierna**.
2. Selecciona el grupo muscular que vas a trabajar hoy:
   - **Superior**: Pecho 🟥, Espalda 🟦, Hombros 🟨, Bíceps 🟩, Tríceps 🟧.
   - **Pierna**: Cuádriceps 🦵, Femorales 🦿, Glúteos 🍑, Pantorrillas 👣.
3. Se desplegará la lista de ejercicios específicos de ese músculo con sus respectivos íconos y descripciones.

### 3. Registro de Series y Pesos
1. Toca en **Registrar →** sobre el ejercicio elegido (ej. *Press Plano con Barra*).
2. Se abrirá una ventana emergente (modal) con las siguientes opciones:
   - **Peso (kg)**: Ingresa los kilos cargados en la barra o máquina.
   - **Repeticiones**: Ingresa el número de repeticiones completadas.
   - **Tipo de Serie**:
     - 🔥 **Efectiva**: Serie principal de trabajo pesado.
     - ♨️ **Calentamiento**: Serie de aproximación con menor peso.
     - 💥 **Drop Set**: Serie descendente sin descanso.
     - 💀 **Al Fallo**: Serie llevada hasta el fallo muscular positivo.
3. Presiona **➕ Registrar Serie**.
4. La serie se agregará a la tabla en tiempo real. Puedes eliminar cualquier serie errónea tocando el ícono de la papelera 🗑️.
5. Al terminar todas tus series del ejercicio, toca en **✅ Guardar y Cerrar**.

### 4. Temporizador de Descanso con Sonido y Pantalla Activa
- En la barra superior de la app o dentro de la ventana de registro, verás el botón de **⏱️ Temporizador**.
- Puedes seleccionar intervalos rápidos: **30s**, **60s**, **90s**, **120s** o **180s**.
- **Pantalla siempre encendida**: Al iniciar el temporizador, GymTracker activa el modo de bloqueo de suspensión (*WakeLock API*) para evitar que la pantalla de tu celular se bloquee o apague durante el descanso.
- **Alerta Sonora & Vibración**: Cuando la cuenta regresiva llegue a `00:00`, la app emitirá 3 pitidos sonoros claros (*Beep - Beep - BEEEEEP!*) mediante la API de audio y activará un patrón de vibración intenso para que nunca pierdas la noción del tiempo.
- **Botón de Manual Integrado**: En la barra superior verás el botón **📖 Manual** para consultar las instrucciones rápidamente desde tu teléfono.

### 5. Consulta de Progreso y Récords (PRs)
- Desde la pantalla de inicio, toca en **Mi Progreso**.
- Podrás ver:
  - Total de entrenamientos finalizados.
  - Total de series acumuladas.
  - Kilos totales levantados en toda tu historia de uso.
  - Tarjetas detalladas por fecha con cada ejercicio y sus series correspondientes.
  - Tu **Mejor Marca (PR)** lograda en cada ejercicio.

---

## 🔒 Privacidad y Almacenamiento de Datos

- **Tus datos te pertenecen**: GymTracker no envía tus registros a servidores externos ni requiere contraseñas.
- **Almacenamiento Local (`localStorage`)**: Todo tu historial queda guardado directamente en la memoria de tu navegador en tu celular.
- **Sin consumo de datos en uso continuo**: La app carga de forma instantánea.

---

## 🛠️ Estructura del Código Técnico

Para los desarrolladores o para futuras modificaciones, el proyecto está estructurado de la siguiente forma:

- **`frontend/index.html`**: Estructura Single-Page Application (SPA) con vistas modulares.
- **`frontend/style.css`**: Sistema de diseño en modo oscuro con variables CSS, fuentes de Google Fonts (*Outfit* e *Inter*) y animaciones responsivas.
- **`frontend/main.js`**:
  - `EXERCISES_DATA`: Estructura JSON con todos los músculos y ejercicios.
  - Motor de navegación entre pantallas sin recargar la página.
  - Funciones de persistencia `guardarEntrenamientoEnStorage()` y `cargarLogsDesdeStorage()`.
  - Motor del temporizador en tiempo real `iniciarTimer()`.
- **`frontend/manifest.json`**: Configuración PWA para instalación del ícono en pantallas móviles.
- **`frontend/assets/logo.png`**: Logotipo oficial de la aplicación.

---

## 🔄 ¿Cómo actualizar la App en el futuro?

Cuando realicemos mejoras en el código de tu computadora:
1. Entra a tu panel de **Netlify** (`app.netlify.com`).
2. Entra a tu proyecto **`gymtracker-parra`**.
3. Ve a la pestaña **Construcciones / Deploys**.
4. Arrastra la carpeta **`frontend`** actualizada.
5. ¡Listo! La versión en tu celular se actualizará automáticamente sin borrar tus registros guardados.

---

*GymTracker v1.0 • Creado con pasión por el rendimiento deportivo.*
