import React from "react";
import Rating from "@mui/material/Rating";
import styles from "./listingCard.module.css";
import { Link } from "react-router-dom";

export default function ListingCard({listing}) {
    
    const {review_count, id, address, pictures, daily_rate: dailyRate, description, rating, size, storage_type: storageType} = listing;

    return (
        <div className={styles.container}>

            <img src={pictures.length > 0 ? `data:image/jpeg;base64,${listing.pictures[0].photo}` :
                ""} alt="" />
            <Rating
                                name="read-only"
                                value={rating}
                                readOnly
                            />
            <div>Number of reviews: {review_count}</div>
            <h3>Location: {address}</h3>
            <p><strong>Daily rate:</strong> {dailyRate}</p>
            <p><strong>Size:</strong> {size}m2</p>
            <p><strong>Type:</strong> {storageType.name}</p>
            <p><strong>Description:</strong> {description}</p>
            <Link to={`/results/listing/${id}`}><button>More information</button></Link>
        </div>
    );
}