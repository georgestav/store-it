import React, { useEffect, useState, useContext } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { UserContext } from "../../components/context/UserContext";
import CountriesDropdown from "../../components/modules/CountriesDropdown";
import StorageTypeDropdown from "../../components/modules/StorageTypeDropdown";
import Address from "./Address";
//styles
import styles from "./NewListingForm.module.css";
import Availability from "./Availability";

function NewListingForm({ toggleFormHandler, forceRefresh }) {
    //user state that is saved to user context
    const { user, setUser } = useContext(UserContext);
    //form data that gets sent to the listings db
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

    // new Date().toISOString().slice(0, 10)
    let defaultDate = new Date().toISOString().slice(0, 10);

    const [availability, setAvailability] = useState({
        listing_id: "",
        available_from: defaultDate,
        available_until: "2100-03-26",
    });

    const dateChangeHandler = (e) => {
        setAvailability((previous_values) => {
            return {
                ...previous_values,
                [e.target.name]: e.target.value,
            };
        });
    };

    const saveAvailableDates = async (id) => {
        setAvailability((previous_values) => {
            return {
                ...previous_values,
                listing_id: id,
            };
        });
        try {
            const res = await axios.post(
                `api/availabilities/${id}`,
                availability
            );
            console.log(res);
        } catch (ex) {
            console.log(ex);
        }
    };

    /* function to change the state of the form data with data from the form
    without loosing the previous data */
    const formChangeHandler = (e) => {
        setFormData((previous_values) => {
            return {
                ...previous_values,
                [e.target.name]: e.target.value,
            };
        });
    };

    //Write user id to the formData to send it to the db
    const setUserid = () => {
        setFormData((previous_values) => {
            return {
                ...previous_values,
                ["user_id"]: user.id,
            };
        });
    };

    //Write the calculated coordinates to the form data
    const setFormCoordinates = (coords) => {
        setFormData((previous_values) => {
            return {
                ...previous_values,
                ["coordinates"]: coords,
            };
        });
    };

    //function that handles the form on submit
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        setUserid();
        await axios
            .post("/api/listings", formData)
            .then(function (response) {
                console.log(response);
                uploadFile(response.data.id);
                saveAvailableDates(response.data.id);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const [file, setFile] = useState();

    const saveFile = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadFile = async (id) => {
        if (!file) {
            // stop if no file submited
            toggleFormHandler();
            forceRefresh();
            return;
        }
        const imageData = new FormData();
        imageData.append("photo", file);
        imageData.append("listing_id", id);
        try {
            const res = await axios.post(
                "http://localhost:3000/api/picture",
                imageData
            );
            console.log(res);
            forceRefresh();
        } catch (ex) {
            console.log(ex);
        }
        toggleFormHandler();
    };

    useEffect(() => {
        setUserid(); //on load or change user make sure the user id is in the form data
    }, [user]);

    return (
        <form className={styles.form} onSubmit={formSubmitHandler}>
            <div className={styles.form__input}>
                <h4>Location</h4>
                <CountriesDropdown
                    className={styles.form__input}
                    storage_type_id={formData.country_id}
                    formChangeHandler={formChangeHandler}
                />
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
                <Address
                    className={styles.form__input}
                    formData={formData}
                    formChangeHandler={formChangeHandler}
                    setFormCoordinates={setFormCoordinates}
                />
            </div>
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
                    required
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
                    required
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
                    required
                />
            </div>
            <div className={styles.form__input}>
                <label htmlFor="files">
                    Images <span>*max size 1mb</span>
                </label>
                <input
                    type="file"
                    id="files"
                    name="files"
                    accept="image/*"
                    onChange={saveFile}
                />
            </div>
            {/* availability component */}
            <Availability
                availability={availability}
                dateChangeHandler={dateChangeHandler}
            />
            {/* availability component */}
            <Button type="submit" variant="outlined">
                Add your listing
            </Button>
        </form>
    );
}

export default NewListingForm;
