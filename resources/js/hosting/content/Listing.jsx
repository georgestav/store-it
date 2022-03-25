import { Button } from "@mui/material";
import React, { useState } from "react";
import ListingDetails from "./ListingDetails";

function Listing({ listing }) {
    const [expanded, setExpanded] = useState(false);

    const showDetailsHandler = () => {
        setExpanded(!expanded);
    };
    return (
        <>
            <div>
                <span>Location:</span>
                <span>{listing.coordinates}</span>
            </div>
            <div>
                <span>Daily Rate:</span>
                <span>{listing.daily_rate}</span>
                <span>Available until:</span>
                <span>15/2/2233</span>
            </div>
            <div>
                <span>Rating:</span>
                <span>{listing.rating}</span>
            </div>

            {expanded ? <ListingDetails listing={listing} /> : <></>}

            <Button onClick={showDetailsHandler}>
                {expanded ? "Hide" : "Details"}
            </Button>
        </>
    );
}

export default Listing;
