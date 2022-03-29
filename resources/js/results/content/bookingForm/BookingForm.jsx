import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../components/context/UserContext";
import axios from "axios";
import AvailableDates from "./AvailableDates";
import { Button } from "@mui/material";

export default function BookingForm() {
    const { listingId } = useParams();
    const user = useContext(UserContext);

    const [availability, setAvailability] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const [invalidDates, setInvalidDates] = useState(false);
    const [bookingSubmited, setBookingSubmited] = useState(false); //default false

    const userId = user.user.id;

    const [values, setValues] = useState({
        user_id: userId,
        listing_id: listingId,
        status: "pending",
        booked_from: "",
        booked_until: "",
    });

    //function to trigger a refresh
    const forceRefresh = () => {
        setRefreshTrigger(!refreshTrigger);
    };

    const handleChange = (event) => {
        setValues((oldValues) => {
            return {
                ...oldValues,
                [event.target.name]: event.target.value,
            };
        });
        setAvailability(true);
        setInvalidDates(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post("/api/bookings", values);
        const data = response.data;
        console.log(data);
        if (data == false) {
            setAvailability(false);
            console.log("hey");
        }

        if (data === "false order") {
            setInvalidDates(true);
        }
        setBookingSubmited(true); //if booking is successful set to true to display a status message

        forceRefresh();
    };

    return (
        <>
            <AvailableDates listingId={listingId} />
            {availability ? (
                <></>
            ) : (
                <p>
                    <strong>Not available at this date</strong>
                </p>
            )}
            {invalidDates ? (
                <p>
                    <strong>Invalid order of dates.</strong>
                </p>
            ) : (
                <></>
            )}
            {bookingSubmited === true ? (
                <div>
                    <div>Your booking was Successful</div>
                    <div>Thank you!</div>
                    <div>
                        Now that your booking is pending you can go back to the
                        home page or visit your profile to view your booking
                        status
                    </div>
                    <div>
                        <Button
                            onClick={() => {
                                window.location.href = "/";
                            }}
                        >
                            Home
                        </Button>
                        <Button
                            onClick={() => {
                                window.location.href = "/hosting";
                            }}
                        >
                            Profile
                        </Button>
                    </div>
                </div>
            ) : (
                <form action="" method="post" onSubmit={handleSubmit}>
                    <label htmlFor="book-from">Book from</label>
                    <br />
                    <input
                        id="book-from"
                        name="booked_from"
                        type="date"
                        value={values.booked_from}
                        onChange={handleChange}
                    />
                    <br />
                    <label htmlFor="book-until">Book until</label>
                    <br />
                    <input
                        type="date"
                        name="booked_until"
                        id="book-until"
                        value={values.booked_until}
                        onChange={handleChange}
                    />
                    <br />
                    <button>Book</button>
                </form>
            )}
        </>
    );
}
