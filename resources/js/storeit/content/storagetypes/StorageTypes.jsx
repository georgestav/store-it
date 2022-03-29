import React from "react";
import styles from "./StorageTypes.module.css";

function StorageTypes() {
    return (
        <>
            <div className={styles.containers}>
                <div className={styles.room}><h2><a href="/results/storage/3">Room</a></h2></div>
                <div className={styles.garage}><h2><a href="/results/storage/4">Garage</a></h2></div>
                <div className={styles.shed}><h2><a href="/results/storage/6">Shed</a></h2></div>
                <div className={styles.attic}><h2><a href="/results/storage/1">Attic</a></h2></div>
            </div>
        </>
    )
}

export default StorageTypes;