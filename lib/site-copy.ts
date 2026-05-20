export type Language = "BG" | "EN";

export const siteCopy = {
  EN: {
    nav: {
      services: "Services",
      remote: "Remote Setup",
      booking: "Book a Slot",
      about: "About",
    },
    hero: {
      primaryCta: "Get Help Now / Book a Slot",
      secondaryCta: "Our Services",
      headline: "Instant & Reliable IT Support When You Need It.",
      subheadline:
        "Fast remote assistance via AnyDesk, expert on-site physical support, and professional cybersecurity audits.",
    },
    services: {
      eyebrow: "Core Services",
      title: "IT Support That Gets You Back to Work Fast",
      subtitle:
        "Remote fixes, on-site help, infrastructure care, and cybersecurity audits when your systems need deeper protection.",
      cards: [
        {
          title: "Remote IT Support (AnyDesk)",
          body: "Instant software and OS fixes, troubleshooting, installations, and problem resolution without waiting. We connect securely and fix it fast.",
        },
        {
          title: "On-Site Physical Support",
          body: "Hands-on hardware repairs, office network setups, diagnostics, and physical infrastructure maintenance directly at your office or home.",
        },
        {
          title: "Server & Infrastructure Management",
          body: "Ongoing maintenance for your workstations, servers, and cloud environments.",
        },
        {
          title: "Cybersecurity & Vulnerability Audits",
          body: "Premium secondary asset audit: web app and server scanning to prevent hacker exploits and data breaches.",
        },
      ],
    },
    anydesk: {
      eyebrow: "Remote Setup",
      title: "How Our Remote Support Works",
      subtitle: "Get help in minutes without us stepping foot in your office.",
      secureTitle: "Secure remote session",
      secureSubtitle: "Guided start to finish",
      addressLabel: "Your address",
      stepLabel: "Step",
      downloadButton: "Download AnyDesk",
      steps: [
        {
          title: "Download AnyDesk",
          body: "Use the official AnyDesk download page so our technician can connect through a trusted remote support client.",
          cta: true,
        },
        {
          title: "Install & Open",
          body: "Run the downloaded file and keep the AnyDesk window open on the device that needs support.",
        },
        {
          title: "Share Your ID",
          body: "Provide the 9-digit address shown in AnyDesk to your assigned technician.",
        },
        {
          title: "Accept Connection",
          body: "When the technician connects, click the green Accept button and keep your device nearby.",
        },
      ],
    },
    booking: {
      eyebrow: "Scheduling",
      title: "Book Your Expert IT Support Slot",
      subtitle: "Fast help for your computers, servers, and infrastructure.",
      stepOne: "First Step: Select Service",
      stepTwo: "Your Details & Schedule",
      contactTitle: "Contact Details",
      scheduleTitle: "Choose Date & Time",
      timeLabel: "Available Time Slots",
      messageLabel: "Describe the issue",
      messagePlaceholder: "Tell us what is happening, what device is affected, and how urgent it is.",
      confirm: "Book My Slot / Get Instant Support",
      incomplete: "Please choose a service, date, time, and complete name, email, and phone.",
      selectedService: "Selected service",
      today: "Today",
      unavailable: "Unavailable",
      modalTitle: "Your request is ready!",
      modalText:
        "Because you are on a computer, scan the code with your phone or click to send the prepared message through Viber.",
      qrLabel: "Viber QR placeholder",
      sendViber: "Send via Viber",
      copyData: "Copy Details",
      copied: "Details copied.",
      viberMessage:
        "New website request:\nName: {name}\nPhone: {phone}\nEmail: {email}\nService: {service}\nDate: {date} at {time}\nDescription: {description}",
      form: {
        name: "Name",
        email: "Email",
        phone: "Phone",
      },
      serviceCards: [
        {
          title: "Remote Support (AnyDesk)",
          description: "Fast remote troubleshooting, software setup, OS fixes, and diagnostics.",
        },
        {
          title: "On-Site Physical Support",
          description: "Hardware repairs, office network setup, device checks, and diagnostics.",
        },
        {
          title: "Server & Infrastructure Management",
          description: "Maintenance for servers, workstations, cloud environments, and backups.",
        },
        {
          title: "Cybersecurity Audit",
          description: "Premium vulnerability scanning for web apps, servers, and exposed assets.",
        },
      ],
      weekdays: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      times: ["10:00 AM", "11:30 AM", "13:30 PM", "15:00 PM", "16:30 PM", "18:00 PM"],
    },
    about: {
      eyebrow: "About Us",
      title: "About neraboti.bg",
      body: "We are a team of three IT specialists united by a clear goal: providing uncompromising IT support and cybersecurity. We don't just \"fix computers\" - we build stable infrastructure and solve your problems instantly, whether remotely or on-site. We rely on fast response times, total transparency, and long-term solutions.",
      badges: ["⚡ Instant Response", "🔒 Security First", "🤝 Expert Approach"],
      footerLeft: "neraboti.bg IT Support",
      footerRight: "Remote support, on-site assistance, audits, and infrastructure care.",
    },
  },
  BG: {
    nav: {
      services: "Услуги",
      remote: "AnyDesk помощ",
      booking: "Запази час",
      about: "За нас",
    },
    hero: {
      primaryCta: "Получете помощ / Запази час",
      secondaryCta: "Нашите услуги",
      headline: "Бърза и надеждна IT поддръжка точно когато ви трябва.",
      subheadline:
        "Бърза отдалечена помощ чрез AnyDesk, експертна поддръжка на място и професионални киберсигурност одити.",
    },
    services: {
      eyebrow: "Основни услуги",
      title: "IT поддръжка, която бързо ви връща към работа",
      subtitle:
        "Отдалечени поправки, помощ на място, грижа за инфраструктурата и киберсигурност одити, когато системите ви имат нужда от по-дълбока защита.",
      cards: [
        {
          title: "Отдалечена IT поддръжка (AnyDesk)",
          body: "Моментни поправки на софтуер и операционни системи, диагностика, инсталации и бързо решение без чакане. Свързваме се сигурно и поправяме проблема.",
        },
        {
          title: "Физическа поддръжка на място",
          body: "Хардуерни ремонти, настройка на офис мрежи, диагностика и поддръжка на физическа инфраструктура директно във вашия офис или дом.",
        },
        {
          title: "Управление на сървъри и инфраструктура",
          body: "Постоянна поддръжка на работни станции, сървъри и cloud среди.",
        },
        {
          title: "Киберсигурност и одити за уязвимости",
          body: "Премиум вторичен одит на активи: сканиране на уеб приложения и сървъри за предотвратяване на пробиви и изтичане на данни.",
        },
      ],
    },
    anydesk: {
      eyebrow: "Отдалечена помощ",
      title: "Как работи нашата отдалечена поддръжка",
      subtitle: "Получете помощ за минути, без да посещаваме офиса ви.",
      secureTitle: "Сигурна отдалечена сесия",
      secureSubtitle: "С насоки от начало до край",
      addressLabel: "Вашият адрес",
      stepLabel: "Стъпка",
      downloadButton: "Изтегли AnyDesk",
      steps: [
        {
          title: "Изтеглете AnyDesk",
          body: "Използвайте официалната страница за изтегляне на AnyDesk, за да може техникът ни да се свърже чрез надежден клиент за отдалечена поддръжка.",
          cta: true,
        },
        {
          title: "Инсталирайте и отворете",
          body: "Стартирайте изтегления файл и оставете прозореца на AnyDesk отворен на устройството, което има нужда от помощ.",
        },
        {
          title: "Споделете вашето ID",
          body: "Дайте 9-цифрения адрес, показан в AnyDesk, на назначения техник.",
        },
        {
          title: "Приемете връзката",
          body: "Когато техникът се свърже, натиснете зеления бутон Accept и останете близо до устройството.",
        },
      ],
    },
    booking: {
      eyebrow: "Запазване",
      title: "Запазете своя час за експертна ИТ поддръжка",
      subtitle: "Бърза помощ за вашите компютри, сървъри и инфраструктура.",
      stepOne: "Първа стъпка: Изберете услуга",
      stepTwo: "Вашите данни и график",
      contactTitle: "Данни за контакт",
      scheduleTitle: "Изберете дата и час",
      timeLabel: "Свободни часове",
      messageLabel: "Опишете проблема",
      messagePlaceholder: "Опишете какво се случва, кое устройство е засегнато и колко е спешно.",
      confirm: "Запази час / Получи бърза помощ",
      incomplete: "Моля, изберете услуга, дата, час и попълнете име, имейл и телефон.",
      selectedService: "Избрана услуга",
      today: "Днес",
      unavailable: "Недостъпно",
      modalTitle: "Заявката е готова!",
      modalText:
        "Тъй като сте на компютър, моля, сканирайте кода с телефона си или кликнете, за да изпратите готовото съобщение през Viber.",
      qrLabel: "Viber QR placeholder",
      sendViber: "Изпрати през Viber",
      copyData: "Копирай данните",
      copied: "Данните са копирани.",
      viberMessage:
        "Ново запитване от сайт:\nИме: {name}\nТел: {phone}\nИмейл: {email}\nУслуга: {service}\nДата: {date} в {time}\nОписание: {description}",
      form: {
        name: "Име",
        email: "Имейл",
        phone: "Телефон",
      },
      serviceCards: [
        {
          title: "Отдалечена поддръжка (AnyDesk)",
          description: "Бърза диагностика, настройка на софтуер, поправки на ОС и отдалечено съдействие.",
        },
        {
          title: "Физическа поддръжка на място",
          description: "Хардуерни ремонти, настройка на офис мрежи, проверки на устройства и диагностика.",
        },
        {
          title: "Управление на сървъри и инфраструктура",
          description: "Поддръжка на сървъри, работни станции, cloud среди, архиви и администриране.",
        },
        {
          title: "Киберсигурност одит",
          description: "Премиум сканиране за уязвимости на уеб приложения, сървъри и публични активи.",
        },
      ],
      weekdays: ["ПОН", "ВТО", "СРЯ", "ЧЕТ", "ПЕТ", "СЪБ", "НЕД"],
      months: [
        "Януари",
        "Февруари",
        "Март",
        "Април",
        "Май",
        "Юни",
        "Юли",
        "Август",
        "Септември",
        "Октомври",
        "Ноември",
        "Декември",
      ],
      times: ["10:00 AM", "11:30 AM", "13:30 PM", "15:00 PM", "16:30 PM", "18:00 PM"],
    },
    about: {
      eyebrow: "За нас",
      title: "За neraboti.bg",
      body: "Ние сме екип от трима специалисти, обединени от една ясна цел: да предоставяме безкомпромисна ИТ поддръжка и киберсигурност. Не просто \"поправяме компютри\" - ние изграждаме стабилна инфраструктура и решаваме проблемите ви светкавично, независимо дали дистанционно, или на място. Залагаме на бърза реакция, пълна прозрачност и дългосрочни решения.",
      badges: ["⚡ Светкавична реакция", "🔒 Сигурност на първо място", "🤝 Експертен подход"],
      footerLeft: "neraboti.bg IT поддръжка",
      footerRight: "Отдалечена помощ, поддръжка на място, одити и грижа за инфраструктурата.",
    },
  },
} as const;

export type SiteCopy = (typeof siteCopy)[Language];
