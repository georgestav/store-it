import React from "react";
import Rating from "@mui/material/Rating";
import axios from "axios";

export default function Review({review, refreshTrigger, setRefreshTrigger, userId}) {
    
    const {id, score, text, user, updated_at: updatedAt, user_id} = review;

    //deleting the specific review
    const deleteReview = async () => {
        const response = await axios.delete(`api/reviews/${id}`);
        const update = await axios.post(`api/listings/rating/${listingId}/minus`);
        const data = response.data;
        console.log(data);
    }

    return (
        <div>
            <p><strong>{user.name}</strong></p>
            <p>{updatedAt}</p>
            <Rating name="read-only" value={score} readOnly />
            <p>{text}</p>
            { userId == user_id ?
            <button onClick={() => {deleteReview(), setRefreshTrigger(!refreshTrigger)}}>Delete</button> :
            <></>
            }
        </div>
    );
}