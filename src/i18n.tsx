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
 * Los precios NO viven aquí: están en `src/lib/pricing.ts`. Aquí solo van
 * las etiquetas ("al mes", "al año", "para siempre").
 *
 * Regla de honestidad: este copy solo describe lo que la app hace hoy o lo
 * que cada plan compromete de forma explícita (los planes Plus y Sensor se
 * muestran como "Próximamente" mientras no se puedan contratar).
 */
const translations = {
  es: {
    meta: {
      title: 'Flory · App para cuidar tus plantas y saber cuándo regarlas',
      description:
        'Identifica tu planta con una foto, recibe su calendario de riego y diagnostica sus problemas. App chilena de cuidado de plantas, gratis en el App Store.',
    },
    language: { label: 'Idioma' },
    nav: {
      links: ['Cómo funciona', 'Qué hace', 'La app', 'Precios', 'Dudas'],
      cta: 'Empezar gratis',
      homeLabel: 'Flory, ir al inicio',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
    },
    hero: {
      badge: 'Ya disponible en App Store',
      title: ['Tu planta te dice', 'lo que necesita.'],
      description:
        'Identifícala con una foto, sabe cuándo regarla y conversa con ella cuando quieras. Todo desde la app.',
      primaryCta: 'Descargar para iPhone',
      androidCta: 'Android',
      comingSoon: 'Pronto',
      secondaryCta: 'Ver cómo funciona',
      identifyLabel: 'Identificada por foto',
      identifyValue: 'Potus',
      waterLabel: 'Próximo riego',
      waterValue: 'En 2 días',
      appAlt: 'Pantalla de la app Flory con el estado del día de una planta',
    },
    steps: {
      eyebrow: 'Cómo funciona',
      title: 'Tres pasos y tu planta deja de ser un misterio',
      items: [
        {
          alt: 'Flory saludando junto a una maceta',
          title: 'Agrega tu planta',
          text: 'Tómale una foto y Flory identifica la especie. Si prefieres, la buscas en el catálogo de 206 especies chilenas.',
        },
        {
          alt: 'Flory pensando con un signo de interrogación',
          title: 'Cuéntale dónde vive',
          text: 'Interior o exterior, la luz que recibe y cómo es su maceta. Con eso calcula su ritmo de riego.',
        },
        {
          alt: 'Flory regando con una regadera',
          title: 'Entiende cómo está',
          text: 'Cada día ves su estado, registras el riego y ella te cuenta en primera persona cómo se siente.',
        },
      ],
    },
    features: {
      eyebrow: 'Qué hace',
      title: 'Lo que Flory hace por tus plantas',
      description: 'Sin tablas ni tecnicismos. Cada función existe para que sepas qué hacer hoy.',
      items: [
        {
          title: 'Identifícala con una foto',
          text: 'Le tomas una foto y Flory reconoce la especie. También puedes buscarla en el catálogo.',
        },
        {
          title: 'Te dice cuándo regar',
          text: 'Calcula el ritmo de riego según la especie y el entorno real de tu planta, no una regla genérica.',
        },
        {
          title: 'Tu planta te habla',
          text: 'Su estado se resume en tres niveles (bien, atención, urgente) y te lo cuenta en primera persona.',
        },
        {
          title: 'Diagnostica con una foto',
          text: 'Le sacas una foto a una hoja o una plaga y recibes causa probable, qué hacer y en qué plazo.',
        },
        {
          title: 'Conversa cuando quieras',
          text: 'Chateas con cada planta y responde considerando su especie, su estado y sus diagnósticos recientes.',
        },
        {
          title: 'Ajusta según la cuidas',
          text: 'Le dices cómo encontraste la tierra y corrige su ritmo de riego, explicándote por qué lo cambió.',
        },
        {
          title: 'Pensada para Chile',
          text: 'Catálogo de 206 especies chilenas, de interior y exterior, con datos de toxicidad para mascotas.',
        },
      ],
      plainTitle: 'Y siempre en cristiano',
      plainText:
        'Nada de gráficas que hay que interpretar. Flory traduce el estado de tu planta a una frase que puedes seguir hoy.',
    },
    app: {
      eyebrow: 'La app',
      title: 'Así se ve Flory',
      description: 'Tus plantas, su estado y sus diagnósticos. Funciona incluso sin conexión con la última información guardada.',
      shots: [
        { alt: 'Pantalla Hoy con el estado de la planta y su próximo riego', caption: 'Hoy' },
        { alt: 'Listado con todas tus plantas y su estado', caption: 'Tus plantas' },
        { alt: 'Ficha de una planta con su ritmo de riego e historial', caption: 'Ficha' },
        { alt: 'Conversación de chat entre la persona y su planta', caption: 'Chat' },
        { alt: 'Resultado de un diagnóstico hecho por fotografía', caption: 'Diagnóstico' },
        { alt: 'Identificación de una especie a partir de una fotografía', caption: 'Identificación' },
      ],
    },
    sensor: {
      eyebrow: 'El sensor',
      badge: 'Llega en diciembre',
      title: 'Y en diciembre, el sensor',
      description:
        'La app funciona hoy por sí sola. En diciembre llega el sensor opcional que se clava en la maceta y mide la humedad del suelo para afinar todavía más el ritmo de riego.',
      bullets: ['Opcional: la app funciona sin él', 'Se clava directo en la maceta', 'Disponible en diciembre'],
      cta: 'Avísame del sensor',
      note: 'Deja tu correo y te avisamos cuando esté.',
      alt: 'Sensor Flory clavado en la tierra de una maceta',
    },
    pricing: {
      eyebrow: 'Precios',
      title: 'Elige tu plan',
      description: 'Free ya está listo. Plus y Sensor llegan pronto.',
      mostPopular: 'Más elegido',
      comingSoon: 'Próximamente',
      perMonth: 'al mes',
      forever: 'para siempre',
      priceFrom: 'desde',
      priceFromNote: '* El plan Sensor parte desde $5.990 al mes, con el sensor físico incluido.',
      annualSuffix: 'al año, equivalente a dos meses gratis.',
      plans: [
        {
          name: 'Free',
          tagline: 'Para empezar a cuidar tus primeras plantas.',
          features: [
            '2 plantas.',
            'Chat básico con tu planta.',
            '3 diagnósticos por fotografía al mes.',
            'Historial básico de diagnósticos.',
            'Recomendaciones básicas.',
            'Calendario de riego.',
            'Notificaciones básicas.',
          ],
          cta: 'Empezar gratis',
        },
        {
          name: 'Plus',
          tagline: 'Para quienes tienen varias plantas en casa.',
          features: [
            'Plantas ilimitadas.',
            'Chat avanzado con tu planta.',
            '15 diagnósticos por fotografía al mes.',
            'Historial completo de diagnósticos.',
            'Recomendaciones personalizadas.',
            'Calendario de riego adaptativo.',
            'Notificaciones personalizadas.',
          ],
          cta: 'Avísame cuando esté',
        },
        {
          name: 'Sensor',
          tagline: 'La experiencia completa, con el sensor físico incluido.',
          features: [
            'Sensor físico incluido.',
            'Todo lo incluido en Plus.',
            'Chat avanzado con contexto del sensor.',
            '30 diagnósticos por fotografía al mes.',
            'Evolución de tu planta por fotos.',
            'Calendario de riego basado en el sensor.',
            'Notificaciones predictivas.',
            'Flory Score.',
            'Monitoreo 24/7.',
            'Predicciones con IA.',
          ],
          cta: 'Avísame cuando esté',
        },
      ],
      comparison: {
        title: 'Comparación',
        featureLabel: 'Característica',
        includedLabel: 'Incluido',
        notIncludedLabel: 'No incluido',
        monthlyPriceLabel: 'Precio mensual',
        annualPriceLabel: 'Precio anual',
        rows: [
          { label: 'Plantas', values: ['2', 'Ilimitadas', 'Ilimitadas'] },
          { label: 'Chat', values: ['Básico', 'Avanzado', 'Avanzado + contexto sensor'] },
          { label: 'Diagnósticos', values: ['3/mes', '15/mes', '30/mes'] },
          { label: 'Historial diagnósticos', values: ['Básico', 'Completo', 'Completo'] },
          { label: 'Evolución por fotos', values: ['✗', '✗', '✓'] },
          { label: 'Recomendaciones personalizadas', values: ['Básicas', '✓', '✓'] },
          { label: 'Calendario de riego', values: ['✓', '✓ adaptativo', '✓ basado en sensor'] },
          { label: 'Notificaciones', values: ['Básicas', 'Personalizadas', 'Predictivas'] },
          { label: 'Flory Score', values: ['✗', '✗', '✓'] },
          { label: 'Monitoreo', values: ['✗', '✗', '24/7'] },
          { label: 'Predicciones IA', values: ['✗', '✗', '✓'] },
          { label: 'Sensor físico', values: ['✗', '✗', 'Incluido'] },
        ],
      },
      founding: {
        badge: 'Beneficio de fundador',
        title: 'Quienes llegan primero se quedan con más',
        description:
          'Quienes se registren durante el periodo de lanzamiento recibirán acceso ampliado como agradecimiento por ayudarnos a construir Flory.',
      },
      openPeriodNote: 'Durante el periodo de lanzamiento, el plan Free tiene límites ampliados.',
      cta: 'Empezar gratis',
      note: 'Precios en pesos chilenos, IVA incluido. Plus y Sensor todavía no están disponibles para contratar.',
    },
    quiero: {
      meta: {
        title: 'Elige tu plan · Flory',
        description: 'Elige tu plan de Flory y te avisamos apenas puedas empezar.',
      },
      back: 'Volver al inicio',
      eyebrow: 'Paso 1 de 2',
      title: 'Elige tu plan 🌱',
      description: 'Free ya está listo. Plus y Sensor llegan pronto: déjanos tu correo y te avisamos.',
      availability: {
        badge: 'Periodo de lanzamiento',
        launchTitle: 'Flory está en periodo de lanzamiento.',
        launchText: 'Déjanos tu correo y te avisamos apenas puedas empezar.',
        freeTitle: 'El plan Free es gratis para siempre.',
        freeText: 'Durante el lanzamiento, además, tiene límites ampliados.',
      },
      mostPopular: 'Más elegido',
      disclaimer: 'Dejar tu correo no es una compra ni un cobro. Solo lo usamos para avisarte.',
    },
    lead: {
      eyebrow: 'Paso 2 de 2',
      title: '¿Dónde te avisamos?',
      description: 'Déjanos tu correo y te escribimos apenas puedas empezar a usar Flory.',
      selectedLabel: 'El plan que te interesa',
      change: 'Cambiar',
      emailLabel: 'Correo',
      emailPlaceholder: 'tu@correo.cl',
      nameLabel: 'Nombre',
      nameOptional: 'opcional',
      namePlaceholder: '¿Cómo te llamamos?',
      submit: 'Quiero que me avisen',
      submitting: 'Enviando…',
      errorEmail: 'Revisa el correo, parece que le falta algo.',
      errorNetwork: 'No pudimos guardar tu correo. Inténtalo de nuevo.',
      privacy: 'Tu correo solo se usa para avisarte. No es una compra y no se cobra nada.',
    },
    gracias: {
      meta: {
        title: '¡Estás dentro! · Flory',
        description: 'Te avisaremos apenas puedas empezar a usar Flory.',
      },
      title: '¡Estás en la lista!',
      description: 'Te escribiremos apenas puedas empezar a usar Flory. Serás de los primeros en entrar.',
      emailPrefix: 'Enviaremos el aviso a',
      planPrefix: 'Tu plan',
      note: 'No has comprado nada. En esta etapa no se cobra.',
      back: 'Volver al inicio',
      alt: 'Flory junto a un corazón morado',
    },
    faq: {
      eyebrow: 'Dudas',
      title: 'Lo que nos preguntan',
      items: [
        {
          question: '¿Flory es gratis?',
          answer:
            'Sí. El plan Free te deja cuidar dos plantas con su calendario de riego, identificación por foto, chat y diagnósticos, sin pagar nada. Plus y Sensor son planes de mayor capacidad que todavía no están disponibles para contratar.',
        },
        {
          question: '¿Necesito el sensor para usar la app?',
          answer:
            'No. Hoy Flory funciona solo con la app: identifica tu planta con una foto y calcula su ritmo de riego según su especie y su entorno. El sensor es un complemento opcional que llega más adelante.',
        },
        {
          question: '¿Cuándo llega el sensor?',
          answer:
            'En diciembre. Servirá para medir la humedad del suelo y afinar el riego, pero la app seguirá funcionando igual sin él.',
        },
        {
          question: '¿Qué diferencia hay entre Free, Plus y Sensor?',
          answer:
            'La capacidad y el sensor. Free es para dos plantas y tres diagnósticos al mes. Plus tiene plantas ilimitadas, quince diagnósticos y recomendaciones personalizadas. Sensor incluye el sensor físico, treinta diagnósticos, monitoreo 24/7, Flory Score y predicciones con IA.',
        },
        {
          question: '¿Funciona con cualquier planta?',
          answer:
            'Tenemos un catálogo de 206 especies chilenas con sus cuidados. Si tu planta no está, Flory igual la cuida con cuidados aproximados y te lo indica claramente en su ficha.',
        },
      ],
    },
    cta: {
      title: ['Empieza a cuidar', 'tu primera planta.'],
      description:
        'Flory está en periodo de lanzamiento. Déjanos tu correo y te avisamos apenas puedas empezar a usarla.',
      primary: 'Empezar gratis',
      secondary: 'Tengo una duda',
    },
    legal: {
      terms: {
        meta: {
          title: 'Términos de Uso · Flory',
          description: 'Términos de Uso de Flory, operado por Tame SpA en Santiago de Chile.',
        },
      },
      privacy: {
        meta: {
          title: 'Política de Privacidad · Flory',
          description: 'Qué datos trata Flory, con qué proveedores se comparten y cómo ejercer tus derechos.',
        },
      },
      deleteAccount: {
        meta: {
          title: 'Eliminar tu cuenta · Flory',
          description: 'Cómo eliminar tu cuenta de Flory y qué datos se borran.',
        },
      },
      index: 'Contenido',
      spanishOnly: 'Este documento está disponible solo en español: está redactado conforme a la legislación chilena.',
      back: 'Volver al inicio',
    },
    footer: {
      description: 'PlantTech hecha en Chile. Una app que entiende tus plantas.',
      columns: [
        { title: 'Producto', links: ['Cómo funciona', 'Qué hace', 'La app', 'Precios'] },
        { title: 'Ayuda', links: ['Dudas', 'Contacto', 'Guías de cuidado', 'El sensor'] },
        { title: 'Flory', links: ['Sobre nosotros', 'Blog', 'Trabaja con nosotros', 'Prensa'] },
      ],
      copyright: 'Hecho con cariño en Santiago.',
      terms: 'Términos',
      privacy: 'Privacidad',
      deleteAccount: 'Eliminar cuenta',
    },
  },
  en: {
    meta: {
      title: 'Flory · Plant care app: know when to water your plants',
      description:
        'Identify your plant from a photo, get its watering schedule and diagnose its problems. A plant care app made in Chile, free on the App Store.',
    },
    language: { label: 'Language' },
    nav: {
      links: ['How it works', 'What it does', 'The app', 'Pricing', 'FAQs'],
      cta: 'Start free',
      homeLabel: 'Flory, go to homepage',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    hero: {
      badge: 'Now available on the App Store',
      title: ['Your plant tells you', 'what it needs.'],
      description:
        'Identify it from a photo, know when to water it and chat with it whenever you want. All from the app.',
      primaryCta: 'Download for iPhone',
      androidCta: 'Android',
      comingSoon: 'Coming soon',
      secondaryCta: 'See how it works',
      identifyLabel: 'Identified from a photo',
      identifyValue: 'Pothos',
      waterLabel: 'Next watering',
      waterValue: 'In 2 days',
      appAlt: 'Flory app screen showing a plant’s status for today',
    },
    steps: {
      eyebrow: 'How it works',
      title: 'Three steps and your plant stops being a mystery',
      items: [
        {
          alt: 'Flory waving beside a plant pot',
          title: 'Add your plant',
          text: 'Take a photo and Flory identifies the species. If you prefer, look it up in the catalogue of 206 Chilean species.',
        },
        {
          alt: 'Flory thinking with a question mark',
          title: 'Tell it where it lives',
          text: 'Indoors or outdoors, the light it gets and what its pot is like. With that it works out its watering rhythm.',
        },
        {
          alt: 'Flory watering with a watering can',
          title: 'Understand how it is doing',
          text: 'Every day you see its status, log the watering and it tells you in first person how it feels.',
        },
      ],
    },
    features: {
      eyebrow: 'What it does',
      title: 'What Flory does for your plants',
      description: 'No charts and no jargon. Every feature exists so you know what to do today.',
      items: [
        {
          title: 'Identify it from a photo',
          text: 'Take a photo and Flory recognises the species. You can also look it up in the catalogue.',
        },
        {
          title: 'It tells you when to water',
          text: 'It works out the watering rhythm from the species and your plant’s real surroundings, not a generic rule.',
        },
        {
          title: 'Your plant talks to you',
          text: 'Its status comes down to three levels (good, attention, urgent) and it tells you in first person.',
        },
        {
          title: 'Diagnose from a photo',
          text: 'Photograph a leaf or a pest and get the likely cause, what to do and how soon to do it.',
        },
        {
          title: 'Chat whenever you want',
          text: 'You chat with each plant and it answers considering its species, its status and its recent diagnoses.',
        },
        {
          title: 'It adapts to how you care',
          text: 'Tell it how you found the soil and it corrects the watering rhythm, explaining why it changed.',
        },
        {
          title: 'Built for Chile',
          text: 'A catalogue of 206 Chilean species, indoors and outdoors, with pet toxicity information.',
        },
      ],
      plainTitle: 'Plain language, always',
      plainText:
        'No charts to decipher. Flory turns your plant’s status into one clear sentence you can act on today.',
    },
    app: {
      eyebrow: 'The app',
      title: 'This is Flory',
      description: 'Your plants, their status and their diagnoses. It even works offline with the last saved information.',
      shots: [
        { alt: 'Today screen with the plant status and its next watering', caption: 'Today' },
        { alt: 'List of all your plants and their status', caption: 'Your plants' },
        { alt: 'Plant profile with its watering rhythm and history', caption: 'Profile' },
        { alt: 'Chat conversation between the owner and their plant', caption: 'Chat' },
        { alt: 'Result of a diagnosis made from a photo', caption: 'Diagnosis' },
        { alt: 'Species identification from a photograph', caption: 'Identification' },
      ],
    },
    sensor: {
      eyebrow: 'The sensor',
      badge: 'Arrives in December',
      title: 'And in December, the sensor',
      description:
        'The app already works on its own. In December the optional sensor arrives: it goes into the pot and measures soil moisture to fine-tune the watering rhythm even further.',
      bullets: ['Optional: the app works without it', 'Goes straight into the pot', 'Available in December'],
      cta: 'Notify me about the sensor',
      note: 'Leave your email and we will tell you when it is ready.',
      alt: 'Flory sensor placed in the soil of a plant pot',
    },
    pricing: {
      eyebrow: 'Pricing',
      title: 'Choose your plan',
      description: 'Free is ready. Plus and Sensor are coming soon.',
      mostPopular: 'Most popular',
      comingSoon: 'Coming soon',
      perMonth: 'per month',
      forever: 'forever',
      priceFrom: 'from',
      priceFromNote: '* The Sensor plan starts at $5,990 per month, with the physical sensor included.',
      annualSuffix: 'per year, the equivalent of two months free.',
      plans: [
        {
          name: 'Free',
          tagline: 'To start caring for your first plants.',
          features: [
            '2 plants.',
            'Basic chat with your plant.',
            '3 photo diagnoses per month.',
            'Basic diagnosis history.',
            'Basic recommendations.',
            'Watering calendar.',
            'Basic notifications.',
          ],
          cta: 'Start free',
        },
        {
          name: 'Plus',
          tagline: 'For people with several plants at home.',
          features: [
            'Unlimited plants.',
            'Advanced chat with your plant.',
            '15 photo diagnoses per month.',
            'Full diagnosis history.',
            'Personalised recommendations.',
            'Adaptive watering calendar.',
            'Personalised notifications.',
          ],
          cta: 'Notify me',
        },
        {
          name: 'Sensor',
          tagline: 'The full experience, with the physical sensor included.',
          features: [
            'Physical sensor included.',
            'Everything included in Plus.',
            'Advanced chat with sensor context.',
            '30 photo diagnoses per month.',
            'Photo-based plant evolution.',
            'Sensor-based watering calendar.',
            'Predictive notifications.',
            'Flory Score.',
            '24/7 monitoring.',
            'AI predictions.',
          ],
          cta: 'Notify me',
        },
      ],
      comparison: {
        title: 'Comparison',
        featureLabel: 'Feature',
        includedLabel: 'Included',
        notIncludedLabel: 'Not included',
        monthlyPriceLabel: 'Monthly price',
        annualPriceLabel: 'Annual price',
        rows: [
          { label: 'Plants', values: ['2', 'Unlimited', 'Unlimited'] },
          { label: 'Chat', values: ['Basic', 'Advanced', 'Advanced + sensor context'] },
          { label: 'Diagnoses', values: ['3/month', '15/month', '30/month'] },
          { label: 'Diagnosis history', values: ['Basic', 'Full', 'Full'] },
          { label: 'Photo-based evolution', values: ['✗', '✗', '✓'] },
          { label: 'Personalised recommendations', values: ['Basic', '✓', '✓'] },
          { label: 'Watering calendar', values: ['✓', '✓ adaptive', '✓ sensor-based'] },
          { label: 'Notifications', values: ['Basic', 'Personalised', 'Predictive'] },
          { label: 'Flory Score', values: ['✗', '✗', '✓'] },
          { label: 'Monitoring', values: ['✗', '✗', '24/7'] },
          { label: 'AI predictions', values: ['✗', '✗', '✓'] },
          { label: 'Physical sensor', values: ['✗', '✗', 'Included'] },
        ],
      },
      founding: {
        badge: 'Founder benefit',
        title: 'Those who arrive first keep more',
        description:
          'Everyone who signs up during the launch period will receive extended access as a thank you for helping us build Flory.',
      },
      openPeriodNote: 'During the launch period, the Free plan has extended limits.',
      cta: 'Start free',
      note: 'Prices in Chilean pesos, VAT included. Plus and Sensor are not available to purchase yet.',
    },
    quiero: {
      meta: {
        title: 'Choose your plan · Flory',
        description: 'Choose your Flory plan and we will tell you as soon as you can start.',
      },
      back: 'Back to homepage',
      eyebrow: 'Step 1 of 2',
      title: 'Choose your plan 🌱',
      description: 'Free is ready. Plus and Sensor are coming soon: leave your email and we will tell you.',
      availability: {
        badge: 'Launch period',
        launchTitle: 'Flory is in its launch period.',
        launchText: 'Leave your email and we will tell you as soon as you can start.',
        freeTitle: 'The Free plan is free forever.',
        freeText: 'During the launch it also comes with extended limits.',
      },
      mostPopular: 'Most popular',
      disclaimer: 'Leaving your email is not a purchase or a charge. We only use it to notify you.',
    },
    lead: {
      eyebrow: 'Step 2 of 2',
      title: 'Where should we notify you?',
      description: 'Leave your email and we will write as soon as you can start using Flory.',
      selectedLabel: 'The plan you are interested in',
      change: 'Change',
      emailLabel: 'Email',
      emailPlaceholder: 'you@email.com',
      nameLabel: 'Name',
      nameOptional: 'optional',
      namePlaceholder: 'What should we call you?',
      submit: 'Notify me',
      submitting: 'Sending…',
      errorEmail: 'Check the email, something seems to be missing.',
      errorNetwork: 'We could not save your email. Please try again.',
      privacy: 'Your email is only used to notify you. This is not a purchase and nothing is charged.',
    },
    gracias: {
      meta: {
        title: 'You’re in! · Flory',
        description: 'We will let you know as soon as you can start using Flory.',
      },
      title: 'You’re on the list!',
      description: 'We will write as soon as you can start using Flory. You will be among the first in.',
      emailPrefix: 'We will send the message to',
      planPrefix: 'Your plan',
      note: 'You have not bought anything. Nothing is charged at this stage.',
      back: 'Back to homepage',
      alt: 'Flory beside a purple heart',
    },
    faq: {
      eyebrow: 'FAQs',
      title: 'Common questions',
      items: [
        {
          question: 'Is Flory free?',
          answer:
            'Yes. The Free plan lets you care for two plants with their watering calendar, photo identification, chat and diagnoses, without paying anything. Plus and Sensor are higher-capacity plans that are not available to purchase yet.',
        },
        {
          question: 'Do I need the sensor to use the app?',
          answer:
            'No. Today Flory works with the app alone: it identifies your plant from a photo and works out its watering rhythm from its species and its surroundings. The sensor is an optional add-on arriving later.',
        },
        {
          question: 'When does the sensor arrive?',
          answer:
            'In December. It will measure soil moisture and fine-tune watering, but the app will keep working exactly the same without it.',
        },
        {
          question: 'What is the difference between Free, Plus and Sensor?',
          answer:
            'Capacity and the sensor. Free covers two plants and three diagnoses per month. Plus has unlimited plants, fifteen diagnoses and personalised recommendations. Sensor includes the physical sensor, thirty diagnoses, 24/7 monitoring, Flory Score and AI predictions.',
        },
        {
          question: 'Does it work with any plant?',
          answer:
            'We have a catalogue of 206 Chilean species with their care information. If your plant is not there, Flory still cares for it with approximate guidance and says so clearly on its profile.',
        },
      ],
    },
    cta: {
      title: ['Start caring for', 'your first plant.'],
      description:
        'Flory is in its launch period. Leave us your email and we will tell you as soon as you can start using it.',
      primary: 'Start free',
      secondary: 'I have a question',
    },
    legal: {
      terms: {
        meta: {
          title: 'Terms of Use · Flory',
          description: 'Flory Terms of Use, operated by Tame SpA in Santiago, Chile.',
        },
      },
      privacy: {
        meta: {
          title: 'Privacy Policy · Flory',
          description: 'What data Flory processes, which providers receive it and how to exercise your rights.',
        },
      },
      deleteAccount: {
        meta: {
          title: 'Delete your account · Flory',
          description: 'How to delete your Flory account and which data is erased.',
        },
      },
      index: 'Contents',
      spanishOnly: 'This document is only available in Spanish: it is written under Chilean law.',
      back: 'Back to home',
    },
    footer: {
      description: 'PlantTech made in Chile. An app that understands your plants.',
      columns: [
        { title: 'Product', links: ['How it works', 'What it does', 'The app', 'Pricing'] },
        { title: 'Help', links: ['FAQs', 'Contact', 'Care guides', 'The sensor'] },
        { title: 'Flory', links: ['About us', 'Blog', 'Work with us', 'Press'] },
      ],
      copyright: 'Made with care in Santiago.',
      terms: 'Terms',
      privacy: 'Privacy',
      deleteAccount: 'Delete account',
    },
  },
  pt: {
    meta: {
      title: 'Flory · App para cuidar das suas plantas e saber quando regar',
      description:
        'Identifique sua planta por foto, receba o calendário de rega e diagnostique os problemas dela. App chileno de cuidado de plantas, grátis na App Store.',
    },
    language: { label: 'Idioma' },
    nav: {
      links: ['Como funciona', 'O que faz', 'O app', 'Preços', 'Dúvidas'],
      cta: 'Começar grátis',
      homeLabel: 'Flory, ir para o início',
      openMenu: 'Abrir menu',
      closeMenu: 'Fechar menu',
    },
    hero: {
      badge: 'Já disponível na App Store',
      title: ['Sua planta diz', 'o que precisa.'],
      description:
        'Identifique por foto, saiba quando regar e converse com ela quando quiser. Tudo pelo app.',
      primaryCta: 'Baixar para iPhone',
      androidCta: 'Android',
      comingSoon: 'Em breve',
      secondaryCta: 'Veja como funciona',
      identifyLabel: 'Identificada por foto',
      identifyValue: 'Jiboia',
      waterLabel: 'Próxima rega',
      waterValue: 'Em 2 dias',
      appAlt: 'Tela do app Flory com o estado do dia de uma planta',
    },
    steps: {
      eyebrow: 'Como funciona',
      title: 'Três passos e sua planta deixa de ser um mistério',
      items: [
        {
          alt: 'Flory acenando ao lado de um vaso',
          title: 'Adicione sua planta',
          text: 'Tire uma foto e o Flory identifica a espécie. Se preferir, busque no catálogo de 206 espécies chilenas.',
        },
        {
          alt: 'Flory pensando com um ponto de interrogação',
          title: 'Conte onde ela vive',
          text: 'Interior ou exterior, a luz que recebe e como é o vaso. Com isso ele calcula o ritmo de rega.',
        },
        {
          alt: 'Flory regando com um regador',
          title: 'Entenda como ela está',
          text: 'Todo dia você vê o estado dela, registra a rega e ela conta na primeira pessoa como se sente.',
        },
      ],
    },
    features: {
      eyebrow: 'O que faz',
      title: 'O que o Flory faz pelas suas plantas',
      description: 'Sem tabelas e sem tecniquês. Cada função existe para você saber o que fazer hoje.',
      items: [
        {
          title: 'Identifique por foto',
          text: 'Você tira uma foto e o Flory reconhece a espécie. Também dá para buscar no catálogo.',
        },
        {
          title: 'Ele diz quando regar',
          text: 'Calcula o ritmo de rega pela espécie e pelo ambiente real da sua planta, não por uma regra genérica.',
        },
        {
          title: 'Sua planta fala com você',
          text: 'O estado dela se resume em três níveis (bem, atenção, urgente) e ela conta na primeira pessoa.',
        },
        {
          title: 'Diagnostique por foto',
          text: 'Fotografe uma folha ou uma praga e receba a causa provável, o que fazer e em quanto tempo.',
        },
        {
          title: 'Converse quando quiser',
          text: 'Você conversa com cada planta e ela responde considerando espécie, estado e diagnósticos recentes.',
        },
        {
          title: 'Se ajusta ao seu cuidado',
          text: 'Você diz como encontrou a terra e ele corrige o ritmo de rega, explicando por que mudou.',
        },
        {
          title: 'Pensado para o Chile',
          text: 'Catálogo de 206 espécies chilenas, de interior e exterior, com dados de toxicidade para pets.',
        },
      ],
      plainTitle: 'Sempre em linguagem simples',
      plainText:
        'Nada de gráficos para decifrar. O Flory transforma o estado da sua planta em uma frase que você pode seguir hoje.',
    },
    app: {
      eyebrow: 'O app',
      title: 'O Flory é assim',
      description: 'Suas plantas, o estado delas e os diagnósticos. Funciona até sem conexão, com a última informação salva.',
      shots: [
        { alt: 'Tela Hoje com o estado da planta e a próxima rega', caption: 'Hoje' },
        { alt: 'Lista com todas as suas plantas e o estado de cada uma', caption: 'Suas plantas' },
        { alt: 'Ficha de uma planta com o ritmo de rega e o histórico', caption: 'Ficha' },
        { alt: 'Conversa de chat entre a pessoa e sua planta', caption: 'Chat' },
        { alt: 'Resultado de um diagnóstico feito por fotografia', caption: 'Diagnóstico' },
        { alt: 'Identificação de uma espécie a partir de uma fotografia', caption: 'Identificação' },
      ],
    },
    sensor: {
      eyebrow: 'O sensor',
      badge: 'Chega em dezembro',
      title: 'E em dezembro, o sensor',
      description:
        'O app já funciona sozinho. Em dezembro chega o sensor opcional: ele vai no vaso e mede a umidade do solo para afinar ainda mais o ritmo de rega.',
      bullets: ['Opcional: o app funciona sem ele', 'Vai direto no vaso', 'Disponível em dezembro'],
      cta: 'Me avise sobre o sensor',
      note: 'Deixe seu e-mail e avisamos quando estiver pronto.',
      alt: 'Sensor Flory colocado na terra de um vaso',
    },
    pricing: {
      eyebrow: 'Preços',
      title: 'Escolha seu plano',
      description: 'O Free já está pronto. Plus e Sensor chegam em breve.',
      mostPopular: 'Mais popular',
      comingSoon: 'Em breve',
      perMonth: 'por mês',
      forever: 'para sempre',
      priceFrom: 'a partir de',
      priceFromNote: '* O plano Sensor começa em $5.990 por mês, com o sensor físico incluído.',
      annualSuffix: 'por ano, o equivalente a dois meses grátis.',
      plans: [
        {
          name: 'Free',
          tagline: 'Para começar a cuidar das suas primeiras plantas.',
          features: [
            '2 plantas.',
            'Chat básico com sua planta.',
            '3 diagnósticos por fotografia ao mês.',
            'Histórico básico de diagnósticos.',
            'Recomendações básicas.',
            'Calendário de rega.',
            'Notificações básicas.',
          ],
          cta: 'Começar grátis',
        },
        {
          name: 'Plus',
          tagline: 'Para quem tem várias plantas em casa.',
          features: [
            'Plantas ilimitadas.',
            'Chat avançado com sua planta.',
            '15 diagnósticos por fotografia ao mês.',
            'Histórico completo de diagnósticos.',
            'Recomendações personalizadas.',
            'Calendário de rega adaptativo.',
            'Notificações personalizadas.',
          ],
          cta: 'Me avise quando chegar',
        },
        {
          name: 'Sensor',
          tagline: 'A experiência completa, com o sensor físico incluído.',
          features: [
            'Sensor físico incluído.',
            'Tudo o que está incluído no Plus.',
            'Chat avançado com contexto do sensor.',
            '30 diagnósticos por fotografia ao mês.',
            'Evolução da sua planta por fotos.',
            'Calendário de rega baseado no sensor.',
            'Notificações preditivas.',
            'Flory Score.',
            'Monitoramento 24/7.',
            'Previsões com IA.',
          ],
          cta: 'Me avise quando chegar',
        },
      ],
      comparison: {
        title: 'Comparação',
        featureLabel: 'Característica',
        includedLabel: 'Incluído',
        notIncludedLabel: 'Não incluído',
        monthlyPriceLabel: 'Preço mensal',
        annualPriceLabel: 'Preço anual',
        rows: [
          { label: 'Plantas', values: ['2', 'Ilimitadas', 'Ilimitadas'] },
          { label: 'Chat', values: ['Básico', 'Avançado', 'Avançado + contexto do sensor'] },
          { label: 'Diagnósticos', values: ['3/mês', '15/mês', '30/mês'] },
          { label: 'Histórico de diagnósticos', values: ['Básico', 'Completo', 'Completo'] },
          { label: 'Evolução por fotos', values: ['✗', '✗', '✓'] },
          { label: 'Recomendações personalizadas', values: ['Básicas', '✓', '✓'] },
          { label: 'Calendário de rega', values: ['✓', '✓ adaptativo', '✓ baseado no sensor'] },
          { label: 'Notificações', values: ['Básicas', 'Personalizadas', 'Preditivas'] },
          { label: 'Flory Score', values: ['✗', '✗', '✓'] },
          { label: 'Monitoramento', values: ['✗', '✗', '24/7'] },
          { label: 'Previsões com IA', values: ['✗', '✗', '✓'] },
          { label: 'Sensor físico', values: ['✗', '✗', 'Incluído'] },
        ],
      },
      founding: {
        badge: 'Benefício de fundador',
        title: 'Quem chega primeiro fica com mais',
        description:
          'Quem se cadastrar durante o período de lançamento vai receber acesso ampliado como agradecimento por ajudar a construir o Flory.',
      },
      openPeriodNote: 'Durante o período de lançamento, o plano Free tem limites ampliados.',
      cta: 'Começar grátis',
      note: 'Preços em pesos chilenos, IVA incluído. Plus e Sensor ainda não estão disponíveis para contratar.',
    },
    quiero: {
      meta: {
        title: 'Escolha seu plano · Flory',
        description: 'Escolha seu plano do Flory e avisamos assim que você puder começar.',
      },
      back: 'Voltar ao início',
      eyebrow: 'Passo 1 de 2',
      title: 'Escolha seu plano 🌱',
      description: 'O Free já está pronto. Plus e Sensor chegam em breve: deixe seu e-mail e avisamos.',
      availability: {
        badge: 'Período de lançamento',
        launchTitle: 'O Flory está em período de lançamento.',
        launchText: 'Deixe seu e-mail e avisamos assim que você puder começar.',
        freeTitle: 'O plano Free é grátis para sempre.',
        freeText: 'Durante o lançamento ele ainda vem com limites ampliados.',
      },
      mostPopular: 'Mais popular',
      disclaimer: 'Deixar seu e-mail não é uma compra nem uma cobrança. Só usamos para avisar você.',
    },
    lead: {
      eyebrow: 'Passo 2 de 2',
      title: 'Onde avisamos você?',
      description: 'Deixe seu e-mail e escrevemos assim que você puder começar a usar o Flory.',
      selectedLabel: 'O plano que interessa a você',
      change: 'Alterar',
      emailLabel: 'E-mail',
      emailPlaceholder: 'voce@email.com',
      nameLabel: 'Nome',
      nameOptional: 'opcional',
      namePlaceholder: 'Como chamamos você?',
      submit: 'Quero ser avisado',
      submitting: 'Enviando…',
      errorEmail: 'Confira o e-mail, parece que falta algo.',
      errorNetwork: 'Não conseguimos salvar seu e-mail. Tente de novo.',
      privacy: 'Seu e-mail só é usado para avisar você. Não é uma compra e nada é cobrado.',
    },
    gracias: {
      meta: {
        title: 'Você está dentro! · Flory',
        description: 'Avisamos assim que você puder começar a usar o Flory.',
      },
      title: 'Você está na lista!',
      description: 'Escrevemos assim que você puder começar a usar o Flory. Você será um dos primeiros a entrar.',
      emailPrefix: 'Enviaremos a mensagem para',
      planPrefix: 'Seu plano',
      note: 'Você não comprou nada. Nesta etapa não cobramos.',
      back: 'Voltar ao início',
      alt: 'Flory ao lado de um coração roxo',
    },
    faq: {
      eyebrow: 'Dúvidas',
      title: 'O que mais nos perguntam',
      items: [
        {
          question: 'O Flory é grátis?',
          answer:
            'Sim. O plano Free permite cuidar de duas plantas com calendário de rega, identificação por foto, chat e diagnósticos, sem pagar nada. Plus e Sensor são planos de maior capacidade que ainda não estão disponíveis para contratar.',
        },
        {
          question: 'Preciso do sensor para usar o app?',
          answer:
            'Não. Hoje o Flory funciona só com o app: identifica sua planta por foto e calcula o ritmo de rega pela espécie e pelo ambiente dela. O sensor é um complemento opcional que chega mais adiante.',
        },
        {
          question: 'Quando chega o sensor?',
          answer:
            'Em dezembro. Ele vai medir a umidade do solo e afinar a rega, mas o app continua funcionando igual sem ele.',
        },
        {
          question: 'Qual é a diferença entre Free, Plus e Sensor?',
          answer:
            'A capacidade e o sensor. O Free é para duas plantas e três diagnósticos por mês. O Plus tem plantas ilimitadas, quinze diagnósticos e recomendações personalizadas. O Sensor inclui o sensor físico, trinta diagnósticos, monitoramento 24/7, Flory Score e previsões com IA.',
        },
        {
          question: 'Funciona com qualquer planta?',
          answer:
            'Temos um catálogo de 206 espécies chilenas com os cuidados de cada uma. Se a sua planta não estiver lá, o Flory cuida dela com cuidados aproximados e avisa isso com clareza na ficha.',
        },
      ],
    },
    cta: {
      title: ['Comece a cuidar', 'da sua primeira planta.'],
      description:
        'O Flory está em período de lançamento. Deixe seu e-mail e avisamos assim que você puder começar a usar.',
      primary: 'Começar grátis',
      secondary: 'Tenho uma dúvida',
    },
    legal: {
      terms: {
        meta: {
          title: 'Termos de Uso · Flory',
          description: 'Termos de Uso do Flory, operado pela Tame SpA em Santiago, Chile.',
        },
      },
      privacy: {
        meta: {
          title: 'Política de Privacidade · Flory',
          description: 'Quais dados o Flory trata, com quais fornecedores são compartilhados e como exercer seus direitos.',
        },
      },
      deleteAccount: {
        meta: {
          title: 'Excluir sua conta · Flory',
          description: 'Como excluir sua conta do Flory e quais dados são apagados.',
        },
      },
      index: 'Conteúdo',
      spanishOnly: 'Este documento está disponível apenas em espanhol: foi redigido conforme a legislação chilena.',
      back: 'Voltar ao início',
    },
    footer: {
      description: 'PlantTech feita no Chile. Um app que entende suas plantas.',
      columns: [
        { title: 'Produto', links: ['Como funciona', 'O que faz', 'O app', 'Preços'] },
        { title: 'Ajuda', links: ['Dúvidas', 'Contato', 'Guias de cuidado', 'O sensor'] },
        { title: 'Flory', links: ['Sobre nós', 'Blog', 'Trabalhe conosco', 'Imprensa'] },
      ],
      copyright: 'Feito com carinho em Santiago.',
      terms: 'Termos',
      privacy: 'Privacidade',
      deleteAccount: 'Excluir conta',
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
