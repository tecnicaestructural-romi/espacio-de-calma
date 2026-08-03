import React, { useEffect, useRef, useState } from "react";

/* Reproductor de meditaciones guiadas — componente único y reutilizable.
   Se alimenta de un `src` (ruta del MP3) y un `titulo` por categoría;
   ninguna de las ocho pantallas de emoción tiene su propio reproductor,
   todas usan este mismo componente.

   - No reproduce automáticamente ni se repite al terminar.
   - Volumen inicial 0.65 en cada meditación cargada (ajustable después).
   - preload="metadata" para no volver lenta la aplicación.
   - Si falla la carga, muestra un aviso claro con opción de reintentar.
   - Se pausa automáticamente si el componente se desmonta (por ejemplo,
     al salir de la pantalla o de la Rueda de acompañamiento).
   - Solo puede sonar una meditación a la vez: al reproducir una, se
     pausa automáticamente cualquier otra que estuviera sonando. */

// Registro compartido (fuera de React) de qué <audio> está sonando en
// este momento, para garantizar que nunca se superpongan dos meditaciones.
let audioActivo = null;

function formatTime(seconds) {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MP3Player({ src, titulo }) {
  const audioRef = useRef(null);
  const [estadoCarga, setEstadoCarga] = useState("ok"); // "ok" | "error"
  const [reproduciendo, setReproduciendo] = useState(false);
  const [actual, setActual] = useState(0);
  const [duracion, setDuracion] = useState(0);
  const [volumen, setVolumen] = useState(0.65);

  useEffect(() => {
    // Se detiene si la pantalla se abandona / el componente se desmonta.
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (audioActivo === audioRef.current) {
        audioActivo = null;
      }
    };
  }, []);

  useEffect(() => {
    // Reinicia el estado visual cada vez que cambia el audio asignado,
    // y aplica el volumen inicial de 0.65 en cada carga.
    setEstadoCarga("ok");
    setReproduciendo(false);
    setActual(0);
    setDuracion(0);
    setVolumen(0.65);
    if (audioRef.current) {
      audioRef.current.volume = 0.65;
    }
  }, [src]);

  const alternarReproduccion = () => {
    const audio = audioRef.current;
    if (!audio || estadoCarga !== "ok") return;
    if (reproduciendo) {
      audio.pause();
    } else {
      // Pausa cualquier otra meditación que estuviera sonando antes de empezar esta.
      if (audioActivo && audioActivo !== audio) {
        audioActivo.pause();
      }
      audio
        .play()
        .then(() => {
          audioActivo = audio;
        })
        .catch(() => setEstadoCarga("error"));
    }
  };

  const reiniciar = () => {
    const audio = audioRef.current;
    if (!audio || estadoCarga !== "ok") return;
    audio.currentTime = 0;
    setActual(0);
  };

  const cambiarProgreso = (e) => {
    const audio = audioRef.current;
    if (!audio || estadoCarga !== "ok" || !duracion) return;
    const nuevo = Number(e.target.value);
    audio.currentTime = nuevo;
    setActual(nuevo);
  };

  const cambiarVolumen = (e) => {
    const nuevo = Number(e.target.value);
    setVolumen(nuevo);
    if (audioRef.current) audioRef.current.volume = nuevo;
  };

  const reintentar = () => {
    setEstadoCarga("ok");
    if (audioRef.current) {
      audioRef.current.load();
    }
  };

  if (estadoCarga === "error") {
    return (
      <div className="mp3-player mp3-player-placeholder">
        <p className="mp3-eyebrow">Meditación guiada</p>
        {titulo && <p className="mp3-titulo">{titulo}</p>}
        <p className="mp3-placeholder-texto">No fue posible reproducir esta meditación. Intentá nuevamente.</p>
        <button type="button" className="btn btn-outline btn-small" onClick={reintentar}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className={"mp3-player" + (reproduciendo ? " mp3-player-activo" : "")}>
      <p className="mp3-eyebrow">Meditación guiada</p>
      {titulo && <p className="mp3-titulo">{titulo}</p>}
      <p className="mp3-indicacion">Buscá un lugar tranquilo y permitite transitar este momento sin apuro.</p>

      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onError={() => setEstadoCarga("error")}
        onLoadedMetadata={(e) => setDuracion(e.currentTarget.duration || 0)}
        onTimeUpdate={(e) => setActual(e.currentTarget.currentTime || 0)}
        onPlay={() => setReproduciendo(true)}
        onPause={() => setReproduciendo(false)}
        onEnded={() => setReproduciendo(false)}
      />

      <div className="mp3-controles">
        <button
          type="button"
          className={"mp3-btn mp3-btn-play" + (reproduciendo ? " mp3-btn-play-activo" : "")}
          onClick={alternarReproduccion}
          aria-label={reproduciendo ? "Pausar" : "Reproducir"}
        >
          {reproduciendo ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button type="button" className="mp3-btn mp3-btn-restart" onClick={reiniciar} aria-label="Reiniciar">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4v5h5" />
            <path d="M4.6 15a8 8 0 1 0 1.5-8.5L4 9" />
          </svg>
        </button>

        <span className="mp3-tiempo">{formatTime(actual)}</span>
        <input
          className="mp3-progreso"
          type="range"
          min="0"
          max={duracion || 0}
          step="0.1"
          value={actual}
          onChange={cambiarProgreso}
          aria-label="Progreso de la meditación"
        />
        <span className="mp3-tiempo">{formatTime(duracion)}</span>
      </div>

      <div className="mp3-volumen-fila">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="mp3-volumen-icono">
          <path d="M4 9v6h4l5 4V5L8 9H4z" />
        </svg>
        <input
          className="mp3-volumen"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volumen}
          onChange={cambiarVolumen}
          aria-label="Volumen"
        />
      </div>
    </div>
  );
}
