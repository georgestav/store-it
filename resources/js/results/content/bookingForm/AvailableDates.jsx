import axios from "axios";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

function AvailableDates({ listingId }) {
    const [booking, setBooking] = useState(null);

    const fetchBooking = async () => {
        const request = await axios.get(`/api/listings/${listingId}`);
        const response = await request.data;
        setBooking(response);
    };

    useEffect(() => {
        fetchBooking();
    }, []);

    if (booking) {
        return (
            <div>
                <div>Your Selected Storage at: {booking.address}</div>
                <div>
                    <div>
                        Is available from:
                        {
                            booking.availabilities[0]?.available_from.split(
                                " "
                            )[0]
                        }
                    </div>
                    <div>
                        Until:{" "}
                        {
                            booking.availabilities[0]?.available_until.split(
                                " "
                            )[0]
                        }
                    </div>
                </div>
                <div>
                    <div>It's booked the following dates:</div>
                    <ul>
                        {booking.bookings.map((reserved) => {
                            return (
                                <li key={reserved.id}>
                                    <div>
                                        {reserved.booked_from.split(" ")[0]}
                                    </div>
                                    <div>
                                        {reserved.booked_until.split(" ")[0]}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <CircularProgress color="secondary" />
                <div>Loading Availabilities...</div>
            </div>
        );
    }
}

export default AvailableDates;
