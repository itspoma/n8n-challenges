import type { Locale } from "@/lib/home-copy";

type OrganizerPhase = {
  label: string;
  title: string;
  intro: string;
  items: string[];
};

type OrganizerCopy = {
  metadataTitle: string;
  metadataDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  overviewLabel: string;
  phases: [OrganizerPhase, OrganizerPhase, OrganizerPhase];
  supplies: {
    label: string;
    balloons: string;
    balloonsDetail: string;
    helium: string;
    heliumDetail: string;
    fasteners: string;
    fastenersDetail: string;
  };
  presentation: {
    label: string;
    title: string;
    body: string;
    button: string;
  };
  tipLabel: string;
  tipTitle: string;
  tipBody: string;
  noHeliumLabel: string;
  noHeliumTitle: string;
  noHeliumBody: string;
  finishTitle: string;
  finishBody: string;
  challengesButton: string;
  eventsButton: string;
  top: string;
};

export const organizersCopy: Record<Locale, OrganizerCopy> = {
  en: {
    metadataTitle: "Organizer guide",
    metadataDescription:
      "Plan and run an n8n Balloon Challenges event, from supplies and team setup to scoring, facilitation, and wrap-up.",
    eyebrow: "Run the format anywhere",
    title: "Organize an n8n Balloon Challenges event",
    intro:
      "A practical playbook for turning the challenges into an energetic, welcoming team event. The goal is to share knowledge through assisted, friendly competition—from the first balloon to the final count.",
    overviewLabel: "Event playbook",
    phases: [
      {
        label: "Before the event",
        title: "Prepare the room and the rewards",
        intro:
          "Plan the balloon supply around your expected attendance, then check the venue rules before event day.",
        items: [
          "Buy 50 balloons in each challenge color so you have enough awards and replacements.",
          "Prepare balloon sticks or string so teams can keep their balloons together and visible.",
          "Arrange enough helium for about 100 balloons, then adjust that amount for the number of attendees and teams.",
          "Confirm whether the venue allows helium balloons. If it does not, have a regular balloon pump ready.",
          "Set up tables for teams and keep the balloons at an organizer station where progress can be checked quickly.",
        ],
      },
      {
        label: "During the event",
        title: "Balance the teams and build momentum",
        intro:
          "Keep the rules simple, reward progress quickly, and make every team’s score visible throughout the session.",
        items: [
          "Open the workshop by explaining the format and how the winner is selected. Each balloon is worth one point, and a team can earn no more than two balloons per challenge: one for the core task and one for the bonus task. The winner is the team with the most balloons when time ends, or the first team to collect all 20 balloons.",
          "Ask attendees to raise a hand if they have worked with n8n for six months or more, completed at least one commercial n8n project, or are a senior software engineer. If one group has at least two people who meet any of these criteria, ask one of them to join another team.",
          "Give one balloon for every completed core task and one extra balloon for its completed bonus task.",
          "Encourage teammates to work on different challenges in parallel. Dividing the work helps the team solve more tasks and fix blocked workflows faster.",
          "If an integration is not working for some attendees, allow them to use an equivalent service. For example, if the Trello integration does not work, they can use Notion or another tool that achieves the same task. Judge the workflow idea and result rather than the specific vendor.",
          "Award the first balloon as quickly as you can, even if the solution is not the best possible version. That early win starts the friendly competition.",
          "Do not require an ideal solution. Accept a sincere attempt when someone has worked hard and can explain what they tried.",
          "If a team is stuck and sees that someone else has completed a black-balloon challenge, encourage them to ask that team for help. This is a friendly competition: sharing knowledge is part of the format.",
        ],
      },
      {
        label: "After the event",
        title: "Celebrate, learn, and leave the venue well",
        intro:
          "Close with recognition and a short reflection while the experience is still fresh.",
        items: [
          "Count the balloons, announce the winning team, and celebrate the progress made by every group.",
          "Invite each team to share one workflow, breakthrough, or useful mistake with the room.",
          "Collect a few minutes of feedback: what felt clear, where teams got stuck, and which challenge created the most learning.",
          "Collect every balloon, stick, and piece of string. Never release balloons outdoors; reuse or dispose of the materials responsibly.",
        ],
      },
    ],
    supplies: {
      label: "Supply checklist",
      balloons: "50 per color",
      balloonsDetail: "Balloons for awards and replacements",
      helium: "About 100",
      heliumDetail: "Helium-filled balloons, adjusted to attendance",
      fasteners: "Sticks or string",
      fastenersDetail: "One way to keep each team’s balloons together",
    },
    presentation: {
      label: "Presentation example",
      title: "Start with this event slide deck",
      body:
        "Use this Google Slides presentation as an example for introducing the format, explaining the rules, and guiding attendees through the event. Make a copy and adapt it to your venue, schedule, and audience.",
      button: "Open the example presentation",
    },
    tipLabel: "The 30-minute tip",
    tipTitle: "Point teams to challenge #6",
    tipBody:
      "Connecting n8n through MCP lets attendees build with an AI assistant and can accelerate the rest of the challenge set by up to 10×.",
    noHeliumLabel: "Venue fallback",
    noHeliumTitle: "No helium? Make the score visible on a rhythm.",
    noHeliumBody:
      "Use a regular pump, then pause every 20 minutes for every team to raise its balloons. The room can see the score and the competition stays alive.",
    finishTitle: "Ready to run your event?",
    finishBody:
      "Review the challenge set, choose a venue and team size, and adapt the supply quantities to your expected attendance.",
    challengesButton: "Browse the challenges",
    eventsButton: "See community events",
    top: "Back to top",
  },
  es: {
    metadataTitle: "Guía para organizadores",
    metadataDescription:
      "Planifica y dirige un evento n8n Balloon Challenges: materiales, equipos, puntuación, facilitación y cierre.",
    eyebrow: "Lleva el formato a cualquier lugar",
    title: "Organiza un evento n8n Balloon Challenges",
    intro:
      "Una guía práctica para convertir los retos en un evento de equipo enérgico y acogedor. El objetivo es compartir conocimiento mediante una competición amistosa y asistida, desde el primer globo hasta el recuento final.",
    overviewLabel: "Guía del evento",
    phases: [
      {
        label: "Antes del evento",
        title: "Prepara la sala y las recompensas",
        intro:
          "Calcula los globos según la asistencia prevista y confirma las normas del recinto antes del evento.",
        items: [
          "Compra 50 globos de cada color de reto para tener suficientes premios y repuestos.",
          "Prepara palos o cuerda para que cada equipo mantenga sus globos juntos y visibles.",
          "Consigue helio para unos 100 globos y ajusta la cantidad al número de asistentes y equipos.",
          "Confirma si el recinto permite globos con helio. Si no los permite, lleva un inflador convencional.",
          "Prepara mesas para los equipos y guarda los globos en un puesto de organización donde puedas revisar el progreso rápidamente.",
        ],
      },
      {
        label: "Durante el evento",
        title: "Equilibra los equipos y crea impulso",
        intro:
          "Mantén unas reglas sencillas, premia el progreso con rapidez y haz visible la puntuación durante toda la sesión.",
        items: [
          "Abre el taller explicando el formato y cómo se elige al ganador. Cada globo vale un punto y un equipo puede conseguir como máximo dos globos por reto: uno por la tarea principal y otro por la adicional. Gana el equipo con más globos cuando se acaba el tiempo o el primero en conseguir los 20.",
          "Pide que levanten la mano quienes lleven seis meses o más trabajando con n8n, hayan completado al menos un proyecto comercial con n8n o sean ingenieros de software sénior. Si un grupo tiene al menos dos personas que cumplen alguno de estos criterios, pide a una que se una a otro equipo.",
          "Entrega un globo por cada tarea principal completada y un globo extra por completar su tarea adicional.",
          "Anima a los miembros del equipo a trabajar en distintos retos en paralelo. Repartir el trabajo ayuda a resolver más tareas y desbloquear workflows con mayor rapidez.",
          "Si alguna integración no funciona para ciertos asistentes, permíteles usar un servicio equivalente. Por ejemplo, si la integración de Trello no funciona, pueden usar Notion u otra herramienta que permita lograr la misma tarea. Evalúa la idea y el resultado del workflow, no el proveedor concreto.",
          "Entrega el primer globo cuanto antes, aunque la solución no sea la mejor versión posible. Esa victoria temprana pone en marcha la competición amistosa.",
          "No exijas una solución ideal. Acepta un intento sincero cuando la persona se haya esforzado y pueda explicar lo que probó.",
          "Si un equipo está atascado y ve que alguien ha completado un reto de globo negro, anímalo a pedir ayuda a ese equipo. Es una competición amistosa: compartir conocimiento forma parte del formato.",
        ],
      },
      {
        label: "Después del evento",
        title: "Celebra, aprende y cuida el recinto",
        intro:
          "Cierra con reconocimiento y una breve reflexión mientras la experiencia sigue reciente.",
        items: [
          "Cuenta los globos, anuncia al equipo ganador y celebra el progreso de todos los grupos.",
          "Invita a cada equipo a compartir un workflow, un descubrimiento o un error útil con la sala.",
          "Recoge unos minutos de comentarios: qué quedó claro, dónde se atascaron los equipos y qué reto generó más aprendizaje.",
          "Recoge todos los globos, palos y trozos de cuerda. Nunca sueltes globos al aire libre; reutiliza o desecha los materiales de forma responsable.",
        ],
      },
    ],
    supplies: {
      label: "Lista de materiales",
      balloons: "50 por color",
      balloonsDetail: "Globos para premios y repuestos",
      helium: "Unos 100",
      heliumDetail: "Globos con helio, ajustados a la asistencia",
      fasteners: "Palos o cuerda",
      fastenersDetail: "Una forma de mantener juntos los globos de cada equipo",
    },
    presentation: {
      label: "Ejemplo de presentación",
      title: "Empieza con estas diapositivas para el evento",
      body:
        "Usa esta presentación de Google Slides como ejemplo para introducir el formato, explicar las reglas y guiar a los asistentes durante el evento. Crea una copia y adáptala al recinto, el horario y el público.",
      button: "Abrir la presentación de ejemplo",
    },
    tipLabel: "El consejo de los 30 minutos",
    tipTitle: "Dirige a los equipos al reto n.º 6",
    tipBody:
      "Conectar n8n mediante MCP permite trabajar con un asistente de IA y puede acelerar hasta 10 veces el resto de los retos.",
    noHeliumLabel: "Alternativa para el recinto",
    noHeliumTitle: "¿Sin helio? Haz visible la puntuación a intervalos.",
    noHeliumBody:
      "Usa un inflador convencional y, cada 20 minutos, haz una pausa para que todos los equipos levanten sus globos. La sala verá la puntuación y la competición seguirá viva.",
    finishTitle: "¿Listo para organizar tu evento?",
    finishBody:
      "Revisa los retos, elige el recinto y el tamaño de los equipos, y adapta las cantidades de material a la asistencia prevista.",
    challengesButton: "Ver los retos",
    eventsButton: "Ver eventos de la comunidad",
    top: "Volver arriba",
  },
  uk: {
    metadataTitle: "Посібник для організаторів",
    metadataDescription:
      "Сплануйте та проведіть n8n Balloon Challenges: матеріали, команди, підрахунок балів, фасилітація й завершення.",
    eyebrow: "Проведіть подію будь-де",
    title: "Організуйте подію n8n Balloon Challenges",
    intro:
      "Практичний план, який допоможе перетворити завдання на енергійну й дружню командну подію. Мета формату — ділитися знаннями через дружнє змагання з підтримкою, від першої кульки до фінального підрахунку.",
    overviewLabel: "План події",
    phases: [
      {
        label: "До події",
        title: "Підготуйте простір і нагороди",
        intro:
          "Розрахуйте запас кульок відповідно до очікуваної кількості учасників і заздалегідь перевірте правила локації.",
        items: [
          "Придбайте по 50 кульок кожного кольору завдань, щоб вистачило на нагороди й заміну.",
          "Підготуйте палички або мотузки, щоб кульки кожної команди залишалися разом і були помітними.",
          "Підготуйте гелій приблизно для 100 кульок і скоригуйте кількість відповідно до числа учасників та команд.",
          "Уточніть, чи дозволяє локація гелієві кульки. Якщо ні, підготуйте звичайний насос.",
          "Розставте столи для команд, а кульки тримайте на столі організаторів, де можна швидко перевірити результат.",
        ],
      },
      {
        label: "Під час події",
        title: "Збалансуйте команди й підтримуйте темп",
        intro:
          "Зробіть правила простими, швидко винагороджуйте прогрес і показуйте рахунок упродовж усієї сесії.",
        items: [
          "Відкрийте воркшоп поясненням формату та правил визначення переможця. Кожна кулька дорівнює одному балу, а за одне завдання команда може отримати щонайбільше дві кульки: одну за основну частину й одну за бонус. Перемагає команда, яка матиме найбільше кульок наприкінці, або першою збере всі 20.",
          "Попросіть підняти руку тих, хто працює з n8n шість місяців або довше, виконав хоча б один комерційний проєкт із n8n або є старшим інженером-програмістом. Якщо в одній групі є щонайменше двоє таких людей, попросіть когось із них перейти до іншої команди.",
          "Видавайте одну кульку за кожне виконане основне завдання й ще одну — за виконане бонусне завдання.",
          "Заохочуйте учасників команди паралельно працювати над різними завданнями. Розподіл роботи допоможе виконати більше завдань і швидше розблокувати проблемні робочі процеси.",
          "Якщо якась інтеграція не працює в окремих учасників, дозвольте їм скористатися рівноцінним сервісом. Наприклад, якщо інтеграція Trello не працює, вони можуть використати Notion або інший інструмент, який дає змогу виконати те саме завдання. Оцінюйте ідею та результат робочого процесу, а не конкретного постачальника.",
          "Видайте першу кульку якомога швидше, навіть якщо рішення ще не найкраще. Рання перемога запускає дружнє змагання.",
          "Не вимагайте ідеального рішення. Зарахуйте щиру спробу, якщо людина доклала зусиль і може пояснити, що вона зробила.",
          "Якщо команда застрягла й бачить, що хтось уже виконав завдання з чорною кулькою, заохочуйте її попросити допомоги в цієї команди. Це дружнє змагання, і обмін знаннями є частиною формату.",
        ],
      },
      {
        label: "Після події",
        title: "Відсвяткуйте, зробіть висновки й приберіть",
        intro:
          "Завершіть подію визнанням результатів і коротким обговоренням, поки враження ще свіжі.",
        items: [
          "Порахуйте кульки, оголосіть команду-переможця й відзначте прогрес кожної групи.",
          "Запросіть кожну команду показати один робочий процес, відкриття або корисну помилку.",
          "Зберіть короткий відгук: що було зрозуміло, де команди застрягли та яке завдання дало найбільше знань.",
          "Зберіть усі кульки, палички й мотузки. Ніколи не випускайте кульки надворі; повторно використовуйте або відповідально утилізуйте матеріали.",
        ],
      },
    ],
    supplies: {
      label: "Список матеріалів",
      balloons: "50 кожного кольору",
      balloonsDetail: "Кульки для нагород і заміни",
      helium: "Приблизно 100",
      heliumDetail: "Гелієві кульки з урахуванням кількості учасників",
      fasteners: "Палички або мотузки",
      fastenersDetail: "Спосіб тримати кульки кожної команди разом",
    },
    presentation: {
      label: "Приклад презентації",
      title: "Почніть із цієї презентації для події",
      body:
        "Використайте цю презентацію Google Slides як приклад для знайомства з форматом, пояснення правил і супроводу учасників під час події. Створіть копію та адаптуйте її до локації, розкладу й аудиторії.",
      button: "Відкрити приклад презентації",
    },
    tipLabel: "Порада через 30 хвилин",
    tipTitle: "Спрямуйте команди до завдання № 6",
    tipBody:
      "Підключення n8n через MCP дає змогу працювати з ШІ-помічником і може пришвидшити виконання решти завдань до 10 разів.",
    noHeliumLabel: "Запасний варіант для локації",
    noHeliumTitle: "Без гелію? Показуйте рахунок за розкладом.",
    noHeliumBody:
      "Використовуйте звичайний насос і кожні 20 хвилин робіть паузу, щоб усі команди підняли кульки. Зала побачить рахунок, а змагання збереже темп.",
    finishTitle: "Готові провести свою подію?",
    finishBody:
      "Перегляньте завдання, оберіть локацію й розмір команд і адаптуйте кількість матеріалів до очікуваної кількості учасників.",
    challengesButton: "Переглянути завдання",
    eventsButton: "Події спільноти",
    top: "Повернутися нагору",
  },
};
