import React, {useContext} from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../components/context/UserContext";

export default function BookingForm() {

    const {listingId} = useParams();

    const user = useContext(UserContext);

    console.log(user);

    return (
        <form action="" method="post">
            <input type="hidden" name="listing_id" value={listingId} />
            <input type="hidden" name="user_id" value={user.id} />
            <input type="hidden" name="status" value="" />
            <label htmlFor="book-from">Book from</label> <br />
            <input id="book-from" name="booked_from" type="date"/><br />
            <label htmlFor="book-until">Book until</label>
            <input type="date" name="booked_until" id="book-until" />
        </form>
    );
}