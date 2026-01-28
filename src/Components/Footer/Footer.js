import React from "react";
import Styles from './Footer.module.css'

function Header() {

    return(
        <>
            <footer className={Styles.xFooter}>
                <p>
                    © 2025 SURA. Todos los derechos reservados<br></br>
                    Políticas de uso y seguridad<br></br>
                    Política de privacidad y ley de datos personales
                </p>
            </footer>
        </>
    )
}

export default Header;