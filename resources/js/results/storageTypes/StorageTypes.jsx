import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListingCard from "../content/listingCard/ListingCard";
import styles from "./storageTypes.module.css";
import CircularProgress from "@mui/material/CircularProgress";

export default function StorageTypes() {
    
    const {typeId} = useParams();

    const [listings, setListings] = useState([]);
    const [listingsLoaded, setListingsLoaded] = useState(false);

    //function, that fetches listings based on the storage type
    const fetchListings = async(typeId) => {
        const response = await axios.get(`api/listings/type/${typeId}`);
        const data = response.data;
        console.log(data);
        setListings(data);
        setListingsLoaded(true);
    }

    useEffect(() => {
        fetchListings(typeId);
    }, [])
    
    return (
        <div className={styles.container}>
            {listingsLoaded ? (listings.length ? (
                listings.map((element) => (
                   <ListingCard key={element.id} listing={element} />
                ))
            ) : <p>No bookings of this type</p>) :
            <div>
                    <CircularProgress color="secondary" />
                    <div>Loading your listings...</div>
                </div>
            }
        </div>
    );
}

