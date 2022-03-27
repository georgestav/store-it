import axios from "axios";
import React from "react";

export default function Booking({booking, forceRefresh}) {

    const {booked_from, booked_until, status, listing, id} = booking;

    //function that deletes the booking and refreshes the page, to remove it form the DOM
    const handleDelete = async () => {
        const response = await axios.delete(`api/bookings/${id}`);
        console.log("deleted", response.status);
        if (response.status === 200) forceRefresh();
    }

    return (
        <div>
            <img src={
                listing.pictures.length ?
                `data:image/jpeg;base64,${listing.pictures[0].photo}` :
                ""
            } alt="" style={{ height: 100, width: 100}} />
            <p>Location: {listing.coordinates}</p>
            <p>Booked from: {booked_from}</p>
            <p>Booked until: {booked_until}</p>
            <p>Status: {status}</p>
            <button><a href={`results/listing/${listing.id}`}>Details</a></button>
            <br />
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}