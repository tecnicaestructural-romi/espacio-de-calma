import React, { useEffect, useRef, useState } from "react";

/* Componente único y reutilizable de respiración guiada.
   Mismo ritmo para las 8 categorías: inhalar 4s, pausa suave opcional
   1s, exhalar 6s (11s por ciclo exacto). Un único temporizador
   (setInterval, 100ms) maneja fases, ciclos y la interpolación del
   círculo. La frase entre ciclos se superpone durante el primer 1,5s
   de cada inhalación (no agrega tiempo extra a la duración total).
   Se limpia siempre al pausar, reiniciar, finalizar o desmontar. */

const FASES_INFO = {
  inhalar: { dur: 4000, scaleFrom: 0.85, scaleTo: 1.3, texto: ["Inhalá", "suavemente"] },
  pausa: { dur: 1000, scaleFrom: 1.3, scaleTo: 1.3, texto: ["Pausa", "suave"] },
  exhalar: { dur: 6000, scaleFrom: 1.3, scaleTo: 0.85, texto: ["Exhalá", "lentamente"] },
};
const ORDEN_FASES = ["inhalar", "pausa", "exhalar"];
const FRASE_ENTRE_DUR = 1500; // se superpone al inicio de la inhalación, no agrega tiempo
const CICLOS_INICIALES = 6; // 6 x 11s = 66s ("1 minuto y 6 segundos")
const CICLOS_EXTENSION = 27; // 27 x 11s = 297s (~5 minutos)
const TICK_MS = 100;

export default function RespiracionGuiada({ config, onTerminar }) {
  const [estado, setEstado] = useState("idle"); // idle | corriendo | pausado | preguntaContinuar
  const [cicloActual, setCicloActual] = useState(1);
  const [totalCiclos, setTotalCiclos] = useState(CICLOS_INICIALES);
  const [faseIdx, setFaseIdx] = useState(0); // 0 inhalar, 1 pausa, 2 exhalar
  const [remaining, setRemaining] = useState(FASES_INFO.inhalar.dur);
  const [scale, setScale] = useState(FASES_INFO.inhalar.scaleFrom);

  // Refs: fuente de verdad para el único temporizador (evita duplicados y
  // permite pausar/continuar exactamente donde quedó, sin reiniciar la fase).
  const intervalRef = useRef(null);
  const remainingRef = useRef(FASES_INFO.inhalar.dur);
  const faseIdxRef = useRef(0);
  const cicloRef = useRef(1);
  const totalCiclosRef = useRef(CICLOS_INICIALES);

  const limpiarTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Se detiene siempre al desmontar (cerrar la categoría, cambiar de pantalla, etc.)
  useEffect(() => () => limpiarTimer(), []);

  const actualizarScale = (idx, remMs) => {
    const info = FASES_INFO[ORDEN_FASES[idx]];
    if (idx === 1) {
      setScale(info.scaleTo);
      return;
    }
    const elapsed = info.dur - remMs;
    const ratio = Math.min(1, Math.max(0, elapsed / info.dur));
    setScale(info.scaleFrom + (info.scaleTo - info.scaleFrom) * ratio);
  };

  const avanzarFase = () => {
    const idxActual = faseIdxRef.current;
    if (idxActual < 2) {
      faseIdxRef.current = idxActual + 1;
    } else if (cicloRef.current >= totalCiclosRef.current) {
      limpiarTimer();
      setEstado("preguntaContinuar");
      return;
    } else {
      cicloRef.current += 1;
      setCicloActual(cicloRef.current);
      faseIdxRef.current = 0;
    }
    remainingRef.current = FASES_INFO[ORDEN_FASES[faseIdxRef.current]].dur;
    setFaseIdx(faseIdxRef.current);
    setRemaining(remainingRef.current);
    actualizarScale(faseIdxRef.current, remainingRef.current);
  };

  const tick = () => {
    remainingRef.current -= TICK_MS;
    if (remainingRef.current <= 0) {
      avanzarFase();
    } else {
      setRemaining(remainingRef.current);
      actualizarScale(faseIdxRef.current, remainingRef.current);
    }
  };

  const iniciarTimer = () => {
    limpiarTimer();
    intervalRef.current = setInterval(tick, TICK_MS);
  };

  const prepararInicio = (totalNuevo) => {
    cicloRef.current = 1;
    totalCiclosRef.current = totalNuevo;
    faseIdxRef.current = 0;
    remainingRef.current = FASES_INFO.inhalar.dur;
    setCicloActual(1);
    setTotalCiclos(totalNuevo);
    setFaseIdx(0);
    setRemaining(FASES_INFO.inhalar.dur);
    setScale(FASES_INFO.inhalar.scaleFrom);
  };

  const comenzarRespiracion = () => {
    prepararInicio(CICLOS_INICIALES);
    setEstado("corriendo");
    iniciarTimer();
  };

  const pausar = () => {
    limpiarTimer();
    setEstado("pausado");
  };

  const continuar = () => {
    setEstado("corriendo");
    iniciarTimer(); // retoma exactamente desde remainingRef, sin reiniciar la fase
  };

  const reiniciar = () => {
    limpiarTimer();
    prepararInicio(CICLOS_INICIALES);
    setEstado("idle"); // no vuelve a arrancar hasta tocar "Comenzar respiración"
  };

  const finalizar = () => {
    limpiarTimer();
    onTerminar();
  };

  const continuarCincoMinutos = () => {
    prepararInicio(CICLOS_EXTENSION); // práctica nueva de 27 ciclos, no se suman los 6 iniciales
    setEstado("corriendo");
    iniciarTimer();
  };

  /* ---------- Pantalla al completar la práctica ---------- */
  if (estado === "preguntaContinuar") {
    if (config.finalDiscreto) {
      return (
        <div className="respiracion-guiada respiracion-final-discreto">
          <p className="respiracion-mensaje-final">{config.mensajeFinalDiscreto}</p>
          <button type="button" className="btn btn-outline btn-small" onClick={finalizar}>
            Finalizar
          </button>
        </div>
      );
    }
    return (
      <div className="respiracion-guiada">
        <p className="respiracion-mensaje-final">
          Terminaste esta pausa.
          <br />
          No necesitás comprobar ningún resultado. Podés quedarte unos instantes con tu respiración natural.
        </p>
        <div className="respiracion-controles respiracion-controles-final">
          <button type="button" className="btn btn-outline btn-small" onClick={finalizar}>
            Finalizar
          </button>
          <button type="button" className="btn btn-primary btn-small" onClick={continuarCincoMinutos}>
            Continuar 5 minutos
          </button>
        </div>
      </div>
    );
  }

  /* ---------- Pantalla inicial (antes de comenzar) ---------- */
  if (estado === "idle") {
    return (
      <div className="respiracion-guiada">
        <h4 className="respiracion-titulo">{config.titulo}</h4>
        <p className="respiracion-texto">{config.texto}</p>
        {config.sugerenciaOpcional && <p className="respiracion-sugerencia">{config.sugerenciaOpcional}</p>}

        <p className="respiracion-intro-larga">
          Buscá una posición cómoda. Podés mantener los ojos abiertos o cerrarlos si te sentís segura/o.
          <br />
          <br />
          Respirá de una manera cómoda para vos. No necesitás llenar completamente los pulmones ni hacer
          fuerza.
          <br />
          <br />
          Vamos a realizar 6 ciclos. Cada ciclo consiste en inhalar suavemente, hacer una pausa breve y
          exhalar más lentamente.
        </p>

        <p className="respiracion-aviso-seguridad">
          Si sentís mareo, falta de aire, presión o incomodidad, detené la práctica y volvé a tu respiración
          natural.
        </p>

        <div className="respiracion-controles">
          <button type="button" className="btn btn-primary respiracion-btn-comenzar" onClick={comenzarRespiracion}>
            Comenzar respiración
          </button>
          <button type="button" className="btn btn-outline btn-small" onClick={onTerminar}>
            Omitir
          </button>
        </div>

        <p className="respiracion-aclaracion-chica">
          Esta respiración es una propuesta opcional de bienestar. No forma parte del protocolo de Técnica
          Estructural y no reemplaza atención médica, psicológica o psiquiátrica.
        </p>
      </div>
    );
  }

  /* ---------- Pantalla activa (corriendo / pausado) ---------- */
  const nombreFase = ORDEN_FASES[faseIdx];
  // La frase de la categoría se superpone durante el primer 1,5s de cada
  // inhalación (excepto la primera), sin sumar tiempo a la secuencia.
  const dentroVentanaFrase =
    nombreFase === "inhalar" && cicloActual > 1 && remaining > FASES_INFO.inhalar.dur - FRASE_ENTRE_DUR;
  const lineas = dentroVentanaFrase ? [config.textoEntreCiclos] : FASES_INFO[nombreFase].texto;
  const segundosRestantes = Math.max(1, Math.ceil(remaining / 1000));
  const mostrarCuenta = nombreFase === "inhalar" || nombreFase === "exhalar";

  return (
    <div className="respiracion-guiada">
      <p className="respiracion-ciclo-indicador">
        Ciclo {cicloActual} de {totalCiclos}
      </p>

      <div className="breathing-wrap breathing-wrap-compact">
        <div
          className="breathing-circle respiracion-circulo"
          style={{
            background: `radial-gradient(circle at 35% 30%, ${config.colorAnimacion}, ${config.colorAnimacion}CC)`,
            transform: `scale(${scale})`,
            transitionDuration: `${TICK_MS}ms`,
          }}
        >
          <span>
            {lineas.map((linea, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                {linea}
              </React.Fragment>
            ))}
          </span>
        </div>
      </div>

      {mostrarCuenta && !dentroVentanaFrase && <p className="respiracion-cuenta-regresiva">{segundosRestantes}</p>}
      {nombreFase === "pausa" && (
        <p className="respiracion-pausa-nota">Si no te resulta cómoda, comenzá a exhalar naturalmente.</p>
      )}

      <div className="respiracion-controles">
        {estado === "corriendo" && (
          <button type="button" className="btn btn-outline btn-small" onClick={pausar}>
            Pausar
          </button>
        )}
        {estado === "pausado" && (
          <button type="button" className="btn btn-primary btn-small" onClick={continuar}>
            Continuar
          </button>
        )}
        <button type="button" className="btn btn-outline btn-small" onClick={reiniciar}>
          Reiniciar
        </button>
        <button type="button" className="btn btn-outline btn-small" onClick={finalizar}>
          Finalizar
        </button>
      </div>

      <p className="respiracion-aviso-seguridad">
        Si sentís mareo, falta de aire, presión o incomodidad, detené la práctica y volvé a tu respiración
        natural.
      </p>
    </div>
  );
}
