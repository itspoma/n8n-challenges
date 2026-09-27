import type { Locale } from "@/lib/home-copy";

type AboutSection = {
  kicker: string;
  title: string;
  body: string[];
};

type AboutCopy = {
  metadataTitle: string;
  metadataDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  why: AboutSection;
  use: AboutSection & {
    organizersLink: string;
    eventsLink: string;
    challengesLink: string;
  };
  contribute: AboutSection & {
    guideLink: string;
    repositoryLink: string;
  };
  maintainer: {
    kicker: string;
    title: string;
    services: string;
  };
};

export const aboutCopy: Record<Locale, AboutCopy> = {
  en: {
    metadataTitle: "About",
    metadataDescription:
      "Why n8n Balloon Challenges exists, how to use it on your own or at a community event, how to contribute, and who maintains it.",
    eyebrow: "About the project",
    title: "A community project for learning n8n by doing.",
    intro:
      "Hands-on challenges to learn at your own pace, and community events where balloons make progress visible.",
    why: {
      kicker: "Why it exists",
      title: "Knowledge sticks when you build it and share it.",
      body: [
        "The site is a free collection of practical n8n challenges. You choose one, build a working workflow in your own n8n environment, and use the tips and the solution whenever you get stuck. The same challenges power in-person community workshops, where every workflow a mentor approves earns a balloon, so progress is visible across the room.",
        "The website is deliberately simple: it is free to use, needs no account, and stores no participant data. Challenges, tips, and events are public Markdown files, available in English, Spanish, and Ukrainian.",
      ],
    },
    use: {
      kicker: "How it is used",
      title: "Made for learners, organizers, and mentors.",
      body: [
        "Anyone can practice on their own, at any time, with the challenges and the blog – no event needed.",
        "At an event, mentors review each working workflow in person and hand out the matching balloon. The website itself never approves or records anything.",
        "Community organizers can run the format anywhere with the organizer guide and list their public events in the events directory, where every event credits its organizers.",
      ],
      organizersLink: "Organizer guide",
      eventsLink: "Events",
      challengesLink: "Challenges",
    },
    contribute: {
      kicker: "Contribute",
      title: "Improve it through GitHub.",
      body: [
        "The project is built so community organizers and n8n Ambassadors can improve it through ordinary pull requests – no CMS or deployment access needed.",
        "Fix or translate a challenge, propose a new one, or add your community event. Contributors can credit themselves on the challenges they create.",
      ],
      guideLink: "Contribution guide",
      repositoryLink: "GitHub repository",
    },
    maintainer: {
      kicker: "Maintainer",
      title: "Who maintains it",
      services:
        "Roman also runs team trainings and n8n consulting – get in touch on LinkedIn.",
    },
  },
  es: {
    metadataTitle: "Acerca de",
    metadataDescription:
      "Por qué existe n8n Balloon Challenges, cómo usarlo por tu cuenta o en un evento de la comunidad, cómo contribuir y quién lo mantiene.",
    eyebrow: "Sobre el proyecto",
    title: "Un proyecto comunitario para aprender n8n practicando.",
    intro:
      "Retos prácticos para aprender a tu ritmo y eventos de la comunidad donde los globos hacen visible el progreso.",
    why: {
      kicker: "Por qué existe",
      title: "El conocimiento perdura cuando lo construyes y lo compartes.",
      body: [
        "El sitio es una colección gratuita de retos prácticos de n8n. Eliges uno, creas un workflow funcional en tu propio entorno de n8n y recurres a las pistas y a la solución cuando te atascas. Los mismos retos se usan en talleres presenciales de la comunidad, donde cada workflow que aprueba un mentor gana un globo, así el progreso se ve en toda la sala.",
        "La web es sencilla a propósito: es gratuita, no necesita cuenta y no guarda datos de participantes. Los retos, las pistas y los eventos son archivos Markdown públicos, disponibles en inglés, español y ucraniano.",
      ],
    },
    use: {
      kicker: "Cómo se usa",
      title: "Pensado para quienes aprenden, organizadores y mentores.",
      body: [
        "Cualquiera puede practicar por su cuenta, en cualquier momento, con los retos y el blog – sin necesidad de un evento.",
        "En un evento, los mentores revisan en persona cada workflow funcional y entregan el globo correspondiente. La web nunca aprueba ni registra nada.",
        "Quienes organizan comunidades pueden llevar el formato a cualquier lugar con la guía para organizadores y publicar sus eventos en el directorio, donde cada evento menciona a quienes lo organizan.",
      ],
      organizersLink: "Guía para organizadores",
      eventsLink: "Eventos",
      challengesLink: "Retos",
    },
    contribute: {
      kicker: "Contribuye",
      title: "Mejóralo a través de GitHub.",
      body: [
        "El proyecto está pensado para que organizadores de comunidades y n8n Ambassadors lo mejoren con pull requests normales – sin CMS ni acceso al despliegue.",
        "Corrige o traduce un reto, propón uno nuevo o añade tu evento de comunidad. Quien crea un reto puede añadir su nombre como crédito.",
      ],
      guideLink: "Guía de contribución",
      repositoryLink: "Repositorio en GitHub",
    },
    maintainer: {
      kicker: "Responsable",
      title: "Quién lo mantiene",
      services:
        "Roman también imparte formaciones para equipos y consultoría de n8n – puedes contactar por LinkedIn.",
    },
  },
  uk: {
    metadataTitle: "Про проєкт",
    metadataDescription:
      "Навіщо існує n8n Balloon Challenges, як ним користуватися самостійно чи на події спільноти, як долучитися і хто підтримує проєкт.",
    eyebrow: "Про проєкт",
    title: "Спільнотний проєкт, щоб вивчати n8n на практиці.",
    intro:
      "Практичні завдання, щоб навчатися у власному темпі, і події спільноти, де кульки роблять прогрес помітним.",
    why: {
      kicker: "Навіщо він існує",
      title: "Знання закріплюються, коли ти створюєш і ділишся.",
      body: [
        "Сайт – це безкоштовна добірка практичних завдань з n8n. Ви обираєте завдання, створюєте робочий воркфлоу у власному середовищі n8n і користуєтеся підказками та рішенням, коли застрягаєте. Ці ж завдання лежать в основі практичних воркшопів спільноти, де кожен воркфлоу, схвалений ментором, приносить кульку, тож прогрес видно всій залі.",
        "Сайт навмисно простий: він безкоштовний, не потребує облікового запису й не зберігає даних учасників. Завдання, підказки та події – це публічні Markdown-файли англійською, іспанською та українською.",
      ],
    },
    use: {
      kicker: "Як ним користуються",
      title: "Для тих, хто вчиться, організаторів і менторів.",
      body: [
        "Кожен може практикуватися самостійно в будь-який час із завданнями та блогом – подія для цього не потрібна.",
        "На події ментори особисто перевіряють кожен робочий воркфлоу й вручають відповідну кульку. Сам сайт нічого не схвалює і не записує.",
        "Організатори спільнот можуть провести формат будь-де за посібником для організаторів і додати свої публічні події до каталогу, де кожна подія вказує своїх організаторів.",
      ],
      organizersLink: "Посібник для організаторів",
      eventsLink: "Події",
      challengesLink: "Завдання",
    },
    contribute: {
      kicker: "Долучайтеся",
      title: "Покращуйте проєкт через GitHub.",
      body: [
        "Проєкт створено так, щоб організатори спільнот і n8n Ambassadors могли покращувати його звичайними pull request – без CMS чи доступу до розгортання.",
        "Виправте або перекладіть завдання, запропонуйте нове чи додайте свою подію. Нові завдання можуть вказувати, хто їх створює.",
      ],
      guideLink: "Посібник для учасників",
      repositoryLink: "Репозиторій на GitHub",
    },
    maintainer: {
      kicker: "Підтримка проєкту",
      title: "Хто підтримує проєкт",
      services:
        "Роман також проводить навчання для команд і консультації з n8n – зв’язатися можна в LinkedIn.",
    },
  },
};
