import { LegalPageShell, LegalSection } from "@/components/legal-page-shell";
import { businessInfo, hasConfiguredBusinessInfo } from "@/lib/business-info";
import { absoluteUrl, getLanguageAlternates } from "@/lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика за бисквитки | neraboti.bg",
  description: "Информация за използваните бисквитки в neraboti.bg.",
  alternates: { canonical: absoluteUrl("/cookies"), languages: getLanguageAlternates("/cookies") },
};

export default function CookiesPage() {
  return (
    <LegalPageShell
      eyebrow="Прозрачност"
      title="Политика за бисквитки"
      intro="Тази страница обяснява какво представляват бисквитките и какви типове технологии може да използва сайтът."
    >
      <LegalSection title="Какво са бисквитки">
        <p>
          Бисквитките са малки файлове или записи, които браузърът съхранява на
          устройството ви. Те помагат на сайтовете да работят правилно, да помнят
          настройки или да измерват използването на страниците.
        </p>
      </LegalSection>

      <LegalSection title="Какви бисквитки използва сайтът">
        <p>
          Към момента сайтът е подготвен да използва само необходими бисквитки и
          технически данни, нужни за нормална работа, сигурност и стабилност,
          освен ако в бъдеще не бъдат добавени analytics или маркетингови
          инструменти.
        </p>
      </LegalSection>

      <LegalSection title="Необходими бисквитки">
        <p>
          Необходимите бисквитки подпомагат основни функции като зареждане на
          страниците, защита, запомняне на технически настройки и правилна работа
          на формите.
        </p>
      </LegalSection>

      <LegalSection title="Аналитични бисквитки">
        <p>
          Ако бъде добавен analytics инструмент, той ще се използва за разбиране
          на общото поведение на посетителите и подобряване на сайта. При нужда
          ще бъде добавена допълнителна информация и механизъм за избор.
        </p>
      </LegalSection>

      <LegalSection title="Маркетингови бисквитки">
        <p>
          В момента не се използват маркетингови бисквитки за рекламно
          проследяване. Ако това се промени, политиката ще бъде актуализирана и
          ще бъде поискано съгласие, когато законът го изисква.
        </p>
      </LegalSection>

      <LegalSection title="Управление и изтриване">
        <p>
          Можете да управлявате или изтриете бисквитки от настройките на вашия
          браузър. Повечето браузъри позволяват блокиране на бисквитки, изтриване
          на вече записани данни и настройки по отделни сайтове.
        </p>
      </LegalSection>

      <LegalSection title="Контакт">
        <p>
          За въпроси относно бисквитките можете да се свържете с{" "}
          {hasConfiguredBusinessInfo.companyName ? businessInfo.companyName : businessInfo.brand} чрез страницата „Контакти“.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
