import {
  RelationshipDates,
  BedtimeStory,
  LoveLetter,
  LoveReason,
  Memory,
  SongItem,
  FutureGoal,
  MapMarker,
  TimeCapsuleLetter,
  TriviaQuestion,
  PreferenceQuestion,
  GuessDateQuestion,
  LoveCoupon,
  BoyfriendChatSettings
} from "./types";

export const defaultDates: RelationshipDates = {
  metDate: "2024-08-12",
  girlfriendDate: "2024-10-15"
};

export const defaultStories: BedtimeStory[] = [
  {
    id: "met-story",
    title: "Cómo Comenzó Tu Tortura Máxima",
    summary: "Nuestra historia de amor empezó de la forma más inesperada: el inicio oficial de tu tortura favorita.",
    category: "met",
    readTime: "4 min",
    content: `Aquel día parecía ser un día completamente normal. El sol brillaba de la misma forma, el tráfico sonaba igual y yo caminaba distraído en mis propios pensamientos. Pero el destino tenía planeado el inicio de tu tortura máxima: conocerme y aguantar mi amor incondicional por el resto de tus días.

De pronto, te vi. Estabas ahí, con esa luz tan tuya que destaca en cualquier lugar. Cuando nuestras miradas se cruzaron por primera vez, sentí una mezcla extraña de nerviosismo y una paz increíble, dándome cuenta de que por fin había encontrado a mi víctima favorita para llenar de besos, mimos y abrazos infinitos.

Me acerqué con el corazón latiéndome a mil por hora, tratando de inventar la excusa perfecta para hablarte y dar inicio a tu adorable condena. No recuerdo con exactitud qué palabras salieron de mi boca en ese instante, pero sí recuerdo perfectamente tu sonrisa, esa hermosa sonrisa que detuvo el tiempo a mi alrededor y me confirmó que estarías atrapada en mi red de amor por siempre.

Conversamos apenas unos minutos, pero para mí fue el comienzo del viaje más feliz de mi vida (y de tu tortura favorita). Tu voz, tu timidez encantadora y la forma en que brillaban tus ojos me cautivaron por completo. Ese día regresé a casa con una sonrisa tonta en la cara, sabiendo que tu tortura máxima acababa de comenzar. Y no me equivoqué, mi amor. Desde ese instante, cada uno de mis días tiene un color diferente gracias a este flaco que te ama con locura y nunca te va a dejar escapar.`
  },
  {
    id: "love-stars",
    title: "El Viaje a las Estrellas",
    summary: "Un viaje imaginario de la mano, flotando entre constelaciones donde solo existimos tú y yo.",
    category: "love",
    readTime: "3 min",
    content: `Imagina que el suelo bajo nuestros pies empieza a desvanecerse lentamente, dejándonos flotar en un cielo nocturno templado y estrellado. No hay frío, no hay gravedad, solo la calidez de nuestras manos fuertemente entrelazadas.

Te miro y tu cabello flota suavemente alrededor de tu rostro, reflejando el brillo de millones de galaxias lejanas. Empezamos a caminar sobre un sendero hecho de polvo de estrellas dorado. Con cada paso que damos, una pequeña nota musical resuena en el vacío, creando una sinfonía que parece escrita solo para nosotros.

Pasamos al lado de Saturno, y jugamos a deslizarnos por sus anillos como si fuera un tobogán infinito, riéndonos a carcajadas. Luego, nos sentamos al borde de una nube de nebulosa rosada, balanceando los pies mientras contemplamos la inmensidad del universo.

En medio de todo ese infinito, me doy la vuelta y te miro a los ojos. En ese instante me doy cuenta de que, de entre todas las estrellas, constelaciones y mundos por descubrir, la vista más hermosa que existe en todo el universo eres tú. Te recuestas en mi hombro, y mientras flotamos de regreso a la Tierra, te susurro al oído que mi amor por ti es más grande que todo el espacio que nos rodea.`
  },
  {
    id: "bedtime-cabin",
    title: "La Cabaña del Bosque Encantado",
    summary: "Un cuento relajante para conciliar el sueño, arrullados por el fuego y la lluvia.",
    category: "bedtime",
    readTime: "5 min",
    content: `Respira hondo, mi princesa, y cierra los ojos lentamente. Imagina que nos encontramos en una cabaña de madera rústica, escondida en el corazón de un bosque milenario. Fuera de la cabaña, una suave y rítmica lluvia comienza a caer sobre las hojas de los árboles, creando un sonido constante y sumamente relajante.

Dentro de la cabaña todo es calidez. En la chimenea de piedra, los leños crujen suavemente, desprendiendo un calor acogedor que abraza la habitación entera. El aroma a madera de pino y a chocolate caliente llena el aire.

Estamos recostados en un sofá inmenso y esponjoso, cubiertos por una manta de lana gruesa y suave. Tú estás recostada sobre mi pecho, y puedes escuchar el latir constante de mi corazón, que late con un ritmo tranquilo y pausado, solo para ti. Con una de mis manos, acaricio suavemente tu cabello, deslizándola mechón a mechón, relajando cada músculo de tu cuerpo.

La lluvia afuera continúa su canto arrullador. Siente cómo todo el cansancio del día se desvanece por completo. No hay preocupaciones, no hay prisa, no hay nada más en el mundo que este momento de paz absoluta. Te abrazo un poco más fuerte, te doy un beso tierno en la frente y te susurro lo mucho que te amo mientras te vas quedando profundamente dormida. Que tengas dulces sueños, mi amor.`
  }
];

export const defaultLetters: LoveLetter[] = [
  {
    id: "extrañes",
    trigger: "Me extrañes mucho",
    emoji: "🥺",
    content: `Hola, mi amor... si estás leyendo esto, es porque me extrañas y probablemente la distancia o el tiempo nos están impidiendo hablar en este momento. Quiero que cierres los ojos un segundo y respires hondo. ¿Listo?

Quiero que sepas que, aunque no pueda responderte justo ahora, te tengo en mi mente en cada segundo de mi día. No hay momento en que no piense en tu sonrisa, en tu risa contagiosa o en la calidez de tus abrazos. La distancia física es solo un detalle temporal; mi corazón está completamente contigo, pegadito al tuyo.

Recuerda que eres mi prioridad, mi lugar seguro y la razón de mis sonrisas más sinceras. Ya falta muy poco para que volvamos a hablar o para que nos volvamos a ver y pueda llenarte de todos los besos y abrazos que te estoy acumulando. Mientras tanto, abrázate fuerte a una almohada e imagina que soy yo dándote un abrazo infinito. ¡Te amo con toda mi alma, mi reina!`,
    bgGradient: "from-pink-500/10 to-rose-500/10 border-rose-200"
  },
  {
    id: "triste",
    trigger: "Estés triste o desanimada",
    emoji: "😔",
    content: `Mi vida hermosa, me duele tanto saber que tienes un nudo en el corazón o que las cosas no salieron bien hoy. Si pudiera estar allí contigo en este instante, te abrazaría tan fuerte que sentirías cómo intento absorber toda tu tristeza para que no te duela más.

Quiero recordarte algo sumamente importante: eres una mujer increíblemente fuerte, valiente e inteligente. Es normal sentirse cansada, abrumada o triste a veces. Permítete sentirlo, llorar si lo necesitas, pero por favor nunca olvides el valor inmenso que tienes.

Para mí, eres perfecta de pies a cabeza, y tus ojos iluminan incluso mis días más grises. Mañana será un nuevo día, una nueva oportunidad de brillar como solo tú sabes hacerlo. Estoy sumamente orgulloso de ti, de cómo luchas cada día y de la hermosa persona que eres. Aquí tienes mi mano, mi hombro y mi corazón entero para apoyarte siempre. Todo va a estar bien, mi amor. Sonríe un poquito por mí, ¿sí?`,
    bgGradient: "from-blue-500/10 to-indigo-500/10 border-blue-200"
  },
  {
    id: "enojada",
    trigger: "Estés enojada conmigo o frustrada",
    emoji: "😡",
    content: `Mi amor, si estás leyendo esto y el motivo de tu enojo soy yo... primero que nada, quiero pedirte una disculpa de todo corazón. Jamás en la vida mi intención será lastimarte, hacerte sentir mal o molestarte. Tú eres lo más sagrado que tengo y cuidarte es mi mayor deseo.

A veces cometo errores, digo cosas sin pensar o actúo de forma tonta, pero mi amor por ti nunca cambia ni disminuye. Por favor, no nos durmamos enojados. Háblame con total franqueza, dime qué hice mal y te prometo escucharte con el corazón abierto y hacer todo lo necesario para solucionarlo.

Si estás frustrada por cosas externas, recuerda que somos un equipo. Tu frustración es mi frustración, y juntos podemos resolver cualquier problema que se nos ponga enfrente. Te amo más de lo que las palabras pueden expresar, y no me gusta estar distanciado de mi personita favorita ni un solo segundo. Déjame consentirte y arreglarlo.`,
    bgGradient: "from-orange-500/10 to-amber-500/10 border-amber-200"
  },
  {
    id: "seguridad",
    trigger: "Necesites recordar cuánto te amo",
    emoji: "💖",
    content: `Hola mi vida. Sé que a veces las dudas o las inseguridades tocan la puerta, o simplemente necesitas un recordatorio de lo que significas para mí. Así que déjame decírtelo con toda la claridad y fuerza del mundo:

Te amo. Te amo con un amor que crece cada mañana, un amor que encuentra en tus detalles más sencillos su mayor felicidad. Te amo cuando te despiertas despeinada, cuando me cuentas tus sueños emocionada, cuando te quejas de cosas tontas y cuando me miras con esos ojos hermosos que me desarman por completo.

Eres el amor de mi vida, mi decisión diaria más hermosa y mi futuro soñado. No hay nadie más con quien prefiera compartir mi vida, mis locuras, mis metas y mis días libres. Eres mi hogar, mi paz y mi mayor orgullo. Nunca olvides que estás grabada en mi corazón y que mi amor por ti es inquebrantable. ¡Eres la flaca más hermosa del universo entero!`,
    bgGradient: "from-purple-500/10 to-fuchsia-500/10 border-purple-200"
  }
];

export const defaultReasons: LoveReason[] = [
  { id: "1", text: "Tu sonrisa hermosa que tiene el poder mágico de iluminar y arreglar hasta mi día más gris.", category: "smile", emoji: "✨" },
  { id: "2", text: "La forma tan tierna y graciosa en la que arrugas tu naricita cuando te ríes de algo que te da vergüenza.", category: "personality", emoji: "🐰" },
  { id: "3", text: "Tu gran corazón, tu empatía con el mundo y la forma tan dulce en la que te preocupas por los demás.", category: "personality", emoji: "🥺" },
  { id: "4", text: "La paz y seguridad inmensa que siento en el pecho cada vez que me abrazas fuerte y me hueles.", category: "moments", emoji: "🫂" },
  { id: "5", text: "Cómo me miras fijamente con tus ojos brillantes cuando te estoy contando algo con mucha emoción.", category: "smile", emoji: "👀" },
  { id: "6", text: "Tu inteligencia, tus ocurrencias y tu forma única de ver la vida que me inspira a ser mejor cada día.", category: "personality", emoji: "🧠" },
  { id: "7", text: "Nuestros chistes locales, nuestras tonterías y cómo podemos reírnos de la nada como si fuéramos niños.", category: "moments", emoji: "🤪" },
  { id: "8", text: "Soñar despierto a tu lado sobre nuestra futura casa, los viajes que haremos y la vida hermosa que construiremos.", category: "future", emoji: "🏡" },
  { id: "9", text: "Tus manos suaves y delicadas que encajan perfectamente con las mías como si hubieran sido diseñadas juntas.", category: "moments", emoji: "🤝" },
  { id: "10", text: "El simple hecho de que eres tú, de manera auténtica, y que me dejas amarte tal y como eres.", category: "future", emoji: "❤️" }
];

export const defaultMemories: Memory[] = [
  {
    id: "m-1",
    title: "Nuestro Primer Café Juntos",
    date: "2024-08-18",
    type: "photo",
    url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop&q=60",
    comment: "Ese día estaba tan nervioso que casi derramo el café en la mesa, pero tú estabas tan hermosa conversando que todo valió la pena. Ahí supe que quería tomar café contigo por el resto de mi vida."
  },
  {
    id: "m-2",
    title: "Atardecer de Película",
    date: "2024-10-02",
    type: "photo",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60",
    comment: "Caminando de la mano por la playa mientras el cielo se pintaba de colores rosados y naranjas. Te abracé por la espalda y sentí que no necesitaba nada más en este mundo."
  },
  {
    id: "m-3",
    title: "Tarde de Mantas y Pelis",
    date: "2024-11-20",
    type: "photo",
    url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=60",
    comment: "Afuera hacía un frío terrible, pero nosotros estábamos derretidos de amor bajo tres cobijas, comiendo palomitas y viéndote quedarte dormida a la mitad de la película. Eres mi perezosa favorita."
  }
];

export const defaultSongs: SongItem[] = [
  {
    id: "s-1",
    title: "Yellow",
    artist: "Coldplay",
    youtubeId: "yKNxeF4KAtY",
    explanation: "Esta canción me recuerda al brillo tan especial que tienes en los ojos. 'Look at the stars, look how they shine for you...' Toda la letra describe lo brillante, hermosa y mágica que eres para mí, mi amor.",
    albumArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&auto=format&fit=crop&q=60"
  },
  {
    id: "s-2",
    title: "Perfect",
    artist: "Ed Sheeran",
    youtubeId: "2Vv-BfVoq4g",
    explanation: "Cada vez que escucho esta canción me imagino bailando contigo en medio de la sala a mitad de la noche, descalzos, abrazados, sin importar nada más. Eres perfecta para mí en todos los sentidos imaginables.",
    albumArt: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&auto=format&fit=crop&q=60"
  },
  {
    id: "s-3",
    title: "Favorito",
    artist: "Camilo",
    youtubeId: "8u7_69N_I2U",
    explanation: "Tus besos son mi comida favorita, tus abrazos mi lugar favorito en el mundo. No me importa viajar a París o al lugar más caro, porque mi destino favorito siempre va a ser estar a tu ladito.",
    albumArt: "https://images.unsplash.com/photo-1487180144351-b8472da7a4c3?w=200&auto=format&fit=crop&q=60"
  }
];

export const defaultGoals: FutureGoal[] = [
  { id: "g-1", title: "Viajar juntos a París y ver iluminarse la Torre Eiffel abrazaditos.", category: "places", isCompleted: false },
  { id: "g-2", title: "Tener un perrito (preferiblemente un Golden Retriever o un Pug) y llamarlo Copito.", category: "dreams", isCompleted: false },
  { id: "g-3", title: "Pasar un fin de semana entero en una cabaña con chimenea y jacuzzi en las montañas.", category: "activities", isCompleted: false },
  { id: "g-4", title: "Diseñar nuestra sala soñada con un librero gigante y un sofá donde quepamos los dos estirados.", category: "house", isCompleted: false },
  { id: "g-5", title: "Aprender a cocinar juntos un platillo súper difícil y reírnos si nos queda quemado.", category: "activities", isCompleted: false },
  { id: "g-6", title: "Ver la aurora boreal acostados dentro de un iglú de cristal calientito.", category: "places", isCompleted: false }
];

export const defaultMarkers: MapMarker[] = [
  {
    id: "map-1",
    x: 48,
    y: 42,
    name: "Dónde Cruzamos Miradas (El Comienzo)",
    type: "met",
    description: "La cafetería del parque donde te vi por primera vez con tu saquito beige y tu timidez que me enamoró al instante.",
    date: "2024-08-12",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "map-2",
    x: 52,
    y: 46,
    name: "Nuestra Primera Cita Oficial",
    type: "first_date",
    description: "Fuimos por helados y luego caminamos durante 3 horas por el jardín botánico. Estábamos tan nerviosos que nos costaba tomarnos de las manos.",
    date: "2024-08-18",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "map-3",
    x: 45,
    y: 55,
    name: "Nuestro Mirador Secreto",
    type: "favorite",
    description: "Ese hermoso risco donde se ve toda la ciudad iluminada de noche. Aquí fue donde te pregunté si querías ser mi flaca oficialmente, con el corazón en la garganta.",
    date: "2024-10-15",
    image: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "map-4",
    x: 35,
    y: 35,
    name: "Próximo Destino Juntos",
    type: "future",
    description: "Esa pequeña playa escondida en el norte a la que morimos por ir para desconectarnos de todo el mundo y estar solitos.",
    date: "Planeado para 2027",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=500&auto=format&fit=crop&q=60"
  }
];

export const defaultTimeCapsules: TimeCapsuleLetter[] = [
  {
    id: "cap-anniversary",
    title: "Nuestro Próximo Aniversario de Novios",
    unlockDate: "2026-10-15",
    content: `¡Feliz Aniversario, mi amor! Si estás leyendo esto es porque un año más ha pasado a tu lado, llenándome de risas, aprendizajes y un amor que no para de crecer.

Mirar atrás y ver todo lo que hemos construido juntos me llena de un orgullo inmenso. Hemos superado retos, hemos cumplido pequeñas metas y, sobre todo, nos hemos amado con una intensidad maravillosa. Gracias por ser mi novia, mi mejor amiga, mi consejera y mi cómplice en todo.

Te prometo seguir cuidándote, haciéndote reír todos los días y amándote con más fuerzas en cada año que sumemos. ¡Feliz aniversario, mi princesa hermosa! Eres lo mejor de mi vida entera.`,
    bgType: "anniversary"
  },
  {
    id: "cap-christmas",
    title: "Navidad Juntos",
    unlockDate: "2026-12-25",
    content: `¡Feliz Navidad, mi reina! En esta época tan mágica, el regalo más grande y valioso que tengo bajo mi árbol de la vida eres tú. No necesito pedirle nada más a Santa ni al universo, porque tener tu amor y tu presencia lo es todo.

Le doy gracias a la vida por permitirme pasar otra Navidad compartiendo sonrisas contigo, cenando rico, muriéndonos de frío y abrazándonos fuerte para calentarnos. Que esta noche traiga mucha paz a tu hogar y a tu vida, y que la magia del amor nos siga uniendo siempre. ¡Te amo con todo mi corazón navideño!`,
    bgType: "christmas"
  },
  {
    id: "cap-birthday",
    title: "Tu Próximo Cumpleaños",
    unlockDate: "2027-04-12",
    content: `¡Feliz Cumpleaños a la flaca más hermosa, inteligente y dulce del planeta! Hoy se celebra el día en que nació el amor de mi vida, y yo soy el hombre más afortunado del mundo por poder celebrarlo a tu ladito.

Deseo con toda mi alma que este nuevo año de vida te traiga risas infinitas, metas cumplidas, salud y mucha felicidad. Recuerda siempre que eres capaz de lograr todo lo que te propongas, y que yo siempre estaré aquí en primera fila para aplaudir tus éxitos y sostenerte si te cansas. ¡Que te consientan muchísimo hoy, mi princesa! Te amo infinitamente.`,
    bgType: "birthday"
  },
  {
    id: "cap-future",
    title: "Mensaje dentro de Un Año",
    unlockDate: "2027-07-19",
    content: `Hola, mi amor del futuro... hoy escribo esto exactamente hace un año, el 19 de julio de 2026, pensando en cómo seremos, qué cosas habremos vivido y cuánto habremos crecido para cuando abras este mensaje.

Espero que para este momento ya hayamos cumplido varias de las metas de nuestra lista, que sigamos riéndonos de las mismas tonterías de siempre y que nuestro amor sea aún más fuerte y maduro. Te amo hoy mientras escribo esto, y sé con total certeza que te amaré aún más el día que lo leas. Gracias por seguir eligiéndome todos los días como tu compañero de vida. ¡Un abrazo gigante en el tiempo, mi amor!`,
    bgType: "future"
  }
];

export const defaultTrivia: TriviaQuestion[] = [
  {
    id: "t-1",
    question: "¿Qué saquito de ropa llevaba puesto el día que nos conocimos?",
    options: [
      "Un saquito beige clarito",
      "Una casaca negra de cuero",
      "Una polera azul marino",
      "Un vestido floreado"
    ],
    correctAnswer: 0,
    explanation: "¡Sí! Llevabas puesto un saquito beige clarito que te hacía ver sumamente dulce y hermosa. Nunca olvidaré esa primera imagen tuya."
  },
  {
    id: "t-2",
    question: "¿Cuál es mi comida favorita en todo el mundo si la preparas tú?",
    options: [
      "La lasaña casera",
      "Unos tacos bien picantes",
      "Cualquier cosa que cocines, aunque se queme un poquito",
      "Hamburguesas con papas fritas"
    ],
    correctAnswer: 2,
    explanation: "¡Exacto! No importa lo que cocines, el ingrediente secreto es tu amor y por eso siempre será mi comida favorita absoluta."
  },
  {
    id: "t-3",
    question: "¿En qué lugar te pedí formalmente que fueras mi novia/flaca?",
    options: [
      "En el cine viendo una película romántica",
      "En nuestro mirador secreto viendo la ciudad iluminada",
      "En un restaurante italiano elegante",
      "En un parque lleno de flores"
    ],
    correctAnswer: 1,
    explanation: "¡Siiii! Fue en el mirador secreto de noche, con el corazón latiendo a mil por hora y la hermosa vista de la ciudad como testigo de nuestro inicio."
  }
];

export const defaultPreferences: PreferenceQuestion[] = [
  {
    id: "p-1",
    question: "¿Qué prefiero hacer un sábado por la noche contigo?",
    optionA: "Salir de fiesta a bailar y divertirnos",
    optionB: "Quedarnos arrulladitos en cama viendo pelis y comiendo pizza",
    boyfriendChoice: "B",
    explanation: "Prefiero mil veces estar calientito a tu lado, abrazándote y mimándote sin ruidos molestos. Es mi plan perfecto."
  },
  {
    id: "p-2",
    question: "¿Qué tipo de clima prefiero para salir a pasear juntos?",
    optionA: "Un clima frío/lluvioso para andar abrazaditos compartiendo casaca",
    optionB: "Un clima soleado para comer helados e ir a la piscina",
    boyfriendChoice: "A",
    explanation: "El frío es la excusa perfecta para caminar pegaditos, cobijarnos con una sola bufanda y sentir tu calidez cerca."
  },
  {
    id: "p-3",
    question: "¿Cuál de estos superpoderes elegiría si pudiera?",
    optionA: "Poder teletransportarme para estar contigo en un segundo cuando me extrañes",
    optionB: "Poder leer la mente de las personas",
    boyfriendChoice: "A",
    explanation: "La distancia es lo único feo de nuestra relación a veces, ¡así que teletransportarme a tu ladito sería mi mayor deseo cumplido!"
  }
];

export const defaultGuessDates: GuessDateQuestion[] = [
  {
    id: "gd-1",
    event: "El día exacto en que nos vimos por primera vez (Nos conocimos)",
    correctDate: "2024-08-12",
    explanation: "Ese hermoso lunes de agosto que cambió el rumbo de nuestras vidas para siempre."
  },
  {
    id: "gd-2",
    event: "El día en que oficialmente nos convertimos en novios (Somos flacas)",
    correctDate: "2024-10-15",
    explanation: "La noche mágica en el mirador secreto donde me dijiste que sí con una sonrisa hermosa."
  }
];

export const defaultCoupons: LoveCoupon[] = [
  { id: "c-1", title: "Vale por un Abrazo Infinito", description: "Válido para cuando te sientas cansada o triste. Un abrazo súper apretado de esos que vuelven a acomodar las piezas rotas.", emoji: "🫂", code: "HUG-999" },
  { id: "c-2", title: "Vale por una Tarde de Pelis & Mimos", description: "Tú eliges las películas, yo pongo las palomitas, los dulces y caricias ilimitadas en tu cabello durante todo el día.", emoji: "🍿", code: "MOVIE-143" },
  { id: "c-3", title: "Vale por un Masaje Relajante", description: "Un masaje de pies a cabeza con aceites aromáticos para desvanecer por completo el estrés de tu semana.", emoji: "💆‍♀️", code: "RELAX-777" },
  { id: "c-4", title: "Vale por tu Comida Favorita a Domicilio", description: "Tú solo di qué se te antoja cenar y yo me encargo de ordenarlo y enviártelo o cocinártelo con mucho amor.", emoji: "🍕", code: "YUMMY-123" },
  { id: "c-5", title: "Vale por Ganar una Discusión Tonta", description: "Canjea este cupón en cualquier debate menor y automáticamente tendré que admitir que tienes toda la razón (como siempre).", emoji: "👑", code: "WIN-100" }
];

export const lovePhrases: string[] = [
  "Eres mi rincón favorito en todo el universo.",
  "No te imaginas lo mucho que sonrío al celular cuando me llega un mensaje tuyo.",
  "Mi amor por ti es como el universo: infinito y en constante expansión.",
  "Eres mi casualidad favorita, el accidente más hermoso de mi vida.",
  "En un mundo lleno de caos, tú eres mi paz absoluta.",
  "Tus abrazos son mi refugio preferido contra el frío y la rutina.",
  "Podría contemplar tu rostro durmiendo durante horas y nunca me cansaría.",
  "Si tuviera que volver a elegir un camino, te elegiría a ti mil veces más.",
  "Haces que mis días normales se sientan extraordinarios con solo estar en ellos.",
  "Eres mi flaca hermosa, mi reina, mi princesa y mi mejor decisión diaria.",
  "Me encantas de una manera inexplicable, pero sumamente maravillosa.",
  "Tenerte a ti es tenerlo todo, porque contigo no me hace falta nada.",
  "Arrugas la nariz cuando te ríes y ahí es cuando más ganas me dan de besarte.",
  "Tu amor es el motor que me inspira a ser la mejor versión de mí mismo.",
  "No sé qué depara el futuro, pero si es contigo, sé que será hermoso.",
  "Contigo los segundos vuelan, pero los recuerdos se quedan grabados para siempre.",
  "Tu voz es mi melodía favorita para empezar y terminar cada día.",
  "Te amo por cómo eres, por cómo me haces sentir y por lo que somos juntos.",
  "Eres esa canción que no me canso de escuchar en bucle todo el día.",
  "Estar contigo es como estar en casa, pero en cualquier lugar del mundo."
];

export const defaultChatSettings: BoyfriendChatSettings = {
  styleGuide: "Hablas de forma cariñosa, relajada y muy tierna. Usas bastantes emojis cariñosos (❤️, 🥰, 😍, 😘, 🧸, 🥺). No haces respuestas excesivamente largas (como si fuera WhatsApp), prefieres ser directo pero con mucha dulzura. Usa palabras como 'mi amor', 'mi princesa', 'bebé', 'linda', 'flaca'.",
  relationshipFacts: [
    "Nos conocimos el 12 de agosto de 2024 en una linda cafetería cerca del parque.",
    "Llevabas un saquito beige muy lindo que te hacía ver preciosa.",
    "Nos convertimos en novios oficialmente el 15 de octubre de 2024 en el mirador secreto de la ciudad de noche.",
    "Nuestra primera cita formal fue en el jardín botánico de la ciudad el 18 de agosto de 2024, donde tomamos helado.",
    "Nuestra canción especial es 'Yellow' de Coldplay porque me recuerda al brillo hermoso de tus ojos.",
    "También nos encanta escuchar 'Perfect' de Ed Sheeran y 'Favorito' de Camilo juntos.",
    "Planeamos viajar juntos a París, tener un perrito Golden Retriever llamado Copito y armar una cabaña acogedora en las montañas.",
    "Ella es el amor de mi vida, mi princesa hermosa, mi prioridad absoluta y la flaca más linda del universo.",
    "Yo soy su novio que la adora con toda su alma y siempre la apoyaré y cuidaré."
  ],
  customInstructions: "Responde de forma natural, sincera y cariñosa. Intenta dar respuestas cortas de 2 o 3 oraciones cariñosas como si estuviéramos chateando, a menos que te pida consejo o esté triste, en cuyo caso puedes ser más expresivo y alentador."
};
