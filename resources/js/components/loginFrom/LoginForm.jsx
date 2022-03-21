import React, { useRef, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

function LoginForm() {
    const [errors, setErrors] = useState({}); //define errors
    const email = useRef(); //assign to useRef
    const password = useRef(); //assign to useRef
    const [rememberMe, setRememberMe] = useState(false); //remember me logic

    //handle login submit
    const loginSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const loginDetails = {
                email: email.current.value,
                password: password.current.value,
                // rememberMe: rememberMe,
            };

            // with axios
            const response = await axios.post("/login", loginDetails);
            const response_data = await response.data;

            setErrors({});
        } catch (error) {
            setErrors(error.response.data.errors); //accessing the error messages
            console.error(error.response.data.message);
        }
    };

    return (
        <div>
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
                    <Button variant="contained" type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;