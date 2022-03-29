import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./detailedInfo.module.css";
import Rating from "@mui/material/Rating";
import ReviewForm from "../reviewForm/ReviewForm";
import { UserContext } from "../../../components/context/UserContext";
import Review from "../review/Review";

export default function DetailedInfo() {
    
    const { id } = useParams();

    const user = useContext(UserContext);

    const [bookings, setBookings] = useState([]);
    const [form, setForm] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    console.log(user);

    const [listing, setListing] = useState(null);

    //function that fetches the listing
    const fetchListing = async (id) => {
        try {
            const response = await axios.get(`api/listings/${id}`);
            const data = response.data;
            setListing(data);
        } catch (error) {
            console.log(error);
        }
    };

    //function that checks, whether there are some bookings made by the user
    const fetchBookings = async () => {
        const response = await axios.get(`/api/bookings/${user.user.id}/${id}`);
        const data = response.data;
        console.log("this", data);
        setBookings(data);
    }

    //function that fetches reviews
    const fetchReviews = async () => {
        const response = await axios.get(`/api/reviews/${id}`);
        const data = response.data;
        console.log("reviews", data);
        setReviews(data);
    }

    useEffect(() => {
        fetchListing(id);
        fetchReviews();
    }, [refreshTrigger]);

    useEffect(() => {
        user.user.id && fetchBookings();
    }, [user]);

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
                    <br />
                </>
            ) : null}

            {
                user.user == "guest" ?
                <p>Reviews can be written only by logged-in users.</p> :
                (bookings.length > 0 ?
                <button onClick={() => setForm(!form)}>Write a review</button> :
                <p>You cannot write reviews, if you have not booked the listing in the past.</p>)
            }            
            
            {
                form ?
                <ReviewForm refreshTrigger={refreshTrigger} setRefreshTrigger={setRefreshTrigger} listingId={id} userId={user.user.id} setForm={setForm} form={form}/> :
                <></>
            }

            <h3>Reviews</h3>
            {
                reviews.length > 0 ?
                (
                reviews.map(review => (
                    <Review key={review.id} review={review}/>
                ))
                 ) :
                <p>No reviews</p>
            }
        </>
    );
}
