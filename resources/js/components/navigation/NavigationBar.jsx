import React from "react";
import styles from "./NavigationBar.module.css";
import AccountMenu from "./AccountMenu";
import BurgerMenu from "./BurgerMenu";
import logo from "./logo/storeit.svg"; 

function NavigationBar({ setDisplay }) {
    return (
        <>
            <nav className={styles.navigation}>
                <div className={styles.left__container}>
                    <BurgerMenu />
                    <img src={logo} className={styles.logo} alt="logo" />
                </div>
                <AccountMenu setDisplay={setDisplay} />
            </nav>
        </>
    );
}

export default NavigationBar;
