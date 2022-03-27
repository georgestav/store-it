import React, { useEffect, useState } from "react";
import Listing from "./Listing";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./Listings.module.css";

function Listings({ user, forceRefresh, switchListingManagement }) {
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
            <h2 className={styles.my__listings}>My listings</h2>
            {listings.length > 0 && listingsLoaded ? (
                <div className={styles.listings__container}>
                    {listings.map((listing) => {
                        return (
                            <Listing
                                className={styles.listing}
                                key={listing.id}
                                listing={listing}
                                forceRefresh={forceRefresh}
                                switchListingManagement={
                                    switchListingManagement
                                }
                            />
                        );
                    })}
                </div>
            ) : listings.length === 0 && listingsLoaded ? (
                <div>
                    <div>No listings....</div>
                </div>
            ) : (
                <div>
                    <CircularProgress color="secondary" />
                    <div>Loading your listings...</div>
                </div>
            )}
        </div>
    );
}

export default Listings;
