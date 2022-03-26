import React from "react";
import { Button } from "@mui/material";
//styles
import styles from "./BookingManagement.module.css";

function BookingManagement({ listingid, booking, refreshTrig }) {
    const updateBookingStatus = async (id, status) => {
        await axios
            .patch(`api/bookings/${id}`, status)
            .then(function (response) {
                console.log(response);
                refreshTrig();
            })
            .catch(function (error) {
                console.warn(error);
            });
    };

    const acceptBookingHandler = () => {
        updateBookingStatus(booking.id, {
            status: "accepted",
            listing_id: listingid,
            booked_from: booking.booked_from,
            booked_until: booking.booked_until,
        });
    };

    const rejectBookingHandler = () => {
        updateBookingStatus(booking.id, {
            status: "rejected",
            listing_id: listingid,
            booked_from: booking.booked_from,
            booked_until: booking.booked_until,
        });
    };

    return (
        <div className={styles.card}>
            <div>
                Made by user:
                <div>{booking.user_id}</div>
            </div>
            <div>
                Requesting to book it from:
                <div>{booking.booked_from}</div>
            </div>
            <div>
                Until:
                <div>{booking.booked_until}</div>
            </div>
            <div className={styles.button__container}>
                <Button onClick={acceptBookingHandler}>Accept</Button>
                <Button onClick={rejectBookingHandler} color="error">
                    Reject
                </Button>
            </div>
        </div>
    );
}

export default BookingManagement;
