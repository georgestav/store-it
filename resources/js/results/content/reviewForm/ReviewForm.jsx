import axios from "axios";
import React, { useState } from "react";
import { Button } from "@mui/material";
import styles from "./ReviewForm.module.css";

export default function ReviewForm({
    listingId,
    userId,
    setForm,
    form,
    setRefreshTrigger,
    refreshTrigger,
}) {
    const [values, setValues] = useState({
        user_id: userId,
        text: "",
        score: "1",
    });

    const handleChange = (e) => {
        setValues((oldValues) => {
            return {
                ...oldValues,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`/api/reviews/${listingId}`, values);
        const update = await axios.post(
            `/api/listings/rating/${listingId}/plus`
        );
        const data = response.data;
        console.log(data);
        setForm(!form);
        setRefreshTrigger(!refreshTrigger);
    };

    return (
        <form
            action=""
            method="post"
            onSubmit={handleSubmit}
            className={styles.review__form}
        >
            <div className={styles.review__form__input}>
                <label htmlFor="review">Review:</label>
                <textarea
                    id="review"
                    onChange={handleChange}
                    value={values.text}
                    name="text"
                ></textarea>
            </div>
            <div className={styles.review__form__input}>
                <label htmlFor="score">Your Score:</label>
                <select
                    name="score"
                    id="score"
                    value={values.score}
                    onChange={handleChange}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <Button type="submit" color="success" variant="outlined">
                Send review
            </Button>
        </form>
    );
}
