import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

//styles
import styles from "./PersonalDetails.module.css";
import axios from "axios";
function PersonalDetails({ userid }) {
    //form inputs
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        user_id: userid,
        name: "",
        surname: "",
        phone: "",
        address: "",
        city: "",
        city_id: "1",
        country_id: "",
    });
    const [userExists, setUserExists] = useState(false); //if false do post, else do patch
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
        if (!userExists) {
            await axios
                .post("/api/person", formData)
                .then(function (response) {
                    console.log(response);
                    setEditing(!editing);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            await axios
                .patch(`/api/person/${userid}`, formData)
                .then(function (response) {
                    console.log(response);
                    setEditing(!editing);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    // fetch pesonal details
    const fetchPersonDetails = async () => {
        try {
            if (userid === undefined) return;
            const getdetails = await axios.get(`/api/person/${userid}`);
            const data = await getdetails.data;
            if (data.name) {
                setFormData({
                    name: data.name,
                    surname: data.surname,
                    phone: data.phone,
                    address: data.address,
                    city: data.city,
                    country_id: data.country_id,
                    user_id: data.user_id,
                });
                setUserExists(true);
            } else {
                return;
            }
        } catch (error) {
            if (error.response.status === 404) {
                return "No personal information found";
            }
            console.error("Could not get personal data", error.response);
            setFormData({
                user_id: userid,
                name: "",
                surname: "",
                phone: "",
                address: "",
                city: "",
                country_id: "",
            });
        }
    };

    const formChangeHandler = (e) => {
        console.log(formData);
        setFormData((previous_values) => {
            return {
                ...previous_values,
                [e.target.name]: e.target.value,
            };
        });
        setUserid();
    };

    //Write user id to the formData
    const setUserid = () => {
        setFormData((previous_values) => {
            return {
                ...previous_values,
                ["user_id"]: userid,
            };
        });
    };

    useEffect(() => {
        getCities(); //get cities list
        getCountries(); //get countries list
        fetchPersonDetails(); //get Person details
    }, [userid, editing]);

    if (userid && cities && countries) {
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
                    <label htmlFor="city">City</label>
                    <input
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={formChangeHandler}
                    />
                </div>

                <div className={styles.inputField}>
                    <label htmlFor="country_id">Country</label>
                    <select
                        name="country_id"
                        id="country_id"
                        value={formData.country_id || 45}
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
                        {userExists ? "Update" : "Save"}
                    </Button>
                </div>
            </form>
        );
    } else {
        return (
            <div>
                <Stack sx={{ color: "grey.800" }} spacing={2} direction="row">
                    <CircularProgress color="secondary" />
                </Stack>
            </div>
        );
    }
}

export default PersonalDetails;
