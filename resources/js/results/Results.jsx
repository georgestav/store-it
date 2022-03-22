import React from "react";
import NavigationBar from "../components/navigation/NavigationBar";
import Content from "./content/Content";
import Footer from "../components/footer/Footer";

export default function App() {

    return (
        <>
            <NavigationBar />
            
            <Content />

            <Footer />
        </>
    );
}