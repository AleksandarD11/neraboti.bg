import { LegalPageShell, LegalSection } from "@/components/legal-page-shell";
import { businessInfo, hasConfiguredBusinessInfo } from "@/lib/business-info";
import { absoluteUrl, getLanguageAlternates } from "@/lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика за поверителност | neraboti.bg",
  description: "Как neraboti.bg обработва лични данни при заявки за IT услуги.",
  alternates: { canonical: absoluteUrl("/privacy"), languages: getLanguageAlternates("/privacy") },
};

export default function PrivacyPage() {
  return (
    <LegalPageShell
      eyebrow="GDPR"
      title="Политика за поверителност"
      intro="Тази политика обяснява какви лични данни обработваме, защо са ни необходими и какви права имате като потребител."
    >
      <LegalSection title="Администратор на личните данни">
        <p>Администратор: {hasConfiguredBusinessInfo.companyName ? businessInfo.companyName : businessInfo.brand}</p>
        {hasConfiguredBusinessInfo.companyId ? <p>ЕИК: {businessInfo.companyId}</p> : null}
        {hasConfiguredBusinessInfo.address ? <p>Адрес: {businessInfo.address}</p> : null}
        <p>Контакт за лични данни: чрез формата за заявка или страницата „Контакти“.</p>
      </LegalSection>

      <LegalSection title="Какви данни събираме">
        <p>
          Чрез формата за заявка можем да събираме име, телефон, имейл, избрана
          услуга, предпочитана дата и час, както и описание на техническия проблем
          или нужда.
        </p>
      </LegalSection>

      <LegalSection title="Защо събираме данните">
        <p>
          Използваме данните, за да обработим заявката, да се свържем с клиента,
          да организираме предоставяне на избраната услуга и да водим последваща
          комуникация, когато е необходима.
        </p>
      </LegalSection>

      <LegalSection title="Правно основание">
        <p>
          Обработването може да се основава на предприемане на стъпки по заявка
          на клиента преди договор, изпълнение на договор, легитимен интерес за
          коректна комуникация и защита на услугата, както и съгласие, когато е
          приложимо.
        </p>
      </LegalSection>

      <LegalSection title="Срок за съхранение">
        <p>
          Данните се пазят само толкова дълго, колкото е необходимо за обработка
          на заявката, предоставяне на услугата, последваща комуникация и
          изпълнение на законови или счетоводни изисквания, ако такива са
          приложими.
        </p>
      </LegalSection>

      <LegalSection title="Кой има достъп">
        <p>
          Достъп имат само хората, които участват в обработката на заявката и
          предоставянето на услугата. Не продаваме и не предоставяме контактни
          данни на трети страни за маркетингови цели.
        </p>
      </LegalSection>

      <LegalSection title="Външни услуги">
        <p>
          В зависимост от техническата настройка сайтът може да използва hosting
          доставчик, имейл доставчик, календарна интеграция, комуникационни
          инструменти или analytics. Когато такива услуги обработват данни, това
          се прави само за работата на сайта, комуникацията и предоставянето на
          услугата.
        </p>
      </LegalSection>

      <LegalSection title="Права на потребителя">
        <p>
          Имате право на достъп, корекция, изтриване, ограничаване на
          обработването, възражение срещу обработване и жалба до Комисията за
          защита на личните данни, когато смятате, че правата ви са нарушени.
        </p>
      </LegalSection>

      <LegalSection title="Контакт относно лични данни">
        <p>
          За въпроси относно обработването на лични данни можете да се свържете с нас чрез формата за заявка или страницата „Контакти“.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
