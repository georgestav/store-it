import React from "react";
//font awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faTwitter,
    faLinkedinIn,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
//styles
import styles from "./Footer.module.css";
import { Button } from "@mui/material";

function Footer() {
    return (
        <footer className={styles.footer__container}>
            <div className={styles.left__container}>
                <div className="phrase">
                    Created for people like us who love to move!
                </div>
                <div className={styles.socials__container}>
                    <FontAwesomeIcon icon={faFacebookF} />
                    <FontAwesomeIcon icon={faTwitter} />
                    <FontAwesomeIcon icon={faLinkedinIn} />
                    <FontAwesomeIcon icon={faInstagram} />
                </div>
            </div>
            <div className={styles.center__container}>
                <div className={styles.category__container}>
                    <div>Category</div>
                    <div>Category</div>
                    <div>Category</div>
                    <div>Category</div>
                    <div>Category</div>
                </div>
                <div className={styles.help__container}>
                    <div>Help</div>
                    <div>Help</div>
                    <div>Help</div>
                    <div>Help</div>
                    <div>Help</div>
                </div>
            </div>
            <div className={styles.right__container}>
                <Button
                    onClick={() => {
                        window.scroll({ top: 0, left: 0, behavior: "smooth" });
                    }}
                >
                    Back to top
                </Button>
                <div>&copy; StoreIt {new Date().getFullYear()}</div>
            </div>
        </footer>
    );
}

export default Footer;
