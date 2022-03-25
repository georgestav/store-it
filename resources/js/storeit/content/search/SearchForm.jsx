import React, { useState, useRef } from "react";
import styles from "./SearchForm.module.css";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";

const label = { inputProps: { "aria-label": "Switch demo" } };

function SearchForm({ setDisplaySearch }) {
    const [geolocationStatus, setGeolocationStatus] = useState(false);
    const [userCoordinates, setUserCoordinates] = useState({});
    const locationInput = useRef();

    //toggle geolocation status
    const geoTogglerHandler = () => {
        setGeolocationStatus(!geolocationStatus);
    };

    //get users location data
    const getLocation = (pos) => {
        let crd = pos.coords;
        setUserCoordinates(crd);
    };
    const errorLocation = (err) => {
        console.warn(err);
    };
    if (geolocationStatus && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLocation, errorLocation, {
            maximumAge: 60,
            timeout: 5000,
            enableHighAccuracy: true,
        });
    }

    //form submit sets url
    const sumbitSearchHandler = (e) => {
        e.preventDefault();
        try {
            if (!geolocationStatus) {
                // if geolocation is off, redirect with form input
                window.location.href =
                    "/results/" + locationInput.current.value;
            } else if (geolocationStatus) {
                window.location.href = `/results/coords,${userCoordinates.latitude},${userCoordinates.longitude}`;
            } else {
                throw new Error(
                    "Could not use search, please report it to our team!"
                );
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <form
            className={styles.body}
            onSubmit={sumbitSearchHandler}
        >
            <div className={styles.search__form__container}>
                <h3 className={styles.storage}>Find Storage</h3>
                <div>
                    <label htmlFor="location">Store it can use geolocation</label>
                    <Switch {...label} onChange={geoTogglerHandler} />
                </div>
                
                {!geolocationStatus ? (
                        <div className={styles.location__and__date}>
                            <label htmlFor="location">Location</label>
                            <input
                                id="location"
                                type="text"
                                placeholder="Location"
                                ref={locationInput}
                                autoFocus
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                    <div className={styles.location__and__date}>
                        <label htmlFor="fromDate">From date</label>
                        <input id="fromDate" type="date" disabled />
                    </div>
                    <div className={styles.location__and__date}>
                        <label htmlFor="untilDate">Until Date</label>
                        <input id="untilDate" type="date" disabled />
                    </div>
                
                
                <select name="" id="" disabled>
                    <option value="">Attic</option>
                    <option value="">Shed</option>
                    <option value="">Garage</option>
                    <option value="">Room</option>
                    <option value="">Locker</option>
                </select>
                <div className={styles.buttons}>
                    <Button variant="contained" onClick={() => setDisplaySearch(false)}>Back</Button>
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </div>
            </div>

        </form>
    );
}

export default SearchForm;
