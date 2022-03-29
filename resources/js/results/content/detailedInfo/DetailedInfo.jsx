import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./detailedInfo.module.css";
import Rating from "@mui/material/Rating";

export default function DetailedInfo() {
    const { id } = useParams();

    // console.log(`api/listings/${id}`);

    // console.log(id);

    const [listing, setListing] = useState(null);

    //function that fetches the listing
    const fetchListing = async (id) => {
        try {
            const response = await axios.get(`api/listings/${id}`);
            const data = response.data;
            setListing(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchListing(id);
    }, []);

    return (
        <>
            {listing ? (
                <>
                    <img
                        className={styles.image}
                        src={
                            listing.pictures.length > 0
                                ? `data:image/jpeg;base64,${listing.pictures[0].photo}`
                                : "https://picsum.photos/200?blur=2"
                        }
                        alt=""
                    />
                    <Rating name="read-only" value={listing.rating} readOnly />
                    <h3>Location: {listing.address}</h3>
                    {listing.user.person != null ? (
                        <p>
                            Name: {listing.user.person.name}{" "}
                            {listing.user.person.surname}
                        </p>
                    ) : (
                        <p>By user: {listing.user.name}</p>
                    )}
                    <p>Email: {listing.user.email}</p>
                    {listing.user.person != null &&
                    listing.user.person != null ? (
                        <p>Phone: {listing.user.person.phone}</p>
                    ) : (
                        <></>
                    )}
                    <p>City: {listing.city.name}</p>
                    <p>Country: {listing.country.name}</p>
                    <p>Daily rate: {listing.daily_rate}</p>
                    <p>Description: {listing.description}</p>
                    <p>Rating: {listing.rating}</p>
                    <p>Size: {listing.size}m2</p>
                    <Link to={`/results/book/${listing.id}`}>
                        <button>Book</button>{" "}
                    </Link>
                </>
            ) : null}
        </>
    );
}
