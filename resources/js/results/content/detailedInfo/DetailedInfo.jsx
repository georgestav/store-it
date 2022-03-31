import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./detailedInfo.module.css";
import Rating from "@mui/material/Rating";
import ReviewForm from "../reviewForm/ReviewForm";
import { UserContext } from "../../../components/context/UserContext";
import Review from "../review/Review";
import { Button } from "@mui/material";
import LoginForm from "../../../components/loginFrom/LoginForm";
import RegisterForm from "../../../components/registerForm/RegisterForm";

export default function DetailedInfo({ display, setDisplay }) {
    
    const { id } = useParams();

    //use userContext
    const user = useContext(UserContext);

    const [bookings, setBookings] = useState([]);
    const [form, setForm] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const [listing, setListing] = useState(null);

    //function that fetches the listing
    const fetchListing = async (id) => {
        try {
            const response = await axios.get(`/api/listings/${id}`);
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
        setBookings(data);
    };

    //function that fetches reviews
    const fetchReviews = async () => {
        const response = await axios.get(`/api/reviews/${id}`);
        const data = response.data;
        setReviews(data);
    };

    useEffect(() => {
        fetchListing(id);
        fetchReviews();
    }, [refreshTrigger]);

    useEffect(() => {
        user.user.id && fetchBookings();
    }, [user]);

    if (display === "login") {
        return (
            <>
                <LoginForm
                    setDisplay={setDisplay}
                    values={{ display, setDisplay }}
                />
            </>
        );
    } else if (display === "register") {
        return (
            <>
                <RegisterForm setDisplay={setDisplay} />
            </>
        );
    } else {
    return (
        <div className={styles.detailed__info}>
            {listing ? (
                <div className={styles.listing__info}>
                    <img
                        className={styles.image}
                        src={
                            listing.pictures.length > 0
                                ? `data:image/jpeg;base64,${listing.pictures[0].photo}`
                                : "https://picsum.photos/200?blur=2"
                        }
                        alt=""
                    />
                    <div>
                        <Rating
                            name="read-only"
                            value={listing.rating}
                            readOnly
                        />
                        <div>Number of reviews: {listing.review_count}</div>
                    </div>
                    <div className={styles.listing__details}>
                        <div>
                            <strong>Location:</strong> {listing.address}
                        </div>
                        {listing.user.person != null ? (
                            <div>
                                <strong>Name:</strong>{" "}
                                {listing.user.person.name}{" "}
                                {listing.user.person.surname}
                            </div>
                        ) : (
                            <div>
                                <strong>By user:</strong> {listing.user.name}
                            </div>
                        )}
                        <div>
                            <strong>Email:</strong> {listing.user.email}
                        </div>
                        {listing.user.person != null &&
                        listing.user.person != null ? (
                            <div>
                                <strong>Phone:</strong>{" "}
                                {listing.user.person.phone}
                            </div>
                        ) : (
                            <></>
                        )}
                        <div>
                            <strong>City:</strong> {listing.city.name}
                        </div>
                        <div>
                            <strong>Country:</strong> {listing.country.name}
                        </div>
                        <div>
                            <strong>Daily rate:</strong> {listing.daily_rate}
                        </div>
                        <div>
                            <strong>Description:</strong> {listing.description}
                        </div>
                        <div>
                            <strong>Size:</strong> {listing.size} m2
                        </div>
                        <Link to={`/results/book/${listing.id}`}>
                            <Button color="success" variant="outlined">
                                Book
                            </Button>{" "}
                        </Link>
                    </div>
                </div>
            ) : null}

            {user.user == "guest" ? (
                <div>Reviews can be written only by logged-in users.</div>
            ) : bookings.length > 0 ? (
                <Button onClick={() => setForm(!form)}>Write a review</Button>
            ) : (
                <div>
                    You cannot write reviews, if you have not booked the listing
                    in the past.
                </div>
            )}

            {form ? (
                <ReviewForm
                    refreshTrigger={refreshTrigger}
                    setRefreshTrigger={setRefreshTrigger}
                    listingId={id}
                    userId={user.user.id}
                    setForm={setForm}
                    form={form}
                />
            ) : (
                <></>
            )}

            <h3>Reviews</h3>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <Review
                        listingId={id}
                        key={review.id}
                        userId={user.user.id}
                        review={review}
                        refreshTrigger={refreshTrigger}
                        setRefreshTrigger={setRefreshTrigger}
                    />
                ))
            ) : (
                <div>No reviews</div>
            )}
        </div>
    );
        }
}
