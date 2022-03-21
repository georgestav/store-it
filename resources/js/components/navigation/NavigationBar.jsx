import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import styles from "./NavigationBar.module.css";

function NavigationBar() {
    return (
        <>
            <nav className={styles.navigation}>
                <div className={styles.left__container}>
                    <FontAwesomeIcon
                        icon={faBars}
                        className={styles.bg__icon}
                    />
                    <div className={styles.logo}></div>
                </div>
                <div className={styles.right__container}>
                    <div>Become a host</div>
                    <FontAwesomeIcon icon={faUserAstronaut} size="lg" />
                </div>
            </nav>
        </>
    );
}

export default NavigationBar;
