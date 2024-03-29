import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styles from '../styles/Home.module.css';
import { isUserLoggedIn, logInUser } from "../utility/login";

export default function FirstPost() {
    const router = useRouter();
    const [formPassword, setFormPassword] = useState('');
    const [formEmail, setFormEmail] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [loginMessageColor, setLoginMessageColor] = useState('#29b5e8');

    useEffect(() => {
        const userStatus = isUserLoggedIn();
        if (userStatus) {
            console.log('user is logged in: %s', userStatus);
            router.push(`/`);
        }
    }, [router]);

    const login = () => {
        const validCreds = logInUser(formEmail, formPassword);
        if (!validCreds) {
            console.log('invalid creds!');
            setLoginMessage('Contraseña o correo electrónico incorrectos');
            setLoginMessageColor('#f2720c');
        } else {
            console.log('valid creds!');
            setLoginMessage('¡Ha iniciado sesión correctamente!');
            setLoginMessageColor('#29b5e8');
            setTimeout(() => {
                router.push(`/`);
            }, 500);
        }

    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Inicio de sesión</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <h1 className={styles.title}>Bienvenido</h1>
                <h2>Por favor, Ingrese sus datos</h2>

                <div>
                    <label htmlFor="email" id="emailLabel"> Email </label>
                    <input id="email" name="email" placeholder="ejemplo@mail.com" value={formEmail} onChange={({ target: { value } }) => { console.log(value); setFormEmail(value) }}></input>
                </div>
                <div>
                    <label htmlFor="password" id="passwordLabel"> Contraseña </label>
                    <input id="password" name="password" type="password" placeholder="contraseña" value={formPassword} onChange={({ target: { value } }) => { console.log(value); setFormPassword(value) }} ></input>
                </div>
                <div className={styles.grid}>
                    <button id="send" name="send" type="button" onClick={() => login()}>Ingresar</button>
                </div>
                <div style={{ color: loginMessageColor }}>
                    {
                        loginMessage
                    }
                </div>
            </main>

        </div>
    )
}