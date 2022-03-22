import React, { useEffect, useState, useMemo } from "react";
import NavigationBar from "../components/navigation/NavigationBar";
import Content from "./content/Content";
import Footer from "../components/footer/Footer";
import { UserContext } from "../components/context/UserContext";

export default function App() {
    const [display, setDisplay] = useState(""); //set empty display
    const [user, setUser] = useState("guest"); //set default user to guest

    //passed values with UserContext
    const values = useMemo(() => ({ user, setUser }), [user]);

    //Use efftect triggered when display changes, ex register, login
    useEffect(() => {}, [display]);

    return (
        <UserContext.Provider value={values}>
            <NavigationBar setDisplay={setDisplay} />
            <Content display={display} setDisplay={setDisplay} />
            <Footer />
        </UserContext.Provider>
    );
}
