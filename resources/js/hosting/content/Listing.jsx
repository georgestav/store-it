import { Button } from "@mui/material";
import React, { useState } from "react";
import ListingDetails from "./ListingDetails";

const deleteListing = async (id) => {
    try {
        // get request to get list of cities in the DB that the user can register to
        const getdetails = await axios.delete(`api/listings/${id}`);
        const data = await getdetails.data;
        return data;
    } catch (error) {
        console.error("Could not delete", error.response.data.message);
    }
};

function Listing({ listing }) {
    const [expanded, setExpanded] = useState(false);

    const deleteListingHandler = () => {
        deleteListing(listing.id);
        console.log(listing);
    };

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
            <div>
                <Button onClick={showDetailsHandler}>
                    {expanded ? "Hide" : "Details"}
                </Button>
                <Button color="error" onClick={deleteListingHandler}>
                    Delete Listing
                </Button>
            </div>
        </>
    );
}

export default Listing;
