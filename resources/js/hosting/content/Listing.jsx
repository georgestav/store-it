import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ListingDetails from "./ListingDetails";

const deleteListing = async (id) => {
    try {
        // get request to get list of cities in the DB that the user can register to
        const getdetails = await axios.delete(`api/listings/${id}`);
        const data = await getdetails;
        return data;
    } catch (error) {
        console.error("Could not delete", error.response.data.message);
    }
};

function Listing({ listing, forceRefresh }) {
    const [expanded, setExpanded] = useState(false);
    const [image, setImage] = useState([]);

    const deleteListingHandler = async () => {
        const status = await deleteListing(listing.id);
        if (status.status === 200) forceRefresh();
    };

    const showDetailsHandler = () => {
        setExpanded(!expanded);
    };

    const getImage = async (id) => {
        try {
            // get request to get list of cities in the DB that the user can register to
            const imageFetch = await axios.get(`api/picture/${id}`);
            const data = await imageFetch.data;
            setImage(data);
        } catch (error) {
            console.error("Could not get images", error);
        }
    };
    useEffect(() => {
        getImage(listing.id);
    }, []);

    //src='data:image/jpeg;base64,{$picture->photo}'
    return (
        <>
            <div>
                <img
                    src={
                        image[0]
                            ? `data:image/jpeg;base64,${image[0]["photo"]}`
                            : ""
                    }
                    alt=""
                    style={{
                        height: 100,
                        width: 100,
                    }}
                />
            </div>
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
