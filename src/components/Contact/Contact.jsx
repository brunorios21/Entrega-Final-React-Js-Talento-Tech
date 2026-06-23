import React from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section className={styles.contactPage}>
      <div className={styles.contactIntro}>
        <span className={styles.overline}>Contacto</span>
        <h1>Asesoría profesional para tus proyectos fotográficos</h1>
        <p>Nos enfocamos en brindar respuestas rápidas, opciones de equipo adaptadas a tu estilo y asesoría en envíos dentro de Argentina.</p>
      </div>
      <div className={styles.contactGrid}>
        <div className={styles.infoPanel}>
          <div className={styles.card}>
            <h2>Atención al cliente</h2>
            <p>contacto@blackframestudio.com</p>
            <p>+54 9 11 4321-8765</p>
          </div>
          <div className={styles.card}>
            <h2>Nuestra sede</h2>
            <p>Av. Libertador 1234</p>
            <p>CABA, Argentina</p>
          </div>
          <div className={styles.card}>
            <h2>Horario de atención</h2>
            <p>Lunes a viernes</p>
            <p>9:00 - 18:00</p>
          </div>
        </div>

        <form className={styles.contactForm} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formHeader}>
            <p className={styles.formLabel}>Consultas de equipo</p>
            <h2>Envíanos tus datos y te respondemos en menos de 24 horas</h2>
          </div>
          <label className={styles.formField}>
            Nombre completo
            <input type="text" placeholder="Tu nombre" />
          </label>
          <label className={styles.formField}>
            Correo electrónico
            <input type="email" placeholder="tucorreo@ejemplo.com" />
          </label>
          <label className={styles.formField}>
            Mensaje
            <textarea placeholder="Cuéntanos tu consulta o proyecto" rows="5" />
          </label>
          <button type="submit" className={styles.submitButton}>Enviar mensaje</button>
        </form>
      </div>
    </section>
  );
}
