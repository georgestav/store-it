import React from "react";
//styling
import styles from "./WhyUs.module.css";

function WhyUs() {
    return (
        <>
            <div className={styles.body}>

                <h1 className={styles.WhyUs}>Why us?</h1>

                <div className={styles.container}>
                    <h3 className={styles.efficient}>Efficient</h3>

                    <p className={styles.paragraph}>Save hours by booking with our trusted clients</p>
                </div>

            </div>
        </>
    )
}

export default WhyUs;