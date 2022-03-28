import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";

import BookingManagement from "./management/BookingManagement";
import PastBookingsRequests from "./management/PastBookingsRequests";
import CircularProgress from "@mui/material/CircularProgress";
//styles
import styles from "./ManageListing.module.css";
import axios from "axios";

const fetchListing = async (id = 21) => {
    //Need to fetch listing in order to have access to updated db data
    //if working with passed in data on re-render it holds the same values
    try {
        const getListings = await axios.get(`/api/listings/${id}`);
        const listings = await getListings.data;
        return listings;
    } catch (error) {
        console.error("error", error.response.data.message);
    }
};

function ManageListing({ manageListing, switchListingManagement }) {
    const [listing, setListings] = useState(null); // state for the listing that is displayed
    const [triggerRefresh, setTriggerRefresh] = useState(false); //refresh trigger, currently used for when the booking status changes
    const [address, setAddress] = useState({});
    const refreshTrig = () => {
        //the function to trigger the refresh
        setTriggerRefresh(!triggerRefresh);
    };

    // listing.coordinates
    // 33.7680065, 66.2385139
    const fetchAddress = async (coords) => {
        console.log(coords);
        // if (!coords) return;
        try {
            const fetch = await axios.get(
                `https://nominatim.openstreetmap.org/reverse.php?lat=${coords[0]}&lon=${coords[1]}&zoom=12&format=jsonv2`
            );
            const location = await fetch.data;
            console.log(location);
            setAddress(location);
        } catch (error) {
            console.error(error);
        }
    };
    let searchCoords = listing?.coordinates.split(", "); //array [0]=lat, [1]=lon
    useEffect(async () => {
        // refactor this to its own function and chain the fetch address???
        setListings(await fetchListing(manageListing.id)); //fetch listing data on use
    }, [triggerRefresh]);

    if (!listing) {
        return (
            <div>
                <CircularProgress color="secondary" />
                <div>Loading...</div>
            </div>
        );
    } else {
        return (
            <div className={styles.listing__container}>
                <h2 className={styles.heading}>Manage listing</h2>
                <div>
                    <img
                        src={
                            listing.pictures.length > 0
                                ? `data:image/jpeg;base64,${listing.pictures[0].photo}`
                                : ""
                        }
                        alt={listing.pictures[0]?.name}
                        className={styles.image}
                    />
                </div>
                <Button
                    className={styles.goback}
                    onClick={() => switchListingManagement(false)}
                >
                    Go back
                </Button>
                <div>
                    <div className={styles.details}>
                        <div>
                            <div>
                                <h3>Location details</h3>
                                <div>
                                    <span className={styles.title}>
                                        Location:&nbsp;
                                    </span>
                                    {/* <span>{address.display_name}</span> */}
                                </div>
                                <div>
                                    <span className={styles.title}>
                                        Country:&nbsp;
                                    </span>
                                    <span>{listing.country.name}</span>
                                </div>
                            </div>
                            <div>
                                <h3>Details of your space</h3>
                                <div>
                                    <span className={styles.title}>
                                        Created:&nbsp;
                                    </span>
                                    <span>
                                        {listing.created_at.split("T")[0]}
                                    </span>
                                </div>
                                <div>
                                    <span className={styles.title}>
                                        Last update:&nbsp;
                                    </span>
                                    <span>
                                        {listing.updated_at.split("T")[0]}
                                    </span>
                                </div>
                                <div>
                                    <span className={styles.title}>
                                        Type of space:&nbsp;
                                    </span>
                                    <span>{listing.storage_type.name}</span>
                                </div>
                                <div>
                                    <span className={styles.title}>
                                        Size:&nbsp;
                                    </span>
                                    <span>{listing.size}:&nbsp;</span>
                                </div>
                                <div>
                                    <span className={styles.title}>
                                        Daily Rate:&nbsp;
                                    </span>
                                    <span>{listing.daily_rate}</span>
                                </div>
                                <div>
                                    <span className={styles.title}>
                                        Description:&nbsp;
                                    </span>
                                    <span>{listing.description}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>Bookings</h3>
                            <div>
                                <h4>Pending Bookings</h4>
                                <div
                                    className={
                                        styles.pending__bookings__container
                                    }
                                >
                                    {listing.bookings
                                        .filter(
                                            (booking) =>
                                                booking.status === "pending"
                                        )
                                        .map((booking) => {
                                            return (
                                                <BookingManagement
                                                    key={booking.id}
                                                    booking={booking}
                                                    listingid={listing.id}
                                                    refreshTrig={refreshTrig}
                                                    triggerRefresh={
                                                        triggerRefresh
                                                    }
                                                />
                                            );
                                        })}
                                </div>
                            </div>
                            <div>
                                <h4>Past Bookings</h4>
                                <div
                                    className={
                                        styles.pending__bookings__container
                                    }
                                >
                                    {listing.bookings
                                        .filter(
                                            (booking) =>
                                                booking.status !== "pending"
                                        )
                                        .map((booking) => {
                                            return (
                                                <PastBookingsRequests
                                                    key={booking.id}
                                                    booking={booking}
                                                />
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>Ratings and reviews</h3>
                            <div>
                                <Rating
                                    name="read-only"
                                    value={listing.rating}
                                    readOnly
                                />
                            </div>
                            <div>
                                <span className={styles.title}>
                                    Reviews:&nbsp;
                                </span>
                                <span>Reviews of your space will be here</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ManageListing;
