import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import styles from './Layout.module.css';
import TermsModal from '../components/TermsModal/TermsModal';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
      <TermsModal />
      <Footer />
    </div>
  );
}
