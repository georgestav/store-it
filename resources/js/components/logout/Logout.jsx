import React from "react";
import axios from "axios";

export default function Logout() {

    const handleLogout = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post("/logout");
            console.log(response.data);
        } catch(error) {
            console.log(error.response);
        }
    }

    return (
        <form action="" method="post" onSubmit={handleLogout}>
            <button>Logout</button>
        </form>
    );
}