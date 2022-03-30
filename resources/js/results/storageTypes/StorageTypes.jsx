import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../components/context/UserContext";
import { useParams } from "react-router-dom";
import ListingCard from "../content/listingCard/ListingCard";
import styles from "./storageTypes.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import LoginForm from "../../components/loginFrom/LoginForm";
import RegisterForm from "../../components/registerForm/RegisterForm";

export default function StorageTypes({ display, setDisplay }) {
    
    const {typeId} = useParams();

    //use userContext
    const user = useContext(UserContext);

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
}

