const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23f39236' d='M2 3l6 15 2-6 6 6 3-3-6-6 6-2L2 3z'/%3E%3C/svg%3E";

export const metadata = {
  title: {
    template: "%s",
    default: "Envés Seguros — Asesoramiento profesional en seguros",
  },
  icons: { icon: FAVICON },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body>
        {children}
        <script src="/js/main.js"></script>
      </body>
    </html>
  );
}
