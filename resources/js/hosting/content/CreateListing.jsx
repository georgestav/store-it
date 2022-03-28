import { Button } from "@mui/material";
import React, { useState } from "react";
import NewListingForm from "./NewListingForm";
//styles
import styles from "./CreateListing.module.css";

function CreateListing({ user, forceRefresh }) {
    const [expandForm, setExpandForm] = useState(true);

    const toggleFormHandler = () => {
        setExpandForm(!expandForm);
    };

    return (
        <div className={styles.createListing__container}>
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
                    Add a Listing
                </Button>
            )}
        </div>
    );
}

export default CreateListing;
