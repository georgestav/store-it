import React from "react";
import Rating from "@mui/material/Rating";

export default function Review({review}) {
    
    const {score, text, user, updated_at: updatedAt} = review;

    return (
        <div>
            <p><strong>{user.name}</strong></p>
            <p>{updatedAt}</p>
            <Rating name="read-only" value={score} readOnly />
            <p>{text}</p>
        </div>
    );
}