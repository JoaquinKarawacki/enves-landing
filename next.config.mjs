/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/nosotros.html", destination: "/nosotros", permanent: true },
      { source: "/seguros.html", destination: "/seguros", permanent: true },
      { source: "/seguros-empresariales.html", destination: "/seguros-empresariales", permanent: true },
      { source: "/servicios.html", destination: "/servicios", permanent: true },
      { source: "/siniestros.html", destination: "/siniestros", permanent: true },
      { source: "/contacto.html", destination: "/contacto", permanent: true },
    ];
  },
};

export default nextConfig;
