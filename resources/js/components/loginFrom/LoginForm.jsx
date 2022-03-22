import React, { useRef, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import Button from "@mui/material/Button";
import styles from "./LoginForm.module.css";

export default function LoginForm({ setDisplay }) {
    const password = useRef(); //assign to useRef
    const email = useRef(); //assign to useRef
    const [errors, setErrors] = useState({}); //define errors
    const [rememberMe, setRememberMe] = useState(false); //remember me logic

    //use userContext
    const { user, setUser } = useContext(UserContext);

    //handle login submit
    const loginSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const loginDetails = {
                email: email.current.value,
                password: password.current.value,
                // rememberMe: rememberMe,
            };

            // with axios login the user
            const response = await axios.post("/login", loginDetails);
            const response_data = await response;

            // get request to get logged in user data and assign it to userContext
            const getdetails = await axios.get("api/user/logged-in");
            const userData = await getdetails.data;

            setUser(userData); // set user data to User Context
            setErrors({}); // set errors if any
            setDisplay(""); //set display to empty to switch back to main content
        } catch (error) {
            setErrors(error.response.data.errors); //accessing the error messages
            console.error(error.response.data.message);
        }
    };

    return (
        <div className={styles.body}>
            <form action="/login" onSubmit={loginSubmitHandler}>
                {errors ? <p>{errors.email}</p> : null}
                <div>
                    <label htmlFor="loginEmail">Email</label>
                    <input
                        id="loginEmail"
                        type="email"
                        autoComplete="current-email"
                        ref={email}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="loginPassword">Password</label>
                    <input
                        id="loginPassword"
                        type="password"
                        autoComplete="current-email"
                        ref={password}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="rememberme">Remember me</label>
                    <input
                        type="checkbox"
                        id="rememberme"
                        onClick={() => setRememberMe(!rememberMe)}
                    />
                </div>
                <div>
                    <Button onClick={() => setDisplay("")}>Back</Button>
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}
