import React, { useEffect, useState } from "react";
import NavigationBar from "../components/navigation/NavigationBar";
import Content from "./content/Content";
import Footer from "../components/footer/Footer";
import LoginForm from "../components/loginFrom/LoginForm";
import RegisterForm from "../components/registerForm/RegisterForm";

export default function App() {
    const [display, setDisplay] = useState("");

    useEffect(() => {
        console.log("use effect triggered");
    }, [display]);

    if (display === "login") {
        return (
            <>
                <NavigationBar setDisplay={setDisplay} />
                <LoginForm setDisplay={setDisplay} />
                <Footer />
            </>
        );
    } else if (display === "register") {
        return (
            <>
                <NavigationBar setDisplay={setDisplay} />
                <RegisterForm setDisplay={setDisplay} />
                <Footer />
            </>
        );
    } else {
        return (
            <>
                <NavigationBar setDisplay={setDisplay} />
                <Content />
                <Footer />
            </>
        );
    }
}
