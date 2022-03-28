import React, { useState } from "react";
//styling
import styles from "./Search.module.css";
import SearchForm from "./SearchForm";

function Search() {
    const [displaySearch, setDisplaySearch] = useState(false); //set display status

    //handler to bring search form up if search box is clicked
    const displaySearchHandler = () => {
        setDisplaySearch(true);
    };

    if (!displaySearch) {
        return (
            <>
                <div className={styles.body}>
                    <h2 className={styles.header}>Store your valuables</h2>

                    <input
                        type="Search"
                        placeholder="🔎 Search"
                        className={styles.searchbar}
                        onClick={displaySearchHandler}
                    />

                    <button className={styles.learnMore}>Learn more</button>
                </div>
            </>
        );
    } else {
        return <SearchForm setDisplaySearch={setDisplaySearch} />;
    }
}

export default Search;
