import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Styles from './Home.module.css';
import Header from "../Header/Header";
import logoFloat from '../../Assets/Images/logoFloat.png'
import loaderGif from '../../Assets/Images/loader.gif'

function Home() {

    const navigate = useNavigate();
    const inputRef = useRef(null);

    const [dataX, setDataX] = useState('')
    const [touched, setTouched] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);


        setTimeout(() => {
            navigate('/datos', {
                state: {
                    dataX
                },
            });
            setLoading(false);
        }, 5000); // Espera de 5 segundos (5000 ms)
    }

    return(
        <>
            <Header stepSectionB={1}/>          

            <main className={Styles.xHomeMain}>
                <section className={Styles.xHomeMainSectionA}>
                    <div>
                        <h2>
                            <div>Cotiza y compra</div>
                            <div>tu SOAT 100% digital</div> 
                        </h2>
                        <p>Ingresa el número de tu placa</p>
                        <div>
                            <input ref={inputRef}
                                    placeholder=' '
                                    value={dataX}
                                    onChange={(e) => { 
                                        setDataX(e.target.value);
                                        if (!touched) setTouched(true);
                                    }}
                                    onBlur={(e) => {    
                                        if (!touched) setTouched(true);
                                    }}
                                    pattern="[A-Za-z0-9]{6}"
                                    required
                                    className={touched ? Styles.touched : ""}
                            ></input>
                            <label>Ej: ABC000</label>
                        </div>
                        <button
                            type="button"
                            onClick={() => {

                                if (!dataX) {
                                    setTouched(true);
                                    inputRef.current.focus();
                                    return;
                                }

                                const isValid = /^[A-Za-z0-9]{6}$/.test(dataX);
                                if (!isValid) {
                                    inputRef.current.focus();
                                    return;
                                }

                                handleSubmit();
                            }}
                    >
                        Continuar
                    </button>

                    </div>
                </section>
                <section className={Styles.xHomeMainSectionB}>
                    <p>suraenlínea.com se está transformando en <span>sura.co</span> <span>¡Continúa con tu compra tranquilo!</span></p>
                </section>
                <section className={Styles.xHomeMainSectionC}>
                    <div>
                        <h3>Fácil y simple</h3>
                        <p>Navegarás de forma más fácil y rápida, encontrando lo que necesitas con solo unos clics</p>
                    </div>
                    <div>
                        <h3>Tu seguridad es lo primero</h3>
                        <p>Tenemos las últimas medidas de seguridad para proteger tu información. Tú tranquilo, tus datos están protegidos</p>
                    </div>
                    <div>
                        <h3>Tu seguro a tu medida</h3>
                        <p>¡Ahora podrás ajustar tus coberturas y proteger lo que más valoras!</p>
                    </div>
                </section>
                <section className={Styles.xHomeMainSectionD}>
                    <img src={logoFloat} alt="Logo Flotante"></img>
                </section>
            </main>

            <footer className={Styles.xHomeFooter}>
                <section className={Styles.xHomeFooterSectionA}>
                    <p>Para resolver dudas, comentarios y sugerencias, comunícate a la línea de atención en Medellín al 604 4378888, en Bogotá al 601 4278888 y en Cali al 602 4378888; al 01 8000 51 8888 en el resto del país o al #888 sin costo desde tu celular. Se recomienda ver esta página con Internet Explorer 10 (o versiones superiores), Mozilla Firefox o Google Chrome a una resolución mínimo de 1024 x 768. Copyright c 2014. SURA, una marca Suramericana. Todos los derechos reservados. Entiéndase Suramericana como Administrador de Carteras Colectivas Suramericana S.A., Seguros Generales Suramericana S.A. y Seguros de Vida Suramericana S.A.</p>
                </section>
                <section className={Styles.xHomeFooterSectionB}> 
                    <p>Politicas de Uso y Seguridad</p>
                    <p>Politicas de Privacidad Ley de Datos Personales</p>
                    <p>Empresas Relacionadas</p>
                </section>
            </footer>

            {loading && (
                <aside className={Styles.loader}>
                    <img src={loaderGif} alt="Loader"></img>
                </aside>
            )}
        </>
    )
}

export default Home;