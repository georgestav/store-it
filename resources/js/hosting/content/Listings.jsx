import React, { useEffect, useState } from "react";
import Listing from "./Listing";
import Card from "../../ui/Card";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./Listings.module.css";

function Listings({ user, forceRefresh }) {
    const [listings, setListings] = useState([]);
    const [listingsLoaded, setListingsLoaded] = useState(false);

    //fetch the listings of the user
    const fetchUserData = async () => {
        if (!user.id) return;
        setListingsLoaded(false);
        try {
            const getListings = await axios.get(
                `/api/user/${user.id}/getlistings`
            );
            const listings = await getListings.data;
            setListings(listings.listings);
            setListingsLoaded(true);
        } catch (error) {
            console.error("error", error.response.data.message);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [user]);

    return (
        <div className={styles.listings__list}>
            <h2>My listings</h2>
            {listings.length > 0 && listingsLoaded ? (
                <div>
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
            ) : listings.length === 0 && listingsLoaded ? (
                <div>
                    <div>No listings....</div>
                </div>
            ) : (
                <div>
                    <Stack
                        sx={{ color: "grey.800" }}
                        spacing={2}
                        direction="column"
                    >
                        <CircularProgress color="secondary" />
                        <span>Loading your listings...</span>
                    </Stack>
                </div>
            )}
        </div>
    );
}

export default Listings;
