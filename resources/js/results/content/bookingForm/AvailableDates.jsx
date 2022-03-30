import axios from "axios";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

function AvailableDates({ listingId }) {
    const [listing, setListing] = useState(null);

    const fetchListing = async () => {
        const request = await axios.get(`/api/listings/${listingId}/accepted`);
        const response = await request.data;
        // console.log(response);
        setListing(response);
    };

    useEffect(() => {
        fetchListing();
    }, []);

    if (listing) {
        return (
            <div>
                <div>
                    <strong>Your Selected Storage at: </strong>{" "}
                    {listing.address}
                </div>
                <div>
                    <div>
                        <strong>Is available from: </strong>
                        {
                            listing.availabilities[0]?.available_from.split(
                                " "
                            )[0]
                        }
                    </div>
                    <div>
                        <strong>Until: </strong>{" "}
                        {
                            listing.availabilities[0]?.available_until.split(
                                " "
                            )[0]
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <strong>It's booked the following dates: </strong>
                    </div>
                    <ul>
                        {listing.bookings.map((reserved) => {
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
