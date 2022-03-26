import React, { useEffect, useState, useContext } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { UserContext } from "../../components/context/UserContext";
import CitiesDropdown from "../../components/modules/CitiesDropdown";
import CountriesDropdown from "../../components/modules/CountriesDropdown";
import StorageTypeDropdown from "../../components/modules/StorageTypeDropdown";
import Address from "../../components/modules/Address";
//styles
import styles from "./NewListingForm.module.css";

function NewListingForm() {
    const { user, setUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        city_id: "1",
        city: "",
        country_id: "1",
        storage_type_id: "1",
        coordinates: "",
        daily_rate: "",
        description: "",
        rating: "0",
        size: "",
        user_id: "",
    });

    const formChangeHandler = (e) => {
        setFormData((previous_values) => {
            return {
                ...previous_values,
                [e.target.name]: e.target.value,
            };
        });
    };

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        setUserid();

        console.log(formData);

        await axios
            .post("/api/listings", formData)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    //Write user id to the formData
    const setUserid = () => {
        setFormData((previous_values) => {
            return {
                ...previous_values,
                ["user_id"]: user.id,
            };
        });
    };

    const setFormCoordinates = (coords) => {
        setFormData((previous_values) => {
            return {
                ...previous_values,
                ["coordinates"]: coords,
            };
        });
    };

    useEffect(() => {
        setUserid();
    }, [user]);

    return (
        <form className={styles.form} onSubmit={formSubmitHandler}>
            <div className={styles.form__input}>
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={formChangeHandler}
                />
            </div>
            <CountriesDropdown
                className={styles.form__input}
                storage_type_id={formData.country_id}
                formChangeHandler={formChangeHandler}
            />
            <Address
                className={styles.form__input}
                formData={formData}
                formChangeHandler={formChangeHandler}
                setFormCoordinates={setFormCoordinates}
            />
            <StorageTypeDropdown
                className={styles.form__input}
                storage_type_id={formData.storage_type_id}
                formChangeHandler={formChangeHandler}
            />
            <div className={styles.form__input}>
                <label htmlFor="daily_rate">Daily Rate</label>
                <input
                    name="daily_rate"
                    id="daily_rate"
                    type="number"
                    value={formData.daily_rate}
                    onChange={formChangeHandler}
                />
            </div>
            <div className={styles.form__input}>
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    id="description"
                    cols="30"
                    rows="10"
                    value={formData.description}
                    onChange={formChangeHandler}
                ></textarea>
            </div>
            <div className={styles.form__input}>
                <label htmlFor="size">Size</label>
                <input
                    name="size"
                    id="size"
                    type="number"
                    value={formData.size}
                    onChange={formChangeHandler}
                />
            </div>
            <Button type="submit" variant="outlined">
                Add your listing
            </Button>
        </form>
    );
}

export default NewListingForm;
