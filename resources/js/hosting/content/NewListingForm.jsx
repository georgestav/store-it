import React, { useEffect, useState } from "react";
import axios from "axios";
//styles
import styles from "./NewListingForm.module.css";
import CitiesDropdown from "../../components/modules/CitiesDropdown";
import CountriesDropdown from "../../components/modules/CountriesDropdown";
import StorageTypeDropdown from "../../components/modules/StorageTypeDropdown";

/* 
city_id: 4
country_id: 58
storage_type_id: 2
coordinates: "49.19157528098001, 16.564066323361132"
daily_rate: 0.9
description: "This space can accommodate a large car or truck, and is in the front of my house. I'm usually home and can keep watch of your property. Access 24/7. Just let me know what you're looking to store and we can make it happen. Contact me for details."
rating: 3
size: 23
user_id: 5
created_at: "2022-03-22T10:11:41.000000Z"
updated_at: "2022-03-22T10:11:41.000000Z"
id: 5 
*/

function NewListingForm() {
    const [formData, setFormData] = useState({
        city_id: "",
        country_id: "",
        storage_type_id: "",
        coordinates: "",
        daily_rate: "",
        description: "",
        rating: "",
        size: "",
        user_id: "",
    });

    console.log(formData);

    const formChangeHandler = (e) => {
        setFormData((previous_values) => {
            return {
                ...previous_values,
                [e.target.name]: e.target.value,
            };
        });
    };

    useEffect(() => {}, [formData]);

    return (
        <form className={styles.form}>
            <CitiesDropdown className={styles.form__input} />
            <CountriesDropdown className={styles.form__input} />
            <StorageTypeDropdown className={styles.form__input} />
            <div className={styles.form__input}>
                <label htmlFor="coordinates">Location</label>
                <input name="coordinates" id="coordinates" type="text" />
            </div>
            <div className={styles.form__input}>
                <label htmlFor="daily_rate">Daily Rate</label>
                <input name="daily_rate" id="daily_rate" type="text" />
            </div>
            <div className={styles.form__input}>
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    id="description"
                    cols="30"
                    rows="10"
                ></textarea>
            </div>
            <div className={styles.form__input}>
                <label htmlFor="size">Size</label>
                <input name="size" id="size" type="number" />
            </div>
        </form>
    );
}

export default NewListingForm;
