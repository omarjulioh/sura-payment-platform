import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Styles from './Confirmation.module.css'
import loaderGif from '../../Assets/Images/loader.gif'

function Confirmation({ dataX, dataC, dataM, dataS, dataP, dataY }) {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault(); 

        setLoading(true);

        setTimeout(() => {
            setLoading(false);

            navigate('/verificacion', {
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
            <aside className={Styles.xConfirmationMain}>
                <section className={Styles.xConfirmationSectionA}>
                    <h2>Estás comprando</h2>
                    <div>
                        <div>
                            SOAT para esta placa
                        </div>
                        <div>
                            <div>
                                <span>Placa del vehículo</span>
                                <div>{dataX.toUpperCase()}</div>
                            </div>
                            <div>
                                <div>Valor del SOAT</div>
                                <div>$ {dataY ? Number(dataY).toLocaleString('es-CO') : '0'}</div>
                            </div>
                        </div>
                    </div>
                    <div>*Recuerda que este valor es aproximado. Antes del pago, verás el costo real.</div>
                    <div>
                        <button>Cotizar con otra placa</button>
                        <button onClick={handleSubmit}>Confirmar</button>
                    </div>
                </section>
            </aside>
            {loading && (
                <aside className={Styles.loader}>
                    <img src={loaderGif} alt="Loader"></img>
                </aside>
            )}
        </>
    )
}

export default Confirmation;