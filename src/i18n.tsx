/* eslint-disable react-refresh/only-export-components */
import { createContext, startTransition, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

/**
 * Única fuente de copy del sitio.
 *
 * Las tres lenguas comparten estructura exacta (mismas claves, mismos
 * largos de array) porque `copy` es una unión de los tres objetos: si una
 * difiere, TypeScript deja de poder recorrer los arrays.
 *
 * Los precios NO viven aquí: son dinámicos por variante de A/B testing y
 * están en `src/lib/pricing.ts`. Aquí solo van las etiquetas.
 */
const translations = {
  es: {
    meta: {
      title: 'Flory · Tu planta te dice lo que necesita',
      description:
        'Flory monitorea la humedad del suelo, la luz, la temperatura y la humedad ambiental de tu planta, y te ayuda a entender qué necesita. PlantTech hecha en Chile.',
    },
    language: { label: 'Idioma' },
    nav: {
      links: ['Cómo funciona', 'Qué mide', 'La app', 'Precios', 'Dudas'],
      cta: 'Lo quiero',
      homeLabel: 'Flory, ir al inicio',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
    },
    hero: {
      title: ['Tu planta te dice', 'lo que necesita.'],
      description:
        'Flory monitorea tu planta y te ayuda a entender cuándo necesita agua, luz o mejores condiciones para crecer.',
      primaryCta: 'Lo quiero',
      secondaryCta: 'Ver cómo funciona',
      waterStatus: 'Necesita agua',
      waterTip: 'Medio vaso y listo',
      sunValue: '4,5 h de sol',
      sunTip: 'Justo lo que pide',
      deviceAlt: 'Sensor Flory clavado en la tierra de una maceta',
    },
    steps: {
      eyebrow: 'Cómo funciona',
      title: 'Tres pasos y tu planta deja de ser un misterio',
      items: [
        {
          alt: 'Flory saludando junto a una maceta',
          title: 'Pon Flory en tu planta',
          text: 'El dispositivo se clava directo en la maceta. Sin cables y sin configurar nada raro.',
        },
        {
          alt: 'Flory pensando con un signo de interrogación',
          title: 'Flory monitorea',
          text: 'Mide humedad del suelo, luz, temperatura y humedad ambiental, y lo envía por Wi-Fi a la app.',
        },
        {
          alt: 'Flory regando con una regadera',
          title: 'Entiende tu planta',
          text: 'La app te muestra todo. Con Premium, además te dice qué hacer y cuándo.',
        },
      ],
    },
    metrics: {
      eyebrow: 'Qué mide',
      title: 'Cuatro señales, una respuesta',
      tabsLabel: 'Señales que mide Flory',
      imageAlt: 'Sensor Flory clavado en una maceta de terracota junto a un potus',
      items: [
        {
          label: 'Agua',
          value: '38 % de humedad',
          description:
            'Medimos la humedad real del sustrato, no la de la superficie, y te avisamos justo antes de que tu planta lo pase mal.',
        },
        {
          label: 'Luz',
          value: '4,5 h de sol',
          description:
            'Contamos las horas de luz útil que recibe tu planta y te decimos si vale la pena moverla medio metro.',
        },
        {
          label: 'Humedad',
          value: '54 % ambiental',
          description:
            'Seguimos la humedad del aire, que es la que reseca las puntas de las hojas cuando el ambiente está muy seco.',
        },
        {
          label: 'Temperatura',
          value: '21 °C',
          description:
            'Seguimos el clima de cada rincón de la casa y te avisamos cuando una corriente de aire está estresando a tu planta.',
        },
      ],
      plainTitle: 'Y siempre en cristiano',
      plainText: 'Nada de gráficas que hay que interpretar. Flory traduce cada lectura a una frase que puedes seguir hoy.',
    },
    app: {
      eyebrow: 'La app',
      title: 'Todo lo que mide, en tu teléfono',
      description:
        'La app gratis viene incluida con el dispositivo. Premium interpreta los datos y los convierte en mensajes de tu planta.',
      tabsLabel: 'Versiones de la app',
      free: {
        tab: 'App gratis',
        badge: 'Incluida con tu Flory',
        title: 'Ves lo que le pasa',
        description: 'El estado actual de tu planta, las cuatro mediciones y el historial básico.',
        bullets: ['Estado actual de cada planta', 'Las cuatro mediciones en vivo', 'Historial básico y avisos'],
        shots: [
          { alt: 'Pantalla de inicio de la app con el estado del día', caption: 'Hoy' },
          { alt: 'Listado de plantas con sus sensores vinculados', caption: 'Tus plantas' },
          { alt: 'Pantalla de avisos con alertas por planta', caption: 'Avisos' },
        ],
      },
      premium: {
        tab: 'Con Premium',
        badge: 'Flory Premium',
        title: 'Tu planta te habla',
        description:
          'Premium traduce cada medición a una frase en primera persona: «Tengo sed», «Estoy recibiendo poca luz», «No me riegues todavía».',
        bullets: [
          'Cada lectura convertida en una frase',
          'Conversación con tu planta cuando quieras',
          'Diagnóstico por foto de plagas y hojas secas',
        ],
        shots: [
          { alt: 'Pantalla de inicio con un mensaje en primera persona de la planta', caption: 'Te habla' },
          { alt: 'Conversación de chat entre la persona y su planta', caption: 'Conversación' },
          { alt: 'Diagnóstico de una plaga detectada por foto', caption: 'Diagnóstico' },
          { alt: 'Historial de diagnósticos con antes y después', caption: 'Historial' },
        ],
      },
    },
    pricing: {
      eyebrow: 'Precios',
      title: 'Elige tu Flory',
      description: 'Deja tu correo y accede al precio especial de lanzamiento.',
      mostPopular: 'Más elegido',
      oneTime: 'pago único',
      regularPriceLabel: 'Precio normal',
      launchOffer: 'Oferta por dejar tu correo',
      eachDevice: 'por dispositivo',
      plans: [
        {
          name: 'Flory',
          tagline: 'El dispositivo y la app gratis.',
          offerDetail: '1 dispositivo a precio de lanzamiento.',
          features: ['1 dispositivo Flory', 'App gratis para siempre', 'Historial básico'],
        },
        {
          name: 'Flory + Premium',
          tagline: 'Con 12 meses de interpretación incluidos.',
          offerDetail: 'Dispositivo en oferta + 12 meses Premium.',
          features: ['1 dispositivo Flory', '12 meses de Flory Premium', 'Tu planta te habla'],
        },
        {
          name: 'Flory Casa',
          tagline: 'Tres dispositivos para toda la casa.',
          offerDetail: '3 dispositivos a precio de lanzamiento.',
          features: ['3 dispositivos Flory', 'App gratis para siempre', 'Historial básico'],
        },
      ],
      cta: 'Quiero acceder a la oferta',
      note: 'Oferta para quienes dejan su correo. Precios en pesos chilenos, IVA incluido.',
    },
    quiero: {
      meta: {
        title: 'Elige tu Flory · Flory',
        description: 'Elige el Flory que quieres y te avisamos apenas esté disponible.',
      },
      back: 'Volver al inicio',
      eyebrow: 'Paso 1 de 2',
      title: 'Elige tu Flory 🌱',
      description: 'Elige tu modelo y deja tu correo para acceder al precio de lanzamiento.',
      availability: {
        badge: 'Próximamente',
        manufacturingTitle: 'Estamos fabricando el primer lote.',
        manufacturingText: 'Todavía no está a la venta.',
        emailTitle: 'Cada dispositivo queda a',
        emailText: 'al dejar tu correo. Te avisaremos cuando puedas comprarlo.',
      },
      mostPopular: 'Más elegido',
      oneTime: 'pago único',
      plans: [
        {
          name: 'Flory',
          description: 'Un dispositivo y la app gratis.',
          offerDetail: '1 dispositivo a precio de lanzamiento.',
          features: [
            '1 dispositivo Flory',
            'App gratis para siempre',
            'Humedad del suelo, luz, temperatura y humedad ambiental',
            'Historial básico',
          ],
          cta: 'Quiero esta oferta',
        },
        {
          name: 'Flory + Premium',
          description: 'El dispositivo con 12 meses de interpretación inteligente.',
          offerDetail: 'Dispositivo en oferta + 12 meses Premium.',
          features: [
            '1 dispositivo Flory',
            '12 meses de Flory Premium',
            'Interpretación inteligente de cada lectura',
            'Alertas y recomendaciones',
            'Tu planta te habla en primera persona',
          ],
          cta: 'Quiero esta oferta',
        },
        {
          name: 'Flory Casa',
          description: 'Tres dispositivos para el living, la cocina y la pieza.',
          offerDetail: '3 dispositivos a precio de lanzamiento.',
          features: [
            '3 dispositivos Flory',
            'App gratis para siempre',
            'Humedad del suelo, luz, temperatura y humedad ambiental',
            'Historial básico',
          ],
          cta: 'Quiero esta oferta',
        },
      ],
      premiumNotePrefix: 'Después de los 12 meses, Flory Premium sigue a ',
      premiumNoteSuffix: ' al mes y lo cancelas cuando quieras.',
      disclaimer: 'Dejar tu correo te da acceso al precio de lanzamiento. No es una compra ni una reserva.',
    },
    lead: {
      eyebrow: 'Paso 2 de 2',
      title: '¿Dónde te avisamos?',
      description: 'Déjanos tu correo para acceder a la oferta. Te escribiremos apenas Flory esté disponible para comprar.',
      selectedLabel: 'El modelo que te interesa',
      change: 'Cambiar',
      emailLabel: 'Correo',
      emailPlaceholder: 'tu@correo.cl',
      nameLabel: 'Nombre',
      nameOptional: 'opcional',
      namePlaceholder: '¿Cómo te llamamos?',
      submit: 'Quiero acceder a la oferta',
      submitting: 'Enviando…',
      errorEmail: 'Revisa el correo, parece que le falta algo.',
      errorNetwork: 'No pudimos guardar tu correo. Inténtalo de nuevo.',
      privacy: 'Tu correo registra la oferta, pero no es una compra ni una reserva. No se cobra nada ahora.',
    },
    gracias: {
      meta: {
        title: '¡Estás dentro! · Flory',
        description: 'Te avisaremos cuando Flory esté disponible.',
      },
      title: '¡Tu oferta quedó registrada!',
      description:
        'Apenas Flory esté disponible para comprar, recibirás un correo y respetaremos tu precio de lanzamiento.',
      emailPrefix: 'Enviaremos el aviso a',
      offerPrefix: 'Tu precio de lanzamiento',
      note: 'No has comprado ni reservado nada. En esta etapa no se cobra.',
      back: 'Volver al inicio',
      alt: 'Flory junto a un corazón morado',
    },
    faq: {
      eyebrow: 'Dudas',
      title: 'Lo que nos preguntan',
      items: [
        {
          question: '¿Puedo comprarlo ya?',
          answer:
            'Todavía no. Estamos midiendo cuánta gente lo quiere antes de fabricar el primer lote. Déjanos tu correo y serás de los primeros en enterarte cuando esté disponible.',
        },
        {
          question: '¿Necesito wifi?',
          answer:
            'Sí. Flory se conecta a la red wifi de tu casa y envía las mediciones a la app. Si se corta la conexión, guarda las lecturas y las sincroniza cuando vuelve.',
        },
        {
          question: '¿Qué diferencia hay entre la app gratis y Premium?',
          answer:
            'La app gratis te muestra el estado actual, las cuatro mediciones y el historial básico. Premium interpreta esos datos y los convierte en mensajes concretos: «Tengo sed», «Estoy recibiendo poca luz», «No me riegues todavía».',
        },
        {
          question: '¿Funciona con cualquier planta?',
          answer:
            'Sí. Flory reconoce más de 3.000 especies de interior y exterior, y si no la identifica aprende su ritmo en dos semanas.',
        },
        {
          question: '¿Se puede mojar?',
          answer:
            'Sí. El cuerpo resiste el riego diario y la lluvia, así que puede quedarse en la terraza o el jardín todo el año.',
        },
      ],
    },
    cta: {
      title: ['Sé de los primeros', 'en tener Flory.'],
      description:
        'Estamos validando el interés antes de fabricar el primer lote. Déjanos tu correo y te avisamos apenas esté disponible.',
      primary: 'Lo quiero',
      secondary: 'Tengo una duda',
    },
    footer: {
      description: 'PlantTech hecha en Chile. Sensores que escuchan, IA que traduce.',
      columns: [
        { title: 'Producto', links: ['Cómo funciona', 'Qué mide', 'La app', 'Precios'] },
        { title: 'Ayuda', links: ['Dudas', 'Contacto', 'Despachos', 'Guías de cuidado'] },
        { title: 'Flory', links: ['Sobre nosotros', 'Blog', 'Trabaja con nosotros', 'Prensa'] },
      ],
      copyright: 'Hecho con cariño en Santiago.',
      terms: 'Términos',
      privacy: 'Privacidad',
    },
  },
  en: {
    meta: {
      title: 'Flory · Your plant tells you what it needs',
      description:
        'Flory monitors soil moisture, light, temperature and ambient humidity, and helps you understand what your plant needs. PlantTech made in Chile.',
    },
    language: { label: 'Language' },
    nav: {
      links: ['How it works', 'What it measures', 'The app', 'Pricing', 'FAQs'],
      cta: 'I want one',
      homeLabel: 'Flory, go to homepage',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    hero: {
      title: ['Your plant tells you', 'what it needs.'],
      description:
        'Flory monitors your plant and helps you understand when it needs water, light or better conditions to grow.',
      primaryCta: 'I want one',
      secondaryCta: 'See how it works',
      waterStatus: 'Needs water',
      waterTip: 'Half a glass. Done.',
      sunValue: '4.5 h of sun',
      sunTip: 'Exactly what it needs',
      deviceAlt: 'Flory sensor placed in the soil of a plant pot',
    },
    steps: {
      eyebrow: 'How it works',
      title: 'Three steps and your plant stops being a mystery',
      items: [
        {
          alt: 'Flory waving beside a plant pot',
          title: 'Put Flory in your plant',
          text: 'The device goes straight into the pot. No cables and nothing strange to set up.',
        },
        {
          alt: 'Flory thinking with a question mark',
          title: 'Flory monitors',
          text: 'It measures soil moisture, light, temperature and ambient humidity, and sends it to the app over Wi-Fi.',
        },
        {
          alt: 'Flory watering with a watering can',
          title: 'Understand your plant',
          text: 'The app shows you everything. With Premium, it also tells you what to do and when.',
        },
      ],
    },
    metrics: {
      eyebrow: 'What it measures',
      title: 'Four signals, one answer',
      tabsLabel: 'Signals measured by Flory',
      imageAlt: 'Flory sensor in a terracotta pot beside a pothos plant',
      items: [
        {
          label: 'Water',
          value: '38% soil moisture',
          description:
            'We measure moisture where it matters, below the surface, and warn you just before your plant starts to struggle.',
        },
        {
          label: 'Light',
          value: '4.5 h of sun',
          description:
            'We count the useful light your plant receives and tell you whether moving it half a meter would help.',
        },
        {
          label: 'Humidity',
          value: '54% ambient',
          description:
            'We track the humidity in the air, which is what dries out leaf tips when the room gets too dry.',
        },
        {
          label: 'Temperature',
          value: '21 °C',
          description:
            'We track the climate in every corner of your home and warn you when a draft is stressing your plant.',
        },
      ],
      plainTitle: 'Plain language, always',
      plainText: 'No charts to decipher. Flory turns every reading into one clear action you can take today.',
    },
    app: {
      eyebrow: 'The app',
      title: 'Everything it measures, on your phone',
      description:
        'The free app comes with the device. Premium interprets the data and turns it into messages from your plant.',
      tabsLabel: 'App versions',
      free: {
        tab: 'Free app',
        badge: 'Included with your Flory',
        title: 'You see what is going on',
        description: 'Your plant’s current status, the four readings and a basic history.',
        bullets: ['Current status for every plant', 'The four readings, live', 'Basic history and alerts'],
        shots: [
          { alt: 'App home screen showing today’s plant status', caption: 'Today' },
          { alt: 'List of plants with their linked sensors', caption: 'Your plants' },
          { alt: 'Alerts screen with notifications per plant', caption: 'Alerts' },
        ],
      },
      premium: {
        tab: 'With Premium',
        badge: 'Flory Premium',
        title: 'Your plant talks to you',
        description:
          'Premium turns every reading into a first-person sentence: “I’m thirsty”, “I’m getting too little light”, “Don’t water me yet”.',
        bullets: [
          'Every reading turned into a sentence',
          'Chat with your plant whenever you want',
          'Photo diagnosis for pests and dry leaves',
        ],
        shots: [
          { alt: 'Home screen with a first-person message from the plant', caption: 'It talks' },
          { alt: 'Chat conversation between the owner and their plant', caption: 'Conversation' },
          { alt: 'Diagnosis of a pest detected from a photo', caption: 'Diagnosis' },
          { alt: 'History of diagnoses with before and after', caption: 'History' },
        ],
      },
    },
    pricing: {
      eyebrow: 'Pricing',
      title: 'Choose your Flory',
      description: 'Leave your email to access the special launch price.',
      mostPopular: 'Most popular',
      oneTime: 'one-time payment',
      regularPriceLabel: 'Regular price',
      launchOffer: 'Offer for leaving your email',
      eachDevice: 'per device',
      plans: [
        {
          name: 'Flory',
          tagline: 'The device and the free app.',
          offerDetail: '1 device at the launch price.',
          features: ['1 Flory device', 'Free app forever', 'Basic history'],
        },
        {
          name: 'Flory + Premium',
          tagline: 'With 12 months of interpretation included.',
          offerDetail: 'Discounted device + 12 months of Premium.',
          features: ['1 Flory device', '12 months of Flory Premium', 'Your plant talks to you'],
        },
        {
          name: 'Flory Casa',
          tagline: 'Three devices for the whole house.',
          offerDetail: '3 devices at the launch price.',
          features: ['3 Flory devices', 'Free app forever', 'Basic history'],
        },
      ],
      cta: 'Access the offer',
      note: 'Offer for people who leave their email. Prices in Chilean pesos, VAT included.',
    },
    quiero: {
      meta: {
        title: 'Choose your Flory · Flory',
        description: 'Choose the Flory you want and we will let you know as soon as it is available.',
      },
      back: 'Back to homepage',
      eyebrow: 'Step 1 of 2',
      title: 'Choose your Flory 🌱',
      description: 'Choose your model and leave your email to access the launch price.',
      availability: {
        badge: 'Coming soon',
        manufacturingTitle: 'We are manufacturing the first batch.',
        manufacturingText: 'It is not for sale yet.',
        emailTitle: 'Each device is',
        emailText: 'when you leave your email. We will notify you when it is available to buy.',
      },
      mostPopular: 'Most popular',
      oneTime: 'one-time payment',
      plans: [
        {
          name: 'Flory',
          description: 'One device and the free app.',
          offerDetail: '1 device at the launch price.',
          features: [
            '1 Flory device',
            'Free app forever',
            'Soil moisture, light, temperature and ambient humidity',
            'Basic history',
          ],
          cta: 'I want this offer',
        },
        {
          name: 'Flory + Premium',
          description: 'The device with 12 months of smart interpretation.',
          offerDetail: 'Discounted device + 12 months of Premium.',
          features: [
            '1 Flory device',
            '12 months of Flory Premium',
            'Smart interpretation of every reading',
            'Alerts and recommendations',
            'Your plant talks in first person',
          ],
          cta: 'I want this offer',
        },
        {
          name: 'Flory Casa',
          description: 'Three devices for the living room, the kitchen and the bedroom.',
          offerDetail: '3 devices at the launch price.',
          features: [
            '3 Flory devices',
            'Free app forever',
            'Soil moisture, light, temperature and ambient humidity',
            'Basic history',
          ],
          cta: 'I want this offer',
        },
      ],
      premiumNotePrefix: 'After the 12 months, Flory Premium continues at ',
      premiumNoteSuffix: ' per month and you can cancel whenever you want.',
      disclaimer: 'Leaving your email gives you access to the launch price. It is not a purchase or reservation.',
    },
    lead: {
      eyebrow: 'Step 2 of 2',
      title: 'Where should we notify you?',
      description: 'Leave your email to access the offer. We will write as soon as Flory is available to buy.',
      selectedLabel: 'The model you are interested in',
      change: 'Change',
      emailLabel: 'Email',
      emailPlaceholder: 'you@email.com',
      nameLabel: 'Name',
      nameOptional: 'optional',
      namePlaceholder: 'What should we call you?',
      submit: 'Access the offer',
      submitting: 'Sending…',
      errorEmail: 'Check the email, something seems to be missing.',
      errorNetwork: 'We could not save your email. Please try again.',
      privacy: 'Your email records the offer, but this is not a purchase or reservation. Nothing is charged now.',
    },
    gracias: {
      meta: {
        title: 'You’re in! · Flory',
        description: 'We will let you know when Flory is available.',
      },
      title: 'Your offer is registered!',
      description: 'As soon as Flory is available to buy, you will receive an email and we will honor your launch price.',
      emailPrefix: 'We will send the message to',
      offerPrefix: 'Your launch price',
      note: 'You have not bought or reserved anything. Nothing is being charged at this stage.',
      back: 'Back to homepage',
      alt: 'Flory beside a purple heart',
    },
    faq: {
      eyebrow: 'FAQs',
      title: 'Common questions',
      items: [
        {
          question: 'Can I buy it already?',
          answer:
            'Not yet. We are measuring how many people want one before manufacturing the first batch. Leave us your email and you will be among the first to know when it is available.',
        },
        {
          question: 'Do I need Wi-Fi?',
          answer:
            'Yes. Flory connects to your home Wi-Fi and sends the readings to the app. If the connection drops, it stores the readings and syncs them once it is back.',
        },
        {
          question: 'What is the difference between the free app and Premium?',
          answer:
            'The free app shows the current status, the four readings and a basic history. Premium interprets that data and turns it into concrete messages: “I’m thirsty”, “I’m getting too little light”, “Don’t water me yet”.',
        },
        {
          question: 'Does it work with any plant?',
          answer:
            'Yes. Flory recognizes more than 3,000 indoor and outdoor species. If it cannot identify one, it learns its rhythm in two weeks.',
        },
        {
          question: 'Can it get wet?',
          answer:
            'Yes. The body withstands daily watering and rain, so it can stay on the balcony or in the garden all year.',
        },
      ],
    },
    cta: {
      title: ['Be one of the first', 'to have Flory.'],
      description:
        'We are validating interest before manufacturing the first batch. Leave us your email and we will tell you as soon as it is available.',
      primary: 'I want one',
      secondary: 'I have a question',
    },
    footer: {
      description: 'PlantTech made in Chile. Sensors that listen, AI that translates.',
      columns: [
        { title: 'Product', links: ['How it works', 'What it measures', 'The app', 'Pricing'] },
        { title: 'Help', links: ['FAQs', 'Contact', 'Shipping', 'Care guides'] },
        { title: 'Flory', links: ['About us', 'Blog', 'Work with us', 'Press'] },
      ],
      copyright: 'Made with care in Santiago.',
      terms: 'Terms',
      privacy: 'Privacy',
    },
  },
  pt: {
    meta: {
      title: 'Flory · Sua planta diz o que precisa',
      description:
        'Flory monitora a umidade do solo, a luz, a temperatura e a umidade do ar, e ajuda você a entender o que sua planta precisa. PlantTech feita no Chile.',
    },
    language: { label: 'Idioma' },
    nav: {
      links: ['Como funciona', 'O que mede', 'O app', 'Preços', 'Dúvidas'],
      cta: 'Eu quero',
      homeLabel: 'Flory, ir para o início',
      openMenu: 'Abrir menu',
      closeMenu: 'Fechar menu',
    },
    hero: {
      title: ['Sua planta diz', 'o que precisa.'],
      description:
        'Flory monitora sua planta e ajuda você a entender quando ela precisa de água, luz ou melhores condições para crescer.',
      primaryCta: 'Eu quero',
      secondaryCta: 'Veja como funciona',
      waterStatus: 'Precisa de água',
      waterTip: 'Meio copo e pronto',
      sunValue: '4,5 h de sol',
      sunTip: 'Exatamente o que precisa',
      deviceAlt: 'Sensor Flory colocado na terra de um vaso',
    },
    steps: {
      eyebrow: 'Como funciona',
      title: 'Três passos e sua planta deixa de ser um mistério',
      items: [
        {
          alt: 'Flory acenando ao lado de um vaso',
          title: 'Coloque o Flory na sua planta',
          text: 'O dispositivo vai direto no vaso. Sem cabos e sem nada estranho para configurar.',
        },
        {
          alt: 'Flory pensando com um ponto de interrogação',
          title: 'Flory monitora',
          text: 'Mede umidade do solo, luz, temperatura e umidade do ar, e envia tudo para o app por Wi-Fi.',
        },
        {
          alt: 'Flory regando com um regador',
          title: 'Entenda sua planta',
          text: 'O app mostra tudo. Com o Premium, ele também diz o que fazer e quando.',
        },
      ],
    },
    metrics: {
      eyebrow: 'O que mede',
      title: 'Quatro sinais, uma resposta',
      tabsLabel: 'Sinais medidos pelo Flory',
      imageAlt: 'Sensor Flory em um vaso de terracota ao lado de uma jiboia',
      items: [
        {
          label: 'Água',
          value: '38% de umidade',
          description:
            'Medimos a umidade real do substrato, não apenas da superfície, e avisamos antes que sua planta comece a sofrer.',
        },
        {
          label: 'Luz',
          value: '4,5 h de sol',
          description:
            'Contamos as horas de luz útil que sua planta recebe e dizemos se vale a pena movê-la meio metro.',
        },
        {
          label: 'Umidade',
          value: '54% do ar',
          description:
            'Acompanhamos a umidade do ar, que é o que resseca as pontas das folhas quando o ambiente fica muito seco.',
        },
        {
          label: 'Temperatura',
          value: '21 °C',
          description:
            'Acompanhamos o clima em cada canto da casa e avisamos quando uma corrente de ar está estressando sua planta.',
        },
      ],
      plainTitle: 'Sempre em linguagem simples',
      plainText: 'Nada de gráficos para decifrar. Flory transforma cada leitura em uma orientação clara para você seguir hoje.',
    },
    app: {
      eyebrow: 'O app',
      title: 'Tudo o que ele mede, no seu celular',
      description:
        'O app grátis vem junto com o dispositivo. O Premium interpreta os dados e os transforma em mensagens da sua planta.',
      tabsLabel: 'Versões do app',
      free: {
        tab: 'App grátis',
        badge: 'Incluído com seu Flory',
        title: 'Você vê o que está acontecendo',
        description: 'O estado atual da sua planta, as quatro medições e o histórico básico.',
        bullets: ['Estado atual de cada planta', 'As quatro medições ao vivo', 'Histórico básico e avisos'],
        shots: [
          { alt: 'Tela inicial do app com o estado do dia', caption: 'Hoje' },
          { alt: 'Lista de plantas com seus sensores vinculados', caption: 'Suas plantas' },
          { alt: 'Tela de avisos com alertas por planta', caption: 'Avisos' },
        ],
      },
      premium: {
        tab: 'Com Premium',
        badge: 'Flory Premium',
        title: 'Sua planta fala com você',
        description:
          'O Premium transforma cada medição em uma frase na primeira pessoa: «Estou com sede», «Estou recebendo pouca luz», «Não me regue ainda».',
        bullets: [
          'Cada leitura virando uma frase',
          'Conversa com sua planta quando quiser',
          'Diagnóstico por foto de pragas e folhas secas',
        ],
        shots: [
          { alt: 'Tela inicial com uma mensagem da planta na primeira pessoa', caption: 'Ela fala' },
          { alt: 'Conversa de chat entre a pessoa e sua planta', caption: 'Conversa' },
          { alt: 'Diagnóstico de uma praga detectada por foto', caption: 'Diagnóstico' },
          { alt: 'Histórico de diagnósticos com antes e depois', caption: 'Histórico' },
        ],
      },
    },
    pricing: {
      eyebrow: 'Preços',
      title: 'Escolha seu Flory',
      description: 'Deixe seu e-mail para acessar o preço especial de lançamento.',
      mostPopular: 'Mais popular',
      oneTime: 'pagamento único',
      regularPriceLabel: 'Preço normal',
      launchOffer: 'Oferta ao deixar seu e-mail',
      eachDevice: 'por dispositivo',
      plans: [
        {
          name: 'Flory',
          tagline: 'O dispositivo e o app grátis.',
          offerDetail: '1 dispositivo pelo preço de lançamento.',
          features: ['1 dispositivo Flory', 'App grátis para sempre', 'Histórico básico'],
        },
        {
          name: 'Flory + Premium',
          tagline: 'Com 12 meses de interpretação incluídos.',
          offerDetail: 'Dispositivo em oferta + 12 meses de Premium.',
          features: ['1 dispositivo Flory', '12 meses de Flory Premium', 'Sua planta fala com você'],
        },
        {
          name: 'Flory Casa',
          tagline: 'Três dispositivos para a casa toda.',
          offerDetail: '3 dispositivos pelo preço de lançamento.',
          features: ['3 dispositivos Flory', 'App grátis para sempre', 'Histórico básico'],
        },
      ],
      cta: 'Quero acessar a oferta',
      note: 'Oferta para quem deixa o e-mail. Preços em pesos chilenos, IVA incluído.',
    },
    quiero: {
      meta: {
        title: 'Escolha seu Flory · Flory',
        description: 'Escolha o Flory que você quer e avisamos assim que estiver disponível.',
      },
      back: 'Voltar ao início',
      eyebrow: 'Passo 1 de 2',
      title: 'Escolha seu Flory 🌱',
      description: 'Escolha seu modelo e deixe seu e-mail para acessar o preço de lançamento.',
      availability: {
        badge: 'Em breve',
        manufacturingTitle: 'Estamos fabricando o primeiro lote.',
        manufacturingText: 'Ainda não está à venda.',
        emailTitle: 'Cada dispositivo fica por',
        emailText: 'ao deixar seu e-mail. Avisaremos quando estiver disponível para comprar.',
      },
      mostPopular: 'Mais popular',
      oneTime: 'pagamento único',
      plans: [
        {
          name: 'Flory',
          description: 'Um dispositivo e o app grátis.',
          offerDetail: '1 dispositivo pelo preço de lançamento.',
          features: [
            '1 dispositivo Flory',
            'App grátis para sempre',
            'Umidade do solo, luz, temperatura e umidade do ar',
            'Histórico básico',
          ],
          cta: 'Quero esta oferta',
        },
        {
          name: 'Flory + Premium',
          description: 'O dispositivo com 12 meses de interpretação inteligente.',
          offerDetail: 'Dispositivo em oferta + 12 meses de Premium.',
          features: [
            '1 dispositivo Flory',
            '12 meses de Flory Premium',
            'Interpretação inteligente de cada leitura',
            'Alertas e recomendações',
            'Sua planta fala na primeira pessoa',
          ],
          cta: 'Quero esta oferta',
        },
        {
          name: 'Flory Casa',
          description: 'Três dispositivos para a sala, a cozinha e o quarto.',
          offerDetail: '3 dispositivos pelo preço de lançamento.',
          features: [
            '3 dispositivos Flory',
            'App grátis para sempre',
            'Umidade do solo, luz, temperatura e umidade do ar',
            'Histórico básico',
          ],
          cta: 'Quero esta oferta',
        },
      ],
      premiumNotePrefix: 'Depois dos 12 meses, o Flory Premium continua a ',
      premiumNoteSuffix: ' por mês e você cancela quando quiser.',
      disclaimer: 'Deixar seu e-mail dá acesso ao preço de lançamento. Não é uma compra nem uma reserva.',
    },
    lead: {
      eyebrow: 'Passo 2 de 2',
      title: 'Onde avisamos você?',
      description: 'Deixe seu e-mail para acessar a oferta. Escreveremos assim que o Flory estiver disponível para comprar.',
      selectedLabel: 'O modelo que interessa a você',
      change: 'Alterar',
      emailLabel: 'E-mail',
      emailPlaceholder: 'voce@email.com',
      nameLabel: 'Nome',
      nameOptional: 'opcional',
      namePlaceholder: 'Como chamamos você?',
      submit: 'Quero acessar a oferta',
      submitting: 'Enviando…',
      errorEmail: 'Confira o e-mail, parece que falta algo.',
      errorNetwork: 'Não conseguimos salvar seu e-mail. Tente de novo.',
      privacy: 'Seu e-mail registra a oferta, mas não é uma compra nem uma reserva. Nada é cobrado agora.',
    },
    gracias: {
      meta: {
        title: 'Você está dentro! · Flory',
        description: 'Avisamos quando o Flory estiver disponível.',
      },
      title: 'Sua oferta foi registrada!',
      description: 'Assim que o Flory estiver disponível para comprar, você receberá um e-mail e respeitaremos seu preço de lançamento.',
      emailPrefix: 'Enviaremos a mensagem para',
      offerPrefix: 'Seu preço de lançamento',
      note: 'Você não comprou nem reservou nada. Nesta etapa não cobramos.',
      back: 'Voltar ao início',
      alt: 'Flory ao lado de um coração roxo',
    },
    faq: {
      eyebrow: 'Dúvidas',
      title: 'O que mais nos perguntam',
      items: [
        {
          question: 'Já posso comprar?',
          answer:
            'Ainda não. Estamos medindo quantas pessoas querem um antes de fabricar o primeiro lote. Deixe seu e-mail e você será um dos primeiros a saber quando estiver disponível.',
        },
        {
          question: 'Preciso de Wi-Fi?',
          answer:
            'Sim. O Flory se conecta ao Wi-Fi da sua casa e envia as medições para o app. Se a conexão cair, ele guarda as leituras e sincroniza quando voltar.',
        },
        {
          question: 'Qual é a diferença entre o app grátis e o Premium?',
          answer:
            'O app grátis mostra o estado atual, as quatro medições e o histórico básico. O Premium interpreta esses dados e os transforma em mensagens concretas: «Estou com sede», «Estou recebendo pouca luz», «Não me regue ainda».',
        },
        {
          question: 'Funciona com qualquer planta?',
          answer:
            'Sim. Flory reconhece mais de 3.000 espécies de ambientes internos e externos. Se não conseguir identificar alguma, aprende seu ritmo em duas semanas.',
        },
        {
          question: 'Pode molhar?',
          answer:
            'Sim. O corpo resiste à rega diária e à chuva, então pode ficar na varanda ou no jardim o ano inteiro.',
        },
      ],
    },
    cta: {
      title: ['Seja um dos primeiros', 'a ter o Flory.'],
      description:
        'Estamos validando o interesse antes de fabricar o primeiro lote. Deixe seu e-mail e avisamos assim que estiver disponível.',
      primary: 'Eu quero',
      secondary: 'Tenho uma dúvida',
    },
    footer: {
      description: 'PlantTech feita no Chile. Sensores que escutam, IA que traduz.',
      columns: [
        { title: 'Produto', links: ['Como funciona', 'O que mede', 'O app', 'Preços'] },
        { title: 'Ajuda', links: ['Dúvidas', 'Contato', 'Envios', 'Guias de cuidado'] },
        { title: 'Flory', links: ['Sobre nós', 'Blog', 'Trabalhe conosco', 'Imprensa'] },
      ],
      copyright: 'Feito com carinho em Santiago.',
      terms: 'Termos',
      privacy: 'Privacidade',
    },
  },
} as const

export type Language = keyof typeof translations

type I18nContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  copy: (typeof translations)[Language]
}

const I18nContext = createContext<I18nContextValue | null>(null)
const storageKey = 'flory-language'

function isLanguage(value: string | null): value is Language {
  return value === 'en' || value === 'es' || value === 'pt'
}

function getInitialLanguage(): Language {
  try {
    const stored = localStorage.getItem(storageKey)
    // Español por defecto: la validación se hace con tráfico chileno.
    return isLanguage(stored) ? stored : 'es'
  } catch {
    return 'es'
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setCurrentLanguage] = useState<Language>(getInitialLanguage)
  const copy = translations[language]

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : language
    try {
      localStorage.setItem(storageKey, language)
    } catch {
      // Modo privado: seguimos sin persistir el idioma.
    }
  }, [language])

  const setLanguage = (nextLanguage: Language) => {
    startTransition(() => setCurrentLanguage(nextLanguage))
  }

  return <I18nContext.Provider value={{ language, setLanguage, copy }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used inside I18nProvider')
  return context
}

/**
 * El título y la descripción los fija cada página, no el provider: con
 * rutas distintas el provider pisaría el título de /quiero-flory al
 * cambiar de idioma.
 */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [description, title])
}
