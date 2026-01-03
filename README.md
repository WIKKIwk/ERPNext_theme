# Frappe Pastel Theme

Frappe/ERPNext Desk uchun **har bir userga alohida** theme va font presetlari.

## Theme presetlar

- `soft-blue` (Soft Blue)
- `mint` (Mint)
- `warm-neutral` (Warm Neutral / bej)
- `soft-rose` (Soft Rose)
- `olive-gray` (Olive Gray)
- `calm-lavender-gray` (Calm Lavender Gray)

## Font presetlar

- `system-ui` (System UI)
- `serif` (Serif)
- `mono` (Monospace)
- `nunito` (Nunito)
- `fredoka` (Fredoka)
- `lora` (Lora)

Tanlovlar boshqa userlarga taʼsir qilmaydi.

## O‘rnatish

1) App’ni bench’ga qo‘shing (repo sifatida yoki `apps/` ichiga).

2) Site’ga o‘rnating:

```bash
bench --site <site> install-app frappe_pastel_theme
bench --site <site> migrate
bench build --app frappe_pastel_theme
```

## Ishlatish

- Desk ichida `User` menyusidan `Theme Settings` ni oching
- yoki to‘g‘ridan-to‘g‘ri ` /app/theme-settings `
- (ixtiyoriy) ` /app/pastel-theme `
