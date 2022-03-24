import React from "react";
//styling
import styles from "./WhyUs.module.css";

function WhyUs() {
    return (
        <>
            <div className={styles.body}>

                <h1 className={styles.WhyUs}>Why us?</h1>

                <div className={styles.containers}>

                    <div className={styles.container1}>
                    
                        <h2 className={styles.headers}>Efficient</h2>

                        <p className={styles.paragraph}>Save hours by booking with our trusted clients</p>

                    </div>
                    
                    <div className={styles.container2}>
                    
                        <h2 className={styles.headers}>Secure</h2>

                        <p className={styles.paragraph}>Know that your belongings are stored with verified, experienced hosts</p>

                    </div>
                    
                    <div className={styles.container3}>
                    
                        <h2 className={styles.headers}>Accessible</h2>

                        <p className={styles.paragraph}>Retrieve your property at your own convenience</p>

                    </div>

                </div>

            </div>
        </>
    )
}

export default WhyUs;