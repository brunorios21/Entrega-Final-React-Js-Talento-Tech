import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Greeting.module.css';

export default function Greeting() {
  return (
    <section className={styles.homeSection}>
      <div className={styles.hero}>
        <div>
          <p className={styles.label}>Black Frame Studio</p>
          <h1>Equipo fotográfico confiable para tu proyecto creativo</h1>
          <p className={styles.subtitle}>
            Encuentra cámaras, lentes y accesorios seleccionados para fotografía profesional, contenido multimedia y producciones creativas.
          </p>
          <div className={styles.ctaGroup}>
            <Link to="/productos" className={styles.primaryButton}>Ver productos</Link>
            <Link to="/contacto" className={styles.secondaryButton}>Contáctanos</Link>
          </div>
        </div>
        <div className={styles.heroInfo}>
          <div className={styles.card}>
            <h3>Servicio a medida</h3>
            <p>Asesoría personalizada para elegir el equipo adecuado según tu objetivo y presupuesto.</p>
          </div>
          <div className={styles.card}>
            <h3>Entrega segura</h3>
            <p>Despachos rápidos y empaques pensados para cuidar tu equipo desde la tienda hasta tu estudio.</p>
          </div>
          <div className={styles.card}>
            <h3>Productos verificados</h3>
            <p>Catálogo con garantía y equipos de marcas reconocidas para producciones profesionales.</p>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <img src="/images/fondoPantalla.jpg" alt="Black Frame visual" />
        </div>
      </div>

      <div className={styles.about}> 
        <div className={styles.aboutText}>
          <h2>Lo que ofrecemos</h2>
          <p>
            Somos una tienda especializada en equipos fotográficos que acompaña a fotógrafos, creadores de contenido y estudios.
            Nuestro objetivo es brindar soluciones claras y asesoramiento técnico para que cada compra sea una inversión segura.
          </p>
        </div>
        <div className={styles.aboutStats}>
          <div className={styles.statCard}>
            <strong>15+</strong>
            <span>Años de experiencia</span>
          </div>
          <div className={styles.statCard}>
            <strong>250+</strong>
            <span>Clientes satisfechos</span>
          </div>
          <div className={styles.statCard}>
            <strong>100%</strong>
            <span>Asesoramiento técnico</span>
          </div>
        </div>
      </div>

      <div className={styles.values}>
        <div className={styles.valueCard}>
          <h3>Calidad</h3>
          <p>Seleccionamos equipos que cumplen con estándares profesionales para uso editorial y de contenidos.</p>
        </div>
        <div className={styles.valueCard}>
          <h3>Transparencia</h3>
          <p>Precios claros y descripción completa de cada producto para que compres con confianza.</p>
        </div>
        <div className={styles.valueCard}>
          <h3>Soporte</h3>
          <p>Atención rápida y respuesta técnica para que no pierdas tiempo buscando soluciones.</p>
        </div>
      </div>
    </section>
  );
}

