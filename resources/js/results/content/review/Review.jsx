import React from "react";
import Rating from "@mui/material/Rating";
import axios from "axios";
import styles from "./Review.module.css";

export default function Review({
    review,
    refreshTrigger,
    setRefreshTrigger,
    userId,
    listingId,
}) {
    const { id, score, text, user, updated_at: updatedAt, user_id } = review;

    //deleting the specific review
    const deleteReview = async () => {
        const response = await axios.delete(`/api/reviews/${id}`);
        const update = await axios.post(
            `/api/listings/rating/${listingId}/minus`
        );
        const data = response.data;
        console.log(data);
        setRefreshTrigger(!refreshTrigger);
    };

    return (
        <div>
            <p>
                <strong>{user.name} </strong>
                <span className={styles.review__timestamp}>
                    {updatedAt.split("T")[0]}
                </span>
            </p>
            <Rating name="read-only" value={score} readOnly />
            <p>{text}</p>
            {userId == user_id ? (
                <button onClick={deleteReview}>Delete</button>
            ) : (
                <></>
            )}
        </div>
    );
}
