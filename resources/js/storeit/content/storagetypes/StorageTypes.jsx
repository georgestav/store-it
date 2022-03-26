import React from "react";
import styles from "./StorageTypes.module.css";

function StorageTypes() {
    return (
        <>
            <div className={styles.containers}>
                <div className={styles.room}><h2>Room</h2></div>
                <div className={styles.garage}><h2>Garage</h2></div>
                <div className={styles.shed}><h2>Shed</h2></div>
                <div className={styles.attic}><h2>Attic</h2></div>
            </div>
        </>
    )
}

export default StorageTypes;