import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";

//styles
import styles from "./PersonalDetails.module.css";
function PersonalDetails({ userid }) {
    //form inputs
    const [formData, setFormData] = useState(null);
    // {
    // name: "test",
    // surname: "test",
    // phone: "test",
    // address: "test",
    // city_id: 1,
    // country_id: 1,
    // user_id: 1,
    // }

    //state hooks
    const [cities, setCities] = useState([]);
    const [countries, setCountries] = useState([]);

    const getCities = async () => {
        try {
            // get request to get list of cities in the DB that the user can register to
            const getdetails = await axios.get("api/cities");
            const data = await getdetails.data;
            setCities(data);
        } catch (error) {
            console.error("Could not get cities", error.response.data.message);
        }
    };

    const getCountries = async () => {
        try {
            // get request to get list of counties in the DB that the user can register to
            const getdetails = await axios.get("api/countries");
            const data = await getdetails.data;
            setCountries(data);
        } catch (error) {
            console.error(
                "Could not get countries",
                error.response.data.message
            );
        }
    };

    //form handling to save to the database
    const formSubmitHandler = async (e) => {
        e.preventDefault();

        await axios
            .post("/api/person", formData)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // fetch pesonal details
    const fetchPersonDetails = async () => {
        try {
            const getdetails = await axios.get(`/api/person/${userid}`);
            const data = await getdetails.data;
            console.log("fetched person data", data);
            setFormData({
                name: data.name,
                surname: data.surname,
                phone: data.phone,
                address: data.address,
                city_id: data.city_id,
                country_id: data.country_id,
            });
        } catch (error) {
            console.error(
                "Could not get person data",
                error.response.data.message
            );
        }
    };

    const formChangeHandler = (e) => {
        setFormData((previous_values) => {
            return {
                ...previous_values,
                [e.target.name]: e.target.value,
            };
        });
    };
    console.log(formData);

    useEffect(() => {
        getCities(); //get cities list
        getCountries(); //get countries list
        fetchPersonDetails(); //get Person details
    }, [userid]);

    if (formData) {
        return (
            <form action="" onSubmit={formSubmitHandler}>
                <div className={styles.inputField}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={formChangeHandler}
                    />
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="surname">Surname</label>
                    <input
                        id="surname"
                        name="surname"
                        type="text"
                        value={formData.surname}
                        onChange={formChangeHandler}
                    />
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="phone">Phone</label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={formChangeHandler}
                    />
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="address">Address</label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={formChangeHandler}
                    />
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="city_id">City</label>
                    <select
                        name="city_id"
                        id="city_id"
                        value={formData.city_id}
                        onChange={formChangeHandler}
                    >
                        {cities.map((city) => {
                            return (
                                <option value={city.id} key={city.id}>
                                    {city.name}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className={styles.inputField}>
                    <label htmlFor="country_id">Country</label>
                    <select
                        name="country_id"
                        id="country_id"
                        value={formData.country_id}
                        onChange={formChangeHandler}
                    >
                        {countries.map((country) => {
                            return (
                                <option value={country.id} key={country.id}>
                                    {country.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className={styles.inputField}>
                    <Button type="submit" variant="outlined">
                        Save
                    </Button>
                </div>
            </form>
        );
    } else {
        return <div>Loading...</div>;
    }
}

export default PersonalDetails;
