import React, { useState } from "react";
import styles from "./NavigationBar.module.css";
// import Logout from "../logout/Logout";
import AccountMenu from "./AccountMenu";
import BurgerMenu from "./BurgerMenu";

function NavigationBar() {
    return (
        <>
            <nav className={styles.navigation}>
                <div className={styles.left__container}>
                    <BurgerMenu />
                    <div className={styles.logo}></div>
                </div>
                <AccountMenu />
            </nav>
            {/* <Logout /> */}
        </>
    );
}

export default NavigationBar;
