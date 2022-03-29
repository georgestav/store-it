import React from "react";
import styles from "./NavigationBar.module.css";
import AccountMenu from "./AccountMenu";
import logo from "./logo/storeit.svg";

function NavigationBar({ setDisplay }) {
    return (
        <>
            <nav className={styles.navigation}>
                <div className={styles.left__container}>
                    {/* <BurgerMenu /> */}
                    <a href="/">
                        <img src={logo} className={styles.logo} alt="logo" />
                    </a>
                </div>
                <AccountMenu setDisplay={setDisplay} />
            </nav>
        </>
    );
}

export default NavigationBar;
