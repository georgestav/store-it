import React from "react";
import axios from "axios";

export default function Logout() {
    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/logout");
            const response_data = await response.data;
            console.log("logout");
        } catch (error) {
            console.log(error.response);
        }
    };

    return <div onClick={handleLogout}>Logout</div>;
}
