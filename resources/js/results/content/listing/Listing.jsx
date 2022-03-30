import styles from "./listing.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";

export default function Listing({ listing }) {
    const {
        id,
        distance,
        daily_rate: dailyRate,
        description,
        size,
        address,
        review_count,
    } = listing;

    return (
        <div className={styles.container}>
            <h4 className={styles.heading}>Location: {address}</h4>
            <Rating name="read-only" value={listing.rating} readOnly />
            <div>Number of reviews: {review_count}</div>
            <div className={styles.details}>
                <div>Distance: {(distance / 1000).toFixed(2)} km</div>
                <div>Daily rate: {dailyRate}</div>
                <div>Description: {description}</div>
                <div>Size: {size}</div>
            </div>
            <Link to={"/results/listing/" + id} className={styles.link}>
                <Button variant="outlined">Details</Button>
            </Link>
        </div>
    );
}
