import React from "react";

export default function Booking({booking}) {

    const {booked_from, booked_until, status, listing} = booking;

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
            <button>Details</button>
            <br />
            <button>Delete</button>
        </div>
    );
}