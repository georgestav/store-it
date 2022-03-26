import React from "react";
//styles
import styles from "./BookingManagement.module.css";

function PastBookingsRequests({ booking }) {
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
            <div>
                Status
                <div>{booking.status}</div>
            </div>
        </div>
    );
}

export default PastBookingsRequests;
