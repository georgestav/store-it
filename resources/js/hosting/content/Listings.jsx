import React, { useEffect, useState } from "react";
import Listing from "./Listing";
import Card from "../../ui/Card";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./Listings.module.css";

function Listings({ user, forceRefresh }) {
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

    useEffect(() => {
        fetchUserData();
    }, [user]);

    if (listings.length > 0) {
        return (
            <div>
                <h2>My Listings</h2>
                <div className={styles.listings__list}>
                    {listings.map((listing) => {
                        return (
                            <Card key={listing.id}>
                                <Listing
                                    listing={listing}
                                    forceRefresh={forceRefresh}
                                />
                            </Card>
                        );
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
