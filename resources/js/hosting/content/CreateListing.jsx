import { Button } from "@mui/material";
import React, { useState } from "react";
import NewListingForm from "./NewListingForm";

function CreateListing({ user, forceRefresh }) {
    const [expandForm, setExpandForm] = useState(false);

    const toggleFormHandler = () => {
        setExpandForm(!expandForm);
    };

    return (
        <div>
            <h2>Create a new Listing</h2>
            {expandForm ? (
                <NewListingForm
                    toggleFormHandler={toggleFormHandler}
                    forceRefresh={forceRefresh}
                />
            ) : (
                <></>
            )}
            {expandForm ? (
                <Button
                    onClick={toggleFormHandler}
                    color="error"
                    variant="outlined"
                >
                    Close
                </Button>
            ) : (
                <Button onClick={toggleFormHandler} variant="outlined">
                    Add Listing
                </Button>
            )}
        </div>
    );
}

export default CreateListing;
