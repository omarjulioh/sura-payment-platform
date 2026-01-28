import React from "react";
import Styles from './Header.module.css'
import Completed from '../../Assets/Images/Completed.png'

function Header({ stepSectionB = 1 }) {

    return(
        <>
            <header className={Styles.xHeader}>
                <section className={Styles.xHeaderSectionA}>
                                
                </section>
                <section className={Styles.xHeaderSectionB}>
                    <ul>
                        <li>
                            <div>
                                <span 
                                    className={`
                                        ${Styles.xHeaderSectionBStepActive}
                                        ${stepSectionB >= 2 ? Styles.xHeaderSectionBStepCompleted : ''}
                                    `}
                                >{stepSectionB >= 2 ? <img src={Completed} alt="Completado"></img> : '1'}</span>
                                {stepSectionB === 1 && (
                                    <p>Datos</p>
                                )}
                            </div>
                        </li>
                        <li>
                            <div>
                                <span 
                                    className={`
                                        ${stepSectionB === 2 ? Styles.xHeaderSectionBStepActive : ""}
                                        ${stepSectionB >= 3 ? Styles.xHeaderSectionBStepCompleted : ''}
                                    `}
                                >{stepSectionB >= 3 ? <img src={Completed} alt="Completado"></img> : '2'}</span>
                                {stepSectionB === 2 && (
                                    <p>Datos</p>
                                )}
                            </div>
                        </li>
                        <li>
                            <div>
                                <span 
                                    className={`
                                        ${stepSectionB === 3 ? Styles.xHeaderSectionBStepActive : ""}
                                        ${stepSectionB >= 4 ? Styles.xHeaderSectionBStepCompleted : ''}
                                    `}
                                >{stepSectionB >= 4 ? <img src={Completed} alt="Completado"></img> : '3'}</span>
                                {stepSectionB === 3 && (
                                    <p>Validación</p>
                                )}
                            </div>
                        </li>
                        <li>
                            <div>
                                <span 
                                    className={stepSectionB === 4 ? Styles.xHeaderSectionBStepActive : ""}
                                >4</span>
                                {stepSectionB === 4 && (
                                    <p>Pago</p>
                                )}
                            </div>
                        </li>
                    </ul>
                </section>
            </header>
        </>
    )
}

export default Header;