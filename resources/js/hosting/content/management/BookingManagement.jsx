import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
//styles
import styles from "./BookingManagement.module.css";

function BookingManagement({
    listingid,
    booking,
    triggerRefresh,
    refreshTrig,
}) {
    const [bookUser, setBookUser] = useState({});

    const updateBookingStatus = async (id, status) => {
        await axios
            .patch(`api/bookings/${id}`, status)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.warn(error);
            });
        refreshTrig();
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

    const getUserName = async (id) => {
        const user = await axios.get(`/api/user/${id}/name`);
        setBookUser(await user.data);
    };

    useEffect(async () => {
        getUserName(booking.user_id);
    }, [triggerRefresh]);

    return (
        <div className={styles.card}>
            <div>
                <span className={styles.title}>Requested by:&nbsp;</span>
                <span>
                    {`${bookUser.person?.name} ${bookUser.person?.surname}` ||
                        booking.user_id}
                </span>
            </div>
            <div>
                <span className={styles.title}>Email:&nbsp;</span>
                <span>{bookUser.email || "Not provided"}</span>
            </div>
            <div>
                <span className={styles.title}>Phone number:&nbsp;</span>
                <span>{bookUser.person?.phone || "Not provided"}</span>
            </div>
            <div>
                <span className={styles.title}>
                    Requesting to book it from:&nbsp;
                </span>
                <span>{booking.booked_from.split(" ")[0]}</span>
            </div>
            <div>
                <span className={styles.title}>Until:&nbsp;</span>
                <span>{booking.booked_until.split(" ")[0]}</span>
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
