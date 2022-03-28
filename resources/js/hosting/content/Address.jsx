import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import styles from "./NewListingForm.module.css";

const fetchCountry = async (id = 1) => {
    try {
        // get request to get list of cities in the DB that the user can register to
        const getdetails = await axios.get(`/api/countries/${id}/id`);
        const data = await getdetails.data;
        return data;
    } catch (error) {
        console.error("Could not get countries", error.response.data.message);
    }
};

// https://nominatim.openstreetmap.org/ui/search.html?street=address&city=city&country=country&postalcode=postcode&limit=1
const getCoordinates = async (city, country, listingAddress) => {
    //get coordinates with passed in address data
    try {
        let url = `https://nominatim.openstreetmap.org/search?&limit=1&format=jsonv2`;
        if (country.name) url += `&country=${country.name || "Afghanistan"}`;
        if (city) url += `&city=${city}`;
        if (listingAddress.address) url += `&street=${listingAddress.address}`;
        if (listingAddress.postcode)
            url += `&postalcode=${listingAddress.postcode}`;

        // get request to get list of cities in the DB that the user can register to
        const coordsFetch = await axios(url);
        const data = await coordsFetch.data;
        return data;
    } catch (error) {
        console.error("Could not get coordinates", error);
    }
};

function Address({ formData, formChangeHandler, setFormCoordinates }) {
    const [coordinates, setCoordinates] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [listingAddress, setListingAddress] = useState({
        address: "",
        postcode: "",
    });

    const addressHandler = (e) => {
        setListingAddress((previous_values) => {
            return {
                ...previous_values,
                [e.target.name]: e.target.value,
            };
        });
    };

    const checkAddressHandler = async () => {
        try {
            const data = await getCoordinates(city, country, listingAddress);
            if (data.length === 0) return;
            console.log(data);
            const coord = `${data[0]["lat"]}, ${data[0]["lon"]}`;
            setCoordinates(coord);
            setFormCoordinates(coord);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(async () => {
        setCity(formData.city);
        setCountry(await fetchCountry(formData.country_id));
        checkAddressHandler();
    }, [formData.city, formData.country_id]);

    return (
        <>
            <h5>Improve accuracy</h5>
            <div className={styles.form__input}>
                <label htmlFor="coordinates">Coordinates</label>
                <input
                    name="coordinates"
                    id="coordinates"
                    type="text"
                    value={formData.coordinates}
                    onChange={formChangeHandler}
                    disabled
                    required
                />
            </div>
            <div className={styles.form__input}>
                <label htmlFor="address">Street</label>
                <input
                    id="address"
                    name="address"
                    type="text"
                    onChange={addressHandler}
                />
            </div>
            <div className={styles.form__input}>
                <label htmlFor="postcode">Postcode</label>
                <input
                    id="postcode"
                    name="postcode"
                    type="text"
                    onChange={addressHandler}
                />
            </div>
            <Button
                onClick={checkAddressHandler}
                color="success"
                variant="contained"
            >
                Get Location
            </Button>
        </>
    );
}

export default Address;
