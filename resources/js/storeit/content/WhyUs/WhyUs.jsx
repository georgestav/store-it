import React from "react";
//styling
import styles from "./WhyUs.module.css";

function WhyUs() {
    return (
        <>
            <div className={styles.body}>

                <h2 className={styles.WhyUs}>Why us?</h2>

                <div className={styles.containers}>

                    <div className={styles.containers__separated}>
                    
                        <h2 className={styles.headers}>Efficient</h2>

                        <p className={styles.paragraph}>Save hours by booking with our trusted clients</p>

                    </div>
                    
                    <div className={styles.containers__separated}>
                    
                        <h2 className={styles.headers}>Secure</h2>

                        <p className={styles.paragraph}>Know that your belongings are stored with verified, experienced hosts</p>

                    </div>
                    
                    <div className={styles.containers__separated}>
                    
                        <h2 className={styles.headers}>Accessible</h2>

                        <p className={styles.paragraph}>Retrieve your property at your own convenience</p>

                    </div>

                </div>

            </div>
        </>
    )
}

export default WhyUs;