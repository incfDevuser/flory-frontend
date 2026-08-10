/* eslint-disable react-refresh/only-export-components */
import { createContext, startTransition, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

const translations = {
  en: {
    meta: {
      title: 'Flory · Your plants are already talking',
      description:
        'Flory measures soil moisture, light, temperature and nutrients, then tells you what your plant needs today. PlantTech made in Chile.',
    },
    language: { label: 'Language' },
    nav: {
      links: ['The sensor', 'How it works', 'Pricing', 'FAQs'],
      cta: 'Get your Flory',
      homeLabel: 'Flory, go to homepage',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    hero: {
      title: ['Your plants are already talking.', 'They just needed a voice.'],
      description:
        'Flory measures soil moisture, light, temperature and nutrients, then tells you what your plant needs today. That’s it.',
      primaryCta: 'Get your Flory',
      secondaryCta: 'See how it works',
      waterStatus: 'Needs water',
      waterTip: 'Half a glass. Done.',
      sunValue: '4.5 h of sun',
      sunTip: 'Exactly what it needs',
      deviceAlt: 'Flory sensor placed in the soil of a plant pot',
    },
    steps: {
      eyebrow: 'How it works',
      title: 'Three steps and your plants stop being a mystery',
      items: [
        {
          alt: 'Flory waving beside a plant pot',
          title: 'Place it in the pot',
          text: 'Place it in the pot and it starts measuring. No cables, no strange apps, no setup.',
        },
        {
          alt: 'Flory thinking with a question mark',
          title: 'Flory reads and understands',
          text: 'Soil moisture, light, temperature and nutrients every 15 minutes. AI recognizes the species and its rhythm.',
        },
        {
          alt: 'Flory watering with a watering can',
          title: 'It tells you what to do today',
          text: 'A short, clear tip when it matters. Silence when everything is fine.',
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
            'We count the useful light each plant receives and tell you whether moving it half a meter would help.',
        },
        {
          label: 'Nutrients',
          value: 'Medium level',
          description:
            'We read soil conductivity to see whether the soil still has nutrients or it’s time to fertilize this week.',
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
    pricing: {
      eyebrow: 'Pricing',
      title: 'Get started without a subscription',
      description:
        'Prices in Chilean pesos, VAT included. A one-time payment includes the sensor and Flory Basic for life; Flory+ is optional.',
      mostPopular: 'Most popular',
      sensors: [
        {
          name: 'Flory One',
          price: '$32.990',
          period: 'one-time payment',
          description: 'One sensor for your favorite plant.',
          features: ['1 Flory One sensor', 'Flory Basic forever', 'Full app access', '2-year battery'],
          cta: 'Buy now',
        },
        {
          name: 'Flory Casa',
          price: '$94.990',
          period: 'one-time payment',
          description: 'Three sensors for the living room, kitchen and anywhere else.',
          features: ['3 Flory One sensors', 'Flory Basic forever', 'Full app access', '2-year battery'],
          cta: 'Buy the pack',
        },
      ],
      appEyebrow: 'The app',
      appTitle: 'The app is included. AI is optional.',
      intelligence: 'AI features',
      basicIncluded: 'Included with your sensor',
      plusCta: 'Try 30 days free',
      appPlans: [
        {
          name: 'Flory Basic',
          price: 'Free',
          period: 'with any sensor',
          description: 'See every plant’s data without paying anything else.',
          features: [
            { label: 'All your plants and sensors in one app', included: true },
            { label: 'Soil moisture, temperature, ambient humidity and light', included: true },
            { label: 'Current status for every plant', included: true },
            { label: 'Weekly summary', included: true },
            { label: 'Basic recommendations', included: true },
            { label: 'Critical alerts: sensor offline or low battery', included: true },
            { label: 'No continuous AI interpretation', included: false },
          ],
        },
        {
          name: 'Flory+',
          price: '$3.990',
          period: 'per month',
          description: 'AI reads all your sensors and tells you what to do.',
          features: [
            { label: 'Everything in Basic', included: true },
            { label: 'Daily AI analysis', included: true },
            { label: 'Species-specific interpretation', included: true },
            { label: 'Combines moisture, temperature, ambient humidity and light', included: true },
            { label: 'Personalized recommendations', included: true },
            { label: 'Smart alerts', included: true },
            { label: 'Trends and full history', included: true },
            { label: 'Health Score for every plant', included: true },
            { label: 'Advanced weekly summary', included: true },
            { label: 'Vacation mode', included: true },
          ],
        },
      ],
    },
    faq: {
      eyebrow: 'FAQs',
      title: 'Common questions',
      items: [
        {
          question: 'Does it work with any plant?',
          answer:
            'Yes. Flory recognizes more than 3,000 indoor and outdoor species. If it cannot identify one, it learns its rhythm in two weeks.',
        },
        {
          question: 'Do I need Wi-Fi?',
          answer:
            'No. The sensor connects to your phone through Bluetooth and stores up to three weeks of readings while you are away.',
        },
        {
          question: 'How long does the battery last?',
          answer:
            'Two years while measuring every 15 minutes. The app warns you one month in advance, and replacing the battery takes ten seconds.',
        },
        {
          question: 'Can it get wet?',
          answer:
            'Yes. The body withstands daily watering and rain, so it can stay on the balcony or in the garden all year.',
        },
      ],
    },
    cta: {
      title: ['Start with one plant.', 'It will tell you the rest.'],
      description: 'Delivery across Chile in 48 hours, plus 60 days to return it if your plant disagrees.',
      primary: 'Get your Flory',
      secondary: 'Talk to us',
    },
    footer: {
      description: 'PlantTech made in Chile. Sensors that listen, AI that translates.',
      columns: [
        { title: 'Product', links: ['The sensor', 'The app', 'Flory+', 'Pricing'] },
        { title: 'Help', links: ['Care guides', 'FAQs', 'Contact', 'Shipping'] },
        { title: 'Flory', links: ['About us', 'Blog', 'Work with us', 'Press'] },
      ],
      copyright: 'Made with care in Santiago.',
      terms: 'Terms',
      privacy: 'Privacy',
    },
  },
  es: {
    meta: {
      title: 'Flory · Tus plantas ya te hablan',
      description:
        'Flory mide la humedad, la luz, la temperatura y los nutrientes de cada maceta, y te dice qué hacer hoy. PlantTech hecha en Chile.',
    },
    language: { label: 'Idioma' },
    nav: {
      links: ['El sensor', 'Cómo funciona', 'Precios', 'Dudas'],
      cta: 'Consigue tu Flory',
      homeLabel: 'Flory, ir al inicio',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
    },
    hero: {
      title: ['Tus plantas ya te hablan.', 'Solo necesitaban una voz.'],
      description:
        'Flory mide la humedad, la luz, la temperatura y los nutrientes de cada maceta, y te dice qué hacer hoy. Nada más.',
      primaryCta: 'Consigue tu Flory',
      secondaryCta: 'Ver cómo funciona',
      waterStatus: 'Necesita agua',
      waterTip: 'Medio vaso y listo',
      sunValue: '4,5 h de sol',
      sunTip: 'Justo lo que pide',
      deviceAlt: 'Sensor Flory clavado en la tierra de una maceta',
    },
    steps: {
      eyebrow: 'Cómo funciona',
      title: 'Tres pasos y tus plantas dejan de ser un misterio',
      items: [
        {
          alt: 'Flory saludando junto a una maceta',
          title: 'Clávalo en la maceta',
          text: 'Un gesto y ya está midiendo. Sin cables, sin apps raras, sin configurar nada.',
        },
        {
          alt: 'Flory pensando con un signo de interrogación',
          title: 'Flory lee y entiende',
          text: 'Humedad, luz, temperatura y nutrientes cada 15 minutos. La IA reconoce la especie y su ritmo.',
        },
        {
          alt: 'Flory regando con una regadera',
          title: 'Te dice qué hacer hoy',
          text: 'Un consejo corto y claro cuando hace falta. Silencio cuando todo va bien.',
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
            'Contamos las horas de luz útil que recibe cada planta y te decimos si vale la pena moverla medio metro.',
        },
        {
          label: 'Nutrientes',
          value: 'Nivel medio',
          description:
            'Leemos la conductividad del sustrato para saber si todavía queda alimento o si toca abonar esta semana.',
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
    pricing: {
      eyebrow: 'Precios',
      title: 'Sin suscripción para empezar',
      description:
        'Precios en pesos chilenos, IVA incluido. El sensor y Flory Basic funcionan para siempre con un solo pago; Flory+ es opcional.',
      mostPopular: 'Más elegido',
      sensors: [
        {
          name: 'Flory One',
          price: '$32.990',
          period: 'pago único',
          description: 'Un sensor para tu planta favorita.',
          features: ['1 sensor Flory One', 'Flory Basic para siempre', 'App completa', '2 años de batería'],
          cta: 'Comprar',
        },
        {
          name: 'Flory Casa',
          price: '$94.990',
          period: 'pago único',
          description: 'Tres sensores para el living, la cocina y donde haga falta.',
          features: ['3 sensores Flory One', 'Flory Basic para siempre', 'App completa', '2 años de batería'],
          cta: 'Comprar pack',
        },
      ],
      appEyebrow: 'La app',
      appTitle: 'La app va incluida. La inteligencia es opcional.',
      intelligence: 'La inteligencia',
      basicIncluded: 'Incluido con tu sensor',
      plusCta: 'Probar 30 días gratis',
      appPlans: [
        {
          name: 'Flory Basic',
          price: 'Gratis',
          period: 'con cualquier sensor',
          description: 'Ves los datos de cada planta, sin pagar nada más.',
          features: [
            { label: 'Todas tus plantas y sensores en la app', included: true },
            { label: 'Humedad del suelo, temperatura, humedad ambiental y luz', included: true },
            { label: 'Estado actual de cada planta', included: true },
            { label: 'Resumen semanal', included: true },
            { label: 'Recomendaciones básicas', included: true },
            { label: 'Alertas críticas: sensor desconectado o batería baja', included: true },
            { label: 'Sin interpretación continua con IA', included: false },
          ],
        },
        {
          name: 'Flory+',
          price: '$3.990',
          period: 'al mes',
          description: 'La IA lee a todos tus sensores y te dice qué hacer.',
          features: [
            { label: 'Todo lo de Basic', included: true },
            { label: 'Análisis diario con IA', included: true },
            { label: 'Interpretación según la especie', included: true },
            { label: 'Cruza humedad, temperatura, humedad ambiental y luz', included: true },
            { label: 'Recomendaciones personalizadas', included: true },
            { label: 'Alertas inteligentes', included: true },
            { label: 'Tendencias e historial completo', included: true },
            { label: 'Health Score de cada planta', included: true },
            { label: 'Resumen semanal avanzado', included: true },
            { label: 'Modo vacaciones', included: true },
          ],
        },
      ],
    },
    faq: {
      eyebrow: 'Dudas',
      title: 'Lo que nos preguntan',
      items: [
        {
          question: '¿Funciona con cualquier planta?',
          answer:
            'Sí. Flory reconoce más de 3.000 especies de interior y exterior, y si no la identifica aprende su ritmo en dos semanas.',
        },
        {
          question: '¿Necesito wifi?',
          answer:
            'No. El sensor se conecta por Bluetooth a tu teléfono y guarda hasta tres semanas de lecturas mientras no estás en casa.',
        },
        {
          question: '¿Cuánto dura la batería?',
          answer:
            'Dos años midiendo cada 15 minutos. La app te avisa con un mes de anticipación y la pila se cambia en diez segundos.',
        },
        {
          question: '¿Se puede mojar?',
          answer:
            'Sí. El cuerpo resiste el riego diario y la lluvia, así que puede quedarse en la terraza o el jardín todo el año.',
        },
      ],
    },
    cta: {
      title: ['Empieza por una planta.', 'Ella te contará el resto.'],
      description: 'Despacho a todo Chile en 48 h y 60 días para devolverlo si tu planta no está de acuerdo.',
      primary: 'Consigue tu Flory',
      secondary: 'Hablar con nosotros',
    },
    footer: {
      description: 'PlantTech hecha en Chile. Sensores que escuchan, IA que traduce.',
      columns: [
        { title: 'Producto', links: ['El sensor', 'La app', 'Flory+', 'Precios'] },
        { title: 'Ayuda', links: ['Guías de cuidado', 'Preguntas', 'Contacto', 'Despachos'] },
        { title: 'Flory', links: ['Sobre nosotros', 'Blog', 'Trabaja con nosotros', 'Prensa'] },
      ],
      copyright: 'Hecho con cariño en Santiago.',
      terms: 'Términos',
      privacy: 'Privacidad',
    },
  },
  pt: {
    meta: {
      title: 'Flory · Suas plantas já falam com você',
      description:
        'Flory mede a umidade, a luz, a temperatura e os nutrientes de cada vaso e diz o que sua planta precisa hoje. PlantTech feita no Chile.',
    },
    language: { label: 'Idioma' },
    nav: {
      links: ['O sensor', 'Como funciona', 'Preços', 'Dúvidas'],
      cta: 'Compre seu Flory',
      homeLabel: 'Flory, ir para o início',
      openMenu: 'Abrir menu',
      closeMenu: 'Fechar menu',
    },
    hero: {
      title: ['Suas plantas já falam com você.', 'Só precisavam de uma voz.'],
      description:
        'Flory mede a umidade do solo, a luz, a temperatura e os nutrientes de cada vaso e diz o que fazer hoje. Só isso.',
      primaryCta: 'Compre seu Flory',
      secondaryCta: 'Veja como funciona',
      waterStatus: 'Precisa de água',
      waterTip: 'Meio copo e pronto',
      sunValue: '4,5 h de sol',
      sunTip: 'Exatamente o que precisa',
      deviceAlt: 'Sensor Flory colocado na terra de um vaso',
    },
    steps: {
      eyebrow: 'Como funciona',
      title: 'Três passos e suas plantas deixam de ser um mistério',
      items: [
        {
          alt: 'Flory acenando ao lado de um vaso',
          title: 'Coloque no vaso',
          text: 'É só colocar no vaso e ele começa a medir. Sem cabos, apps estranhos ou configuração.',
        },
        {
          alt: 'Flory pensando com um ponto de interrogação',
          title: 'Flory lê e entende',
          text: 'Umidade do solo, luz, temperatura e nutrientes a cada 15 minutos. A IA reconhece a espécie e seu ritmo.',
        },
        {
          alt: 'Flory regando com um regador',
          title: 'Diz o que fazer hoje',
          text: 'Uma orientação curta e clara quando necessário. Silêncio quando está tudo bem.',
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
            'Contamos as horas de luz útil que cada planta recebe e dizemos se vale a pena movê-la meio metro.',
        },
        {
          label: 'Nutrientes',
          value: 'Nível médio',
          description:
            'Lemos a condutividade do substrato para saber se ainda há nutrientes ou se é hora de adubar esta semana.',
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
    pricing: {
      eyebrow: 'Preços',
      title: 'Comece sem assinatura',
      description:
        'Preços em pesos chilenos, IVA incluído. Um único pagamento inclui o sensor e o Flory Basic para sempre; Flory+ é opcional.',
      mostPopular: 'Mais popular',
      sensors: [
        {
          name: 'Flory One',
          price: '$32.990',
          period: 'pagamento único',
          description: 'Um sensor para sua planta favorita.',
          features: ['1 sensor Flory One', 'Flory Basic para sempre', 'App completo', '2 anos de bateria'],
          cta: 'Comprar',
        },
        {
          name: 'Flory Casa',
          price: '$94.990',
          period: 'pagamento único',
          description: 'Três sensores para a sala, a cozinha e onde mais precisar.',
          features: ['3 sensores Flory One', 'Flory Basic para sempre', 'App completo', '2 anos de bateria'],
          cta: 'Comprar o kit',
        },
      ],
      appEyebrow: 'O app',
      appTitle: 'O app está incluído. A IA é opcional.',
      intelligence: 'A IA',
      basicIncluded: 'Incluído com seu sensor',
      plusCta: 'Teste grátis por 30 dias',
      appPlans: [
        {
          name: 'Flory Basic',
          price: 'Grátis',
          period: 'com qualquer sensor',
          description: 'Veja os dados de cada planta sem pagar nada a mais.',
          features: [
            { label: 'Todas as suas plantas e sensores em um único app', included: true },
            { label: 'Umidade do solo, temperatura, umidade do ar e luz', included: true },
            { label: 'Estado atual de cada planta', included: true },
            { label: 'Resumo semanal', included: true },
            { label: 'Recomendações básicas', included: true },
            { label: 'Alertas críticos: sensor desconectado ou bateria fraca', included: true },
            { label: 'Sem interpretação contínua por IA', included: false },
          ],
        },
        {
          name: 'Flory+',
          price: '$3.990',
          period: 'por mês',
          description: 'A IA lê todos os sensores e diz o que fazer.',
          features: [
            { label: 'Tudo o que o Basic oferece', included: true },
            { label: 'Análise diária com IA', included: true },
            { label: 'Interpretação conforme a espécie', included: true },
            { label: 'Cruza umidade, temperatura, umidade do ar e luz', included: true },
            { label: 'Recomendações personalizadas', included: true },
            { label: 'Alertas inteligentes', included: true },
            { label: 'Tendências e histórico completo', included: true },
            { label: 'Health Score de cada planta', included: true },
            { label: 'Resumo semanal avançado', included: true },
            { label: 'Modo férias', included: true },
          ],
        },
      ],
    },
    faq: {
      eyebrow: 'Dúvidas',
      title: 'O que mais nos perguntam',
      items: [
        {
          question: 'Funciona com qualquer planta?',
          answer:
            'Sim. Flory reconhece mais de 3.000 espécies de plantas para ambientes internos e externos. Se não conseguir identificar alguma, aprende seu ritmo em duas semanas.',
        },
        {
          question: 'Preciso de Wi-Fi?',
          answer:
            'Não. O sensor se conecta ao celular por Bluetooth e guarda até três semanas de leituras enquanto você está fora.',
        },
        {
          question: 'Quanto tempo dura a bateria?',
          answer:
            'Dois anos medindo a cada 15 minutos. O app avisa com um mês de antecedência, e a troca da bateria leva dez segundos.',
        },
        {
          question: 'Pode molhar?',
          answer:
            'Sim. O corpo resiste à rega diária e à chuva, então pode ficar na varanda ou no jardim o ano inteiro.',
        },
      ],
    },
    cta: {
      title: ['Comece com uma planta.', 'Ela contará o resto.'],
      description: 'Entrega em todo o Chile em 48 horas, com 60 dias para devolver o produto se sua planta não concordar.',
      primary: 'Compre seu Flory',
      secondary: 'Fale com a gente',
    },
    footer: {
      description: 'PlantTech feita no Chile. Sensores que escutam, IA que traduz.',
      columns: [
        { title: 'Produto', links: ['O sensor', 'O app', 'Flory+', 'Preços'] },
        { title: 'Ajuda', links: ['Guias de cuidado', 'Dúvidas', 'Contato', 'Envios'] },
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
  const stored = localStorage.getItem(storageKey)
  return isLanguage(stored) ? stored : 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setCurrentLanguage] = useState<Language>(getInitialLanguage)
  const copy = translations[language]

  useEffect(() => {
    const htmlLanguage = language === 'pt' ? 'pt-BR' : language
    document.documentElement.lang = htmlLanguage
    document.title = copy.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.meta.description)
    localStorage.setItem(storageKey, language)
  }, [copy.meta.description, copy.meta.title, language])

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
