import React, { useState } from "react";
import { ESTADO_ICONS, IconRespiracion } from "./Icons.jsx";
import MP3Player from "./MP3Player.jsx";
import RespiracionGuiada from "./RespiracionGuiada.jsx";

/* Componente visual reutilizable para cada uno de los 8 estados.
   Muestra: nombre, texto breve, y las opciones disponibles (meditación,
   respiración guiada, ejercicio si corresponde, y oración), cada una
   expandible por separado. */

export default function EstadoScreen({ estado, onVolver }) {
  const [abierto, setAbierto] = useState(null); // 'meditacion' | 'respiracion' | 'ejercicio' | 'oracion' | null
  const Icono = ESTADO_ICONS[estado.icon];

  const alternar = (seccion) => setAbierto((a) => (a === seccion ? null : seccion));

  return (
    <div className="estado-screen">
      <button type="button" className="acomp-volver" onClick={onVolver}>
        ← Volver a la rueda
      </button>

      <div className="estado-encabezado">
        {Icono && (
          <span className="estado-icono">
            <Icono width={30} height={30} />
          </span>
        )}
        <h3 className="estado-nombre">{estado.label}</h3>
      </div>

      <p className="estado-texto">{estado.texto}</p>

      <div className="estado-opciones">
        <button
          type="button"
          className={
            "estado-opcion-btn" +
            (abierto === "meditacion" ? " estado-opcion-btn-active" : "") +
            (estado.meditacion.destacada ? " estado-opcion-btn-destacada" : "")
          }
          onClick={() => alternar("meditacion")}
        >
          Escuchar una meditación
        </button>
        {abierto === "meditacion" && (
          <div className="estado-opcion-panel">
            <MP3Player src={estado.meditacion.audio} titulo={estado.meditacion.titulo} />
            <p className="estado-meditacion-nota">
              Esta meditación es una propuesta opcional de acompañamiento. No necesita producir un resultado
              determinado.
            </p>
          </div>
        )}

        {estado.respiracion && (
          <>
            <button
              type="button"
              className={"estado-opcion-btn estado-opcion-btn-respiracion" + (abierto === "respiracion" ? " estado-opcion-btn-active" : "")}
              onClick={() => alternar("respiracion")}
            >
              <IconRespiracion width={18} height={18} />
              Respiración guiada
            </button>
            {abierto === "respiracion" && (
              <div className="estado-opcion-panel">
                <RespiracionGuiada
                  config={estado.respiracion}
                  onTerminar={() => setAbierto(null)}
                />
              </div>
            )}
          </>
        )}

        {estado.ejercicio && (
          <>
            <button
              type="button"
              className={"estado-opcion-btn" + (abierto === "ejercicio" ? " estado-opcion-btn-active" : "")}
              onClick={() => alternar("ejercicio")}
            >
              Hacer un ejercicio
            </button>
            {abierto === "ejercicio" && (
              <div className="estado-opcion-panel">
                <p className="estado-ejercicio-intro">
                  Podés mantener los ojos abiertos, respirar de manera natural y detener el ejercicio cuando lo
                  necesites.
                </p>
                <h4 className="estado-ejercicio-titulo">{estado.ejercicio.titulo}</h4>
                {estado.ejercicio.intro && <p className="estado-ejercicio-intro-extra">{estado.ejercicio.intro}</p>}
                <ul className="estado-ejercicio-pasos">
                  {estado.ejercicio.pasos.map((paso, i) =>
                    typeof paso === "string" ? (
                      <li key={i}>{paso}</li>
                    ) : (
                      <li key={i}>
                        {paso.texto}
                        {paso.sublista && (
                          <ul className="estado-ejercicio-sublista">
                            {paso.sublista.map((sub, j) => (
                              <li key={j}>{sub}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )
                  )}
                </ul>
                {estado.ejercicio.fraseFinal && <p className="estado-ejercicio-frase-final">{estado.ejercicio.fraseFinal}</p>}
              </div>
            )}
          </>
        )}

        <button
          type="button"
          className={"estado-opcion-btn" + (abierto === "oracion" ? " estado-opcion-btn-active" : "")}
          onClick={() => alternar("oracion")}
        >
          Leer una oración
        </button>
        {abierto === "oracion" && (
          <div className="estado-opcion-panel">
            <p className="oracion-intro-fe">
              Este espacio fue creado desde mi fe en Dios, con profundo respeto por las creencias y el camino
              de cada persona. Podés elegir libremente leer esta oración o utilizar solamente los demás
              recursos.
            </p>
            <p className="estado-oracion-texto">{estado.oracion.texto}</p>
            <div className="estado-oracion-versiculo">
              <p>“{estado.oracion.versiculo}”</p>
              <span>{estado.oracion.referencia}</span>
            </div>
          </div>
        )}
      </div>

      {estado.avisoDesplegable && (
        <details className="estado-aviso-desplegable">
          <summary>{estado.avisoDesplegable.titulo}</summary>
          <p>{estado.avisoDesplegable.texto}</p>
        </details>
      )}
    </div>
  );
}
