import React from "react";
import NavigationBar from "../components/navigation/NavigationBar";
import Content from "./content/Content";
import Footer from "../components/footer/Footer";
import LoginForm from "../components/loginFrom/LoginForm";

export default function App() {
    return (
        <>
            <NavigationBar />
            <LoginForm />
            <Content />
            <Footer />
        </>
    );
}
