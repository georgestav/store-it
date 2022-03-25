import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

const fetchCities = async (id = 1, city) => {
    // if (city) return;
    try {
        // get request to get list of cities in the DB that the user can register to
        const getdetails = await axios.get(`/api/cities/${id}/id`);
        const data = await getdetails.data;
        return data;
    } catch (error) {
        console.error("Could not get cities", error.response.data.message);
    }
};

const fetchCountry = async (id = 1, country) => {
    // if (country) return;
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
        const options = {
            params: {
                street: listingAddress.address,
                city: city.name,
                country: country.name,
                postalcode: listingAddress.postcode,
                format: "jsonv2",
                limit: "1",
            },
        };

        const url = `https://nominatim.openstreetmap.org/search`;
        // get request to get list of cities in the DB that the user can register to
        const coordsFetch = await axios(url, options);
        const data = await coordsFetch.data;

        if (!data.length) throw Error("No results, check your inputs");
        return data;
    } catch (error) {
        console.error("Could not get coordinates", error);
        return data;
    }
};

function Address({ formData, formChangeHandler, setFormCoordinates }) {
    const [coordinates, setCoordinates] = useState("Unknown");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [listingAddress, setListingAddress] = useState({
        address: "none",
        postcode: "none",
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
        const data = await getCoordinates(city, country, listingAddress);
        const coord = `${data[0]["lat"]},${data[0]["lon"]}`;
        console.log(coord);
        setCoordinates(coord);
        setFormCoordinates(coord);
    };

    useEffect(async () => {
        setCity(await fetchCities(formData.city_id, city));
        setCountry(await fetchCountry(formData.country_id, country));
    }, [formData.city_id, formData.country_id]);

    return (
        <>
            <h4>Location</h4>
            <div>
                <label htmlFor="coordinates">Coordinates</label>
                <input
                    name="coordinates"
                    id="coordinates"
                    type="text"
                    value={formData.coordinates}
                    onChange={formChangeHandler}
                    disabled
                />
            </div>
            <div>
                <label htmlFor="address">Address</label>
                <input
                    id="address"
                    name="address"
                    type="text"
                    onChange={addressHandler}
                />
            </div>
            <div>
                <label htmlFor="postcode">Postcode</label>
                <input
                    id="postcode"
                    name="postcode"
                    type="text"
                    onChange={addressHandler}
                />
            </div>
            <Button onClick={checkAddressHandler}>Check</Button>
        </>
    );
}

export default Address;
