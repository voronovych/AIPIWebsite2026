# AiPi Solutions favicon — F2

Triangular ring-of-three mark. One SVG source, exported to all standard favicon/PWA sizes.

## Files

### Source (scalable, recommended for modern browsers)
- `favicon.svg` — white fill
- `favicon-currentcolor.svg` — uses `currentColor`, inherits from CSS `color` property. Useful if you want the favicon to adapt to a theme switcher on your site.

### Classic .ico (for older browsers at /favicon.ico)
- `favicon.ico` — dark fill, 16/32/48px bundled. Use this if your site's background is light.
- `favicon-white.ico` — white fill, 16/32/48px bundled. Use this if your site's background is dark.

### PNGs (for specific contexts)
- `favicon-white-{16,32,48,64,180,192,512}.png`
- `favicon-dark-{16,32,48,64,180,192,512}.png`

Sizes by use case:
- 16, 32, 48 — classic browser favicons
- 180 — Apple touch icon (iOS home screen)
- 192, 512 — Android/PWA manifest icons

## HTML

Minimum viable setup:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/x-icon" href="/favicon.ico">
```

Full setup (recommended):

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-dark-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-dark-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/favicon-dark-180.png">
<link rel="manifest" href="/site.webmanifest">
```

Swap `dark` for `white` in the PNG paths if the icon needs to sit on dark surfaces.

## site.webmanifest (for PWA)

```json
{
  "name": "AiPi Solutions",
  "short_name": "AiPi",
  "icons": [
    { "src": "/favicon-dark-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/favicon-dark-512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#0d1829",
  "background_color": "#ffffff",
  "display": "standalone"
}
```
