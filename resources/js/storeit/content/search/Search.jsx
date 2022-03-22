import React from "react";
//styling
import styles from "./Search.module.css";

function Search() {
    return ( 
        <>
            <div className={styles.body}>

            <h1 className={styles.header}>Store your valuables</h1>

    <input type="search" placeholder="Search" className={styles.searchbar} />

            <button className={styles.learnMore}>Learn more</button>

            </div>
        </>
    )
}

export default Search;
