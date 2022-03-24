import React, { useEffect, useState } from "react";
import Listing from "./Listing";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

function Listings({ user }) {
    const [listings, setListings] = useState([]);

    //fetch the listings of the user
    const fetchUserData = async () => {
        if (!user.id) return;
        try {
            const getListings = await axios.get(
                `/api/user/${user.id}/getlistings`
            );
            const listings = await getListings.data;

            setListings(listings.listings);
        } catch (error) {
            console.error("error", error.response.data.message);
        }
    };

    console.log(listings);
    useEffect(() => {
        fetchUserData();
    }, [user]);

    if (listings.length > 0) {
        return (
            <div>
                <div>Listings</div>
                <div>
                    listing
                    {listings.map((listing) => {
                        return <Listing key={listing.id} listing={listing} />;
                    })}
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <Stack sx={{ color: "grey.800" }} spacing={2} direction="row">
                    <CircularProgress color="secondary" />
                </Stack>
                Loading your listings...
            </div>
        );
    }
}

export default Listings;
