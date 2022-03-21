import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";

export default function Logout() {
    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/logout");
            console.log(response.data);
            console.log("logout");
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <form action="" method="post" onSubmit={handleLogout}>
            <Button>Logout</Button>
        </form>
    );
}
