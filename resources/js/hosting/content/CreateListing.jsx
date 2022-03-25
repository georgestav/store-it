import { Button } from "@mui/material";
import React, { useState } from "react";
import NewListingForm from "./NewListingForm";

function CreateListing({ user }) {
    const [expandForm, setExpandForm] = useState(true);

    const toggleFormHandler = () => {
        setExpandForm(!expandForm);
    };

    return (
        <div>
            <h2>Create a new Listing</h2>
            {expandForm ? <NewListingForm /> : <></>}
            <Button onClick={toggleFormHandler}>
                {expandForm ? "Close" : "Expand"}
            </Button>
        </div>
    );
}

export default CreateListing;
