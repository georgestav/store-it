import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

import axios from "axios";
import Button from "@mui/material/Button";
import styles from "./RegisterForm.module.css";

export default function RegisterForm({ setDisplay }) {
    //use userContext
    const { user, setUser } = useContext(UserContext);
    //values in the form
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    //errors messages to be shown
    const [errors, setErrors] = useState({});

    //function handling the change
    const handleChange = (event) => {
        setValues((oldValues) => {
            return {
                ...oldValues,
                [event.target.name]: event.target.value,
            };
        });
    };

    //function handling submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // with axios register the user
            const response = await axios.post("/register", values);
            const response_data = await response.data;
            setErrors({});

            // get request to get logged in user data and assign it to userContext
            const getdetails = await axios.get("/api/user/logged-in");
            const userData = await getdetails.data;
            setDisplay("");
            setUser(userData); //pass values to user Contex
        } catch (error) {
            console.error(error.response.data.errors);
            setErrors(error.response.data.errors); //accessing the error messages
        }
    };

    return (
        <div className={styles.body}>
            <form className={styles.form} action="" method="post" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>

                <input
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                ></input>
                {errors && errors.name ? <p>{errors.name}</p> : null}
                <br />
                <label htmlFor="email">Email:</label>
                
                <input
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    autoComplete="new-email"
                ></input>
                {errors && errors.email ? <p>{errors.email}</p> : null}
                <br />
                <label htmlFor="password">Password</label>
                
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                />
                <br />
                <label htmlFor="password_confirmation">
                    Password confirmation
                </label>
                
                <input
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    autoComplete="new-password"
                    value={values.password_confirmation}
                    onChange={handleChange}
                />
                {errors && errors.password ? <p>{errors.password}</p> : null}
                <br />
                <div className={styles.buttons}>

                    <div className={styles.backButton}>
                        <Button variant="contained" onClick={() => setDisplay("")}>
                            Back
                        </Button>
                    </div>

                    <div className={styles.submitButton}>
                        <Button variant="contained" type="submit">
                            Submit
                        </Button>
                    </div>

                </div>
            </form>
        </div>
    );
}
