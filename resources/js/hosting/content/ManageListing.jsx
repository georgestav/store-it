import React from "react";
import { Button } from "@mui/material";
//styles
import styles from "./ManageListing.module.css";

function ManageListing({ listing, switchListingManagement }) {
    console.log(listing);
    return (
        <div className={styles.listing__container}>
            <h2 className={styles.heading}>Manage listing</h2>
            <Button
                className={styles.goback}
                onClick={() => switchListingManagement(false)}
            >
                Go back
            </Button>
            <div>
                <img
                    src={
                        listing.pictures.length > 0
                            ? `data:image/jpeg;base64,${listing.pictures[0].photo}`
                            : ""
                    }
                    alt=""
                />
            </div>
        </div>
    );
}

export default ManageListing;
