import styles from "./listing.module.css";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import Rating from "@mui/material/Rating";

export default function Listing({listing}) {
    
    const {id, distance, daily_rate: dailyRate, description, size} = listing;

        
    return (
        <Link to={"/results/listing/" + id} className={styles.link}>
            <div className={styles.container}>
                <h3>Location:</h3>
                <Rating name="read-only" value={listing.rating} readOnly />
                <p>Distance: {(distance / 1000).toFixed(2)} km</p>
                <p>Daily rate: {dailyRate}</p>
                <p>Description: {description}</p>
                <p>Size: {size}</p>
            </div>
        </Link>
    );
}