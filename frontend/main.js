/*==================================================
    GYMTRACKER v1.0 - LÓGICA PRINCIPAL DE LA APP
==================================================*/

// Base de datos de Grupos Musculares y Ejercicios
// Imágenes descargadas localmente desde wger.de (evita bloqueo de Cloudflare)
// Todas guardadas en assets/ejercicios/ junto a las imágenes AI generadas
const WGER_IMAGES = {
    // Pecho (AI)
    press_plano:           "assets/ejercicios/press_plano.png",
    press_inclinado:       "assets/ejercicios/press_inclinado.png",
    aperturas:             "assets/ejercicios/aperturas.png",
    peck_deck:             "assets/ejercicios/peck_deck.png",
    flexiones:             "assets/ejercicios/flexiones.png",
    cruce_polea_alta:      "assets/ejercicios/cruce_polea_alta.png",
    cruce_polea_media:     "assets/ejercicios/cruce_polea_media.png",
    cruce_polea_baja:      "assets/ejercicios/cruce_polea_baja.png",
    press_arnold:          "assets/ejercicios/press_arnold.png",
    press_militar:         "assets/ejercicios/press_militar.png",
    elevaciones_laterales: "assets/ejercicios/elevaciones_laterales.png",
    face_pull:             "assets/ejercicios/face_pull.png",
    // Bíceps (AI + wger)
    curl_barra:            "assets/ejercicios/curl_barra.png",
    curl_martillo:         "assets/ejercicios/curl_martillo.png",
    curl_scott:            "assets/ejercicios/curl_scott.png",
    curl_alterno:          "assets/ejercicios/curl_alterno.png",
    curl_polea_baja:       "assets/ejercicios/curl_polea_baja.png",
    // Tríceps (AI + wger)
    extension_polea:       "assets/ejercicios/extension_polea.png",
    press_frances:         "assets/ejercicios/press_frances.png",
    fondos_paralelas:      "assets/ejercicios/fondos_paralelas.png",
    patada_triceps:        "assets/ejercicios/patada_triceps.png",
    // Cuádriceps (AI)
    sentadilla_libre:      "assets/ejercicios/sentadilla_libre.png",
    sentadilla_smith:      "assets/ejercicios/sentadilla_smith.png",
    prensa_piernas:        "assets/ejercicios/prensa_piernas.png",
    hack_squat:            "assets/ejercicios/hack_squat.png",
    // Cuádriceps adicionales (AI)
    extension_cuadriceps:  "assets/ejercicios/extension_cuadriceps.png",
    zancadas:              "assets/ejercicios/zancadas.png",
    zancadas_smith:        "assets/ejercicios/zancadas_smith.png",
    // Femorales (AI)
    peso_muerto_rumano:    "assets/ejercicios/peso_muerto_rumano.png",
    curl_femoral_tumbado:  "assets/ejercicios/curl_femoral_tumbado.png",
    curl_femoral_sentado:  "assets/ejercicios/curl_femoral_sentado.png",
    // Glúteos (AI)
    hip_thrust:            "assets/ejercicios/hip_thrust.png",
    patada_gluteo:         "assets/ejercicios/patada_gluteo.png",
    abductores:            "assets/ejercicios/abductores.png",
    aductor_maquina:       "assets/ejercicios/aductor_maquina.png",
    // Pantorrillas (AI)
    elevacion_talones_pie:     "assets/ejercicios/elevacion_talones_pie.png",
    elevacion_talones_sentado: "assets/ejercicios/elevacion_talones_sentado.png"
};

// Carga imagen local de wger (ya descargada, sin dependencia de red)
function cargarImagenWger(imgEl, exerciseId, fallback) {
    if (!imgEl) return;
    const path = WGER_IMAGES[exerciseId];
    if (!path) return;
    imgEl.src = path; // Local — carga instantánea, sin CORS ni Cloudflare
    imgEl.classList.add('wger-img');
}



const EXERCISES_DATA = {
    superior: {
        titulo: "💪 Tren Superior",
        subtitulo: "Pecho, Espalda, Hombros, Bíceps y Tríceps",
        grupos: {
            pecho: {
                nombre: "Pecho",
                icono: "🟥",
                imagen: "assets/grupo_pecho.png",
                ejercicios: [
                    { id: "press_plano",       nombre: "Press Plano con Barra",           icono: "🏋️", imagen: "assets/ejercicios/press_plano.png",       desc: "Press de banca tradicional" },
                    { id: "press_inclinado",   nombre: "Press Inclinado con Mancuernas",  icono: "📐", imagen: "assets/ejercicios/press_inclinado.png",   desc: "Enfoque en haz clavicular" },
                    { id: "aperturas",         nombre: "Aperturas con Mancuernas",        icono: "🪽", imagen: "assets/ejercicios/aperturas.png",         desc: "Aislamiento y estiramiento" },
                    { id: "peck_deck",         nombre: "Peck Deck / Contractora",         icono: "🤖", imagen: "assets/ejercicios/peck_deck.png",         desc: "Tensión constante en máquina" },
                    { id: "flexiones",         nombre: "Flexiones de Pecho (Push-ups)",   icono: "🧘", imagen: "assets/ejercicios/flexiones.png",         desc: "Ejercicio con peso corporal" },
                    { id: "cruce_polea_alta",  nombre: "Cruce de Polea Alta",             icono: "⬇️", imagen: "assets/ejercicios/cruce_polea_alta.png",  desc: "Aislamiento inferior del pecho, cabeza esternal" },
                    { id: "cruce_polea_media", nombre: "Cruce de Polea Media",            icono: "➡️", imagen: "assets/ejercicios/cruce_polea_media.png", desc: "Trabajo equilibrado de toda la fibra pectoral" },
                    { id: "cruce_polea_baja",  nombre: "Cruce de Polea Baja",             icono: "⬆️", imagen: "assets/ejercicios/cruce_polea_baja.png",  desc: "Activación del haz clavicular superior" }
                ]
            },
            espalda: {
                nombre: "Espalda",
                icono: "🟦",
                imagen: "assets/grupo_espalda.png",
                ejercicios: [
                    { id: "jalon_pecho",    nombre: "Jalón al Pecho",                icono: "⬇️", imagen: "assets/ejercicios/jalon_pecho.png",    desc: "Amplitud de dorsal ancho" },
                    { id: "remo_barra",     nombre: "Remo con Barra",               icono: "🏋️", imagen: "assets/ejercicios/remo_barra.png",     desc: "Grosor y densidad de espalda" },
                    { id: "remo_polea",     nombre: "Remo Gironda en Polea",        icono: "↔️", imagen: "assets/ejercicios/remo_polea.png",     desc: "Tracción horizontal" },
                    { id: "dominadas",      nombre: "Dominadas",                    icono: "🧗", imagen: "assets/ejercicios/dominadas.png",      desc: "Autocarga para espalda superior" },
                    { id: "remo_mancuerna", nombre: "Remo Unilateral con Mancuerna",icono: "💪", imagen: "assets/ejercicios/remo_mancuerna.png", desc: "Enfoque en cada costado" },
                    { id: "remo_barra_t",   nombre: "Remo en Barra T",              icono: "⚓", imagen: "assets/ejercicios/remo_barra_t.png",   desc: "Grosor de espalda media con agarre neutro" }
                ]
            },
            hombros: {
                nombre: "Hombros",
                icono: "🟨",
                imagen: "assets/grupo_hombros.png",
                ejercicios: [
                    { id: "press_militar",         nombre: "Press Militar / OverHead Press", icono: "🏋️", imagen: "assets/ejercicios/press_militar.png",         desc: "Fuerza en deltoides anterior" },
                    { id: "elevaciones_laterales", nombre: "Elevaciones Laterales",          icono: "🦅", imagen: "assets/ejercicios/elevaciones_laterales.png", desc: "Anchura de hombros (deltoides lateral)" },
                    { id: "pajaros",               nombre: "Pájaros con Mancuerna",          icono: "🦇", imagen: "assets/ejercicios/pajaros.png",               desc: "Deltoides posterior" },
                    { id: "press_arnold",          nombre: "Press Arnold",                   icono: "🔄", imagen: "assets/ejercicios/press_arnold.png",          desc: "Rotación completa de hombro" },
                    { id: "face_pull",             nombre: "Face Pull en Polea",             icono: "🎯", imagen: "assets/ejercicios/face_pull.png",             desc: "Deltoides posterior y manguito rotador" }
                ]
            },
            biceps: {
                nombre: "Bíceps",
                icono: "🟩",
                imagen: "assets/grupo_biceps.png",
                ejercicios: [
                    { id: "curl_barra",      nombre: "Curl de Bíceps con Barra Z",     icono: "🏋️", imagen: "assets/ejercicios/curl_barra.png",      desc: "Constructor de masa básico" },
                    { id: "curl_martillo",   nombre: "Curl Martillo",                  icono: "🔨", imagen: "assets/ejercicios/curl_martillo.png",   desc: "Braquial y antebrazo" },
                    { id: "curl_scott",      nombre: "Curl en Banco Scott",            icono: "🛡️", imagen: "assets/ejercicios/curl_scott.png",      desc: "Aislamiento pico del bíceps" },
                    { id: "curl_alterno",    nombre: "Curl Alterno con Mancuernas",   icono: "💪", imagen: "assets/ejercicios/curl_alterno.png",    desc: "Supinación controlada" },
                    { id: "curl_polea_baja", nombre: "Curl en Polea Baja con Barra",  icono: "🔗", imagen: "assets/ejercicios/curl_polea_baja.png", desc: "Tensión constante en bíceps con cable" }
                ]
            },
            triceps: {
                nombre: "Tríceps",
                icono: "🟧",
                imagen: "assets/grupo_triceps.png",
                ejercicios: [
                    { id: "extension_polea",  nombre: "Extensión de Tríceps en Polea",   icono: "⬇️", imagen: "assets/ejercicios/extension_polea.png",  desc: "Enfoque en cabeza lateral" },
                    { id: "press_frances",    nombre: "Press Francés",                   icono: "🧠", imagen: "assets/ejercicios/press_frances.png",    desc: "Trabajo pesado para tríceps" },
                    { id: "fondos_paralelas", nombre: "Fondos en Paralelas (Dips)",      icono: "🤸", imagen: "assets/ejercicios/fondos_paralelas.png", desc: "Fuerza global de empuje" },
                    { id: "patada_triceps",   nombre: "Patada de Tríceps con Mancuerna", icono: "🐎", imagen: "assets/ejercicios/patada_triceps.png",   desc: "Aislamiento en máxima contracción" }
                ]
            }
        }
    },
    pierna: {
        titulo: "🦵 Tren Inferior",
        subtitulo: "Cuádriceps, Femorales, Glúteos y Pantorrillas",
        grupos: {
            cuadriceps: {
                nombre: "Cuádriceps",
                icono: "🦵",
                imagen: "assets/grupo_cuadriceps.png",
                ejercicios: [
                    { id: "sentadilla_libre",     nombre: "Sentadilla Libre con Barra",         icono: "🏋️", imagen: "assets/ejercicios/sentadilla_libre.png",     desc: "El rey de los ejercicios de pierna" },
                    { id: "sentadilla_smith",     nombre: "Sentadilla en Máquina Smith",        icono: "🏗️", imagen: "assets/ejercicios/sentadilla_smith.png",     desc: "Cuádriceps con guía y control de recorrido" },
                    { id: "prensa_piernas",       nombre: "Prensa",                             icono: "↗️", imagen: "assets/ejercicios/prensa_piernas.png",       desc: "Carga pesada en prensa a 45°" },
                    { id: "hack_squat",           nombre: "Hack Squat (Máquina Jaca)",          icono: "🛷", imagen: "assets/ejercicios/hack_squat.png",           desc: "Cuádriceps en máquina inclinada, rodilla protegida" },
                    { id: "extension_cuadriceps", nombre: "Extensión de Cuádriceps en Máquina", icono: "⚡", imagen: "assets/ejercicios/extension_cuadriceps.png", desc: "Aislamiento frontal" },
                    { id: "zancadas",             nombre: "Zancadas / Lunges con Mancuernas",   icono: "🚶", imagen: "assets/ejercicios/zancadas.png",             desc: "Trabajo unilateral y estabilidad" },
                    { id: "zancadas_smith",       nombre: "Zancadas en Máquina Smith",          icono: "🏗️", imagen: "assets/ejercicios/zancadas_smith.png",       desc: "Zancada guiada con mayor carga y control" }
                ]
            },
            femorales: {
                nombre: "Femorales / Isquios",
                icono: "🦿",
                imagen: "assets/grupo_femorales.png",
                ejercicios: [
                    { id: "peso_muerto_rumano",   nombre: "Peso Muerto Rumano",    icono: "🏋️", imagen: "assets/ejercicios/peso_muerto_rumano.png",   desc: "Estiramiento intenso de isquios" },
                    { id: "curl_femoral_tumbado", nombre: "Curl Femoral Tumbado",  icono: "🛋️", imagen: "assets/ejercicios/curl_femoral_tumbado.png", desc: "Flexión de rodilla aislada" },
                    { id: "curl_femoral_sentado", nombre: "Curl Femoral Sentado",  icono: "🪑", imagen: "assets/ejercicios/curl_femoral_sentado.png", desc: "Tensión en cadera flexionada" }
                ]
            },
            gluteos: {
                nombre: "Glúteos",
                icono: "🍑",
                imagen: "assets/grupo_gluteos.png",
                ejercicios: [
                    { id: "hip_thrust",    nombre: "Hip Thrust con Barra",      icono: "🏋️", imagen: "assets/ejercicios/hip_thrust.png",    desc: "Máxima activación del glúteo mayor" },
                    { id: "patada_gluteo", nombre: "Patada de Glúteo en Polea", icono: "🦵", imagen: "assets/ejercicios/patada_gluteo.png", desc: "Aislamiento de extensión de cadera" },
                    { id: "abductores",    nombre: "Abductores en Máquina",     icono: "↔️", imagen: "assets/ejercicios/abductores.png",    desc: "Abrir piernas — enfoque en glúteo medio" },
                    { id: "aductor_maquina", nombre: "Aductor en Máquina",       icono: "🔒", imagen: "assets/ejercicios/aductor_maquina.png", desc: "Cerrar piernas — enfoque en aductores internos" }
                ]
            },
            pantorrillas: {
                nombre: "Pantorrillas",
                icono: "👣",
                imagen: "assets/grupo_pantorrillas.png",
                ejercicios: [
                    { id: "elevacion_talones_pie",     nombre: "Elevación de Talones De Pie",   icono: "⬆️", imagen: "assets/ejercicios/elevacion_talones_pie.png",     desc: "Enfoque en gemelos" },
                    { id: "elevacion_talones_sentado", nombre: "Elevación de Talones Sentado", icono: "🪑", imagen: "assets/ejercicios/elevacion_talones_sentado.png", desc: "Enfoque en sóleo" }
                ]
            }
        }
    }
};

/*==================================================
    ESTADO DE LA APLICACIÓN
==================================================*/
let state = {
    categoriaActual: null,
    grupoActual: null,
    ejercicioSeleccionado: null,
    seriesTempHoy: [],
    workoutLogs: [],
    cardioLogs: [],
    userName: "",
    timer: {
        secondsLeft: 90,
        presetSeconds: 90,
        intervalId: null,
        isRunning: false,
        endTime: null,
        wakeLock: null
    }
};

/*==================================================
    AUDIO Y PANTALLA (WAKE LOCK API)
==================================================*/
async function solicitarWakeLock() {
    try {
        if ('wakeLock' in navigator) {
            state.timer.wakeLock = await navigator.wakeLock.request('screen');
        }
    } catch (err) {
        console.log("WakeLock no soportado o denegado:", err);
    }
}

function liberarsWakeLock() {
    if (state.timer.wakeLock) {
        state.timer.wakeLock.release().then(() => {
            state.timer.wakeLock = null;
        });
    }
}

// Reproductor de sonido mediante Web Audio API (No requiere archivos externos)
function reproducirSonidoAlarma() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        function emitirBeep(frecuencia, tiempoInicio, duracion, volumen = 0.8) {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = "square"; // Onda cuadrada: más potente y penetrante
            osc.frequency.setValueAtTime(frecuencia, audioCtx.currentTime + tiempoInicio);
            gain.gain.setValueAtTime(volumen, audioCtx.currentTime + tiempoInicio);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + tiempoInicio + duracion);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(audioCtx.currentTime + tiempoInicio);
            osc.stop(audioCtx.currentTime + tiempoInicio + duracion);
        }

        // Secuencia: Beep! Beep! — — BEEEP! BEEEEEEP!
        emitirBeep(880,  0.0,  0.18, 0.8);  // 1er aviso corto
        emitirBeep(880,  0.28, 0.18, 0.8);  // 2do aviso corto
        emitirBeep(1047, 0.65, 0.35, 0.85); // 3er tono ascendente
        emitirBeep(1319, 1.1,  0.5,  0.9);  // 4to tono más alto
        emitirBeep(1760, 1.75, 1.2,  1.0);  // Tono final largo y fuerte (La 6)
    } catch (e) {
        console.log("Web Audio Context no permitido aún:", e);
    }
}

/*==================================================
    ELEMENTOS DEL DOM
==================================================*/
const screens = {
    inicio: document.getElementById("pantallaInicio"),
    grupos: document.getElementById("pantallaGrupos"),
    ejercicios: document.getElementById("pantallaEjercicios"),
    caminadora: document.getElementById("pantallaCaminadora"),
    progreso: document.getElementById("pantallaProgreso")
};

// Botones navegación principal
const btnCardSuperior = document.getElementById("btnCardSuperior");
const btnCardPierna = document.getElementById("btnCardPierna");
const btnCardProgreso = document.getElementById("btnCardProgreso");
const btnHomeHeader = document.getElementById("btnHomeHeader");

const btnBackToInicio = document.getElementById("btnBackToInicio");
const btnBackToGrupos = document.getElementById("btnBackToGrupos");
const btnBackToInicioFromProgreso = document.getElementById("btnBackToInicioFromProgreso");

// Modal Registro
const modalRegistro = document.getElementById("modalRegistro");
const btnCloseModal = document.getElementById("btnCloseModal");
const formAddSet = document.getElementById("formAddSet");
const inputPeso = document.getElementById("inputPeso");
const inputReps = document.getElementById("inputReps");
const selectTipoSerie = document.getElementById("selectTipoSerie");
const tbodySeriesList = document.getElementById("tbodySeriesList");
const countSetsToday = document.getElementById("countSetsToday");
const lblBestSet = document.getElementById("lblBestSet");
const modalGrupoTag = document.getElementById("modalGrupoTag");
const modalEjercicioNombre = document.getElementById("modalEjercicioNombre");
const btnFinalizarEjercicio = document.getElementById("btnFinalizarEjercicio");
const btnStartRestTimer = document.getElementById("btnStartRestTimer");

// Temporizador
const btnQuickTimer = document.getElementById("btnQuickTimer");
const timerBadge = document.getElementById("timerBadge");
const modalTimer = document.getElementById("modalTimer");
const btnCloseTimerModal = document.getElementById("btnCloseTimerModal");
const timerClock = document.getElementById("timerClock");
const btnTimerStart = document.getElementById("btnTimerStart");
const btnTimerPause = document.getElementById("btnTimerPause");
const btnTimerReset = document.getElementById("btnTimerReset");
const presetButtons = document.querySelectorAll(".btn-preset");

// Modal Ayuda / Manual
const btnHelpHeader = document.getElementById("btnHelpHeader");
const modalHelp = document.getElementById("modalHelp");
const btnCloseHelpModal = document.getElementById("btnCloseHelpModal");
const btnGotItHelp = document.getElementById("btnGotItHelp");

// Estadísticas & Progreso
const statTotalWorkouts = document.getElementById("statTotalWorkouts");
const statTotalVolume = document.getElementById("statTotalVolume");
const progresoTotalRutinas = document.getElementById("progresoTotalRutinas");
const progresoTotalSeries = document.getElementById("progresoTotalSeries");
const progresoTotalKg = document.getElementById("progresoTotalKg");
const containerHistorial = document.getElementById("containerHistorial");
const btnClearHistory = document.getElementById("btnClearHistory");

/*==================================================
    INICIALIZACIÓN
==================================================*/
document.addEventListener("DOMContentLoaded", () => {
    cargarLogsDesdeStorage();
    actualizarMetricasInicio();
    configurarEventosNavegacion();
    configurarEventosModal();
    configurarEventosTimer();
    configurarEventosCaminadora();
    inicializarSaludo();

    // Reemplazar el estado inicial del historial para que el botón
    // atrás del dispositivo no cierre la app desde la pantalla de inicio
    history.replaceState({ screenId: 'pantallaInicio' }, '');
    window.addEventListener('popstate', manejarBackButton);
});

/*==================================================
    NAVEGACIÓN Y PANTALLAS
==================================================*/

/*==================================================
    BOTÓN ATRÁS DEL DISPOSITIVO (Hardware Back)
==================================================*/
/**
 * Retorna el id de la pantalla actualmente visible.
 */
function getCurrentScreenId() {
    const active = Object.values(screens).find(s => s.classList.contains('active'));
    return active ? active.id : 'pantallaInicio';
}

/**
 * Maneja el evento popstate (botón atrás físico del celular).
 * Prioridad 1 → cerrar modales abiertos.
 * Prioridad 2 → retroceder entre pantallas.
 * Prioridad 3 → si ya está en inicio, reinsertar estado para evitar salir de la app.
 */
function manejarBackButton() {
    // -- Prioridad 1: cerrar cualquier modal visible --
    const modales = [
        modalRegistro,
        modalTimer,
        modalHelp,
        document.getElementById('modalCaminadora')
    ];
    const modalAbierto = modales.find(m => m && m.classList.contains('active'));

    if (modalAbierto) {
        modalAbierto.classList.remove('active');
        desbloquearScrollBody();
        // Restituir un estado en el historial para la pantalla actual
        history.pushState({ screenId: getCurrentScreenId() }, '');
        return;
    }

    // -- Prioridad 2: navegar hacia atrás entre pantallas --
    const screenActual = getCurrentScreenId();

    switch (screenActual) {
        case 'pantallaEjercicios':
            cambiarPantalla(screens.grupos, false);
            break;
        case 'pantallaGrupos':
        case 'pantallaCaminadora':
        case 'pantallaProgreso':
            cambiarPantalla(screens.inicio, false);
            break;
        case 'pantallaInicio':
        default:
            // Ya está en inicio: reinsertar estado para evitar que el sistema
            // cierre la app o salga del modo standalone PWA
            history.pushState({ screenId: 'pantallaInicio' }, '');
            break;
    }
}

function cambiarPantalla(pantallaObjetivo, pushHistory = true) {
    Object.values(screens).forEach(screen => screen.classList.remove("active"));
    pantallaObjetivo.classList.add("active");
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Registrar la navegación en el historial del navegador
    // para que el botón atrás del dispositivo funcione dentro de la app
    if (pushHistory) {
        history.pushState({ screenId: pantallaObjetivo.id }, '');
    }
}

function configurarEventosNavegacion() {
    btnHomeHeader.addEventListener("click", () => cambiarPantalla(screens.inicio));

    btnCardSuperior.addEventListener("click", () => abrirGrupos("superior"));
    btnCardPierna.addEventListener("click", () => abrirGrupos("pierna"));
    btnCardProgreso.addEventListener("click", () => abrirPantallaProgreso());

    document.getElementById("btnCardCaminadora").addEventListener("click", () => abrirPantallaCaminadora());
    document.getElementById("btnBackToInicioFromCaminadora").addEventListener("click", () => cambiarPantalla(screens.inicio));

    btnBackToInicio.addEventListener("click", () => cambiarPantalla(screens.inicio));
    btnBackToGrupos.addEventListener("click", () => cambiarPantalla(screens.grupos));
    btnBackToInicioFromProgreso.addEventListener("click", () => cambiarPantalla(screens.inicio));
}

function abrirGrupos(categoriaKey) {
    state.categoriaActual = categoriaKey;
    const catData = EXERCISES_DATA[categoriaKey];

    document.getElementById("tituloCategoria").textContent = catData.titulo;
    document.getElementById("subtituloCategoria").textContent = catData.subtitulo;

    const container = document.getElementById("containerGrupos");
    container.innerHTML = "";

    Object.entries(catData.grupos).forEach(([grupoKey, grupo]) => {
        const card = document.createElement("div");
        card.className = "muscle-card";
        card.innerHTML = `
            <div class="muscle-img-wrap">
                <img src="${grupo.imagen}" alt="${grupo.nombre}" class="muscle-card-img" loading="lazy">
                <div class="muscle-card-overlay">
                    <h4>${grupo.nombre}</h4>
                    <span>${grupo.ejercicios.length} ejercicios</span>
                </div>
            </div>
        `;
        card.addEventListener("click", () => abrirEjercicios(grupoKey, grupo));
        container.appendChild(card);
    });

    cambiarPantalla(screens.grupos);
}

function abrirEjercicios(grupoKey, grupo) {
    state.grupoActual = grupo;

    document.getElementById("tituloGrupoMuscular").textContent = `${grupo.icono} ${grupo.nombre}`;

    const container = document.getElementById("containerEjercicios");
    container.innerHTML = "";

    grupo.ejercicios.forEach(ex => {
        const item = document.createElement("div");
        item.className = "exercise-item";
        const imgId = `ex-img-${ex.id}`;
        item.innerHTML = `
            <div class="ex-info">
                <div class="ex-img-wrap">
                    <img id="${imgId}" src="${ex.imagen}" alt="${ex.nombre}" class="ex-img" loading="lazy"
                         onerror="this.src='${ex.imagen}'">
                    ${WGER_IMAGES[ex.id] ? '<span class="wger-badge">wger</span>' : '<span class="ai-badge">✨ AI</span>'}
                </div>
                <div class="ex-text">
                    <h4>${ex.nombre}</h4>
                    <p>${ex.desc}</p>
                </div>
            </div>
            <button class="btn-record">Registrar →</button>
        `;
        item.addEventListener("click", () => abrirModalRegistro(ex));
        container.appendChild(item);

        // Si el ejercicio tiene imagen en wger, cargarla directamente (URL garantizada)
        if (WGER_IMAGES[ex.id]) {
            const imgEl = document.getElementById(imgId);
            cargarImagenWger(imgEl, ex.id, ex.imagen);
        }
    });

    cambiarPantalla(screens.ejercicios);
}

/*==================================================
    MODAL Y REGISTRO DE SERIES
==================================================*/
function abrirModalRegistro(ejercicio) {
    state.ejercicioSeleccionado = ejercicio;
    state.seriesTempHoy = [];

    modalGrupoTag.textContent = state.grupoActual.nombre;
    modalEjercicioNombre.textContent = `${ejercicio.icono} ${ejercicio.nombre}`;

    // Cargar series que se hayan registrado para este ejercicio en la fecha actual
    const hoyStr = obtenerFechaHoyStr();
    const logsPrevios = state.workoutLogs.filter(log => log.fecha === hoyStr && log.ejercicioId === ejercicio.id);
    
    if (logsPrevios.length > 0) {
        logsPrevios.forEach(log => {
            state.seriesTempHoy.push(...log.series);
        });
    }

    renderizarTablaSeries();
    actualizarRécordPersonal(ejercicio.id);
    mostrarUltimaSesion(ejercicio.id);   // <-- muestra la última sesión registrada

    modalRegistro.classList.add("active");
    bloquearScrollBody();   // <-- evita el salto lateral al abrir
    inputPeso.focus();
}

function cerrarModalRegistro() {
    modalRegistro.classList.remove("active");
    desbloquearScrollBody();  // <-- restaura el scroll al cerrar
    formAddSet.reset();
}

/* =============================================
   BLOQUEO DE SCROLL DEL BODY PARA MODALES
   Solo bloquea el scroll — sin paddingRight (Android no tiene scrollbar físico)
   ============================================= */
function bloquearScrollBody() {
    document.body.style.overflow = 'hidden';
}

function desbloquearScrollBody() {
    document.body.style.overflow = '';
}

function configurarEventosModal() {
    btnCloseModal.addEventListener("click", cerrarModalRegistro);

    formAddSet.addEventListener("submit", (e) => {
        e.preventDefault();
        const peso = parseFloat(inputPeso.value) || 0;
        const reps = parseInt(inputReps.value) || 0;
        const tipo = selectTipoSerie.value;

        // Validación con feedback visual: sacude el campo de Repeticiones si está vacío
        if (reps <= 0) {
            inputReps.classList.add("input-error");
            inputReps.focus();
            setTimeout(() => inputReps.classList.remove("input-error"), 500);
            return;
        }

        const nuevaSerie = {
            id: Date.now(),
            num: state.seriesTempHoy.length + 1,
            peso: peso,
            reps: reps,
            tipo: tipo
        };

        state.seriesTempHoy.push(nuevaSerie);
        renderizarTablaSeries();

        // Reset solo reps para agilizar carga continua de peso similar
        inputReps.value = "";
        inputReps.focus();

        // Iniciar pequeño temporizador sugerido
        iniciarTimer(state.timer.presetSeconds);
    });

    btnFinalizarEjercicio.addEventListener("click", () => {
        if (state.seriesTempHoy.length > 0) {
            guardarEntrenamientoEnStorage();
        }
        cerrarModalRegistro();
    });

    btnStartRestTimer.addEventListener("click", () => {
        modalTimer.classList.add("active");
        iniciarTimer(state.timer.presetSeconds);
    });
}

function renderizarTablaSeries() {
    tbodySeriesList.innerHTML = "";
    countSetsToday.textContent = state.seriesTempHoy.length;

    state.seriesTempHoy.forEach((serie, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>#${index + 1}</strong></td>
            <td><small>${serie.tipo}</small></td>
            <td><strong>${serie.peso}</strong> kg</td>
            <td><strong>${serie.reps}</strong> reps</td>
            <td><button class="btn-del-set" data-id="${serie.id}">🗑️</button></td>
        `;
        tbodySeriesList.appendChild(tr);
    });

    // Agregar event listener para eliminar series
    document.querySelectorAll(".btn-del-set").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.target.getAttribute("data-id"));
            state.seriesTempHoy = state.seriesTempHoy.filter(s => s.id !== id);
            renderizarTablaSeries();
        });
    });
}

function actualizarRécordPersonal(ejercicioId) {
    let maxWeight = 0;
    let maxReps = 0;

    state.workoutLogs.forEach(log => {
        if (log.ejercicioId === ejercicioId) {
            log.series.forEach(s => {
                if (s.peso > maxWeight || (s.peso === maxWeight && s.reps > maxReps)) {
                    maxWeight = s.peso;
                    maxReps = s.reps;
                }
            });
        }
    });

    if (maxWeight > 0) {
        lblBestSet.textContent = `${maxWeight} kg × ${maxReps} reps`;
    } else {
        lblBestSet.textContent = "Sin datos previos";
    }
}

/* =============================================
   MUESTRA LA ÚLTIMA SESIÓN DEL EJERCICIO
   ============================================= */
function mostrarUltimaSesion(ejercicioId) {
    const box        = document.getElementById("lastSessionBox");
    const dateEl     = document.getElementById("lastSessionDate");
    const seriesEl   = document.getElementById("lastSessionSeries");
    const hoyStr     = obtenerFechaHoyStr();

    // Busca el log más reciente de ese ejercicio que NO sea de hoy
    const logsDelEjercicio = state.workoutLogs.filter(
        log => log.ejercicioId === ejercicioId && log.fecha !== hoyStr
    );

    if (logsDelEjercicio.length === 0) {
        box.style.display = "none";
        return;
    }

    // El primero en el array es el más reciente (se agrega con unshift)
    const ultimoLog = logsDelEjercicio[0];

    // Muestra la fecha de esa sesión
    dateEl.textContent = ultimoLog.fechaCompleta || ultimoLog.fecha;

    // Genera un chip por cada serie de esa sesión
    seriesEl.innerHTML = "";
    ultimoLog.series.forEach((serie, i) => {
        const chip = document.createElement("div");
        chip.className = "session-chip";
        chip.innerHTML = `
            <span class="chip-num">#${i + 1}</span>
            <strong>${serie.peso} kg</strong>
            <span>×</span>
            <strong>${serie.reps} reps</strong>
            <span class="chip-tipo">${serie.tipo}</span>
        `;
        seriesEl.appendChild(chip);
    });

    box.style.display = "block";
}

/*==================================================
    LOCALSTORAGE & PERSISTENCIA
==================================================*/
function guardarEntrenamientoEnStorage() {
    const hoyStr = obtenerFechaHoyStr();
    const exId = state.ejercicioSeleccionado.id;

    // Eliminar entrada previa de hoy si existe para sobreescribir con las series actualizadas
    state.workoutLogs = state.workoutLogs.filter(log => !(log.fecha === hoyStr && log.ejercicioId === exId));

    const nuevoLog = {
        id: Date.now(),
        fecha: hoyStr,
        fechaCompleta: new Date().toLocaleDateString('es-ES', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        grupo: state.grupoActual.nombre,
        ejercicioId: exId,
        ejercicioNombre: state.ejercicioSeleccionado.nombre,
        icono: state.ejercicioSeleccionado.icono,
        series: [...state.seriesTempHoy]
    };

    state.workoutLogs.unshift(nuevoLog);
    localStorage.setItem("gymtracker_logs_v1", JSON.stringify(state.workoutLogs));

    actualizarMetricasInicio();
}

function cargarLogsDesdeStorage() {
    const data = localStorage.getItem("gymtracker_logs_v1");
    if (data) {
        try {
            state.workoutLogs = JSON.parse(data);
        } catch (e) {
            state.workoutLogs = [];
        }
    }
    const cardioData = localStorage.getItem("gymtracker_cardio_v1");
    if (cardioData) {
        try {
            state.cardioLogs = JSON.parse(cardioData);
        } catch (e) {
            state.cardioLogs = [];
        }
    }
}

function actualizarMetricasInicio() {
    const hoy = new Date();

    // --- Días entrenados esta semana ---
    const diasSemana = obtenerDiasSemanaActual(hoy);
    const diasEntrenadosSemana = new Set(
        state.workoutLogs
            .map(l => l.fecha)
            .filter(f => diasSemana.includes(f))
    ).size;

    // --- Racha de días consecutivos ---
    const racha = calcularRachaConsecutiva();

    statTotalWorkouts.textContent = diasEntrenadosSemana;
    document.getElementById('statStreak').textContent = `${racha} 🔥`;

    // Actualizar el calendario semanal
    renderizarCalendarioSemanal();
}

function obtenerFechaHoyStr() {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

/*==================================================
    FUNCIONES DE SEMANA, RACHA Y CALENDARIO
==================================================*/

/**
 * Retorna un array con las fechas (en formato YYYY-M-D) de los 7 días
 * de la semana actual (Lunes a Domingo) a partir de cualquier fecha.
 */
function obtenerDiasSemanaActual(refDate) {
    const dias = [];
    const d = new Date(refDate);
    // Ajustar al lunes de esta semana (getDay() = 0 domingo, 1 lunes...)
    const diaSemana = d.getDay(); // 0=dom, 1=lun,...
    const offsetLunes = diaSemana === 0 ? -6 : 1 - diaSemana;
    d.setDate(d.getDate() + offsetLunes);
    for (let i = 0; i < 7; i++) {
        const dd = new Date(d);
        dd.setDate(d.getDate() + i);
        dias.push(`${dd.getFullYear()}-${dd.getMonth() + 1}-${dd.getDate()}`);
    }
    return dias;
}

/**
 * Calcula la racha de días consecutivos hacia atrás desde hoy.
 * Cuenta un día como "entrenado" si hay al menos 1 workout log.
 */
function calcularRachaConsecutiva() {
    const fechasEntrenadas = new Set(state.workoutLogs.map(l => l.fecha));
    let racha = 0;
    const cursor = new Date();
    // Si hoy no se entrenó, empezar a contar desde ayer
    const hoyStr = `${cursor.getFullYear()}-${cursor.getMonth() + 1}-${cursor.getDate()}`;
    if (!fechasEntrenadas.has(hoyStr)) {
        cursor.setDate(cursor.getDate() - 1);
    }
    while (true) {
        const fechaStr = `${cursor.getFullYear()}-${cursor.getMonth() + 1}-${cursor.getDate()}`;
        if (fechasEntrenadas.has(fechaStr)) {
            racha++;
            cursor.setDate(cursor.getDate() - 1);
        } else {
            break;
        }
        if (racha > 365) break; // Seguridad máxima
    }
    return racha;
}

/**
 * Renderiza el strip de 7 días (L-D) en el welcome card,
 * iluminando los días donde hay al menos 1 workout o cardio registrado.
 */
function renderizarCalendarioSemanal() {
    const container = document.getElementById('weeklyCalendar');
    if (!container) return;

    const hoy = new Date();
    const diasSemana = obtenerDiasSemanaActual(hoy);
    const hoyStr = obtenerFechaHoyStr();

    // Conjunto de todas las fechas entrenadas (pesas + cardio)
    const fechasEntrenadas = new Set([
        ...state.workoutLogs.map(l => l.fecha),
        ...state.cardioLogs.map(l => l.fecha)
    ]);

    const nombresCortos = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

    container.innerHTML = '';
    diasSemana.forEach((fechaStr, idx) => {
        const entrenado = fechasEntrenadas.has(fechaStr);
        const esHoy = fechaStr === hoyStr;

        const dayEl = document.createElement('div');
        dayEl.className = [
            'cal-day',
            entrenado ? 'cal-day--done' : '',
            esHoy ? 'cal-day--today' : ''
        ].filter(Boolean).join(' ');

        dayEl.innerHTML = `
            <span class="cal-label">${nombresCortos[idx]}</span>
            <span class="cal-dot">${entrenado ? '🟣' : ''}</span>
        `;
        container.appendChild(dayEl);
    });
}

/*==================================================
    CAMINADORA — CARDIO MODULE
==================================================*/
function abrirPantallaCaminadora() {
    renderizarHistorialCardio();
    cambiarPantalla(screens.caminadora);
}

function renderizarHistorialCardio() {
    const container = document.getElementById("containerCardioHistorial");
    container.innerHTML = "";

    let totalKm = 0;
    let totalMin = 0;

    if (state.cardioLogs.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>🏃 Aún no has registrado sesiones de caminadora.</p>
                <p><small>Toca "Nueva Sesión" para comenzar.</small></p>
            </div>
        `;
    } else {
        state.cardioLogs.forEach(sesion => {
            totalKm += sesion.distancia;
            totalMin += sesion.duracion;

            const intensidadColor = {
                "Suave": "#10b981",
                "Moderada": "#f59e0b",
                "Intensa": "#f43f5e"
            }[sesion.intensidad] || "#94a3b8";

            const card = document.createElement("div");
            card.className = "history-card cardio-history-card";
            card.innerHTML = `
                <div class="history-card-header">
                    <div>
                        <strong>🏃 Caminadora</strong>
                        <div class="history-date">${sesion.fechaCompleta}</div>
                    </div>
                    <span class="history-badge cardio-hist-badge" style="background:${intensidadColor}20;color:${intensidadColor};border-color:${intensidadColor}40">${sesion.intensidad}</span>
                </div>
                <div class="history-details">
                    <div class="cardio-detail-row">
                        <span>⏱️ <strong>${sesion.duracion} min</strong></span>
                        <span>📏 <strong>${sesion.distancia} km</strong></span>
                        ${sesion.velocidadPromedio ? `<span>⚡ ${sesion.velocidadPromedio} km/h</span>` : ''}
                    </div>
                    ${sesion.nota ? `<p class="cardio-nota"><small>📝 ${sesion.nota}</small></p>` : ''}
                </div>
                <button class="btn-del-cardio" data-id="${sesion.id}">🗑️ Eliminar</button>
            `;
            container.appendChild(card);
        });

        // Listeners para eliminar sesión
        document.querySelectorAll(".btn-del-cardio").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = parseInt(e.target.getAttribute("data-id"));
                if (confirm("¿Eliminar esta sesión de caminadora?")) {
                    state.cardioLogs = state.cardioLogs.filter(s => s.id !== id);
                    localStorage.setItem("gymtracker_cardio_v1", JSON.stringify(state.cardioLogs));
                    renderizarHistorialCardio();
                }
            });
        });
    }

    // Actualizar stats de la pantalla caminadora
    document.getElementById("caminadoraTotalSesiones").textContent = state.cardioLogs.length;
    document.getElementById("caminadoraTotalKm").textContent = `${totalKm.toFixed(1)} km`;
    document.getElementById("caminadoraTotalMin").textContent = `${totalMin} min`;
}

function configurarEventosCaminadora() {
    const modalCaminadora = document.getElementById("modalCaminadora");
    const formCaminadora = document.getElementById("formCaminadora");
    const btnNueva = document.getElementById("btnNuevaSessionCardio");
    const btnClose = document.getElementById("btnCloseModalCaminadora");
    const inputDuracion = document.getElementById("inputDuracion");
    const inputDistancia = document.getElementById("inputDistancia");
    const inputNota = document.getElementById("inputNotaCardio");

    btnNueva.addEventListener("click", () => {
        formCaminadora.reset();
        // Restablecer radio a "Suave" por defecto
        document.querySelector('input[name="intensidad"][value="Suave"]').checked = true;
        modalCaminadora.classList.add("active");
        inputDuracion.focus();
    });

    btnClose.addEventListener("click", () => modalCaminadora.classList.remove("active"));
    modalCaminadora.addEventListener("click", (e) => {
        if (e.target === modalCaminadora) modalCaminadora.classList.remove("active");
    });

    formCaminadora.addEventListener("submit", (e) => {
        e.preventDefault();
        const duracion = parseInt(inputDuracion.value) || 0;
        const distancia = parseFloat(inputDistancia.value) || 0;
        const intensidad = document.querySelector('input[name="intensidad"]:checked')?.value || "Suave";
        const nota = inputNota.value.trim();

        if (duracion <= 0 || distancia <= 0) {
            alert("Por favor ingresa la duración y la distancia.");
            return;
        }

        const velocidadPromedio = duracion > 0 ? (distancia / duracion * 60).toFixed(1) : 0;

        const nuevaSesion = {
            id: Date.now(),
            fecha: obtenerFechaHoyStr(),
            fechaCompleta: new Date().toLocaleDateString('es-ES', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
            duracion,
            distancia,
            intensidad,
            velocidadPromedio: parseFloat(velocidadPromedio),
            nota
        };

        state.cardioLogs.unshift(nuevaSesion);
        localStorage.setItem("gymtracker_cardio_v1", JSON.stringify(state.cardioLogs));

        modalCaminadora.classList.remove("active");
        formCaminadora.reset();
        renderizarHistorialCardio();
    });
}

/*==================================================
    TEMPORIZADOR DE DESCANSO
==================================================*/
function configurarEventosTimer() {
    btnQuickTimer.addEventListener("click", () => modalTimer.classList.add("active"));
    btnCloseTimerModal.addEventListener("click", () => modalTimer.classList.remove("active"));

    if (btnHelpHeader) {
        btnHelpHeader.addEventListener("click", () => modalHelp.classList.add("active"));
        btnCloseHelpModal.addEventListener("click", () => modalHelp.classList.remove("active"));
        btnGotItHelp.addEventListener("click", () => modalHelp.classList.remove("active"));
    }

    btnTimerStart.addEventListener("click", () => iniciarTimer(state.timer.secondsLeft));
    btnTimerPause.addEventListener("click", pausarTimer);
    btnTimerReset.addEventListener("click", reiniciarTimer);

    presetButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            presetButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const sec = parseInt(btn.getAttribute("data-seconds"));
            state.timer.presetSeconds = sec;
            reiniciarTimer();
        });
    });
}

function iniciarTimer(segundos) {
    if (state.timer.isRunning) clearInterval(state.timer.intervalId);

    solicitarWakeLock(); // Evita que la pantalla se apague/bloquee durante el descanso

    const ahora = Date.now();
    state.timer.endTime = ahora + (segundos * 1000);
    state.timer.secondsLeft = segundos;
    state.timer.isRunning = true;

    btnTimerStart.disabled = true;
    btnTimerPause.disabled = false;

    actualizarDisplayTimer();

    state.timer.intervalId = setInterval(() => {
        const restante = Math.max(0, Math.ceil((state.timer.endTime - Date.now()) / 1000));
        state.timer.secondsLeft = restante;
        actualizarDisplayTimer();

        if (state.timer.secondsLeft <= 0) {
            clearInterval(state.timer.intervalId);
            state.timer.isRunning = false;
            btnTimerStart.disabled = false;
            btnTimerPause.disabled = true;
            timerClock.textContent = "00:00 - ¡LISTO! 🔥";
            timerBadge.textContent = "¡LISTO!";

            liberarsWakeLock(); // Liberar bloqueo de pantalla

            // 1. Pitidos de Alarma Sonora (Web Audio API)
            reproducirSonidoAlarma();

            // 2. Patrón de Vibración Intenso (si es soportado por el móvil)
            if (navigator.vibrate) {
                navigator.vibrate([400, 200, 400, 200, 600]);
            }
        }
    }, 1000);
}

function pausarTimer() {
    clearInterval(state.timer.intervalId);
    state.timer.isRunning = false;
    btnTimerStart.disabled = false;
    btnTimerPause.disabled = true;
    liberarsWakeLock();
}

function reiniciarTimer() {
    pausarTimer();
    state.timer.secondsLeft = state.timer.presetSeconds;
    actualizarDisplayTimer();
}

function actualizarDisplayTimer() {
    const mins = Math.floor(state.timer.secondsLeft / 60);
    const secs = state.timer.secondsLeft % 60;
    const str = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    timerClock.textContent = str;
    timerBadge.textContent = str;
}

/*==================================================
    PANTALLA MI PROGRESO
==================================================*/
function abrirPantallaProgreso() {
    renderizarProgreso();
    cambiarPantalla(screens.progreso);
}

function renderizarProgreso() {
    let totalSeries = 0;
    let totalKg = 0;

    containerHistorial.innerHTML = "";

    if (state.workoutLogs.length === 0) {
        containerHistorial.innerHTML = `
            <div class="empty-state">
                <p>🏋️‍♂️ Aún no has registrado ningún entrenamiento.</p>
                <p><small>Selecciona un ejercicio y guarda tus primeras series.</small></p>
            </div>
        `;
    } else {
        // Agrupar logs por fecha (más reciente primero)
        const logsByDate = new Map();
        state.workoutLogs.forEach(log => {
            if (!logsByDate.has(log.fecha)) logsByDate.set(log.fecha, []);
            logsByDate.get(log.fecha).push(log);
        });

        // Configuración visual de chips por tipo de serie
        const chipConfig = {
            "Efectiva":      { emoji: "🔥", clase: "chip-efectiva" },
            "Calentamiento": { emoji: "♨️",  clase: "chip-calentamiento" },
            "Drop Set":      { emoji: "💥", clase: "chip-dropset" },
            "Fallo":         { emoji: "💀", clase: "chip-fallo" }
        };

        logsByDate.forEach((logsDelDia, fecha) => {
            let diaKg = 0;
            let diaSeries = 0;

            // Calcular totales del día y globales
            logsDelDia.forEach(log => {
                log.series.forEach(s => {
                    const vol = s.peso * s.reps;
                    diaKg  += vol;
                    diaSeries++;
                    totalKg += vol;
                    totalSeries++;
                });
            });

            const fechaDisplay = formatearFechaHistorial(fecha);

            // Construir tarjetas de ejercicios del día
            let exercisesHTML = "";
            logsDelDia.forEach(log => {
                let logKg = 0;
                log.series.forEach(s => { logKg += s.peso * s.reps; });

                const chipsHTML = log.series.map(s => {
                    const cfg = chipConfig[s.tipo] || { emoji: "▪️", clase: "chip-efectiva" };
                    return `<span class="serie-chip ${cfg.clase}">${cfg.emoji} ${s.peso}kg × ${s.reps}</span>`;
                }).join("");

                exercisesHTML += `
                    <div class="history-card">
                        <div class="history-card-header">
                            <div>
                                <strong>${log.icono} ${log.ejercicioNombre}</strong>
                                <div class="history-date">📌 ${log.grupo}</div>
                            </div>
                            <span class="history-badge">${log.series.length} series</span>
                        </div>
                        <div class="series-chips-container">
                            ${chipsHTML}
                        </div>
                        <div class="exercise-volume">💪 Volumen: <strong>${Math.round(logKg).toLocaleString()} kg</strong></div>
                    </div>
                `;
            });

            // Construir grupo del día
            const dayGroup = document.createElement("div");
            dayGroup.className = "day-group";
            dayGroup.innerHTML = `
                <div class="day-header">
                    <span class="day-title">📅 ${fechaDisplay}</span>
                    <span class="day-summary-pill">${diaSeries} series · ${Math.round(diaKg).toLocaleString()} kg</span>
                </div>
                <div class="day-exercises">
                    ${exercisesHTML}
                </div>
            `;
            containerHistorial.appendChild(dayGroup);
        });
    }

    // Días únicos de entrenamiento (más representativo que nº de entradas)
    const diasUnicos = new Set(state.workoutLogs.map(l => l.fecha)).size;
    progresoTotalRutinas.textContent = diasUnicos;
    progresoTotalSeries.textContent = totalSeries;
    progresoTotalKg.textContent = `${Math.round(totalKg).toLocaleString()} kg`;

    // --- Estadísticas de Cardio ---
    let totalCardioKm = 0;
    let totalCardioMin = 0;
    state.cardioLogs.forEach(sesion => {
        totalCardioKm += sesion.distancia;
        totalCardioMin += sesion.duracion;
    });
    document.getElementById("progresoCardioSesiones").textContent = state.cardioLogs.length;
    document.getElementById("progresoCardioKm").textContent = `${totalCardioKm.toFixed(1)} km`;
    document.getElementById("progresoCardioMin").textContent = `${totalCardioMin} min`;
}

function formatearFechaHistorial(fechaStr) {
    const [year, month, day] = fechaStr.split('-').map(Number);
    const fecha = new Date(year, month - 1, day);
    return fecha.toLocaleDateString('es-ES', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
}

btnClearHistory.addEventListener("click", () => {
    if (state.workoutLogs.length === 0 && state.cardioLogs.length === 0) return;

    if (confirm("¿Estás seguro de que deseas borrar todo tu historial de entrenamientos y cardio?")) {
        state.workoutLogs = [];
        state.cardioLogs = [];
        localStorage.removeItem("gymtracker_logs_v1");
        localStorage.removeItem("gymtracker_cardio_v1");
        actualizarMetricasInicio();
        renderizarProgreso();
    }
});

/*==================================================
    SALUDO PERSONALIZADO
==================================================*/
function inicializarSaludo() {
    const modalNombre     = document.getElementById("modalNombre");
    const inputNombre     = document.getElementById("inputNombreUsuario");
    const btnGuardar      = document.getElementById("btnGuardarNombre");
    const btnEdit         = document.getElementById("btnEditName");

    // Cargar nombre guardado
    const nombreGuardado = localStorage.getItem("gymtracker_user_name");

    if (nombreGuardado) {
        state.userName = nombreGuardado;
        modalNombre.classList.remove("active");   // No mostrar modal
        aplicarSaludo(nombreGuardado);
    } else {
        modalNombre.classList.add("active");       // Primera vez: mostrar modal
    }

    // Guardar nombre al pulsar el botón
    function guardarNombre() {
        const nombre = inputNombre.value.trim();
        if (!nombre) {
            inputNombre.classList.add("input-error");
            inputNombre.placeholder = "Por favor escribe tu nombre 😊";
            setTimeout(() => {
                inputNombre.classList.remove("input-error");
                inputNombre.placeholder = "Escribe tu nombre...";
            }, 1500);
            return;
        }
        state.userName = nombre;
        localStorage.setItem("gymtracker_user_name", nombre);
        modalNombre.classList.remove("active");
        aplicarSaludo(nombre);
        inputNombre.value = "";
    }

    btnGuardar.addEventListener("click", guardarNombre);

    // También guardar al presionar Enter
    inputNombre.addEventListener("keydown", (e) => {
        if (e.key === "Enter") guardarNombre();
    });

    // Botón editar nombre (ícono ✏️ en el saludo)
    btnEdit.addEventListener("click", () => {
        inputNombre.value = state.userName;
        modalNombre.classList.add("active");
        setTimeout(() => inputNombre.focus(), 200);
    });
}

function aplicarSaludo(nombre) {
    const saludoEl    = document.getElementById("saludoTexto");
    const subtextoEl  = document.getElementById("saludoSubtexto");

    const hora = new Date().getHours();
    let saludo, emoji;

    if (hora >= 5 && hora < 12) {
        saludo = "Buenos días"; emoji = "🌅";
    } else if (hora >= 12 && hora < 19) {
        saludo = "Buenas tardes"; emoji = "☀️";
    } else {
        saludo = "Buenas noches"; emoji = "🌙";
    }

    // Nombre con primera letra en mayúscula
    const nombreFormateado = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();

    saludoEl.textContent = `¡${saludo}, ${nombreFormateado}! ${emoji}`;

    // Mensajes motivacionales aleatorios
    const mensajes = [
        `¿Qué vamos a entrenar hoy, ${nombreFormateado}? 💪`,
        `¡Hoy es un gran día para superarte, ${nombreFormateado}!`,
        `¡Listo para el gym, ${nombreFormateado}? ¡Vamos con todo! 🔥`,
        `¡${nombreFormateado}, tu mejor versión te espera hoy!`,
        `¡A romperla hoy, ${nombreFormateado}! No hay excusas. 💥`,
        `Selecciona tu rutina y registra cada serie, ${nombreFormateado}. 🏋️`
    ];
    subtextoEl.textContent = mensajes[Math.floor(Math.random() * mensajes.length)];
}