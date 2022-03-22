import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import styles from "./RegisterForm.module.css";

export default function RegisterForm({ setDisplay }) {
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

    console.log("Seeing that");

    //function handling submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("/register", values);
            const response_data = await response.data;

            setErrors({});
            setDisplay("");
            console.log("registed", response_data);
        } catch (error) {
            console.error(error.response.data.errors);
            setErrors(error.response.data.errors); //accessing the error messages
        }
    };

    return (
        <div className={styles.body}>
            <form action="" method="post" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <br />
                <input
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                ></input>
                {errors && errors.name ? <p>{errors.name}</p> : null}
                <br />
                <label htmlFor="email">Email:</label>
                <br />
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
                <br />
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
                <br />
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
                <Button onClick={() => setDisplay("")}>Back</Button>
                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
}
