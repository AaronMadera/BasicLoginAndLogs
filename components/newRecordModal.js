import { useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../styles/modal.module.css';
import { addRecord, getRecords } from "../utility/createRecord";


export default function Modal() {
    const router = useRouter();

    const [formAmount, setFormAmount] = useState('');
    const [formAmountMessage, setFormAmountMessage] = useState('');
    const [formDescription, setFormDescription] = useState('');

    // Get the modal
    const modal = document.getElementById("myModal");

    // When the user clicks on the button, open the modal
    const btnOnclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    const spanOnclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            closeModal();
        }
    }
    const closeModal = () => {
        modal.style.display = "none";
    }

    function newRecord() {
        if (isNaN(formAmount)) {
            setFormAmountMessage('sólo se aceptan números, pesos con centavos, ejemplo: 1201.34');
        }
        else {
            addRecord({ amount: Number(formAmount) * 100, description: formDescription, userEmail: 'admin@mail.com' });
            closeModal();
            setFormAmount('');
            setFormAmountMessage('');
            setFormDescription('');
            router.push('/');
        }
    }
    return (
        <div>
            <button id="btnModalTrigger" onClick={() => btnOnclick()}>Agregar registro</button>
            {/* // < !--The Modal-- > */}
            <div id="myModal" className={styles.modal}>

                {/* <!-- Modal content --> */}
                <div className={styles.modalContent}>
                    <span className={styles.close} onClick={() => spanOnclick()}>&times;</span>
                    <div>
                        <label htmlFor="amount" id="amountLabel"> Monto </label>
                        <input id="amount" name="amount" placeholder="00.00" value={formAmount} onChange={({ target: { value } }) => { console.log(value); setFormAmount(value) }}></input>
                    </div>
                    <div style={{ height: '10px' }}></div>

                    <span style={{ color: 'tomato' }}>{formAmountMessage}</span>
                    <div style={{ height: '30px' }}></div>
                    <div>
                        <label htmlFor="decription" id="descriptionLabel"> Concepto </label>
                        <input id="decription" name="decription" placeholder="Escriba el concepto" value={formDescription} onChange={({ target: { value } }) => { console.log(value); setFormDescription(value) }} ></input>
                    </div>
                    <div style={{ height: '30px' }}></div>
                    <div className={''}>
                        <button id="create" name="create" type="button" onClick={() => newRecord()}>Crear Registro</button>
                    </div>
                </div>

            </div>
        </div>
    );
}
