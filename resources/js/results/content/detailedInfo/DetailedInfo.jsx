import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import axios from "axios";

export default function DetailedInfo() {

    const {id} = useParams();
    
    // console.log(`api/listings/${id}`);

    // console.log(id);

    const [listing, setListing] = useState(null);

    //function that fetches the listing
    const fetchListing = async (id) => {

        try {
            const response = await axios.get(`api/listings/${id}`);
            const data = response.data;
            setListing(data);
            // console.log(data);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchListing(id);
    }, [])

    
    return (
        <>
            {listing ?
            <> 
            <h3>Location: {listing.coordinates}</h3>
            <p>City: {listing.city.name}</p>
            <p>Country: {listing.country.name}</p>
            <p>Daily rate: {listing.daily_rate}</p>
            <p>Description: {listing.description}</p>
            <p>Rating: {listing.rating}</p>
            <p>Size: {listing.size}m2</p>
            <Link to={`/results/book/${listing.id}`}><button>Book</button> </Link>
            </>
            : null}
        </>
    );
}