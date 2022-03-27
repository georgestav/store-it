import React from "react";
import styles from "./Faq.module.css";

function Faq() {
    return (
        <>

        <div className={styles.body}>

            <div className={styles.header}>FAQ</div>

            <div className={styles.containers}>
 
                <div className={styles.faq1}>
                <h2>Why do you all get along so well?</h2>

                <p>I think we'd all agree that Sean is the glue that holds us together. Whenever George or I are feeling sad he always finds a way to cheer us up.</p>
                </div>

                <div className={styles.faq2}>
                <h2>Do you ever worry about the future?</h2>

                <p>Honestly, with Sean on the team I don't worry about anything. His natural good looks and reassuring nature makes us feel prepared for anything. </p>
                </div>
                
                <div className={styles.faq3}>
                <h2>What other apirations do you have outside StoreIt?</h2>

                <p>I'd really like to become more like Sean. Matěj has been open with his admiration, and quite frankly I feel the same. At this point I have difficulty falling asleep unless I think about him first. </p>
                </div>

                <div className={styles.faq4}>
                <h2>What has been your biggest success so far?</h2>

                <p>Probably when we acquired Sean on the team. I remember panicking every day after class about the final project, but since having him onboard I've never been more calm. </p>
                </div>

            </div>

        </div>
        </>
    )
}

export default Faq;