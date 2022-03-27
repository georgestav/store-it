import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
//styles
import styles from "./ManageListing.module.css";
import BookingManagement from "./management/BookingManagement";
import PastBookingsRequests from "./management/PastBookingsRequests";
/* 
//uncomment for dev
const fetchUserData = async () => {
    try {
        const getListings = await axios.get(`/api/listings/17`);
        const listings = await getListings.data;
        return listings;
    } catch (error) {
        console.error("error", error.response.data.message);
    }
}; */

function ManageListing({ listing, switchListingManagement }) {
    // const [listing, setListings] = useState(null); //uncomment for dev
    const [triggerRefresh, setTriggerRefresh] = useState(false);
    const refreshTrig = () => {
        setTriggerRefresh(!triggerRefresh);
    };

    useEffect(() => {
        // setListings(await fetchUserData()); //uncomment for dev
    }, [triggerRefresh]);

    if (!listing) {
        return <div>No listing Found</div>;
    } else {
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
                    <div>
                        <img
                            src={
                                listing.pictures.length > 0
                                    ? `data:image/jpeg;base64,${listing.pictures[0].photo}`
                                    : ""
                            }
                            alt={listing.pictures[0].name}
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.details}>
                        <div>
                            <h3>Location details</h3>
                            <div>
                                <span>Location</span>
                                <span>{listing.coordinates}</span>
                            </div>
                            <div>
                                <span>Country</span>
                                <span>{listing.country.name}</span>
                            </div>
                        </div>
                        <div>
                            <h3>Details of your space</h3>
                            <div>
                                <span>Created</span>
                                <span>{listing.created_at}</span>
                            </div>
                            <div>
                                <span>Last update</span>
                                <span>{listing.updated_at}</span>
                            </div>
                            <div>
                                <span>Type of space</span>
                                <span>{listing.storage_type.name}</span>
                            </div>
                            <div>
                                <span>Size</span>
                                <span>{listing.size}</span>
                            </div>
                            <div>
                                <span>Daily Rate</span>
                                <span>{listing.daily_rate}</span>
                            </div>
                            <div>
                                <span>Description</span>
                                <span>{listing.description}</span>
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
                            <h3>Reviews and rating</h3>
                            <div>
                                <span>Rating</span>
                                <span>{listing.rating}</span>
                            </div>
                            <div>
                                <span>Reviews</span>
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
