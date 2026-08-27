/**
 * Documentos legales de Flory.
 *
 * Viven fuera de `i18n.tsx` a propósito: son texto jurídico redactado para
 * la legislación chilena y se publican solo en español. Meterlos al provider
 * obligaría a mantener tres traducciones legales sin revisión jurídica, que
 * es peor que mostrar el original.
 *
 * El texto se guarda estructurado (no HTML) para que `LegalPage` controle la
 * tipografía y para poder enlazar secciones con ancla.
 */

export type LegalBlock =
  | { type: 'p'; text: string }
  /** Subtítulo dentro de una sección numerada. */
  | { type: 'h3'; text: string }
  /** Viñetas. */
  | { type: 'list'; items: string[] }
  /** Pasos numerados. */
  | { type: 'steps'; items: string[] }
  /** Líneas sueltas sin viñeta: datos de contacto, correo con asunto. */
  | { type: 'lines'; items: string[] }
  /** Párrafo destacado. Solo cambia la presentación, no el texto. */
  | { type: 'note'; text: string }

export type LegalSection = {
  /** Ancla de la URL. También es la key del índice. */
  id: string
  /** Numeración visible. Ausente en documentos sin secciones numeradas. */
  number?: string
  title?: string
  blocks: LegalBlock[]
}

export type LegalDoc = {
  title: string
  /** Versión y vigencia, cuando el documento las declara. */
  version?: string
  sections: LegalSection[]
}

export const CONTACT_EMAIL = 'contact@tame.cl'
export const SITE_URL = 'https://somosflory.cl'

export const termsDoc: LegalDoc = {
  title: 'Términos de Uso de Flory',
  version: 'Versión 1.0. Vigentes desde el 27 de agosto de 2026.',
  sections: [
    {
      id: 'responsable',
      number: '1',
      title: 'Responsable del servicio',
      blocks: [
        {
          type: 'p',
          text: 'Flory es una aplicación y servicio digital operado por Tame SpA, RUT 78.216.642-5, domiciliada en Santiago, Chile.',
        },
        { type: 'p', text: 'Contacto: contact@tame.cl.' },
      ],
    },
    {
      id: 'aceptacion',
      number: '2',
      title: 'Aceptación',
      blocks: [
        { type: 'p', text: 'Al crear una cuenta o utilizar Flory declaras que:' },
        {
          type: 'list',
          items: [
            'Tienes al menos 18 años.',
            'Has leído y aceptas estos Términos.',
            'Has leído la Política de Privacidad.',
            'La información que proporcionas es verdadera y puedes utilizar el contenido que subes.',
          ],
        },
        { type: 'p', text: 'Si no estás de acuerdo, no debes crear una cuenta ni utilizar el servicio.' },
      ],
    },
    {
      id: 'que-ofrece',
      number: '3',
      title: 'Qué ofrece Flory',
      blocks: [
        { type: 'p', text: 'Flory ayuda a registrar plantas y entrega estimaciones de cuidado basadas en:' },
        {
          type: 'list',
          items: [
            'Especie seleccionada o sugerida.',
            'Ambiente y condiciones informadas.',
            'Tamaño y material de la maceta.',
            'Historial de riego y estado de la tierra.',
            'Fotografías y análisis automatizados.',
          ],
        },
        {
          type: 'p',
          text: 'La versión actual funciona sin sensor físico. Las fechas de riego no provienen de una medición directa de humedad de la tierra.',
        },
      ],
    },
    {
      id: 'cuenta',
      number: '4',
      title: 'Cuenta',
      blocks: [
        {
          type: 'p',
          text: 'Eres responsable de mantener protegida tu cuenta y de informar cualquier acceso no autorizado.',
        },
        {
          type: 'p',
          text: 'Puedes registrarte mediante correo y contraseña o, cuando estén disponibles, mediante Google o Apple. El uso de esos servicios también está sujeto a sus propios términos.',
        },
        {
          type: 'p',
          text: 'No debes compartir credenciales, suplantar a otra persona ni crear cuentas con fines abusivos.',
        },
      ],
    },
    {
      id: 'servicio-gratuito',
      number: '5',
      title: 'Servicio gratuito',
      blocks: [
        { type: 'p', text: 'La versión inicial de Flory se ofrece gratuitamente.' },
        {
          type: 'p',
          text: 'Tame SpA podrá incorporar posteriormente funciones pagadas, suscripciones, productos físicos u otros servicios. Ningún cobro se realizará sin mostrar previamente su precio, condiciones y mecanismo de aceptación.',
        },
      ],
    },
    {
      id: 'oferta-de-lanzamiento',
      number: '6',
      title: 'Información del sitio y oferta de lanzamiento',
      blocks: [
        {
          type: 'p',
          text: 'El sitio somosflory.cl permite registrar interés en futuros productos o servicios de Flory.',
        },
        { type: 'p', text: 'Dejar tu nombre o correo:' },
        {
          type: 'list',
          items: [
            'No constituye una compra.',
            'No constituye una reserva.',
            'No genera un cobro.',
            'No garantiza una fecha de lanzamiento, stock o despacho.',
          ],
        },
        {
          type: 'p',
          text: 'Si registras tu correo durante una oferta de lanzamiento, Flory asociará a ese correo el precio mostrado. Si el producto llega a estar disponible y recibes una invitación de compra, se informarán antes del pago el precio total, impuestos, despacho, disponibilidad, garantía y demás condiciones aplicables.',
        },
      ],
    },
    {
      id: 'inteligencia-artificial',
      number: '7',
      title: 'Inteligencia artificial',
      blocks: [
        {
          type: 'p',
          text: 'La identificación, los diagnósticos y el chat pueden ser generados mediante inteligencia artificial.',
        },
        { type: 'p', text: 'Estas funciones:' },
        {
          type: 'list',
          items: [
            'Pueden equivocarse.',
            'Pueden confundir especies o causas similares.',
            'Solo consideran la fotografía y el contexto disponible.',
            'No observan la planta en tiempo real.',
            'No pueden revisar raíces, drenaje, composición del suelo ni elementos fuera de la imagen.',
            'No garantizan recuperación, supervivencia o ausencia de plagas.',
          ],
        },
        {
          type: 'p',
          text: 'Algunas recomendaciones automatizadas pueden modificar la fecha estimada del próximo riego. Debes revisar la tierra y el estado real de la planta antes de actuar.',
        },
      ],
    },
    {
      id: 'identificacion',
      number: '8',
      title: 'Identificación y cuidados aproximados',
      blocks: [
        {
          type: 'p',
          text: 'La identificación por fotografía es una sugerencia y debe ser confirmada por el usuario.',
        },
        {
          type: 'p',
          text: 'Cuando una especie no esté disponible o verificada, Flory puede utilizar valores aproximados basados en un grupo de plantas con cuidados similares. La aplicación indicará cuando una recomendación sea aproximada.',
        },
      ],
    },
    {
      id: 'toxicidad',
      number: '9',
      title: 'Toxicidad y seguridad',
      blocks: [
        {
          type: 'p',
          text: 'La información sobre toxicidad es referencial y depende de que la especie esté correctamente identificada.',
        },
        {
          type: 'p',
          text: '“No listado” o “sin datos” no significa que una planta sea segura. La información de toxicidad para mascotas tampoco determina si una planta es comestible, segura para personas o libre de riesgos por alergias o contacto.',
        },
        {
          type: 'note',
          text: 'Ante ingestión, contacto preocupante o síntomas, consulta inmediatamente a un veterinario, centro toxicológico o servicio de urgencia. No esperes una respuesta de Flory.',
        },
      ],
    },
    {
      id: 'contenido-del-usuario',
      number: '10',
      title: 'Contenido del usuario',
      blocks: [
        { type: 'p', text: 'Conservas los derechos sobre las fotografías, nombres y mensajes que ingresas.' },
        {
          type: 'p',
          text: 'Otorgas a Tame SpA una autorización limitada para almacenar, adaptar técnicamente, analizar y procesar ese contenido únicamente con el propósito de operar y mejorar las funciones de Flory.',
        },
        { type: 'p', text: 'No debes subir:' },
        {
          type: 'list',
          items: [
            'Contenido que no tengas derecho a utilizar.',
            'Fotografías que vulneren la privacidad de terceros.',
            'Contenido ilegal, engañoso o dañino.',
            'Datos sensibles innecesarios.',
            'Software malicioso o contenido destinado a interferir con el servicio.',
          ],
        },
        {
          type: 'p',
          text: 'Tu contenido no se publica ni comparte con otros usuarios como parte de las funciones actuales de Flory.',
        },
      ],
    },
    {
      id: 'uso-permitido',
      number: '11',
      title: 'Uso permitido',
      blocks: [
        { type: 'p', text: 'No puedes:' },
        {
          type: 'list',
          items: [
            'Acceder a cuentas o datos de terceros.',
            'Eludir límites, controles de seguridad o cuotas.',
            'Automatizar solicitudes abusivas.',
            'Extraer masivamente la base de especies.',
            'Intentar obtener claves, modelos, instrucciones internas o código no público.',
            'Utilizar Flory para actividades contrarias a la ley o derechos de terceros.',
          ],
        },
        {
          type: 'p',
          text: 'Podemos limitar o suspender una cuenta cuando sea necesario para investigar fraude, abuso, riesgos de seguridad o incumplimientos importantes.',
        },
      ],
    },
    {
      id: 'propiedad-intelectual',
      number: '12',
      title: 'Propiedad intelectual',
      blocks: [
        {
          type: 'p',
          text: 'La aplicación, marca, diseño, software, textos, ilustraciones y bases de datos de Flory pertenecen a Tame SpA o a sus respectivos licenciantes.',
        },
        {
          type: 'p',
          text: 'Estos Términos te conceden únicamente un derecho personal, limitado, revocable, no exclusivo y no transferible para utilizar Flory conforme a su finalidad.',
        },
      ],
    },
    {
      id: 'disponibilidad',
      number: '13',
      title: 'Disponibilidad',
      blocks: [
        {
          type: 'p',
          text: 'Flory puede experimentar interrupciones, errores, mantenimiento o pérdida temporal de alguna funcionalidad.',
        },
        {
          type: 'p',
          text: 'Podemos modificar, agregar o retirar funciones. Cuando un cambio afecte materialmente el servicio o tus derechos, procuraremos informarlo con anticipación razonable.',
        },
        {
          type: 'p',
          text: 'Las notificaciones, si se habilitan, serán recordatorios complementarios y pueden retrasarse o no llegar por problemas de conectividad, configuración del dispositivo o servicios de terceros.',
        },
      ],
    },
    {
      id: 'eliminacion-y-suspension',
      number: '14',
      title: 'Eliminación y suspensión',
      blocks: [
        { type: 'p', text: 'Puedes dejar de utilizar Flory y eliminar tu cuenta en cualquier momento.' },
        {
          type: 'p',
          text: 'Al eliminarla perderás permanentemente tus plantas, fotografías, historial de riego, diagnósticos y conversaciones. Esta acción no puede deshacerse.',
        },
        {
          type: 'p',
          text: 'Podemos suspender o cerrar una cuenta por incumplimientos graves, fraude, riesgo de seguridad o uso que perjudique a otros usuarios o al servicio. Cuando sea razonable, informaremos el motivo y permitiremos solicitar una revisión.',
        },
      ],
    },
    {
      id: 'responsabilidad',
      number: '15',
      title: 'Responsabilidad',
      blocks: [
        {
          type: 'p',
          text: 'Flory es una herramienta de apoyo y no garantiza resultados específicos de cuidado, identificación o diagnóstico.',
        },
        {
          type: 'p',
          text: 'Tame SpA responderá conforme a la legislación aplicable. Nada en estos Términos limita derechos irrenunciables reconocidos por la legislación chilena de protección al consumidor o protección de datos.',
        },
      ],
    },
    {
      id: 'cambios',
      number: '16',
      title: 'Cambios en los Términos',
      blocks: [
        { type: 'p', text: 'Podemos actualizar estos Términos cuando cambie el servicio o la legislación.' },
        {
          type: 'p',
          text: 'Los cambios importantes serán comunicados mediante la aplicación, correo o sitio web. Si requieren una nueva aceptación, se solicitará antes de continuar utilizando las funciones afectadas.',
        },
      ],
    },
    {
      id: 'legislacion',
      number: '17',
      title: 'Legislación aplicable',
      blocks: [
        { type: 'p', text: 'Estos Términos se rigen por las leyes de la República de Chile.' },
        {
          type: 'p',
          text: 'Cualquier controversia será conocida por los tribunales o autoridades competentes conforme a la legislación aplicable, sin limitar los derechos del consumidor.',
        },
      ],
    },
    {
      id: 'contacto',
      number: '18',
      title: 'Contacto',
      blocks: [
        {
          type: 'lines',
          items: ['Tame SpA', 'RUT: 78.216.642-5', 'Santiago, Chile', 'Correo: contact@tame.cl', 'Sitio: https://somosflory.cl'],
        },
      ],
    },
  ],
}

export const privacyDoc: LegalDoc = {
  title: 'Política de Privacidad de Flory',
  version: 'Última actualización: 27 de agosto de 2026',
  sections: [
    {
      id: 'responsable',
      number: '1',
      title: 'Responsable',
      blocks: [
        { type: 'p', text: 'Flory es una aplicación y servicio digital operado por:' },
        {
          type: 'lines',
          items: [
            'Tame SpA',
            'RUT: 78.216.642-5',
            'Domicilio: Santiago, Chile',
            'Correo: contact@tame.cl',
            'Sitio web: https://somosflory.cl',
          ],
        },
        {
          type: 'p',
          text: 'Tame SpA es responsable del tratamiento de los datos personales asociados a Flory.',
        },
        {
          type: 'p',
          text: 'Esta Política se aplica a la aplicación móvil, al sitio somosflory.cl y a las comunicaciones relacionadas con Flory.',
        },
      ],
    },
    {
      id: 'datos-que-recopilamos',
      number: '2',
      title: 'Qué datos recopilamos',
      blocks: [
        { type: 'h3', text: 'Datos de cuenta' },
        { type: 'p', text: 'Cuando creas o utilizas una cuenta podemos tratar:' },
        {
          type: 'list',
          items: [
            'Nombre o nombre visible.',
            'Correo electrónico.',
            'Identificador interno de usuario.',
            'Información de autenticación y sesión.',
            'Fecha de creación y actividad de la cuenta.',
            'Datos básicos proporcionados por Google o Apple si eliges iniciar sesión mediante esos servicios.',
          ],
        },
        {
          type: 'p',
          text: 'Las contraseñas son procesadas por nuestro proveedor de autenticación. Tame SpA no puede verlas en texto legible.',
        },
        { type: 'h3', text: 'Información sobre tus plantas' },
        { type: 'p', text: 'Para personalizar el cuidado podemos almacenar:' },
        {
          type: 'list',
          items: [
            'Nombre de la planta.',
            'Especie seleccionada, identificada o sugerida.',
            'Fotografías.',
            'Ubicación interior o exterior.',
            'Condiciones de luz y exposición.',
            'Tamaño y material de la maceta.',
            'Fechas y frecuencia de riego.',
            'Estado de la tierra informado por ti.',
            'Historial de cuidados.',
            'Diagnósticos y recomendaciones anteriores.',
          ],
        },
        {
          type: 'p',
          text: 'Flory no obtiene actualmente mediciones de un sensor físico ni recopila humedad, temperatura o luz desde uno.',
        },
        { type: 'h3', text: 'Fotografías' },
        { type: 'p', text: 'Las fotografías pueden utilizarse para:' },
        {
          type: 'list',
          items: [
            'Mostrar tu planta dentro de la aplicación.',
            'Sugerir o confirmar una especie.',
            'Analizar visualmente posibles problemas.',
            'Comparar fotografías.',
            'Detectar imágenes duplicadas y prevenir abuso.',
          ],
        },
        {
          type: 'p',
          text: 'Evita incluir personas, documentos, direcciones u otra información privada en las fotografías.',
        },
        { type: 'h3', text: 'Chat e inteligencia artificial' },
        { type: 'p', text: 'Si utilizas la identificación, el diagnóstico o el chat, podemos tratar:' },
        {
          type: 'list',
          items: [
            'Fotografías enviadas.',
            'Preguntas y mensajes.',
            'Historial reciente de conversación.',
            'Información sobre la especie y condiciones de la planta.',
            'Historial de riego y diagnósticos relevantes.',
            'Respuestas, clasificaciones y recomendaciones generadas automáticamente.',
            'Datos técnicos como el modelo utilizado, tiempo de respuesta y consumo del servicio.',
          ],
        },
        { type: 'p', text: 'No incluyas datos personales sensibles o información de terceros en el chat.' },
        { type: 'h3', text: 'Datos recopilados en el sitio web' },
        { type: 'p', text: 'Si registras tu interés en Flory mediante somosflory.cl, podemos tratar:' },
        {
          type: 'list',
          items: [
            'Correo electrónico.',
            'Nombre, cuando lo entregues opcionalmente.',
            'Producto o plan de interés.',
            'Precio u oferta mostrada al registrarte.',
            'Fuente de la visita y parámetros de campaña.',
            'Página de origen, idioma y tipo general de dispositivo.',
          ],
        },
        {
          type: 'p',
          text: 'Entregar estos datos no constituye una compra, una reserva ni una autorización de cobro.',
        },
        { type: 'h3', text: 'Datos técnicos' },
        {
          type: 'p',
          text: 'Nuestros sistemas y proveedores pueden procesar información técnica necesaria para operar y proteger el servicio:',
        },
        {
          type: 'list',
          items: [
            'Dirección IP.',
            'Tipo de dispositivo y sistema operativo.',
            'Tipo de navegador.',
            'Versión de la aplicación.',
            'Fecha y hora de las solicitudes.',
            'Registros de errores y seguridad.',
            'Identificadores internos de cuenta, planta y sesión.',
            'Hashes utilizados para detectar imágenes duplicadas.',
          ],
        },
        {
          type: 'p',
          text: 'Flory no utiliza identificadores publicitarios ni vende información personal para publicidad.',
        },
      ],
    },
    {
      id: 'para-que-usamos-tus-datos',
      number: '3',
      title: 'Para qué usamos tus datos',
      blocks: [
        { type: 'p', text: 'Utilizamos los datos para:' },
        {
          type: 'list',
          items: [
            'Crear, autenticar y proteger tu cuenta.',
            'Mostrar y administrar tus plantas.',
            'Calcular fechas aproximadas de riego.',
            'Adaptar recomendaciones a la información registrada.',
            'Identificar especies mediante fotografías.',
            'Analizar visualmente posibles problemas.',
            'Generar respuestas en el chat.',
            'Mantener el historial de cuidados.',
            'Prevenir fraude, abuso y uso excesivo.',
            'Resolver errores y entregar soporte.',
            'Enviarte comunicaciones operativas o legales.',
            'Enviar información de lanzamiento que hayas solicitado.',
            'Cumplir obligaciones legales.',
            'Elaborar estadísticas agregadas o anonimizadas para mejorar Flory.',
          ],
        },
        {
          type: 'p',
          text: 'Tratamos tus datos con tu autorización, para prestarte el servicio solicitado, para cumplir obligaciones legales y, cuando la legislación lo permita, sobre la base de intereses legítimos relacionados con la seguridad y mejora del servicio.',
        },
      ],
    },
    {
      id: 'inteligencia-artificial',
      number: '4',
      title: 'Inteligencia artificial',
      blocks: [
        { type: 'p', text: 'Flory utiliza inteligencia artificial para:' },
        {
          type: 'list',
          items: [
            'Identificar especies mediante fotografías.',
            'Analizar visualmente posibles problemas.',
            'Generar respuestas en el chat.',
          ],
        },
        { type: 'p', text: 'Para estas funciones podemos enviar a OpenAI:' },
        {
          type: 'list',
          items: [
            'Fotografías de la planta.',
            'Tus preguntas y mensajes recientes.',
            'Especie, ambiente, maceta y contexto de cuidado.',
            'Historial reciente de riego o diagnósticos cuando sea relevante.',
          ],
        },
        {
          type: 'p',
          text: 'No enviamos deliberadamente tu contraseña. Tu correo y nombre de cuenta no se incluyen en las instrucciones del modelo, salvo que tú los escribas en el chat o aparezcan dentro de una fotografía.',
        },
        {
          type: 'p',
          text: 'OpenAI indica que los datos enviados mediante su API no se utilizan para entrenar sus modelos por defecto. Las entradas y respuestas pueden conservarse temporalmente, por hasta 30 días, para prestar el servicio, investigar abuso o cumplir obligaciones legales.',
        },
        {
          type: 'p',
          text: 'Las respuestas generadas pueden contener errores. La identificación, los diagnósticos y las recomendaciones son orientativos y no garantizan la recuperación o supervivencia de una planta.',
        },
        {
          type: 'p',
          text: 'La información sobre toxicidad también es referencial y depende de que la especie esté correctamente identificada. “Sin datos” o “no listado” no significa que una planta sea segura para personas o mascotas.',
        },
      ],
    },
    {
      id: 'proveedores',
      number: '5',
      title: 'Proveedores y destinatarios',
      blocks: [
        { type: 'p', text: 'Podemos compartir datos con proveedores que nos ayudan a operar Flory:' },
        {
          type: 'list',
          items: [
            'Supabase, para autenticación, base de datos, almacenamiento privado, funciones de servidor y registros operativos.',
            'OpenAI, para identificación, diagnóstico y chat mediante inteligencia artificial.',
            'Google y Apple, si utilizas sus mecanismos de inicio de sesión.',
            'Cloudflare, para seguridad, distribución y medición técnica del sitio web.',
            'Google Fonts, mientras el sitio cargue tipografías desde sus servidores.',
            'Proveedores de correo utilizados para verificación, recuperación de cuenta y comunicaciones solicitadas.',
            'Autoridades, tribunales u organismos públicos cuando exista una obligación legal.',
          ],
        },
        {
          type: 'p',
          text: 'Estos proveedores reciben únicamente la información necesaria para cumplir su función y están sujetos a sus propios términos y políticas de privacidad.',
        },
        { type: 'p', text: 'No vendemos ni arrendamos tus datos personales.' },
      ],
    },
    {
      id: 'transferencias-internacionales',
      number: '6',
      title: 'Transferencias internacionales',
      blocks: [
        {
          type: 'p',
          text: 'Algunos proveedores pueden procesar información fuera de Chile, incluyendo Estados Unidos u otros países donde mantengan infraestructura.',
        },
        {
          type: 'p',
          text: 'Cuando estas transferencias sean necesarias para prestar Flory, utilizaremos proveedores con medidas contractuales, técnicas y organizativas destinadas a proteger la información.',
        },
      ],
    },
    {
      id: 'conservacion',
      number: '7',
      title: 'Conservación',
      blocks: [
        { type: 'p', text: 'Aplicamos los siguientes criterios:' },
        {
          type: 'list',
          items: [
            'Los datos de cuenta y plantas se conservan mientras mantengas una cuenta activa.',
            'Las fotografías, diagnósticos y conversaciones se conservan mientras sean necesarios para mostrar tu historial y prestar las funciones solicitadas.',
            'Los datos entregados en el sitio web se conservan hasta por 24 meses desde tu última interacción, salvo que solicites antes su eliminación.',
            'OpenAI puede conservar temporalmente las entradas y respuestas de su API por hasta 30 días.',
            'Los registros técnicos y de seguridad se conservan durante el periodo necesario para investigar incidentes y prevenir abuso.',
            'Al solicitar la eliminación de tu cuenta, retiraremos los datos asociados de los sistemas activos en un plazo máximo de 30 días.',
            'Las copias de seguridad pueden conservarse temporalmente hasta completar su ciclo normal de reemplazo.',
            'La información verdaderamente anonimizada puede conservarse indefinidamente.',
          ],
        },
        {
          type: 'p',
          text: 'Podemos conservar determinada información durante más tiempo cuando exista una obligación legal, una investigación de seguridad o la necesidad de ejercer o defender derechos.',
        },
      ],
    },
    {
      id: 'eliminar-tu-cuenta',
      number: '8',
      title: 'Cómo eliminar tu cuenta',
      blocks: [
        { type: 'p', text: 'Puedes eliminar tu cuenta desde la aplicación:' },
        { type: 'lines', items: ['Perfil → Cuenta → Eliminar cuenta'] },
        {
          type: 'p',
          text: 'También puedes solicitar la eliminación escribiendo desde el correo asociado a tu cuenta a:',
        },
        { type: 'lines', items: ['contact@tame.cl', 'Asunto: Eliminar mi cuenta de Flory'] },
        { type: 'p', text: 'La eliminación comprende:' },
        {
          type: 'list',
          items: [
            'Cuenta y correo asociado.',
            'Plantas y fotografías.',
            'Historial de riego.',
            'Diagnósticos e imágenes.',
            'Conversaciones con Flory.',
          ],
        },
        {
          type: 'p',
          text: 'Podemos solicitar información razonable para verificar que eres titular de la cuenta.',
        },
      ],
    },
    {
      id: 'tus-derechos',
      number: '9',
      title: 'Tus derechos',
      blocks: [
        { type: 'p', text: 'Puedes solicitar:' },
        {
          type: 'list',
          items: [
            'Acceso a tus datos personales.',
            'Corrección o actualización.',
            'Eliminación.',
            'Oposición a determinados tratamientos.',
            'Limitación o suspensión cuando corresponda.',
            'Portabilidad cuando sea legal y técnicamente aplicable.',
            'Retiro de una autorización previamente otorgada.',
          ],
        },
        { type: 'p', text: 'Envía tu solicitud a contact@tame.cl desde el correo asociado a tu cuenta.' },
        { type: 'p', text: 'También puedes presentar una reclamación ante la autoridad chilena competente.' },
      ],
    },
    {
      id: 'seguridad',
      number: '10',
      title: 'Seguridad',
      blocks: [
        { type: 'p', text: 'Aplicamos medidas razonables para proteger la información, incluyendo:' },
        {
          type: 'list',
          items: [
            'Conexiones cifradas.',
            'Autenticación y sesiones protegidas.',
            'Almacenamiento privado de fotografías.',
            'Controles de acceso por usuario.',
            'Restricciones de acceso a la base de datos.',
            'Monitoreo técnico y prevención de abuso.',
          ],
        },
        {
          type: 'p',
          text: 'Ningún sistema es completamente infalible. Si detectamos un incidente que pueda afectar significativamente tus datos, actuaremos y notificaremos conforme a la legislación aplicable.',
        },
      ],
    },
    {
      id: 'menores-de-edad',
      number: '11',
      title: 'Personas menores de edad',
      blocks: [
        { type: 'p', text: 'Flory está dirigido exclusivamente a personas mayores de 18 años.' },
        {
          type: 'p',
          text: 'No recopilamos intencionalmente información de menores. Si detectamos una cuenta perteneciente a un menor, podremos suspenderla y eliminar sus datos.',
        },
      ],
    },
    {
      id: 'enlaces-externos',
      number: '12',
      title: 'Enlaces externos',
      blocks: [
        { type: 'p', text: 'La aplicación puede incluir enlaces a sitios o servicios externos, como Instagram.' },
        {
          type: 'p',
          text: 'Al abrir esos enlaces, el tratamiento de información queda sujeto a las políticas del servicio correspondiente. Tame SpA no controla las prácticas de privacidad de esos terceros.',
        },
      ],
    },
    {
      id: 'cambios',
      number: '13',
      title: 'Cambios en esta Política',
      blocks: [
        {
          type: 'p',
          text: 'Podemos actualizar esta Política para reflejar cambios legales, técnicos o funcionales.',
        },
        {
          type: 'p',
          text: 'Cuando un cambio sea importante, lo comunicaremos mediante la aplicación, correo electrónico o sitio web. La fecha indicada al comienzo identificará la versión vigente.',
        },
      ],
    },
    {
      id: 'contacto',
      number: '14',
      title: 'Contacto',
      blocks: [
        { type: 'p', text: 'Para consultas, solicitudes o reclamos relacionados con privacidad:' },
        {
          type: 'lines',
          items: [
            'Tame SpA',
            'RUT: 78.216.642-5',
            'Santiago, Chile',
            'Correo: contact@tame.cl',
            'Sitio web: https://somosflory.cl',
          ],
        },
      ],
    },
  ],
}

export const deleteAccountDoc: LegalDoc = {
  title: 'Eliminar tu cuenta de Flory',
  sections: [
    {
      id: 'como-eliminar',
      blocks: [
        { type: 'p', text: 'Puedes eliminar tu cuenta directamente desde la aplicación:' },
        {
          type: 'steps',
          items: [
            'Abre Flory.',
            'Entra en Perfil.',
            'Selecciona Cuenta.',
            'Presiona Eliminar cuenta.',
            'Revisa la información y confirma la eliminación.',
          ],
        },
        {
          type: 'p',
          text: 'También puedes solicitarla enviando un correo desde la dirección asociada a tu cuenta:',
        },
        { type: 'lines', items: ['contact@tame.cl', 'Asunto: Eliminar mi cuenta de Flory'] },
        {
          type: 'p',
          text: 'Si ya no tienes acceso a ese correo, te pediremos información limitada para verificar que eres titular de la cuenta.',
        },
        { type: 'p', text: 'Al eliminarla se borrarán:' },
        {
          type: 'list',
          items: [
            'Tu cuenta y correo asociado.',
            'Tus plantas y fotografías.',
            'Tu historial de riego.',
            'Tus diagnósticos y sus imágenes.',
            'Tus conversaciones con Flory.',
          ],
        },
        {
          type: 'p',
          text: 'La eliminación de los sistemas activos se completará en un máximo de 30 días. Algunas copias de seguridad o registros necesarios por seguridad u obligaciones legales pueden conservarse temporalmente y quedarán fuera del uso ordinario.',
        },
        { type: 'note', text: 'La eliminación es permanente y no puede deshacerse.' },
      ],
    },
  ],
}
