# QA checklist: booking/request flow

Use this checklist before production launch and after changes to the booking flow.

## Form validation

- [ ] Submit without selected service shows: `Моля, изберете услуга.`
- [ ] Submit without name shows under the name field: `Моля, въведете име.`
- [ ] Invalid phone, such as `123`, shows: `Моля, въведете валиден телефон.`
- [ ] Bulgarian phone formats like `08XXXXXXXX`, `+3598XXXXXXXX`, and numbers with spaces are accepted.
- [ ] Invalid email shows: `Моля, въведете валиден имейл адрес.`
- [ ] Email is optional unless preferred contact method is `Имейл`.
- [ ] Preferred contact method `Viber` without phone shows: `За връзка чрез Viber е необходим телефонен номер.`
- [ ] Submit without preferred contact method shows: `Моля, изберете предпочитан канал за връзка.`
- [ ] Submit without date shows: `Моля, изберете дата.`
- [ ] Submit without time slot shows: `Моля, изберете час.`
- [ ] Submit without problem description shows: `Моля, опишете проблема.`
- [ ] Problem description longer than 1000 characters is rejected server-side with: `Описанието е твърде дълго. Моля, съкратете го до 1000 символа.`
- [ ] Submit without GDPR consent shows: `Моля, приемете Общите условия и Политиката за поверителност, за да изпратите заявката.`
- [ ] Validation errors preserve all entered user data.
- [ ] Error summary receives focus after failed validation.

## Calendar and slots

- [ ] Calendar starts from the current month in `Europe/Sofia`.
- [ ] Past dates are disabled and cannot be selected.
- [ ] Server rejects a manually submitted past date with: `Не можете да изберете минала дата.`
- [ ] Past time slots for today are disabled in `Europe/Sofia`.
- [ ] Server rejects a manually submitted past time slot.
- [ ] Time slots use only 24-hour format: `10:00`, `11:30`, `13:30`, `15:00`, `16:30`, `18:00`.
- [ ] No `AM`/`PM` appears in Bulgarian UI.
- [ ] If all slots are unavailable for the selected day, show: `Няма свободни часове за този ден.`
- [ ] No-slots fallback shows: `Спешно? Обадете се или пишете във Viber.`
- [ ] Calendar can be used with keyboard, including Tab, Arrow keys, Home, and End.

## Backend/API

- [ ] `POST /api/booking` validates required fields server-side.
- [ ] API returns structured JSON with `success`, `errorCode`, `message`, and `fieldErrors` when relevant.
- [ ] Honeypot submissions are ignored safely.
- [ ] Rate limiting returns: `Изпратихте твърде много заявки. Моля, опитайте отново по-късно или се свържете с нас по телефон.`
- [ ] Internal server errors do not expose stack traces or private details.
- [ ] Stored request includes `timezone: "Europe/Sofia"`.
- [ ] User-provided text is trimmed and treated as plain text.
- [ ] Temporary `checkSlotAvailability(date, time)` returns unavailable for duplicate in-memory slots.
- [ ] Before production, replace in-memory persistence/rate limiting with durable database and production-grade rate limiting.

## Submission states

- [ ] Double-clicking submit creates only one request.
- [ ] Submit button is disabled while loading.
- [ ] Loading text is: `Изпращаме заявката…`
- [ ] Backend/network failure shows title: `Не успяхме да изпратим заявката.`
- [ ] Backend/network failure shows fallback phone/email message from config/placeholders.
- [ ] Successful request shows title: `Заявката е изпратена успешно.`
- [ ] Successful request shows summary: selected service, date, time, name, preferred contact method.
- [ ] Success state clearly says: `Часът е заявен, но се потвърждава от наш екип.`
- [ ] Refreshing after submit does not resubmit automatically.

## Analytics and privacy

- [ ] Vercel Analytics loads without breaking local development.
- [ ] Vercel Speed Insights loads without breaking local development.
- [ ] `cta_click_help_now` fires from the hero primary CTA.
- [ ] `cta_click_book` fires from booking CTAs.
- [ ] `service_selected` fires with service name only.
- [ ] `booking_submit_success` fires without name, phone, email, or problem description.
- [ ] `booking_submit_error` fires with non-sensitive `errorCode`.
- [ ] `anydesk_download_click` fires from official AnyDesk download CTAs.
- [ ] `phone_click` fires from sticky/no-slot phone links.
- [ ] `viber_click` fires from sticky/no-slot Viber links.
- [ ] No analytics event sends personal data.

## Accessibility regression

- [ ] All fields have visible labels.
- [ ] Error text is connected with `aria-describedby`.
- [ ] Invalid fields use `aria-invalid`.
- [ ] Success/error states use `aria-live`.
- [ ] Focus rings are visible.
- [ ] Mobile touch targets remain comfortable.
- [ ] The form can be completed using only the keyboard.
