export type Language = "BG" | "EN";

export const siteCopy = {
  EN: {
    nav: {
      services: "Services",
      pricing: "Pricing",
      remote: "Remote Setup",
      booking: "Book a Slot",
      about: "About",
      contacts: "Contacts",
      faq: "FAQ",
    },
    hero: {
      primaryCta: "Get Help Now / Book a Slot",
      secondaryCta: "Book a Slot",
      tertiaryCta: "View Pricing",
      headline: "Is your computer, network, or server not working?",
      heroLine: "Get fast IT help remotely or on-site.",
      subheadline:
        "Fast remote assistance via AnyDesk, expert on-site physical support, and professional cybersecurity audits.",
      trustLine:
        "Remote support across Bulgaria. On-site visits depend on area and prior arrangement.",
      urgentLine: "Urgent issue? Send a request and we will contact you for confirmation.",
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
          title: "Cybersecurity audit and vulnerability review",
          body: "We review public web applications, servers, and basic configurations for common risks, then provide a prioritized report with recommendations and next steps to reduce risk.",
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
      addressHelper:
        "Your real AnyDesk ID will appear inside your own AnyDesk application.",
      addressSafetyText:
        "Share your AnyDesk ID only after you have requested help and are speaking with our technician.",
      addressExampleLabel: "example",
      stepLabel: "Step",
      downloadButton: "Download AnyDesk",
      safetyTitle: "Remote Support Safety",
      safetySubtitle:
        "Remote access requires trust. We work only with your explicit permission and keep you in control of the session.",
      safetyPoints: [
        {
          title: "We never ask for your passwords.",
          description:
            "If you need to sign in to an account or system, you enter the password yourself. You do not send it to us or say it out loud.",
        },
        {
          title: "We connect only after your confirmation.",
          description:
            "The remote session starts only when you accept the connection request in AnyDesk.",
        },
        {
          title: "You see everything we do.",
          description:
            "During the session your screen remains visible to you, so you can follow every technician action.",
        },
        {
          title: "You can end the connection at any time.",
          description:
            "If you feel unsure or want to stop the session, you can disconnect immediately from AnyDesk.",
        },
        {
          title: "We do not copy files without explicit consent.",
          description:
            "We work only on the requested issue. Files are opened, moved, or copied only when necessary and after your permission.",
        },
        {
          title: "The technician identifies themselves before starting.",
          description:
            "Before the connection, you will know who you are speaking with, the goal of the session, and the actions planned.",
        },
      ],
      afterSessionTitle: "After the session ends",
      afterSessionText:
        "You receive a short summary of what was done, the result, and whether additional steps are needed. When useful, we provide recommendations for security, backups, or future support.",
      cautionText:
        "Important: Accept a remote support connection only when you are sure you are speaking with our technician and have requested a specific service. If in doubt, end the session and contact us using the official phone or email from the website.",
      remoteSupportCta: "Request remote support",
      downloadOfficialCta: "Download AnyDesk from the official website",
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
      confirm: "Изпрати заявка",
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
      consentText: "I agree to the Terms and Privacy Policy.",
      consentPrefix: "I agree to the",
      consentJoin: "and",
      termsLabel: "Terms",
      privacyLabel: "Privacy Policy",
      consentError: "Please accept the Terms and Privacy Policy to send the request.",
      consentHelper:
        "We use your data only to contact you about the request and organize the selected IT service.",
      trustText:
        "Your data is protected. We do not share your contact information with third parties for marketing purposes. We will contact you only about the requested service.",
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
        {
          title: "Business Process Audit & Automations",
          description:
            "Engineering analysis of your workflows. We identify routine tasks and replace them with custom scripts, API integrations, and intelligent automations.",
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
      times: ["10:00", "11:30", "13:30", "15:00", "16:30", "18:00"],
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
      pricing: "Цени",
      remote: "AnyDesk помощ",
      booking: "Запазете час",
      about: "За нас",
      contacts: "Контакти",
      faq: "FAQ",
    },
    hero: {
      primaryCta: "Получете помощ сега",
      secondaryCta: "Запазете час",
      tertiaryCta: "Вижте цени",
      headline: "Компютърът, мрежата или сървърът не работи?",
      heroLine: "Получете бърза IT помощ дистанционно или на място.",
      subheadline:
        "Отдалечена поддръжка чрез AnyDesk, посещения на място, офис мрежи, сървъри и киберсигурност одити за малки бизнеси и частни клиенти.",
      trustLine:
        "Работим дистанционно в цяла България. Посещения на място — според района и предварителна уговорка.",
      urgentLine: "Спешен проблем? Изпратете заявка и ще се свържем с вас за потвърждение.",
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
          title: "Киберсигурност одит и проверка за уязвимости",
          body: "Проверяваме публични уеб приложения, сървъри и основни конфигурации за често срещани рискове. Получавате ясен доклад с приоритети, препоръки и конкретни стъпки за намаляване на риска.",
        },
      ],
    },
    anydesk: {
      eyebrow: "Отдалечена помощ",
      title: "Как работи нашата отдалечена поддръжка",
      subtitle: "Получете помощ за минути, без да посещаваме офиса ви.",
      secureTitle: "Сигурна отдалечена сесия",
      secureSubtitle: "С насоки от начало до край",
      addressLabel: "Примерен AnyDesk адрес",
      addressHelper:
        "Вашият реален AnyDesk ID ще се появи във вашето приложение.",
      addressSafetyText:
        "Споделяйте своя AnyDesk ID само когато сте заявили помощ и говорите с наш техник.",
      addressExampleLabel: "пример",
      stepLabel: "Стъпка",
      downloadButton: "Изтегли AnyDesk",
      safetyTitle: "Сигурност при отдалечена помощ",
      safetySubtitle:
        "Знаем, че отдалеченият достъп изисква доверие. Затова работим само с ваше изрично разрешение и ви даваме пълен контрол върху сесията.",
      safetyPoints: [
        {
          title: "Никога не искаме вашите пароли.",
          description:
            "Ако е необходимо да влезете в профил или система, вие въвеждате паролата си сами. Не ни я изпращате и не я казвате на глас.",
        },
        {
          title: "Свързваме се само след ваше потвърждение.",
          description:
            "Отдалечената сесия започва само когато вие приемете заявката за връзка в AnyDesk.",
        },
        {
          title: "Виждате всичко, което правим.",
          description:
            "По време на сесията екранът остава видим за вас и можете да следите всяко действие на техника.",
        },
        {
          title: "Можете да прекъснете връзката по всяко време.",
          description:
            "Ако се почувствате несигурни или искате да спрете сесията, можете да я прекратите веднага от AnyDesk.",
        },
        {
          title: "Не копираме файлове без изрично съгласие.",
          description:
            "Работим само по заявения проблем. Файлове се отварят, преместват или копират само ако е необходимо и след ваше разрешение.",
        },
        {
          title: "Техникът се идентифицира преди започване.",
          description:
            "Преди връзката ще знаете с кого говорите, каква е целта на сесията и какви действия предстоят.",
        },
      ],
      afterSessionTitle: "След приключване на сесията",
      afterSessionText:
        "Получавате кратко обобщение какво е направено, какъв е резултатът и дали са нужни допълнителни стъпки. При нужда ще ви дадем препоръки за сигурност, архиви или бъдеща поддръжка.",
      cautionText:
        "Важно: При отдалечена помощ приемайте връзка само когато сте сигурни, че говорите с наш техник и сте заявили конкретна услуга. Ако имате съмнение, прекъснете сесията и се свържете с нас по официалния телефон или имейл от сайта.",
      remoteSupportCta: "Заявете отдалечена помощ",
      downloadOfficialCta: "Изтеглете AnyDesk от официалния сайт",
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
      eyebrow: "Заявка за поддръжка",
      title: "Запазете час за IT поддръжка",
      subtitle:
        "Изберете услуга, дата и удобен час. След изпращане ще се свържем с вас по телефон или Viber, за да потвърдим заявката.",
      stepOne: "Първа стъпка: Изберете услуга",
      stepTwo: "Вашите данни и график",
      contactTitle: "Данни за контакт",
      scheduleTitle: "Изберете дата и час",
      timeLabel: "Свободни часове",
      messageLabel: "Опишете проблема",
      messagePlaceholder: "Опишете какво се случва, кое устройство е засегнато и колко е спешно.",
      confirm: "Изпрати заявка",
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
      consentText:
        "Съгласен/съгласна съм с Общите условия и Политиката за поверителност.",
      consentPrefix: "Съгласен/съгласна съм с",
      consentJoin: "и",
      termsLabel: "Общите условия",
      privacyLabel: "Политиката за поверителност",
      consentError:
        "Моля, приемете Общите условия и Политиката за поверителност, за да изпратите заявката.",
      consentHelper:
        "Използваме данните ви единствено, за да се свържем с вас относно заявката и да организираме предоставянето на избраната IT услуга.",
      trustText:
        "Вашите данни са защитени. Не споделяме контактната ви информация с трети страни за маркетингови цели. Ще се свържем с вас само във връзка със заявената услуга.",
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
          title: "Киберсигурност одит и проверка за уязвимости",
          description:
            "Проверка на публични уеб приложения, сървъри и основни конфигурации за често срещани рискове с ясен доклад и препоръки.",
        },
        {
          title: "Одит и Бизнес Автоматизации",
          description:
            "Инженерен анализ на вашите работни процеси. Идентифицираме рутинните задачи и ги заменяме с персонализирани скриптове, API интеграции и интелигентни автоматизации.",
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
      times: ["10:00", "11:30", "13:30", "15:00", "16:30", "18:00"],
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
