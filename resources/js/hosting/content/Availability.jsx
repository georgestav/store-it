import React from "react";
import styles from "./NewListingForm.module.css";

function Availability({ availability, dateChangeHandler }) {
    console.log(availability);

    return (
        <div className={styles.form__input}>
            <h4>Availability</h4>
            <div className={styles.form__input}>
                <label htmlFor="available_from">Starting</label>
                <input
                    id="available_from"
                    name="available_from"
                    type="date"
                    value={availability.available_from}
                    onChange={dateChangeHandler}
                />
            </div>
            <div className={styles.form__input}>
                <label htmlFor="available_until">Ending</label>
                <input
                    id="available_until"
                    name="available_until"
                    type="date"
                    value={availability.available_until}
                    onChange={dateChangeHandler}
                />
            </div>
        </div>
    );
}

export default Availability;
