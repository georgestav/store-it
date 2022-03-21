import React, { useRef, useState } from "react";
import axios from "axios";

function LoginForm() {
    const email = useRef();
    const password = useRef();
    const [rememberMe, setRememberMe] = useState(false);

    const loginSubmitHandler = async (e) => {
        e.preventDefault();
        const loginDetails = {
            email: email.current.value,
            password: password.current.value,
            // rememberMe: rememberMe,
        };
        console.log(loginDetails);

        // with axios
        const response = await axios.post("/login", loginDetails);
        const response_data = await response.data;

        console.log(response);
    };

    return (
        <div>
            <form action="/login" onSubmit={loginSubmitHandler}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="current-email"
                        ref={email}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
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
                    <input type="submit" />
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
