import React from "react";
//styles
import styles from "./BookingManagement.module.css";

function PastBookingsRequests({ booking }) {
    return (
        <div className={styles.card}>
            <div>
                <div>Made by user:</div>
                <div>{booking.user_id}</div>
            </div>
            <div>
                <div>Status:</div>
                <div>{booking.status}</div>
            </div>
        </div>
    );
}

export default PastBookingsRequests;
