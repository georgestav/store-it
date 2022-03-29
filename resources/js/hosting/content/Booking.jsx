import axios from "axios";
import React from "react";
import { Button } from "@mui/material";
//styles
import styles from "./Booking.module.css";

export default function Booking({ booking, forceRefresh }) {
    const { booked_from, booked_until, status, listing, id } = booking;

    //function that deletes the booking and refreshes the page, to remove it form the DOM
    const handleDelete = async () => {
        const response = await axios.delete(`api/bookings/${id}`);
        console.log("deleted", response.status);
        if (response.status === 200) forceRefresh();
    };

    return (
        <div className={styles.mybooking__container}>
            <img
                className={styles.image}
                src={
                    listing.pictures.length
                        ? `data:image/jpeg;base64,${listing.pictures[0].photo}`
                        : ""
                }
                alt={listing.address}
            />
            <div className={styles.mybooking__description}>
                <div className={styles.mybooking__description__details}>
                    <div className={styles.mybooking__description__detail}>
                        <span>Location:</span> <span>{listing.address}</span>
                    </div>
                    <div className={styles.mybooking__description__detail}>
                        <span>Booked from:</span> <span>{booked_from}</span>
                    </div>
                    <div className={styles.mybooking__description__detail}>
                        <span>Booked until:</span> <span>{booked_until}</span>
                    </div>
                    <div className={styles.mybooking__description__detail}>
                        <span>Status:</span> <span>{status}</span>
                    </div>
                </div>
                <div className={styles.mybooking__actions}>
                    <Button>
                        <a href={`results/listing/${listing.id}`}>Details</a>
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}
