import React, {useState, useMemo, useEffect} from "react";
import NavigationBar from "../components/navigation/NavigationBar";
import Content from "./content/Content";
import Footer from "../components/footer/Footer";
import { UserContext } from "../components/context/UserContext";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import DetailedInfo from "./content/detailedInfo/DetailedInfo";


export default function App() {

    const [display, setDisplay] = useState(""); //set empty display
    const [user, setUser] = useState("guest"); //set default user to guest

    //passed values with UserContext custom effect hook
    const values = useMemo(() => ({ user, setUser }), [user]);

    //Use efftect triggered when display changes, ex register, login
    useEffect(() => {
        checkUserLogged();
    }, [display]);

    //check for already logged in user
    const checkUserLogged = async () => {
        try {
            // get request to get logged in user data and assign it to userContext
            const getdetails = await axios.get("api/user/logged-in");
            const userData = await getdetails.data;
            setUser(userData);
        } catch (error) {
            console.error("User not Logged in", error.response.data.message);
        }
    };

    return (
        
        <UserContext.Provider value={values}>
            <BrowserRouter>
                <NavigationBar setDisplay={setDisplay} />

                <Routes>
                    <Route exact path="/resutls/:location" element={<Content display={display} setDisplay={setDisplay}/>} />
                    <Route exact path="/listing/:id" element={<DetailedInfo />} />
                </Routes>

                <Footer />
            </BrowserRouter>
        </UserContext.Provider>    
        
    );
}