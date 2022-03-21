import React from "react";
import NavigationBar from "../components/navigation/NavigationBar";
import Content from "./content/Content";
import Footer from "../components/footer/Footer";
import RegisterForm from "../components/registerForm/RegisterForm";
import Logout from "../components/logout/Logout";

export default function App() {
    return (
        <>
            <NavigationBar />
            <Content />
            <Footer />
            <RegisterForm />
            <Logout />
        </>
    );
}
