export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="diag-lines"><span></span><span></span><span></span></div>
      <div className="container footer-top">
        <div className="footer-brand">
          <a href="/" className="footer-logo">
            <img src="/img/logo.png?v=3" alt="Envés Seguros" width="180" height="74" />
          </a>
          <p>Asesoramiento profesional en seguros, con honestidad, responsabilidad y respeto por cada cliente.</p>
          <a href="https://instagram.com/envesuy" target="_blank" rel="noopener" className="footer-social">
            <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" /></svg></span>
            <span>@envesuy</span>
          </a>
        </div>
        <div className="footer-col">
          <h5>Navegación</h5>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/seguros">Seguros</a></li>
            <li><a href="/nosotros">Nosotros</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Rubros</h5>
          <ul>
            <li><a href="/seguros#automotor">Automotor</a></li>
            <li><a href="/seguros#hogar">Hogar</a></li>
            <li><a href="/seguros#vida">Vida</a></li>
            <li><a href="/seguros#salud">Salud</a></li>
            <li><a href="/seguros-empresariales">Empresarial</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Contacto</h5>
          <ul>
            <li><a href="tel:+59891577914">+598 91 577 914</a></li>
            <li><a href="mailto:contacto@enves.com.uy">contacto@enves.com.uy</a></li>
            <li><a href="#">enves.com.uy</a></li>
            <li><a href="#">Montevideo, Uruguay</a></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© <span className="js-year">{new Date().getFullYear()}</span> Envés Seguros. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
}
