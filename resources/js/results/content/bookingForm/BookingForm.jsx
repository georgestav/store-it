import React, {useContext, useState} from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../components/context/UserContext";
import axios from "axios";

export default function BookingForm() {

    const {listingId} = useParams();

    const user = useContext(UserContext);

    const userId = user.user.id;
    
    // console.log(userId);

    // console.log("haha");

    const [values, setValues] = useState({
        user_id: userId,
        listing_id: listingId,
        status: "pending",
        booked_from: "",
        booked_until: "",
    })

    // console.log(values);
    // console.log(userId);

    const handleChange = (event) => {
        setValues(oldValues => {
            return {
                ...oldValues,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post("/api/bookings", values);
        const data = response.data;
        console.log(data);
    }


    return (
        <form action="" method="post" onSubmit={handleSubmit}>
            <label htmlFor="book-from">Book from</label>
            <br />
            <input id="book-from" name="booked_from" type="date" value={values.booked_from} onChange={handleChange} />
            <br />
            <label htmlFor="book-until">Book until</label>
            <br />
            <input type="date" name="booked_until" id="book-until" value={values.booked_until} onChange={handleChange}  />
            <br />
            <button>Book</button>
        </form>
    );
}