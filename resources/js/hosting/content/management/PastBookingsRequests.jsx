import axios from "axios";
import React, { useEffect, useState } from "react";
//styles
import styles from "./BookingManagement.module.css";

const getUserName = async (id) => {
    const user = await axios.get(`/api/user/${id}/name`);
    return user.data;
};

function PastBookingsRequests({ booking }) {
    const [bookUser, setBookUser] = useState({});

    //booking.status === "accepted" ? styles.accepted : ""
    const statusBG = () => {
        if (booking.status === "accepted") {
            return "accepted";
        } else {
            return "rejected";
        }
    };
    useEffect(async () => {
        setBookUser(await getUserName(booking.user_id));
    }, []);

    return (
        <div className={styles[("card", statusBG())]}>
            <div>
                <div>Made by user:</div>
                <div>{bookUser.name || booking.user_id}</div>
            </div>
            <div>
                <div>Status:</div>
                <div>{booking.status}</div>
            </div>
        </div>
    );
}

export default PastBookingsRequests;
