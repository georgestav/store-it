import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";

//styles
import styles from "./PersonalDetails.module.css";
function PersonalDetails({ userid }) {
    //form inputs
    const name = useRef();
    const surname = useRef();
    const phone = useRef();
    const address = useRef();
    const city_id = useRef();
    const country_id = useRef();

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

    useEffect(() => {
        getCities(); //get cities list
        getCountries(); //get countries list
    }, []);

    //form handling to save to the database
    const personalInfoHandler = async (e) => {
        e.preventDefault();
        // console.log({
        //     name: name.current.value,
        //     surname: surname.current.value,
        //     phone: phone.current.value,
        //     address: address.current.value,
        //     city_id: city_id.current.value,
        //     country_id: country_id.current.value,
        //     user_id: userid,
        // });
        await axios
            .post("/api/person", {
                name: name.current.value,
                surname: surname.current.value,
                phone: phone.current.value,
                address: address.current.value,
                city_id: city_id.current.value,
                country_id: country_id.current.value,
                user_id: userid,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <form action="" onSubmit={personalInfoHandler}>
            <div className={styles.inputField}>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" type="text" ref={name} />
            </div>
            <div className={styles.inputField}>
                <label htmlFor="surname">Surname</label>
                <input id="surname" type="text" ref={surname} />
            </div>
            <div className={styles.inputField}>
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="tel" ref={phone} />
            </div>
            <div className={styles.inputField}>
                <label htmlFor="address">Address</label>
                <input id="address" type="text" ref={address} />
            </div>
            <div className={styles.inputField}>
                <label htmlFor="city_id">City</label>
                <select name="" id="city_id" ref={city_id}>
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
                <select name="" id="country_id" ref={country_id}>
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
}

export default PersonalDetails;
