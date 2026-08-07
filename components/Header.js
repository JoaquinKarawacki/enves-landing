function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header({ active }) {
  return (
    <>
      <header className="site-header">
        <div className="container">
          <a href="/" className="brand">
            <img src="/img/logo.png?v=3" alt="Envés Seguros" width="296" height="122" />
          </a>
          <nav className="main-nav">
            <a href="/" className={cx(active === "inicio" && "active")}>Inicio</a>
            <a href="/nosotros" className={cx(active === "nosotros" && "active")}>Nosotros</a>
            <div className="nav-item has-dropdown">
              <button type="button" className={cx("nav-link dropdown-trigger", active === "empresariales" && "active")} aria-expanded="false">
                Seguros Empresariales
                <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              <div className="dropdown-panel">
                <a href="/seguros-empresariales">Ver todos</a>
                <a href="/seguros-empresariales#accidentes-trabajo">Accidentes de Trabajo</a>
                <a href="/seguros-empresariales#colectivos-vida">Colectivos de Vida</a>
                <a href="/seguros-empresariales#construccion-montaje">Construcción y Montaje</a>
                <a href="/seguros-empresariales#pequenas-medianas-obras">Pequeñas y Medianas Obras</a>
                <a href="/seguros-empresariales#equipos-electronicos">Equipos Electrónicos</a>
                <a href="/seguros-empresariales#copropiedades">Copropiedades</a>
                <a href="/seguros-empresariales#pymes">Pymes</a>
                <a href="/seguros-empresariales#multirriesgo">Multirriesgo</a>
                <a href="/seguros-empresariales#flotas">Flotas</a>
                <a href="/seguros-empresariales#credito-exportacion">Crédito a la Exportación</a>
                <a href="/seguros-empresariales#fianzas">Fianzas</a>
                <a href="/seguros-empresariales#rc-operativa-productos">RC Operativa y de Productos</a>
                <a href="/seguros-empresariales#rc-profesional">RC Profesional</a>
                <a href="/seguros-empresariales#rc-directores-gerentes">RC de Directores y Gerentes</a>
              </div>
            </div>
            <div className="nav-item has-dropdown">
              <button type="button" className={cx("nav-link dropdown-trigger", active === "personales" && "active")} aria-expanded="false">
                Seguros Personales
                <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              <div className="dropdown-panel">
                <a href="/seguros#automotor">Automóviles</a>
                <a href="/seguros#bicicletas">Bicicletas</a>
                <a href="/seguros#viajes">De viaje</a>
                <a href="/seguros#embarcaciones">Embarcaciones de placer</a>
                <a href="/seguros#garantias-alquiler">Garantías de alquiler</a>
                <a href="/seguros#hogar">Hogar</a>
                <a href="/seguros#mascotas">Mascotas</a>
                <a href="/seguros#vida">Vida</a>
                <a href="/seguros#incendio">Incendio</a>
              </div>
            </div>
            <a href="/promociones" className={cx(active === "promociones" && "active")}>Promociones</a>
            <a href="/servicios" className={cx(active === "servicios" && "active")}>Servicios</a>
            <a href="/siniestros" className={cx(active === "siniestros" && "active")}>Siniestros</a>
            <a href="/contacto" className={cx(active === "contacto" && "active")}>Contacto</a>
          </nav>
          <div className="header-actions">
            <a href="tel:+59891577914" className="header-phone">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              +598 91 577 914
            </a>
            <a href="/contacto" className="btn btn-primary btn-sm">
              Cotizá ahora
              <span className="icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
              </span>
            </a>
          </div>
          <button className="hamburger" aria-label="Abrir menú"><span></span><span></span><span></span></button>
        </div>
      </header>

      <div className="mobile-menu">
        <a href="/">Inicio</a>
        <a href="/nosotros">Nosotros</a>
        <div className="mm-group">
          <button type="button" className="mm-trigger">Seguros Empresariales
            <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
          </button>
          <div className="mm-submenu"><div className="mm-submenu-inner">
            <a href="/seguros-empresariales">Ver todos</a>
            <a href="/seguros-empresariales#accidentes-trabajo">Accidentes de Trabajo</a>
            <a href="/seguros-empresariales#colectivos-vida">Colectivos de Vida</a>
            <a href="/seguros-empresariales#construccion-montaje">Construcción y Montaje</a>
            <a href="/seguros-empresariales#pequenas-medianas-obras">Pequeñas y Medianas Obras</a>
            <a href="/seguros-empresariales#equipos-electronicos">Equipos Electrónicos</a>
            <a href="/seguros-empresariales#copropiedades">Copropiedades</a>
            <a href="/seguros-empresariales#pymes">Pymes</a>
            <a href="/seguros-empresariales#multirriesgo">Multirriesgo</a>
            <a href="/seguros-empresariales#flotas">Flotas</a>
            <a href="/seguros-empresariales#credito-exportacion">Crédito a la Exportación</a>
            <a href="/seguros-empresariales#fianzas">Fianzas</a>
            <a href="/seguros-empresariales#rc-operativa-productos">RC Operativa y de Productos</a>
            <a href="/seguros-empresariales#rc-profesional">RC Profesional</a>
            <a href="/seguros-empresariales#rc-directores-gerentes">RC de Directores y Gerentes</a>
          </div></div>
        </div>
        <div className="mm-group">
          <button type="button" className="mm-trigger">Seguros Personales
            <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
          </button>
          <div className="mm-submenu"><div className="mm-submenu-inner">
            <a href="/seguros#automotor">Automóviles</a>
            <a href="/seguros#bicicletas">Bicicletas</a>
            <a href="/seguros#viajes">De viaje</a>
            <a href="/seguros#embarcaciones">Embarcaciones de placer</a>
            <a href="/seguros#garantias-alquiler">Garantías de alquiler</a>
            <a href="/seguros#hogar">Hogar</a>
            <a href="/seguros#mascotas">Mascotas</a>
            <a href="/seguros#vida">Vida</a>
            <a href="/seguros#incendio">Incendio</a>
          </div></div>
        </div>
        <a href="/promociones">Promociones</a>
        <a href="/servicios">Servicios</a>
        <a href="/siniestros">Siniestros</a>
        <a href="/contacto">Contacto</a>
        <span className="mm-contact">+598 91 577 914 · contacto@enves.com.uy</span>
      </div>

      <a href="https://wa.me/59891577914" target="_blank" rel="noopener" className="whatsapp-float" aria-label="Escribir por WhatsApp">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 8.4 8.4 0 0 1-4-1L3 20l1.1-5.4A8.5 8.5 0 1 1 21 11.5z" /></svg>
      </a>
    </>
  );
}
