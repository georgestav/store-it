import React, { useEffect, useState } from "react";
import styles from "./bookings.module.css";
import Booking from "./Booking";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default function Bookings({ user, forceRefresh }) {
    //states
    const [bookings, setBookings] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    //fetch bookings of the user
    const fetchBookings = async () => {
        if (!user.id) return;

        try {
            const response = await axios.get(`/api/user/${user.id}/getbookings`);
            const data = response.data;
            setBookings(data);
            setDataLoaded(true);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [user]);

    return (
        <div className={styles.mybookings__container}>
            <h2>My bookings</h2>
            {!dataLoaded ? (
                <div>
                    <Stack
                        sx={{ color: "grey.800" }}
                        spacing={2}
                        direction="row"
                    >
                        <CircularProgress color="secondary" />
                    </Stack>
                    Loading your bookings...
                </div>
            ) : !bookings.length ? (
                <p>No bookings to display</p>
            ) : (
                <div className={styles.bookings__list}>
                    {bookings.map((booking) => (
                        <Booking
                            key={booking.id}
                            booking={booking}
                            forceRefresh={forceRefresh}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
