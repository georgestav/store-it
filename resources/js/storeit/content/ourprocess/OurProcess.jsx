import React from "react";
//styling
import styles from "./OurProcess.module.css";
import customers1 from "/images/background-images/customers-placeholder.jpg";
import customers2 from "/images/background-images/customers-placeholder2.jpg";
import customers3 from "/images/background-images/customers-placeholder3.jpg";

function OurProcess() {
    return (
        <>
            <div className={styles.wrapper}>

                <div className={styles.body}>

                    <h1 className={styles.ourProcess}>Our Process</h1>

                    <div className={styles.container1}>
                        
                        <h2>1</h2>
                        <p>Book an available listing through our website</p>
                        <img className={styles.image1} src={customers1} />

                    </div>

                    <div className={styles.container2}>

                        <h2>2</h2>
                        <p>Store your belongings</p>
                        <img src={customers2} />

                    </div>

                    <div className={styles.container3}>

                        <h2>3</h2>
                        <p>Retrieve at the end of booking!</p>
                        <img src={customers3} />

                    </div>


                </div>

            </div>
        </>
    )
}

export default OurProcess;