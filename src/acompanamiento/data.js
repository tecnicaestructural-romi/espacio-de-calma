/* =========================================================
   ACOMPAÑAMIENTO ENTRE SESIONES — datos centralizados
   =========================================================

   AUDIOS DE LAS MEDITACIONES GUIADAS:
   Cada estado tiene un campo `audio` con la ruta al archivo MP3
   real, ya incorporado en public/audio/ con nombres simples
   (sin espacios, tildes ni paréntesis):

       public/audio/ansiedad-me-lleva-al-manana.mp3
       public/audio/tristeza-me-permito-sentir.mp3
       public/audio/entrego-mis-miedos.mp3
       public/audio/suelto-el-enojo.mp3
       public/audio/un-dia-a-la-vez.mp3
       public/audio/soledad-se-vuelve-encuentro.mp3
       public/audio/cuando-el-alma-pide-descanso.mp3
       public/audio/la-noche-no-necesita-respuestas.mp3

   Si en algún momento se reemplaza un audio, alcanza con subir el
   nuevo MP3 con el mismo nombre a public/audio/ (o actualizar la
   ruta `audio` del estado correspondiente aquí abajo). Si por algún
   motivo el archivo no pudiera cargar, el reproductor (MP3Player.jsx)
   lo detecta automáticamente y muestra un aviso de error, sin romper
   el resto de la aplicación.
   ========================================================= */

const BASE_URL = import.meta.env.BASE_URL;

export const ESTADOS = [
  {
    key: "ansiedad",
    label: "Ansiedad y preocupación",
    icon: "ansiedad",
    texto:
      "Cuando la mente intenta adelantarse a todo, volver al presente puede ayudarnos a recuperar un poco de espacio. No necesitás resolver ahora todo lo que podría suceder.",
    meditacion: { titulo: "Cuando la ansiedad me lleva al mañana", audio: `${BASE_URL}audio/ansiedad-me-lleva-al-manana.mp3` },
    respiracion: {
      titulo: "Exhalo y vuelvo al presente",
      texto: "Cuando la mente se adelanta a todo, una exhalación más lenta puede ayudarte a regresar suavemente a este momento.",
      textoEntreCiclos: "Vuelvo a este momento.",
      colorAnimacion: "#C96B4B",
    },
    ejercicio: {
      titulo: "Volver al presente",
      pasos: [
        "Observá cinco cosas que puedas ver.",
        "Sentí los pies o los puntos de apoyo.",
        "Reconocé tres sonidos.",
        "Elegí solamente el próximo paso posible.",
      ],
    },
    oracion: {
      texto:
        "Dios, hoy mi mente se adelanta a cosas que todavía no pasaron. Te pido que me ayudes a volver a este momento y a soltar en tus manos lo que no depende de mí. Acompañame a dar solamente el paso que tengo delante, con la confianza de que no estoy sola/o en esto.",
      versiculo: "No se angustien por nada; en toda ocasión presenten sus peticiones a Dios.",
      referencia: "Filipenses 4:6",
    },
  },
  {
    key: "tristeza",
    label: "Tristeza",
    icon: "tristeza",
    texto:
      "No tenés que esconder lo que sentís ni apurarte a estar bien. Podés darle un lugar a tu tristeza y permitir que tu corazón exprese aquello que viene sosteniendo.",
    meditacion: { titulo: "Tristeza: me permito sentir para sanar", audio: `${BASE_URL}audio/tristeza-me-permito-sentir.mp3` },
    respiracion: {
      titulo: "Le doy espacio a lo que siento",
      texto: "No necesitás contener lo que sentís. Permití que la respiración acompañe este momento sin intentar cambiarlo.",
      textoEntreCiclos: "No necesito apurar lo que siento.",
      colorAnimacion: "#D8A7A1",
    },
    ejercicio: {
      titulo: "Lo que mi corazón necesita expresar",
      pasos: [
        "Tomá una hoja.",
        "Escribí lo que sentís tal como aparezca.",
        "No corrijas ni ordenes.",
        "Después elegí guardar, doblar o romper la hoja.",
      ],
    },
    oracion: {
      texto:
        "Dios, hoy mi corazón está triste y no quiero apurarme a estar bien. Te pido que te acerques a mí en este momento, que sostengas lo que hoy pesa y me acompañes mientras dejo salir lo que necesito soltar. Gracias porque no tengo que atravesar esto sola/o.",
      versiculo: "Cercano está el Señor a los quebrantados de corazón.",
      referencia: "Salmo 34:18",
    },
  },
  {
    key: "miedo",
    label: "Miedo e inseguridad",
    icon: "miedo",
    texto:
      "El miedo intenta protegernos, aunque a veces ocupe demasiado espacio. Podés reconocerlo sin luchar contra él y acompañarte mientras atravesás este momento.",
    meditacion: { titulo: "Entrego mis miedos", audio: `${BASE_URL}audio/entrego-mis-miedos.mp3` },
    respiracion: {
      titulo: "Respiro y recupero sostén",
      texto: "No necesitás obligarte a dejar de sentir miedo. Esta respiración te acompaña a recuperar un poco de estabilidad.",
      textoEntreCiclos: "Puedo atravesar este momento.",
      colorAnimacion: "#C9A35D",
    },
    ejercicio: {
      titulo: "Lo que hoy puede sostenerme",
      intro:
        "Este ejercicio no busca obligarte a dejar de sentir miedo. Te propone reconocer qué necesitás y con qué recursos contás para atravesar este momento.",
      pasos: [
        "Escribí o pensá: \"Lo que hoy me da miedo es…\"",
        "Preguntate: \"¿Qué necesitaría para sentirme un poco más segura/o?\"",
        "Reconocé una fortaleza que ya utilizaste en otro momento difícil.",
        "Elegí una persona, un lugar o una acción que pueda brindarte apoyo.",
        "Separá aquello que hoy depende de vos de aquello que no podés controlar.",
        "Elegí solamente un paso pequeño y posible.",
        "Repetí lentamente: \"No necesito que el miedo desaparezca para poder avanzar.\"",
      ],
    },
    oracion: {
      texto:
        "Dios, hoy siento miedo y no quiero atravesarlo desde mis propias fuerzas. Quedate cerca de mí y ayudame a recordar que no camino en soledad. Dame claridad para reconocer lo que sí puedo hacer, sabiduría para aceptar lo que no depende de mí y valentía para dar solamente el próximo paso. Que tu presencia sea más grande que aquello que hoy me asusta.",
      versiculo: "Si Dios está con nosotros, ¿quién podrá estar contra nosotros?",
      referencia: "Romanos 8:31",
    },
  },
  {
    key: "enojo",
    label: "Enojo e irritabilidad",
    icon: "enojo",
    texto:
      "El enojo puede aparecer cuando algo duele, frustra o atraviesa nuestros límites. No necesitás negarlo ni reaccionar inmediatamente. Primero podés escucharlo.",
    meditacion: { titulo: "Suelto el enojo, elijo la paz", audio: `${BASE_URL}audio/suelto-el-enojo.mp3` },
    respiracion: {
      titulo: "Creo un espacio antes de reaccionar",
      texto: "El enojo puede traer mucha intensidad al cuerpo. Esta pausa te ayuda a crear un pequeño espacio antes de actuar.",
      textoEntreCiclos: "Creo un espacio antes de reaccionar.",
      colorAnimacion: "#D97B66",
    },
    ejercicio: {
      titulo: "Descarga segura",
      pasos: [
        "Aflojá las manos.",
        "Soltá la mandíbula.",
        "Apoyá los pies.",
        "Presioná suavemente una almohada.",
        "Escribí qué límite o necesidad podría estar mostrando tu enojo.",
        "Evitá enviar mensajes o tomar decisiones mientras la emoción se encuentre muy intensa.",
      ],
    },
    oracion: {
      texto:
        "Dios, hoy siento enojo y no quiero que decida por mí. Ayudame a escuchar qué hay detrás de lo que siento, sin negarlo y sin lastimar. Dame calma para actuar desde la firmeza y no desde la reacción, y recordame que puedo entregarte lo que todavía no sé cómo resolver.",
      versiculo: "Todos deben estar listos para escuchar, y ser lentos para hablar y para enojarse.",
      referencia: "Santiago 1:19",
    },
  },
  {
    key: "estres",
    label: "Estrés y agobio",
    icon: "estres",
    texto:
      "Cuando sentís que todo es demasiado, no necesitás resolverlo todo al mismo tiempo. Podés detenerte y regresar solamente al próximo paso.",
    meditacion: { titulo: "Un día a la vez", audio: `${BASE_URL}audio/un-dia-a-la-vez.mp3` },
    respiracion: {
      titulo: "No tengo que resolver todo ahora",
      texto: "Durante estos instantes, no necesitás atender cada pendiente. Volvé solamente a una respiración por vez.",
      textoEntreCiclos: "No tengo que resolver todo ahora.",
      colorAnimacion: "#E38B5B",
    },
    ejercicio: {
      titulo: "Solo el próximo paso",
      pasos: [
        "Escribí lo que tenés pendiente.",
        "Elegí una única acción pequeña.",
        "Marcá qué puede esperar.",
        "Permitite no resolver todo hoy.",
      ],
    },
    oracion: {
      texto:
        "Dios, hoy siento que todo es demasiado. Te pido que me ayudes a soltar la idea de resolverlo todo al mismo tiempo. Dame claridad para ver el próximo paso y descanso para las cargas que hoy no me corresponde llevar sola/o.",
      versiculo: "Vengan a mí todos los que están cansados y agobiados, y yo les daré descanso.",
      referencia: "Mateo 11:28",
    },
  },
  {
    key: "soledad",
    label: "Soledad o desconexión",
    icon: "soledad",
    texto:
      "Estar a solas no es lo mismo que sentirse sola. A veces, la soledad duele; otras veces puede convertirse en un espacio para escucharte, recordar tu valor y volver a encontrarte con vos. No necesitás buscar rápidamente afuera aquello que primero podés comenzar a reconocer dentro tuyo.",
    meditacion: { titulo: "Cuando la soledad se vuelve encuentro", audio: `${BASE_URL}audio/soledad-se-vuelve-encuentro.mp3` },
    respiracion: {
      titulo: "Vuelvo a mi propia presencia",
      texto: "Esta respiración no reemplaza los vínculos que necesitás. Te ofrece un momento para volver a escucharte antes de elegir desde el miedo a estar sola.",
      sugerenciaOpcional: "Podés colocar una mano sobre el pecho, si te resulta cómodo.",
      textoEntreCiclos: "Mi presencia también puede acompañarme.",
      colorAnimacion: "#B9925A",
    },
    ejercicio: {
      titulo: "Antes de buscar afuera, vuelvo a mí",
      intro:
        "Este ejercicio no busca que te aísles ni que dejes de necesitar a los demás. Te propone hacer una pausa para que puedas elegir desde el amor propio y no solamente desde el miedo a estar sola.",
      pasos: [
        "Apoyá el teléfono durante unos minutos.",
        "Colocá una mano sobre el pecho, si te resulta cómodo.",
        "Preguntate: \"¿Qué estoy necesitando en este momento?\"",
        "Tal vez sea compañía, afecto, seguridad, atención, comprensión o sentirte elegida.",
        "Completá la frase: \"Lo que hoy necesito escuchar es…\"",
        "Preguntate: \"¿Estoy por acercarme a esta persona porque realmente me hace bien o porque tengo miedo de quedarme sola?\"",
        "Elegí una acción de cuidado para vos: descansar, escribir, caminar, preparar algo rico, escuchar música, bañarte o permanecer unos minutos en silencio.",
        "Cuando la emoción haya bajado un poco, elegí con más claridad: quedarte acompañándote o comunicarte con una persona segura.",
      ],
      fraseFinal: "No necesito llenar rápidamente este silencio. Puedo escucharme antes de elegir.",
    },
    oracion: {
      texto:
        "Dios, cuando la soledad me duela, ayudame a no correr hacia personas, lugares o decisiones que no me hacen bien solamente por miedo al vacío. Enseñame a habitar mi propia compañía con ternura, a escuchar lo que verdaderamente necesito y a recordar el valor que pusiste en mí. Dame claridad para distinguir entre el impulso de escapar y el deseo sincero de compartir. Ayudame a elegir vínculos que me cuiden, me respeten y me permitan ser yo. Y cuando necesite compañía, dame humildad y valentía para acercarme a las personas adecuadas. Que tu presencia me recuerde que, aun en silencio, no estoy abandonada.",
      versiculo: "Porque a mis ojos fuiste de gran estima, fuiste honorable, y yo te amé.",
      referencia: "Isaías 43:4",
    },
  },
  {
    key: "cansancio",
    label: "Cansancio emocional",
    icon: "cansancio",
    texto:
      "No todo cansancio se resuelve esforzándote un poco más. Tal vez hoy tu cuerpo y tu corazón necesitan permiso para detenerse.",
    meditacion: { titulo: "Cuando el alma pide descanso", audio: `${BASE_URL}audio/cuando-el-alma-pide-descanso.mp3` },
    respiracion: {
      titulo: "Dejo de sostener por un momento",
      texto: "No tenés que utilizar esta práctica para esforzarte un poco más. Durante unos instantes, permitite no sostener nada.",
      textoEntreCiclos: "Por un momento dejo de sostener.",
      colorAnimacion: "#EED9C8",
    },
    ejercicio: {
      titulo: "Reconocer lo que estoy sosteniendo",
      intro:
        "Este ejercicio no busca que resuelvas todo. Te propone reconocer qué está consumiendo tu energía y elegir una manera posible de cuidarte hoy.",
      pasos: [
        "Detenete unos minutos y apoyá cómodamente el cuerpo.",
        "Completá la frase: \"Lo que más me está agotando emocionalmente es…\"",
        {
          texto: "Observá lo que apareció y separalo en tres grupos:",
          sublista: [
            "Esto sí me corresponde atender hoy.",
            "Esto puede esperar.",
            "Esto no necesito seguir sosteniéndolo sola.",
          ],
        },
        "Elegí una sola carga que puedas postergar, compartir o pedir ayuda para llevar.",
        "Preguntate: \"¿Qué límite necesito poner para proteger un poco mi energía?\"",
        "Elegí una acción que realmente te renueve, sin convertirla en una nueva obligación: permanecer en silencio, escuchar música, salir al aire libre, ducharte, descansar o hacer algo que disfrutes.",
        "Regalate unos minutos sin exigencias.",
      ],
      fraseFinal: "No estoy fallando. Estoy cansada y necesito recuperar espacio.",
    },
    oracion: {
      texto:
        "Dios, hoy estoy cansada/o y no quiero exigirme un poco más. Te pido que me des permiso interior para detenerme, y que en ese descanso pueda encontrar tu fortaleza. Ayudame a no convertir el descanso en una obligación más.",
      versiculo: "Vengan a mí todos los que están cansados y agobiados, y yo les daré descanso.",
      referencia: "Mateo 11:28",
    },
  },
  {
    key: "dormir",
    label: "Dormir y descansar",
    icon: "dormir",
    texto:
      "No necesitás terminar de ordenar cada pensamiento antes de dormir. Podés dejar el día por un momento y permitir que tu cuerpo comience a descansar.",
    meditacion: { titulo: "La noche no necesita respuestas", audio: `${BASE_URL}audio/la-noche-no-necesita-respuestas.mp3`, destacada: true },
    respiracion: {
      titulo: "Dejo que el día termine",
      texto: "No necesitás hacer ningún esfuerzo para dormir. Esta respiración solamente te acompaña a dejar de perseguir el sueño.",
      textoEntreCiclos: "No necesito obligarme a dormir.",
      colorAnimacion: "#DCC3A5",
      finalDiscreto: true,
      mensajeFinalDiscreto: "Por ahora, solamente descansá. No necesitás obligarte a dormir.",
    },
    oracion: {
      texto:
        "Dios, el día termina y mi mente todavía sigue despierta. Te entrego lo que hice y lo que quedó pendiente. Ayudame a soltar el control de la noche y a confiar en que vos seguís cuidando mientras yo descanso.",
      versiculo: "En paz me acostaré y dormiré, porque solo tú, Señor, me haces vivir confiado.",
      referencia: "Salmo 4:8",
    },
    avisoDesplegable: {
      titulo: "Cuando dormir se vuelve difícil",
      texto:
        "Esta meditación es una propuesta opcional para acompañar el descanso. Si las dificultades para dormir son frecuentes, persisten o afectan tu vida diaria, consultá con un profesional de salud. No suspendas, reduzcas ni modifiques medicación indicada sin hablar con quien la prescribió.",
    },
  },
];

export const getEstado = (key) => ESTADOS.find((e) => e.key === key);
