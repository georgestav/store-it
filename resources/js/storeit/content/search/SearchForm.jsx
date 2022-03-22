import React, { useState, useRef } from "react";
import styles from "./SearchForm.module.css";

function SearchForm({ setDisplaySearch }) {
    const locationInput = useRef();

    const sumbitSearchHandler = (e) => {
        e.preventDefault();
        window.location.href = "/results/" + locationInput.current.value;
    };

    return (
        <form
            className={styles.search__form__container}
            onSubmit={sumbitSearchHandler}
        >
            <h3>Search your next Storage</h3>
            <div>
                <label htmlFor="location">Location</label>
                <input
                    id="location"
                    type="text"
                    placeholder="Location"
                    ref={locationInput}
                    autoFocus
                />
            </div>
            <div>
                <label htmlFor="fromDate">From date</label>
                <input id="fromDate" type="date" disabled />
            </div>
            <div>
                <label htmlFor="untilDate">Until Date</label>
                <input id="untilDate" type="date" disabled />
            </div>
            <div>
                <label htmlFor="location">Location</label>
                <input
                    id="location"
                    type="text"
                    placeholder="Location"
                    disabled
                />
            </div>
            <select name="" id="" disabled>
                <option value="">Attic</option>
                <option value="">Shed</option>
                <option value="">Garage</option>
                <option value="">Room</option>
                <option value="">Locker</option>
            </select>
            <button onClick={() => setDisplaySearch(false)}>Back</button>
            <button>Search</button>
        </form>
    );
}

export default SearchForm;
