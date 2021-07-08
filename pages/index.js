import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styles from '../styles/Home.module.css';
import { isUserLoggedIn } from "../utility/login";
import { logOutUser } from "../utility/logout";
import { addRecord, getRecords } from "../utility/createRecord";

import RecordModal from "../components/newRecordModal";

export default function Home() {
  const router = useRouter();
  const [records, setRecords] = useState([]);


  useEffect(() => {
    if (!isUserLoggedIn()) {
      setTimeout(() => router.push(`/login`), 700);
    }
    else {
      const currentRecords = getRecords();
      setRecords(
        currentRecords.map((record, idx) => {
          let amount = String(record.amount / 100);
          const cents = amount.split('.')[1];
          if (!cents) {
            amount = amount + '.00';
          }
          else if (cents.length < 2) {
            amount = amount + '0';
          }
          return <tr key={idx} style={{ background: idx % 2 ? 'rgb(178, 178, 178)' : 'rgba(255,229,100,0.3)' }}>
            <td>{new Date(record.date).toDateString()}</td>
            <td>${amount}</td>
            <td>{record.description}</td>
            <td>{record.userEmail}</td>
          </tr>
        })
      );
    }
  }, [router]);

  console.log('home isUserLoggedIn %s', isUserLoggedIn());

  const logOut = () => {
    logOutUser();
    router.push(`/`);
  }

  return !isUserLoggedIn() ? (
    // TODO: Move this to a component
    <div className={styles.container}>
      <Head>
        <title>Iniciar sesión</title>
        <meta name="description" content="Check if user is logged in" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Por favor, inicie sesión
        </h1>
      </main>
    </div>
  ) : (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home route" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          ¡Bienvenido!
        </h1>
        <button onClick={() => logOut()}>Cerrar sesión</button>

        <div style={{ height: '60px' }}></div>
        {
          /* TODO: Add no-data view  */
          records.length ? (
            <div>
              <h2>Tabal de Registros</h2>
              <table style={{ width: '100%' }}>
                <thead style={{ textAlign: 'center' }}>
                  <tr style={{background:'#61dafb'}}>
                    <th>Fecha</th>
                    <th>Monto</th>
                    <th>Concepto</th>
                    <th>Usuario</th>
                  </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                  {
                    records
                  }
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              Sin registros aún
            </div>
          )

        }
        <div style={{ height: '20px' }}></div>
        <RecordModal />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' ❤️'}

        </a>
      </footer>
    </div >
  );
}
