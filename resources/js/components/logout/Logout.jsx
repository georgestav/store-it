import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export default function Logout() {
    //use userContext
    const { user, setUser } = useContext(UserContext); //destructure the user and setUser use state to constants

    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/logout");
            const response_data = await response.data;
            console.log("logout");
            setUser("guest"); //On successfull logout set userContex user data back to Guest
            window.location.href = "/";
        } catch (error) {
            console.log(error.response);
        }
    };

    return <div onClick={handleLogout}>Logout</div>;
}
