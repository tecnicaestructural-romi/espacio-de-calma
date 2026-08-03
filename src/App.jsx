import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { ESTADOS } from "./acompanamiento/data.js";
import EstadoScreen from "./acompanamiento/EstadoScreen.jsx";

/* =========================================================
   TÉCNICA ESTRUCTURAL | por Romi Calcaterra
   App de acompañamiento — React, single file
   ========================================================= */

const BASE_URL = import.meta.env.BASE_URL;

const LOGO_SRC = `${BASE_URL}images/logo.webp`;

/* ---- Datos de contacto: número de WhatsApp y página de Canva de Romi ---- */

const INICIO_COVER_SRC = `${BASE_URL}images/inicio-portada.webp`;

const WHATSAPP_NUMBER = "5493471677248";
const CANVA_URL = "https://tecnicaestructuralromi.my.canva.site/romi";

const COLORS = {
  terracota: "#C96B4B",
  naranja: "#E38B5B",
  beige: "#EED9C8",
  arena: "#DCC3A5",
  rosaViejo: "#D8A7A1",
  coral: "#D97B66",
  mostaza: "#C9A35D",
  dorado: "#B9925A",
  marfil: "#FAF6F1",
  blanco: "#FFFDFB",
  topo: "#8B7E74",
  marron: "#5B4636",
};

const NAV_ITEMS = [
  { id: "inicio", label: "Inicio" },
  { id: "tecnica", label: "Conocer la técnica" },
  { id: "sesion", label: "Solicitar una sesión" },
  { id: "proceso", label: "Mi proceso" },
  { id: "ruleta", label: "Rueda de acompañamiento" },
  { id: "acompanamiento", label: "Solicitar un parche" },
];

export function openWhatsApp(message) {
  const encodedMessage = encodeURIComponent(message);
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
    "_blank",
    "noopener,noreferrer"
  );
}

/* ============================= APP ============================= */

export default function App() {
  const [page, setPage] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = useCallback((id) => {
    setPage(id);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="app-root">
      <GlobalStyle />
      <Header page={page} goTo={goTo} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className="main-content">
        {page === "inicio" && <Inicio goTo={goTo} />}
        {page === "tecnica" && <ConocerTecnica goTo={goTo} />}
        {page === "sesion" && <SolicitarSesion />}
        {page === "proceso" && <MiProceso />}
        {page === "acompanamiento" && <NecesitoAcompanamiento />}
        {page === "ruleta" && <RuletaEmociones />}
        {page === "contacto" && <Contacto />}
      </main>
      <Footer goTo={goTo} />
    </div>
  );
}

/* ============================= HEADER ============================= */

function Header({ page, goTo, menuOpen, setMenuOpen }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="brand-block" onClick={() => goTo("inicio")} aria-label="Ir al inicio">
          <img src={LOGO_SRC} alt="Técnica Estructural" className="brand-logo" />
          <span className="brand-text">
            <span className="brand-line1">Técnica Estructural</span>
            <span className="brand-line2">por Romi Calcaterra</span>
          </span>
        </button>

        <nav className="nav-desktop">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={"nav-link" + (page === item.id ? " nav-link-active" : "")}
              onClick={() => goTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={"nav-mobile" + (menuOpen ? " nav-mobile-open" : "")}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={"nav-mobile-link" + (page === item.id ? " nav-link-active" : "")}
            onClick={() => goTo(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}

/* ============================= FOOTER ============================= */

function Footer({ goTo }) {
  return (
    <footer className="site-footer">
      <img src={LOGO_SRC} alt="Técnica Estructural" className="footer-logo" />
      <p className="footer-brand">Técnica Estructural | por Romi Calcaterra</p>
      <p className="footer-line">
        Un espacio de acompañamiento creado para transitar tu proceso con calma, presencia y contención.
      </p>
      <p className="footer-legal">
        Esta aplicación es una herramienta personal de acompañamiento y no reemplaza la atención médica,
        psicológica ni tratamientos profesionales.
      </p>
      <div className="footer-nav">
        <button onClick={() => goTo("contacto")}>Contacto</button>
        <span className="footer-dot">·</span>
        <button onClick={() => goTo("tecnica")}>Conocer la técnica</button>
      </div>
    </footer>
  );
}

/* ============================= INICIO ============================= */

function Inicio({ goTo }) {
  return (
    <section className="section inicio-section">
      <div className="inicio-hero card-soft">
        <img src={LOGO_SRC} alt="Técnica Estructural" className="hero-logo" />
        <h1 className="hero-title">
          Técnica Estructural
          <span className="hero-title-sub">por Romi Calcaterra</span>
        </h1>
        <p className="hero-subtitle">
          Acompañamiento personalizado para transitar tu proceso con calma, confianza y respeto por tus tiempos.
        </p>
        <p className="hero-phrase">“Liberá tu cuerpo, liberá tu historia.”</p>
      </div>

      <p className="hero-welcome">
        Bienvenida/o a este espacio creado para acompañarte de manera amorosa y profesional durante tu proceso.
        No necesitás hacerlo sola/o. A veces, el cuerpo guarda más de lo que las palabras pueden expresar,
        y también sabe encontrar su propio camino hacia el equilibrio.
      </p>

      <div className="inicio-buttons">
        <button className="btn btn-primary" onClick={() => goTo("tecnica")}>Conocer la técnica</button>
        <button className="btn btn-primary" onClick={() => goTo("sesion")}>Solicitar una sesión</button>
        <button className="btn btn-secondary" onClick={() => goTo("proceso")}>Mi proceso</button>
        <button className="btn btn-secondary" onClick={() => goTo("acompanamiento")}>Solicitar un parche</button>
        <button className="btn btn-secondary" onClick={() => goTo("ruleta")}>Rueda de acompañamiento</button>
        <button className="btn btn-outline" onClick={() => goTo("contacto")}>Contactarme</button>
      </div>

      <div className="inicio-imagen-card">
        <img
          src={INICIO_COVER_SRC}
          alt="Persona meditando al atardecer frente a montañas y un lago, rodeada de flores"
          className="inicio-imagen"
        />
      </div>
    </section>
  );
}

/* ============================= CONOCER LA TÉCNICA ============================= */

function ConocerTecnica({ goTo }) {
  return (
    <section className="section">
      <h2 className="section-title">¿Qué es la Técnica Estructural?</h2>

      <div className="card-soft text-block">
        <p>
          La Técnica Estructural es un método bioenergético no invasivo, orientado a favorecer la armonía
          corporal y emocional.
        </p>
        <p>
          Puede acompañar procesos relacionados con molestias corporales y cargas emocionales complejas,
          desde un abordaje respetuoso y profundo, sin manipulaciones físicas ni necesidad de revivir
          experiencias dolorosas.
        </p>
        <p>
          Te acompaño respetando tus tiempos y las necesidades particulares de tu proceso, brindándote un
          espacio de calma, contención y bienestar.
        </p>
      </div>

      <div className="disclaimer-box">
        La Técnica Estructural es una práctica complementaria y no sustituye la atención médica, psicológica
        ni los tratamientos farmacológicos indicados por profesionales.
      </div>

      <div className="section-cta">
        <button className="btn btn-primary" onClick={() => goTo("sesion")}>Solicitar una sesión</button>
      </div>
    </section>
  );
}

/* ============================= SOLICITAR UNA SESIÓN ============================= */

function SolicitarSesion() {
  const [form, setForm] = useState({
    nombre: "",
    edad: "",
    whatsapp: "",
    ciudad: "",
    tipoSesion: "adulto",
    otroDetalle: "",
  });
  const [aceptado, setAceptado] = useState(false);
  const [errores, setErrores] = useState({});

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrores((err) => ({ ...err, [field]: false }));
  };

  const TIPO_SESION_LABELS = {
    adulto: "Adulto",
    adolescente: "Adolescente",
    nino: "Niño/a",
    animal: "Animal",
    hogar: "Hogar o espacio",
    vehiculo: "Vehículo",
    empresa: "Empresa o emprendimiento",
    relacion: "Relación o vínculo",
    otro: "Otro",
  };

  function handleAgendarSesion() {
    const nuevosErrores = {
      nombre: form.nombre.trim() === "",
      edad: form.edad.trim() === "",
      whatsapp: form.whatsapp.trim() === "",
      ciudad: form.ciudad.trim() === "",
      aceptado: !aceptado,
      otroDetalle: form.tipoSesion === "otro" && form.otroDetalle.trim() === "",
    };
    setErrores(nuevosErrores);

    const hayErrores = Object.values(nuevosErrores).some(Boolean);
    if (hayErrores) return;

    const tipoLabel = TIPO_SESION_LABELS[form.tipoSesion];

    const lineas = [
      "Hola Romi, quisiera agendar una sesión de Técnica Estructural.",
      `Nombre y apellido: ${form.nombre}`,
      `Edad: ${form.edad}`,
      `Número de contacto: ${form.whatsapp}`,
      `Ciudad y país: ${form.ciudad}`,
      `La sesión sería para: ${tipoLabel}`,
    ];

    if (form.tipoSesion === "otro") {
      lineas.push(`Aclaración: ${form.otroDetalle}`);
    }

    const message = lineas.join("\n");
    openWhatsApp(message);
  }

  return (
    <section className="section">
      <h2 className="section-title">Solicitar una sesión</h2>
      <p className="section-subtext">
        Si sentís el deseo de comenzar tu proceso, podés dejar tus datos y preparar tu mensaje de contacto.
      </p>

      <div className="card-soft form-block">
        <label className="field">
          <span>Nombre y apellido</span>
          <input value={form.nombre} onChange={update("nombre")} placeholder="Tu nombre" />
          {errores.nombre && <span className="field-error">Completá este dato para continuar.</span>}
        </label>

        <label className="field">
          <span>Edad</span>
          <input type="number" min="0" value={form.edad} onChange={update("edad")} placeholder="Edad" />
          {errores.edad && <span className="field-error">Completá este dato para continuar.</span>}
        </label>

        <label className="field">
          <span>Número de WhatsApp</span>
          <input value={form.whatsapp} onChange={update("whatsapp")} placeholder="Ej: +54 9 381 000 0000" />
          {errores.whatsapp && <span className="field-error">Completá este dato para continuar.</span>}
        </label>

        <label className="field">
          <span>Ciudad y país</span>
          <input value={form.ciudad} onChange={update("ciudad")} placeholder="Ciudad, país" />
          {errores.ciudad && <span className="field-error">Completá este dato para continuar.</span>}
        </label>

        <label className="field">
          <span>¿Para quién o qué es la sesión?</span>
          <select value={form.tipoSesion} onChange={update("tipoSesion")}>
            <option value="adulto">Adulto</option>
            <option value="adolescente">Adolescente</option>
            <option value="nino">Niño/a</option>
            <option value="animal">Animal</option>
            <option value="hogar">Hogar o espacio</option>
            <option value="vehiculo">Vehículo</option>
            <option value="empresa">Empresa o emprendimiento</option>
            <option value="relacion">Relación o vínculo</option>
            <option value="otro">Otro</option>
          </select>
        </label>

        {form.tipoSesion === "otro" && (
          <label className="field">
            <span>Contame brevemente para quién o para qué sería la sesión</span>
            <textarea
              rows={3}
              value={form.otroDetalle}
              onChange={update("otroDetalle")}
              placeholder="Por ejemplo: una casa, un proyecto, una situación particular u otro aspecto."
            />
            {errores.otroDetalle && <span className="field-error">Completá este dato para continuar.</span>}
          </label>
        )}

        <label className="checkbox-field">
          <input
            type="checkbox"
            checked={aceptado}
            onChange={(e) => {
              setAceptado(e.target.checked);
              setErrores((err) => ({ ...err, aceptado: false }));
            }}
          />
          <span>
            Comprendo que la Técnica Estructural es una práctica complementaria y no reemplaza tratamientos
            médicos ni psicológicos.
          </span>
        </label>
        {errores.aceptado && <span className="field-error">Completá este dato para continuar.</span>}

        <button type="button" className="btn btn-primary btn-full btn-agendar" onClick={handleAgendarSesion}>
          Agendar una sesión
        </button>
      </div>
    </section>
  );
}

/* ============================= MI PROCESO ============================= */

const SESIONES_BASE = [1, 2, 3, 4].map((n) => ({
  key: `s${n}`,
  numero: n,
  titulo: `Sesión ${n}`,
  fecha: "",
  estado: "pendiente",
  nota: "",
  removable: false,
}));

function loadSesiones() {
  try {
    const raw = localStorage.getItem("te_mi_proceso");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) {
        let sesiones = parsed.map((s, i) => {
          const numero = s.numero || i + 1;
          return {
            key: s.key || `s${numero}`,
            numero,
            titulo: `Sesión ${numero}`,
            fecha: s.fecha || "",
            estado: s.estado || "pendiente",
            nota: s.nota || "",
            removable: numero > 4,
          };
        });

        // Migración: versiones anteriores de la app guardaban una 5ta
        // sesión por defecto. Si esa sesión nunca fue completada por la
        // persona (sin fecha, sin nota, estado "pendiente"), se elimina
        // automáticamente para volver al valor inicial de 4 sesiones.
        // Si la Sesión 5 tiene datos reales cargados, se conserva tal cual.
        if (sesiones.length === 5) {
          const quinta = sesiones.find((s) => s.numero === 5);
          const quintaVacia =
            quinta && quinta.fecha === "" && quinta.estado === "pendiente" && quinta.nota === "";
          if (quintaVacia) {
            sesiones = sesiones.filter((s) => s.numero !== 5);
          }
        }

        return sesiones;
      }
    }
  } catch (e) {}
  return SESIONES_BASE;
}

function MiProceso() {
  const [sesiones, setSesiones] = useState(loadSesiones);

  useEffect(() => {
    try {
      localStorage.setItem("te_mi_proceso", JSON.stringify(sesiones));
    } catch (e) {}
  }, [sesiones]);

  const updateSesion = (key, field, value) => {
    setSesiones((prev) => prev.map((s) => (s.key === key ? { ...s, [field]: value } : s)));
  };

  const agregarSesion = () => {
    setSesiones((prev) => {
      const siguienteNumero = prev.length ? Math.max(...prev.map((s) => s.numero)) + 1 : 1;
      return [
        ...prev,
        {
          key: `s${siguienteNumero}`,
          numero: siguienteNumero,
          titulo: `Sesión ${siguienteNumero}`,
          fecha: "",
          estado: "pendiente",
          nota: "",
          removable: true,
        },
      ];
    });
  };

  const eliminarSesion = (key) => {
    const confirmar = window.confirm("¿Segura/o que querés eliminar esta sesión? Esta acción no se puede deshacer.");
    if (!confirmar) return;
    setSesiones((prev) => prev.filter((s) => s.key !== key));
  };

  return (
    <section className="section">
      <h2 className="section-title">Mi proceso</h2>
      <p className="section-subtext">
        Cada proceso es personal. La cantidad de sesiones puede variar según lo que sea adecuado para cada
        persona.
      </p>

      <div className="proceso-track">
        {sesiones.map((s) => (
          <div key={s.key} className="proceso-card card-soft">
            <div className="proceso-card-head">
              <span className={"proceso-dot" + (s.estado === "realizada" ? " proceso-dot-done" : "")}>
                {s.numero}
              </span>
              <h3>{s.titulo}</h3>
            </div>

            <label className="field">
              <span>Fecha</span>
              <input type="date" value={s.fecha} onChange={(e) => updateSesion(s.key, "fecha", e.target.value)} />
            </label>

            <label className="field">
              <span>Estado</span>
              <select value={s.estado} onChange={(e) => updateSesion(s.key, "estado", e.target.value)}>
                <option value="pendiente">Pendiente</option>
                <option value="realizada">Realizada</option>
              </select>
            </label>

            <label className="field">
              <span>Nota personal (opcional)</span>
              <textarea
                rows={2}
                value={s.nota}
                onChange={(e) => updateSesion(s.key, "nota", e.target.value)}
                placeholder="Un espacio para vos..."
              />
            </label>

            {s.removable && (
              <button type="button" className="proceso-eliminar" onClick={() => eliminarSesion(s.key)}>
                Eliminar sesión
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="section-cta">
        <button type="button" className="btn btn-outline" onClick={agregarSesion}>
          + Agregar otra sesión
        </button>
      </div>

      <div className="highlight-card">
        <p>
          No necesitás buscar cambios constantemente. Permití que el proceso se integre respetando tus
          tiempos. A veces lo adecuado llega de una manera diferente a la que imaginábamos.
        </p>
      </div>
      <div className="warm-note">
        <p>Tu camino no necesita presión. Solo presencia, apertura y tiempo.</p>
      </div>
      <div className="warm-note warm-note-alt">
        <p>Durante todo el proceso vas a estar acompañada/o.</p>
      </div>
      <div className="warm-note">
        <p>
          No todos los procesos necesitan la misma cantidad de sesiones. Cada recorrido se acompaña
          respetando sus propios tiempos y necesidades.
        </p>
      </div>
    </section>
  );
}

/* ============================= SOLICITAR UN PARCHE ============================= */

const PARCHE_OPCIONES = [
  {
    key: "fisica",
    titulo: "Molestia física",
    texto: "Para acompañar una molestia, incomodidad o tensión que estás sintiendo en tu cuerpo.",
  },
  {
    key: "emocional",
    titulo: "Molestia emocional",
    texto: "Para acompañar una emoción, preocupación o situación que en este momento te está afectando.",
  },
];

function NecesitoAcompanamiento() {
  const [seleccion, setSeleccion] = useState(null);

  const handleWhatsApp = () => {
    openWhatsApp("Hola Romi, quiero solicitarte un parche.");
  };

  return (
    <section className="section">
      <h2 className="section-title">Solicitar un parche</h2>
      <p className="section-subtext">
        Elegí la opción que más se acerque a lo que estás sintiendo. No necesitás explicar lo que te sucede
        ni contar ningún detalle.
      </p>

      <div className="parche-grid">
        {PARCHE_OPCIONES.map((o) => {
          const isActive = seleccion === o.key;
          return (
            <button
              key={o.key}
              className={"parche-card" + (isActive ? " parche-card-active" : "")}
              onClick={() => setSeleccion(o.key)}
              aria-pressed={isActive}
            >
              {isActive && <span className="parche-check">✓</span>}
              <h3>{o.titulo}</h3>
              <p>{o.texto}</p>
            </button>
          );
        })}
      </div>

      <div className="section-cta parche-cta">
        <button className="btn btn-primary" onClick={handleWhatsApp} disabled={!seleccion}>
          Quiero un parche
        </button>
        <p className="parche-frase">
          No necesitás explicar lo que te sucede. Estoy para acompañarte durante tu proceso.
        </p>
      </div>
    </section>
  );
}

/* ============================= RULETA DE EMOCIONES ============================= */

function describeArc(cx, cy, r, startAngle, endAngle) {
  const toRad = (deg) => ((deg - 90) * Math.PI) / 180;
  const start = { x: cx + r * Math.cos(toRad(startAngle)), y: cy + r * Math.sin(toRad(startAngle)) };
  const end = { x: cx + r * Math.cos(toRad(endAngle)), y: cy + r * Math.sin(toRad(endAngle)) };
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
}

function labelPosition(cx, cy, r, angle) {
  const toRad = (deg) => ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(toRad(angle)), y: cy + r * Math.sin(toRad(angle)) };
}

const RUEDA_NOMBRES_CORTOS = {
  ansiedad: "Ansiedad",
  tristeza: "Tristeza",
  miedo: "Miedo",
  enojo: "Enojo",
  estres: "Estrés",
  soledad: "Soledad",
  cansancio: "Cansancio",
  dormir: "Descanso",
};

const RUEDA_COLORES = {
  ansiedad: "#C96B4B",
  tristeza: "#D8A7A1",
  miedo: "#C9A35D",
  enojo: "#D97B66",
  estres: "#E38B5B",
  soledad: "#B9925A",
  cansancio: "#EED9C8",
  dormir: "#DCC3A5",
};

const RUEDA_TEXTO_CLARO = new Set(["tristeza", "miedo", "cansancio", "dormir", "estres"]);

const RUEDA_WHATSAPP_MENSAJES = {
  ansiedad: "Hola Romi, estoy utilizando la sección Ansiedad de tu aplicación y quisiera comunicarme con vos.",
  tristeza: "Hola Romi, estoy utilizando la sección Tristeza de tu aplicación y quisiera comunicarme con vos.",
  miedo: "Hola Romi, estoy utilizando la sección Miedo de tu aplicación y quisiera comunicarme con vos.",
  enojo: "Hola Romi, estoy utilizando la sección Enojo de tu aplicación y quisiera comunicarme con vos.",
  estres: "Hola Romi, estoy utilizando la sección Estrés de tu aplicación y quisiera comunicarme con vos.",
  soledad: "Hola Romi, estoy utilizando la sección Soledad de tu aplicación y quisiera comunicarme con vos.",
  cansancio: "Hola Romi, estoy utilizando la sección Cansancio de tu aplicación y quisiera comunicarme con vos.",
  dormir: "Hola Romi, estoy utilizando la sección Descanso de tu aplicación y quisiera comunicarme con vos.",
};

function RuletaEmociones() {
  const [seleccion, setSeleccion] = useState(null);
  const [abierta, setAbierta] = useState(false);
  const segAngle = 360 / ESTADOS.length;
  const cx = 160,
    cy = 160,
    rOuter = 148,
    rLabel = rOuter * 0.68,
    rCenter = 62;

  const estado = ESTADOS.find((e) => e.key === seleccion);

  const handleWhatsAppEstado = () => {
    if (!estado) return;
    openWhatsApp(RUEDA_WHATSAPP_MENSAJES[estado.key]);
  };

  if (abierta && estado) {
    return (
      <section className="section">
        <EstadoScreen estado={estado} onVolver={() => setAbierta(false)} />
      </section>
    );
  }

  return (
    <section className="section">
      <h2 className="section-title">Rueda de acompañamiento</h2>
      <p className="section-subtext">
        Elegí aquello que necesitás acompañar en este momento y accedé a una propuesta creada para
        transitarlo con calma.
      </p>

      <div className="ruleta-panel card-soft">
        <div className="ruleta-svg-wrap">
          <svg viewBox="0 0 320 320" className="ruleta-svg" role="img" aria-label="Rueda de acompañamiento">
            <defs>
              <filter id="ruletaShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#5B4636" floodOpacity="0.16" />
              </filter>
            </defs>
            <g filter="url(#ruletaShadow)">
              {ESTADOS.map((e, i) => {
                const start = i * segAngle;
                const end = start + segAngle;
                const mid = start + segAngle / 2;
                const pos = labelPosition(cx, cy, rLabel, mid);
                const isActive = seleccion === e.key;
                return (
                  <g
                    key={e.key}
                    className={"ruleta-segment" + (isActive ? " ruleta-segment-active" : "")}
                    onClick={() => { setSeleccion(e.key); setAbierta(false); }}
                    tabIndex={0}
                    role="button"
                    aria-label={e.label}
                    aria-pressed={isActive}
                    onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setSeleccion(e.key); setAbierta(false); } }}
                    style={{ transformOrigin: `${cx}px ${cy}px` }}
                  >
                    <path
                      d={describeArc(cx, cy, rOuter, start, end)}
                      fill={RUEDA_COLORES[e.key]}
                      stroke="#FFFDFB"
                      strokeWidth={2}
                      opacity={seleccion && !isActive ? 0.55 : 1}
                    />
                    {isActive && (
                      <path
                        d={describeArc(cx, cy, rOuter, start, end)}
                        fill="none"
                        stroke={COLORS.dorado}
                        strokeWidth={2.5}
                        opacity={0.9}
                        className="ruleta-ring"
                      />
                    )}
                    <text
                      x={pos.x}
                      y={pos.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="ruleta-label"
                      fill={RUEDA_TEXTO_CLARO.has(e.key) ? COLORS.marron : "#FFFDFB"}
                    >
                      {RUEDA_NOMBRES_CORTOS[e.key]}
                    </text>
                  </g>
                );
              })}
            </g>
            <circle cx={cx} cy={cy} r={rCenter} fill="#FFFDFB" stroke={COLORS.dorado} strokeWidth="1.5" opacity={1} className="ruleta-center-circle" />
            <text x={cx} y={cy - 15} textAnchor="middle" dominantBaseline="middle" className="ruleta-center-title">
              <tspan x={cx} dy="0">¿Qué necesitás</tspan>
              <tspan x={cx} dy="15">acompañar</tspan>
              <tspan x={cx} dy="15">hoy?</tspan>
            </text>
            <text x={cx} y={cy + 34} textAnchor="middle" dominantBaseline="middle" className="ruleta-center-sub">Tocá una opción</text>
          </svg>
        </div>

        {estado && (
          <div className="ruleta-resultado">
            <span
              className="ruleta-resultado-tag"
              style={{ background: RUEDA_COLORES[estado.key], color: RUEDA_TEXTO_CLARO.has(estado.key) ? COLORS.marron : "#FFFDFB" }}
            >
              {estado.label}
            </span>
            <p className="ruleta-resultado-mensaje">{estado.texto}</p>

            <div className="ruleta-resultado-acciones">
              <button className="btn btn-primary btn-small" onClick={() => setAbierta(true)}>
                Meditación, ejercicio y oración
              </button>
              <button className="btn btn-outline btn-small" onClick={handleWhatsAppEstado}>Escribirle a Romi</button>
            </div>
          </div>
        )}
      </div>

      <div className="ruleta-frase-final">
        <p>No necesitás tener todo resuelto ahora. A veces alcanza con darte un pequeño paso de calma.</p>
        <p className="ruleta-frase-delicada">Volver a vos también es parte del proceso.</p>
      </div>
    </section>
  );
}

/* ============================= CONTACTO ============================= */

function Contacto() {
  const handleWhatsApp = () => {
    openWhatsApp("Hola Romi, conocí tu espacio de Técnica Estructural a través de tu aplicación y quisiera comunicarme con vos.");
  };

  return (
    <section className="section">
      <h2 className="section-title">Contacto</h2>

      <div className="card-soft contacto-card">
        <img src={LOGO_SRC} alt="Técnica Estructural" className="contacto-logo" />
        <p className="contacto-text">Tu acompañamiento está a cargo de Romi Calcaterra.</p>

        <div className="contacto-buttons">
          <button className="btn btn-primary" onClick={handleWhatsApp}>Hablar con Romi por WhatsApp</button>
          <a className="btn btn-outline" href={CANVA_URL} target="_blank" rel="noopener noreferrer">
            Conocer la página de Romi
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================= GLOBAL STYLE ============================= */

function GlobalStyle() {
  return (
    <style>{`
      .app-root {
        --terracota: ${COLORS.terracota};
        --naranja: ${COLORS.naranja};
        --beige: ${COLORS.beige};
        --arena: ${COLORS.arena};
        --rosaViejo: ${COLORS.rosaViejo};
        --coral: ${COLORS.coral};
        --mostaza: ${COLORS.mostaza};
        --dorado: ${COLORS.dorado};
        --marfil: ${COLORS.marfil};
        --blanco: ${COLORS.blanco};
        --topo: ${COLORS.topo};
        --marron: ${COLORS.marron};
        --hover: #B65C3F;
        --border: #E6D6C8;

        background: var(--marfil);
        color: var(--topo);
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        font-family: 'Georgia', 'Iowan Old Style', 'Palatino Linotype', serif;
      }

      .app-root * { box-sizing: border-box; }

      @media (prefers-reduced-motion: reduce) {
        .app-root * { animation: none !important; transition: none !important; }
      }

      /* ---------- HEADER ---------- */
      .site-header {
        position: sticky;
        top: 0;
        z-index: 40;
        background: rgba(250,246,241,0.94);
        backdrop-filter: blur(6px);
        border-bottom: 1px solid var(--border);
      }
      .header-inner {
        max-width: 1080px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 18px;
        gap: 12px;
      }
      .brand-block {
        display: flex;
        align-items: center;
        gap: 10px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
      }
      .brand-logo { width: 40px; height: auto; object-fit: contain; }
      .brand-text { display: flex; flex-direction: column; text-align: left; line-height: 1.15; }
      .brand-line1 { font-size: 15px; color: var(--marron); font-weight: 700; letter-spacing: 0.2px; }
      .brand-line2 { font-size: 11px; color: var(--topo); font-style: italic; }

      .nav-desktop { display: none; gap: 4px; flex-wrap: wrap; justify-content: flex-end; }
      .nav-link {
        background: none;
        border: none;
        color: var(--topo);
        font-size: 13.5px;
        padding: 8px 10px;
        border-radius: 999px;
        cursor: pointer;
        font-family: inherit;
        transition: background .25s ease, color .25s ease;
        white-space: nowrap;
      }
      .nav-link:hover { background: var(--beige); color: var(--marron); }
      .nav-link-active { background: var(--terracota); color: var(--blanco) !important; }

      .menu-toggle {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 4px;
        width: 34px;
        height: 34px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
      }
      .menu-toggle span { display: block; height: 2px; background: var(--marron); border-radius: 2px; }

      .nav-mobile {
        max-height: 0;
        overflow: hidden;
        transition: max-height .35s ease;
        display: flex;
        flex-direction: column;
        background: var(--blanco);
        border-top: 1px solid var(--border);
      }
      .nav-mobile-open { max-height: 480px; }
      .nav-mobile-link {
        text-align: left;
        background: none;
        border: none;
        border-bottom: 1px solid var(--border);
        padding: 13px 20px;
        font-size: 14.5px;
        color: var(--topo);
        cursor: pointer;
        font-family: inherit;
      }
      .nav-mobile-link.nav-link-active { color: var(--terracota); font-weight: 700; }

      @media (min-width: 860px) {
        .nav-desktop { display: flex; }
        .menu-toggle { display: none; }
        .nav-mobile { display: none; }
      }

      /* ---------- LAYOUT ---------- */
      .main-content { flex: 1; max-width: 900px; margin: 0 auto; width: 100%; padding: 28px 18px 60px; }
      .section { display: flex; flex-direction: column; gap: 20px; animation: fadeIn .5s ease; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(8px);} to { opacity: 1; transform: translateY(0);} }

      .section-title {
        color: var(--marron);
        font-size: 26px;
        font-weight: 700;
        letter-spacing: 0.2px;
        margin: 4px 0 0;
      }
      .section-subtext { color: var(--topo); font-size: 15px; line-height: 1.6; margin-top: -10px; }

      .card-soft {
        background: var(--blanco);
        border: 1px solid var(--border);
        border-radius: 22px;
        padding: 26px;
        box-shadow: 0 8px 24px rgba(91,70,54,0.06);
      }

      .text-block p { margin: 0 0 14px; line-height: 1.75; font-size: 15.5px; color: var(--topo); }
      .text-block p:last-child { margin-bottom: 0; }

      .warm-note {
        background: var(--beige);
        border-radius: 18px;
        padding: 20px 22px;
        color: var(--marron);
        font-size: 15px;
        line-height: 1.7;
      }
      .warm-note p { margin: 0; }
      .warm-note-alt { background: var(--rosaViejo); color: var(--blanco); }

      .highlight-card {
        background: linear-gradient(135deg, var(--terracota), var(--naranja));
        color: var(--blanco);
        border-radius: 18px;
        padding: 22px 24px;
        font-size: 16px;
        line-height: 1.7;
        box-shadow: 0 10px 26px rgba(201,107,75,0.28);
      }
      .highlight-card p { margin: 0; font-weight: 500; }

      .disclaimer-box {
        border: 1px dashed var(--arena);
        border-radius: 14px;
        padding: 14px 18px;
        font-size: 13px;
        color: var(--topo);
        line-height: 1.6;
        background: rgba(238,217,200,0.35);
      }

      .section-cta { display: flex; justify-content: center; padding-top: 4px; }

      /* ---------- BUTTONS ---------- */
      .btn {
        font-family: inherit;
        border-radius: 999px;
        padding: 13px 22px;
        font-size: 14.5px;
        font-weight: 600;
        cursor: pointer;
        border: none;
        transition: transform .2s ease, box-shadow .2s ease, background .25s ease;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
      .btn:hover { transform: translateY(-1px); }
      .btn:active { transform: translateY(0); }
      .btn-primary { background: var(--terracota); color: var(--blanco); box-shadow: 0 8px 18px rgba(201,107,75,0.3); }
      .btn-primary:hover { background: var(--hover); }
      .btn-primary:disabled { opacity: .5; cursor: not-allowed; transform: none; }
      .btn-secondary { background: var(--beige); color: var(--marron); }
      .btn-secondary:hover { background: var(--arena); }
      .btn-outline { background: transparent; color: var(--terracota); border: 1.5px solid var(--terracota); }
      .btn-outline:hover { background: rgba(201,107,75,0.08); }
      .btn-full { width: 100%; }
      .btn-small { padding: 9px 16px; font-size: 13px; }

      .inicio-buttons { display: grid; grid-template-columns: 1fr; gap: 10px; }
      @media (min-width: 620px) { .inicio-buttons { grid-template-columns: 1fr 1fr; } }
      .inicio-imagen-card {
        width: 100%;
        aspect-ratio: 16 / 9;
        overflow: hidden;
        border-radius: 20px;
        box-shadow: 0 16px 36px rgba(91,70,54,0.22);
      }
      .inicio-imagen { width: 100%; height: 100%; object-fit: cover; display: block; }

      /* ---------- INICIO ---------- */
      .inicio-hero { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 34px 24px; }
      .hero-logo { width: 92px; height: auto; margin-bottom: 6px; }
      .hero-title { color: var(--marron); font-size: 25px; font-weight: 700; line-height: 1.3; margin: 0; }
      .hero-title-sub { display: block; font-size: 14px; font-weight: 400; font-style: italic; color: var(--topo); margin-top: 4px; }
      .hero-subtitle { color: var(--topo); font-size: 15px; line-height: 1.6; max-width: 480px; }
      .hero-phrase { color: var(--terracota); font-size: 17px; font-style: italic; font-weight: 600; margin-top: 6px; }
      .hero-welcome { font-size: 15px; line-height: 1.8; color: var(--topo); text-align: center; padding: 0 6px; }

      /* ---------- FORM ---------- */
      .form-block { display: flex; flex-direction: column; gap: 16px; }
      .field { display: flex; flex-direction: column; gap: 6px; font-size: 13.5px; color: var(--marron); font-weight: 600; }
      .field input, .field select, .field textarea {
        font-family: inherit;
        border: 1.5px solid var(--border);
        border-radius: 12px;
        padding: 11px 13px;
        font-size: 14.5px;
        color: var(--marron);
        background: var(--marfil);
        resize: vertical;
      }
      .field input:focus, .field select:focus, .field textarea:focus {
        outline: none;
        border-color: var(--terracota);
        box-shadow: 0 0 0 3px rgba(201,107,75,0.15);
      }
      .checkbox-field { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: var(--topo); line-height: 1.5; }
      .field-error { color: var(--terracota); font-size: 12.5px; font-weight: 600; margin-top: -2px; }
      .btn-agendar { cursor: pointer; pointer-events: auto; position: relative; z-index: 2; }
      .checkbox-field input { margin-top: 3px; }
      .form-confirm { color: var(--terracota); font-size: 13.5px; text-align: center; font-weight: 600; }

      /* ---------- MI PROCESO ---------- */
      .proceso-track { display: grid; grid-template-columns: 1fr; gap: 16px; }
      @media (min-width: 700px) { .proceso-track { grid-template-columns: 1fr 1fr; } }
      .proceso-card { display: flex; flex-direction: column; gap: 14px; }
      .proceso-card-head { display: flex; align-items: center; gap: 12px; }
      .proceso-dot {
        width: 34px; height: 34px; border-radius: 50%;
        background: var(--beige); color: var(--marron);
        display: flex; align-items: center; justify-content: center;
        font-weight: 700; font-size: 14px; flex-shrink: 0;
      }
      .proceso-dot-done { background: var(--terracota); color: var(--blanco); }
      .proceso-card-head h3 { margin: 0; color: var(--marron); font-size: 16px; }
      .proceso-subtitulo { margin: 2px 0 0; font-size: 12.5px; color: var(--topo); }
      .proceso-eliminar {
        align-self: flex-start;
        background: none;
        border: none;
        color: var(--topo);
        font-family: inherit;
        font-size: 12.5px;
        text-decoration: underline;
        cursor: pointer;
        padding: 2px 0;
        margin-top: -4px;
        transition: color .2s ease;
      }
      .proceso-eliminar:hover { color: var(--terracota); }

      /* ---------- SOLICITAR UN PARCHE ---------- */
      .parche-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
      @media (min-width: 620px) { .parche-grid { grid-template-columns: 1fr 1fr; } }
      .parche-card {
        position: relative;
        text-align: left;
        background: var(--blanco);
        border: 2px solid var(--border);
        border-radius: 22px;
        padding: 28px 26px;
        font-family: inherit;
        cursor: pointer;
        transition: border-color .25s ease, box-shadow .25s ease, transform .2s ease;
        display: flex;
        flex-direction: column;
        gap: 10px;
        box-shadow: 0 6px 18px rgba(91,70,54,0.05);
      }
      .parche-card:hover { border-color: var(--terracota); transform: translateY(-1px); }
      .parche-card-active {
        border-color: var(--terracota);
        box-shadow: 0 12px 30px rgba(201,107,75,0.22);
      }
      .parche-card h3 { margin: 0; color: var(--marron); font-size: 18px; font-weight: 700; }
      .parche-card p { margin: 0; color: var(--topo); font-size: 14.5px; line-height: 1.65; }
      .parche-check {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: var(--terracota);
        color: var(--blanco);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 700;
        animation: fadeIn .3s ease;
      }

      .parche-cta { flex-direction: column; gap: 14px; text-align: center; }
      .parche-frase { margin: 0; color: var(--topo); font-size: 13.5px; font-style: italic; max-width: 380px; }

      /* ---------- RULETA ---------- */
      .ruleta-panel { display: flex; flex-direction: column; align-items: center; gap: 22px; padding: 30px 16px; }
      .ruleta-svg-wrap {
        width: 92%;
        max-width: 360px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
      }
      .ruleta-svg { width: 100%; height: auto; display: block; overflow: visible; }
      .ruleta-segment { cursor: pointer; transition: transform .3s ease; }
      .ruleta-segment:focus { outline: none; }
      .ruleta-segment path { transition: opacity .3s ease, stroke-width .3s ease; }
      .ruleta-segment:hover { transform: scale(1.015); }
      .ruleta-segment-active { transform: scale(1.035); }
      .ruleta-ring { animation: ruletaRing .4s ease; }
      @keyframes ruletaRing { from { opacity: 0; } to { opacity: 0.9; } }
      .ruleta-label {
        font-size: 11px;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 600;
        font-style: normal;
        line-height: 1.1;
        pointer-events: none;
        text-shadow: 0 1px 1.5px rgba(0,0,0,0.18);
      }
      @media (min-width: 620px) {
        .ruleta-svg-wrap { max-width: 380px; }
        .ruleta-label { font-size: 13px; }
      }
      .ruleta-center-title {
        font-size: 13px;
        fill: var(--marron);
        font-weight: 600;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }
      .ruleta-center-sub {
        font-size: 10px;
        fill: var(--topo);
        font-weight: 400;
        letter-spacing: 0.3px;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }

      .ruleta-resultado {
        width: 100%;
        background: var(--marfil);
        border: 1px solid var(--border);
        border-radius: 20px;
        padding: 24px;
        animation: fadeIn .4s ease;
      }
      .ruleta-resultado-tag {
        display: inline-block;
        padding: 6px 16px;
        border-radius: 999px;
        font-size: 13px;
        font-weight: 700;
        margin-bottom: 12px;
      }
      .ruleta-resultado-mensaje { color: var(--marron); font-size: 15.5px; line-height: 1.7; margin: 0 0 16px; font-weight: 500; }
      .ruleta-resultado-subhead { color: var(--terracota); font-size: 12.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; margin: 0 0 8px; }
      .ruleta-resultado-pasos { margin: 0 0 16px; padding-left: 20px; color: var(--topo); font-size: 14.5px; line-height: 1.9; }
      .ruleta-resultado-cierre { color: var(--terracota); font-style: italic; font-size: 14.5px; margin: 0 0 18px; }

      .ruleta-promesa {
        background: var(--beige);
        border-radius: 16px;
        padding: 18px 20px;
        margin-bottom: 16px;
      }
      .ruleta-promesa-titulo { margin: 0 0 8px; color: var(--marron); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
      .ruleta-promesa-versiculo { margin: 0 0 6px; color: var(--marron); font-size: 15px; font-style: italic; line-height: 1.6; }
      .ruleta-promesa-referencia { margin: 0 0 10px; color: var(--terracota); font-size: 12.5px; font-weight: 700; }
      .ruleta-promesa-frase { margin: 0; color: var(--topo); font-size: 13.5px; line-height: 1.6; }

      .ruleta-aclaracion {
        border: 1px dashed var(--arena);
        border-radius: 14px;
        padding: 12px 16px;
        font-size: 12.5px;
        color: var(--topo);
        line-height: 1.6;
        background: rgba(238,217,200,0.3);
        margin-bottom: 16px;
      }

      .ruleta-resultado-acciones { display: flex; flex-wrap: wrap; gap: 10px; }

      .ruleta-frase-final { text-align: center; padding: 6px 10px; }
      .ruleta-frase-final p { margin: 0 0 8px; color: var(--marron); font-size: 14.5px; line-height: 1.6; }
      .ruleta-frase-delicada { font-style: italic; color: var(--topo) !important; font-size: 13.5px !important; }

      /* ---------- Círculo de respiración (base compartida por la nueva Respiración guiada) ---------- */
      .pausa-subtitle { margin: 0; color: var(--marron); font-size: 17px; align-self: flex-start; }

      .breathing-wrap { display: flex; align-items: center; justify-content: center; padding: 30px 0; }
      .breathing-wrap-compact { padding: 10px 0; }
      .breathing-circle {
        width: 130px;
        height: 130px;
        border-radius: 50%;
        background: radial-gradient(circle at 35% 30%, var(--naranja), var(--terracota));
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--blanco);
        font-size: 13px;
        font-weight: 600;
        text-align: center;
        padding: 10px;
        box-shadow: 0 12px 30px rgba(201,107,75,0.35);
        transition-property: transform;
        transition-timing-function: ease-in-out;
      }

      /* ---------- MODAL ---------- */
      .modal-overlay {
        position: fixed; inset: 0; background: rgba(91,70,54,0.45);
        display: flex; align-items: center; justify-content: center;
        z-index: 100; padding: 20px; animation: fadeIn .25s ease;
      }
      .modal-card {
        background: var(--blanco); border-radius: 22px; padding: 28px 24px;
        max-width: 360px; width: 100%; display: flex; flex-direction: column;
        align-items: center; gap: 18px; box-shadow: 0 20px 50px rgba(0,0,0,0.25);
        max-height: 85vh; overflow-y: auto;
      }
      .modal-close { align-self: center; }

      /* ---------- EXPERIENCIAS EMOCIONALES (modales por herramienta) ---------- */
      .modal-card-experiencia { align-items: stretch; text-align: left; max-width: 420px; gap: 16px; }
      .modal-card-noche { background: linear-gradient(160deg, #3B2B22, #2A1F1A); box-shadow: 0 20px 50px rgba(0,0,0,0.4); }
      .modal-experiencia-head { display: flex; justify-content: space-between; align-items: center; width: 100%; gap: 10px; }
      .modal-experiencia-head h3 { margin: 0; color: var(--marron); font-size: 17px; }
      .modal-card-noche .modal-experiencia-head h3 { color: #FAF6F1; }
      .modal-x {
        background: none; border: none; font-size: 15px; color: var(--topo);
        cursor: pointer; line-height: 1; padding: 6px; flex-shrink: 0;
      }
      .modal-card-noche .modal-x { color: #EED9C8; }
      .modal-experiencia-body { width: 100%; display: flex; flex-direction: column; gap: 14px; }

      .experiencia-intro { text-align: center; color: var(--topo); font-size: 14px; margin: 0; }
      .experiencia-paso-titulo { margin: 0; color: var(--marron); font-size: 16.5px; }
      .experiencia-paso-titulo-noche { color: #FAF6F1; text-align: center; }
      .experiencia-paso-texto { margin: 0; color: var(--topo); font-size: 14.5px; line-height: 1.65; }
      .experiencia-paso-texto-noche { color: #EED9C8; text-align: center; }
      .experiencia-pregunta { margin: 0; color: var(--marron); font-weight: 600; font-size: 14.5px; }
      .experiencia-recordatorio {
        text-align: center; color: var(--terracota); font-size: 13px; font-style: italic;
        margin: 2px 0 0; animation: fadeIn .5s ease;
      }
      .experiencia-paso-texto-grande { font-size: 15.5px; color: var(--marron); text-align: center; }
      .experiencia-paso-despues { color: var(--terracota); font-style: italic; }
      .experiencia-ejemplos {
        margin: 0; padding-left: 20px; color: var(--topo); font-size: 13.5px; line-height: 1.8;
      }
      .experiencia-recorrido-zona {
        text-align: center; color: var(--marron); font-size: 17px; font-weight: 700; margin: 0;
      }
      .recorrido-lineas {
        list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column;
        gap: 8px; text-align: center;
      }
      .recorrido-lineas li { color: var(--topo); font-size: 14px; line-height: 1.6; }
      .experiencia-textarea {
        width: 100%; border: 1.5px solid var(--border); border-radius: 12px;
        padding: 11px 13px; font-family: inherit; font-size: 14px;
        color: var(--marron); background: var(--marfil); resize: vertical;
      }

      .mini-opciones { display: flex; flex-wrap: wrap; gap: 8px; }
      .mini-opcion {
        background: var(--marfil); border: 1.5px solid var(--border); border-radius: 999px;
        padding: 8px 14px; font-size: 13px; color: var(--marron); font-family: inherit;
        cursor: pointer; transition: all .2s ease;
      }
      .mini-opcion:hover { border-color: var(--terracota); }
      .mini-opcion-active { background: var(--terracota); color: var(--blanco); border-color: var(--terracota); }

      .progreso-dots { display: flex; gap: 6px; justify-content: center; }
      .progreso-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--border); transition: background .3s ease, transform .3s ease; }
      .progreso-dot-active { background: var(--terracota); transform: scale(1.3); }
      .modal-card-noche .progreso-dot { background: rgba(250,246,241,0.25); }
      .modal-card-noche .progreso-dot-active { background: var(--dorado); }

      .experiencia-nav { display: flex; justify-content: space-between; gap: 10px; margin-top: 4px; }
      .experiencia-nav-single { justify-content: center; }
      .experiencia-nav .btn-full { width: 100%; }

      .experiencia-final { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 6px 0; }
      .experiencia-final p { margin: 0; color: var(--marron); font-size: 15.5px; line-height: 1.7; }
      .modal-card-noche .experiencia-final p { color: #FAF6F1; }

      .mochila-visual { display: flex; justify-content: center; gap: 10px; }
      .mochila-piedra { width: 22px; height: 22px; border-radius: 50%; background: var(--dorado); transition: opacity .45s ease, transform .45s ease; }
      .mochila-piedra-suelta { opacity: 0.15; transform: translateY(10px) scale(0.6); }

      .noche-campos { display: flex; flex-direction: column; gap: 10px; transition: opacity .5s ease; }
      .noche-campos-desvanecer { opacity: 0; }
      .noche-input {
        border: 1.5px solid rgba(250,246,241,0.3); border-radius: 12px; padding: 10px 13px;
        font-family: inherit; font-size: 14px; background: rgba(255,255,255,0.08); color: #FAF6F1;
      }
      .noche-input::placeholder { color: rgba(250,246,241,0.55); }

      .noche-lineas { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
      .noche-lineas li { color: #EED9C8; font-size: 14.5px; line-height: 1.6; opacity: 0; animation: nocheFade .6s ease forwards; }
      .noche-lineas-final li { text-align: center; font-style: italic; }
      @keyframes nocheFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

      .oracion-box-modal { background: transparent; padding: 0; max-width: none; }
      .oracion-box-modal p { text-align: left; font-style: normal; margin: 0 0 12px; }
      .oracion-box-modal p:last-child { margin-bottom: 0; }

      /* ---------- CONTACTO ---------- */
      .contacto-card { display: flex; flex-direction: column; align-items: center; gap: 16px; text-align: center; padding: 34px 26px; }
      .contacto-logo { width: 76px; height: auto; }
      .contacto-text { color: var(--marron); font-size: 16px; font-weight: 600; margin: 0; }
      .contacto-buttons { display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 320px; }

      /* ---------- FOOTER ---------- */
      .site-footer {
        background: var(--marron);
        color: var(--beige);
        text-align: center;
        padding: 40px 20px 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }
      .footer-logo { width: 48px; height: auto; margin-bottom: 8px; filter: brightness(0) invert(1) opacity(0.9); }
      .footer-brand { font-size: 15px; font-weight: 700; margin: 0; color: var(--blanco); }
      .footer-line { font-size: 13px; max-width: 400px; line-height: 1.6; margin: 0; opacity: 0.85; }
      .footer-legal { font-size: 11.5px; max-width: 440px; line-height: 1.6; margin: 10px 0 0; opacity: 0.65; }
      .footer-nav { display: flex; align-items: center; gap: 8px; margin-top: 12px; }
      .footer-nav button { background: none; border: none; color: var(--beige); font-size: 12.5px; cursor: pointer; font-family: inherit; text-decoration: underline; }
      .footer-dot { opacity: 0.5; }

      .acomp-volver {
        align-self: flex-start;
        background: none;
        border: none;
        color: var(--terracota);
        font-family: inherit;
        font-size: 13.5px;
        font-weight: 600;
        cursor: pointer;
        padding: 4px 0;
      }
      .acomp-volver:hover { text-decoration: underline; }

      /* ---------- Pantalla de estado (reutilizable) ---------- */
      .estado-screen { display: flex; flex-direction: column; gap: 16px; padding-bottom: 8px; }
      .estado-encabezado { display: flex; align-items: center; gap: 12px; }
      .estado-icono {
        width: 48px; height: 48px; border-radius: 50%;
        background: var(--beige); color: var(--terracota);
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      }
      .estado-nombre { margin: 0; color: var(--marron); font-size: 21px; }
      .estado-texto { color: var(--topo); font-size: 14.5px; line-height: 1.7; margin: 0; }

      .estado-opciones { display: flex; flex-direction: column; gap: 10px; }
      .estado-opcion-btn {
        text-align: left;
        background: var(--blanco);
        border: 1.5px solid var(--border);
        border-radius: 14px;
        padding: 14px 18px;
        font-family: inherit;
        font-size: 14.5px;
        font-weight: 600;
        color: var(--marron);
        cursor: pointer;
        transition: border-color .2s ease, background .2s ease;
      }
      .estado-opcion-btn:hover { border-color: var(--terracota); }
      .estado-opcion-btn-active { background: var(--terracota); color: var(--blanco); border-color: var(--terracota); }
      .estado-opcion-btn-destacada {
        padding: 20px 22px;
        font-size: 16px;
        border-width: 2px;
        border-color: var(--terracota);
        box-shadow: 0 10px 24px rgba(201,107,75,0.18);
      }
      .estado-opcion-btn-destacada.estado-opcion-btn-active { box-shadow: 0 12px 28px rgba(201,107,75,0.3); }
      .estado-aviso-desplegable {
        border: 1px dashed var(--arena);
        border-radius: 12px;
        padding: 12px 16px;
        color: var(--topo);
        font-size: 12.5px;
        background: rgba(238,217,200,0.3);
      }
      .estado-aviso-desplegable summary { cursor: pointer; font-weight: 700; color: var(--marron); font-size: 13px; }
      .estado-aviso-desplegable p { margin: 8px 0 0; line-height: 1.6; }
      .estado-opcion-panel {
        background: var(--marfil);
        border: 1px solid var(--border);
        border-radius: 14px;
        padding: 18px 20px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .estado-meditacion-nota { margin: 6px 0 0; color: var(--topo); font-size: 12.5px; font-style: italic; }
      .estado-ejercicio-intro { margin: 0; color: var(--topo); font-size: 13px; font-style: italic; }
      .estado-ejercicio-titulo { margin: 0; color: var(--marron); font-size: 15px; }
      .estado-ejercicio-intro-extra { margin: -2px 0 2px; color: var(--topo); font-size: 13.5px; line-height: 1.65; }
      .estado-ejercicio-frase-final { margin: 2px 0 0; color: var(--terracota); font-style: italic; font-size: 14px; line-height: 1.6; }
      .estado-ejercicio-sublista {
        margin: 8px 0 0;
        padding-left: 18px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        color: var(--topo);
        font-size: 13.5px;
        list-style: "· ";
      }
      .estado-ejercicio-pasos {
        margin: 4px 0 0;
        padding-left: 22px;
        color: var(--topo);
        font-size: 14.5px;
        line-height: 1.7;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .estado-ejercicio-pasos li { padding-left: 2px; }
      .oracion-intro-fe { margin: 0 0 4px; color: var(--topo); font-size: 11.5px; line-height: 1.6; font-style: italic; opacity: 0.8; font-weight: 400; }
      .estado-oracion-texto { margin: 0; color: var(--marron); font-size: 14.5px; line-height: 1.75; }
      .estado-oracion-versiculo {
        background: var(--beige);
        border-radius: 12px;
        padding: 14px 16px;
        margin-bottom: 4px;
      }
      .estado-oracion-versiculo p { margin: 0 0 6px; color: var(--marron); font-style: italic; font-size: 14px; }
      .estado-oracion-versiculo span { color: var(--terracota); font-size: 12.5px; font-weight: 700; }

      /* ---------- MP3 Player (meditaciones guiadas) ---------- */
      .mp3-player {
        background: var(--blanco);
        border: 1px solid var(--border);
        border-radius: 14px;
        padding: 16px 18px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        transition: box-shadow .4s ease, border-color .4s ease;
      }
      .mp3-player-activo {
        border-color: var(--terracota);
        box-shadow: 0 0 0 3px rgba(201,107,75,0.08);
        animation: mp3RespiroSuave 3.6s ease-in-out infinite;
      }
      @keyframes mp3RespiroSuave {
        0%, 100% { box-shadow: 0 0 0 3px rgba(201,107,75,0.06); }
        50% { box-shadow: 0 0 0 6px rgba(201,107,75,0.12); }
      }
      .mp3-eyebrow { margin: 0; color: var(--terracota); font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; }
      .mp3-titulo { margin: 0; color: var(--marron); font-weight: 700; font-size: 14px; }
      .mp3-indicacion { margin: 0; color: var(--topo); font-size: 12px; font-style: italic; line-height: 1.5; }
      .mp3-placeholder-texto { margin: 0; color: var(--topo); font-size: 13.5px; }
      .mp3-controles { display: flex; align-items: center; gap: 8px; }
      .mp3-btn {
        flex-shrink: 0;
        width: 36px; height: 36px; border-radius: 50%;
        background: var(--terracota); color: var(--blanco);
        border: none; display: flex; align-items: center; justify-content: center;
        cursor: pointer; transition: background .2s ease, transform .2s ease;
      }
      .mp3-btn:hover { background: var(--hover); }
      .mp3-btn-play-activo { transform: scale(1.05); }
      .mp3-btn-restart { background: var(--beige); color: var(--marron); width: 30px; height: 30px; }
      .mp3-btn-restart:hover { background: var(--arena); }
      .mp3-tiempo { font-size: 11.5px; color: var(--topo); flex-shrink: 0; min-width: 32px; text-align: center; }
      .mp3-progreso { flex: 1; accent-color: var(--terracota); }
      .mp3-volumen-fila { display: flex; align-items: center; gap: 8px; }
      .mp3-volumen-icono { color: var(--topo); flex-shrink: 0; }
      .mp3-volumen { flex: 1; max-width: 120px; accent-color: var(--terracota); }

      /* ---------- Calmarme ahora ---------- */
      .calmarme-paso-card {
        display: flex;
        align-items: center;
        gap: 14px;
        background: var(--beige);
        border-radius: 16px;
        padding: 18px 20px;
      }
      .calmarme-paso-numero {
        flex-shrink: 0;
        width: 34px; height: 34px; border-radius: 50%;
        background: var(--terracota); color: var(--blanco);
        display: flex; align-items: center; justify-content: center;
        font-weight: 700; font-size: 14px;
      }
      .calmarme-paso-texto { margin: 0; color: var(--marron); font-size: 15px; line-height: 1.6; }
      .calmarme-mp3 { margin-top: 4px; }
      .calmarme-guia-minima {
        display: flex; flex-direction: column; align-items: center; gap: 20px;
        padding: 30px 10px; text-align: center;
      }
      .calmarme-frase-lenta { margin: 0; color: var(--marron); font-size: 18px; font-weight: 600; animation: fadeIn .6s ease; }

      /* ---------- Respiración guiada (componente único y reutilizable) ---------- */
      .estado-opcion-btn-respiracion { display: flex; align-items: center; gap: 8px; }
      .respiracion-guiada { display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center; }
      .respiracion-titulo { margin: 0; color: var(--marron); font-size: 15.5px; align-self: center; }
      .respiracion-texto { margin: 0; color: var(--topo); font-size: 13.5px; line-height: 1.65; }
      .respiracion-sugerencia { margin: -2px 0 0; color: var(--terracota); font-size: 12.5px; font-style: italic; }
      .respiracion-aviso-inicial { margin: 0; color: var(--topo); font-size: 12px; line-height: 1.6; opacity: 0.85; }
      .respiracion-intro-larga { margin: 0; color: var(--topo); font-size: 13px; line-height: 1.7; }
      .respiracion-btn-comenzar { width: 100%; padding: 16px 22px; font-size: 15.5px; }
      .respiracion-cuenta-regresiva { margin: 0; color: var(--terracota); font-size: 22px; font-weight: 700; }
      .respiracion-circulo { transition-property: transform, background; }
      .respiracion-ciclo-indicador { margin: 0; color: var(--terracota); font-size: 12.5px; font-weight: 700; }
      .respiracion-controles { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
      .respiracion-controles-final { margin-top: 4px; }
      .respiracion-aviso-seguridad { margin: 4px 0 0; color: var(--topo); font-size: 12px; line-height: 1.6; opacity: 0.85; }
      .respiracion-aclaracion-chica { margin: 0; color: var(--topo); font-size: 11px; line-height: 1.5; opacity: 0.7; }
      .respiracion-frase-final { margin: 0; color: var(--terracota); font-style: italic; font-size: 14.5px; line-height: 1.6; }
      .respiracion-mensaje-final { margin: 0; color: var(--marron); font-size: 13.5px; }
      .respiracion-final-discreto { gap: 14px; padding: 8px 0; }
      .respiracion-pausa-nota { margin: -2px 0 0; color: var(--topo); font-size: 11.5px; font-style: italic; opacity: 0.85; }
      .respiracion-pregunta-continuar { margin: 0; color: var(--marron); font-weight: 600; font-size: 14px; }

      /* ---------- Fe / Renovación (tarjetas compartidas) ---------- */
      .fe-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
      @media (min-width: 620px) { .fe-grid { grid-template-columns: 1fr 1fr; } }
      .fe-card {
        position: relative;
        text-align: left;
        background: var(--blanco);
        border: 1.5px solid var(--border);
        border-radius: 14px;
        padding: 14px 16px;
        font-family: inherit;
        font-size: 14px;
        font-weight: 600;
        color: var(--marron);
        cursor: pointer;
        transition: all .2s ease;
      }
      .fe-card:hover { border-color: var(--terracota); }
      .fe-card-active { background: var(--terracota); color: var(--blanco); border-color: var(--terracota); }
      .fe-detalle {
        background: var(--marfil); border: 1px solid var(--border); border-radius: 16px;
        padding: 18px 20px; display: flex; flex-direction: column; gap: 14px; animation: fadeIn .4s ease;
      }
    `}</style>
  );
}
