import React from "react";
//styles
import styles from "./BookingManagement.module.css";

function PastBookingsRequests({ booking }) {
    console.log(booking.status);

    //booking.status === "accepted" ? styles.accepted : ""
    const statusBG = () => {
        if (booking.status === "accepted") {
            return "accepted";
        } else {
            return "rejected";
        }
    };

    return (
        <div className={styles[("card", statusBG())]}>
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
