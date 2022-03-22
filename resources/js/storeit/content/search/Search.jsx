import React, { useState } from "react";
//styling
import styles from "./Search.module.css";
import SearchForm from "./SearchForm";

function Search() {
    const [displaySearch, setDisplaySearch] = useState(true); //set display status

    //handler to bring search form up if search box is clicked
    const displaySearchHandler = () => {
        setDisplaySearch(true);
    };

    if (!displaySearch) {
        return (
            <>
                <div className={styles.body}>
                    <h1 className={styles.header}>Store your valuables</h1>

                    <input
                        type="Search"
                        placeholder="Search"
                        className={styles.searchbar}
                        onClick={displaySearchHandler}
                    />

                    <button className={styles.learnMore}>Learn more</button>
                </div>
            </>
        );
    } else {
        return <SearchForm className={styles.search__container} />;
    }
}

export default Search;
