import React, {useState, useEffect} from "react";
import axios from "axios";
//custom components
import Listing from "../listing/Listing";

export default function ResultsList() {

    const [results, setResults] = useState([]);
    const [cityID, setCityID] = useState(null);

    //accessing the search from the url
    const path = location.pathname;
    const pathArr = path.split("/");
    const lastPartOfPath = pathArr[pathArr.length - 1];
    const search = lastPartOfPath[0].toUpperCase() + lastPartOfPath.substring(1);

    //function that fetches the id of the city, that has been searched for
    const fetchCity = async (userInput) => {
        const response = await axios.get(`api/cities/${userInput}`);
        const data = response.data;

        if (userInput !== "Results") {
            setCityID(data[0].id);
        } else {
            setCityID("");
        }
    }
    
    //function that fetches the listings based on the city, that has been searched
    const fetchListings = async () => {
        fetchCity(search);
        // console.log(cityID);
        const response = await axios.get(`api/listings/${cityID}`);
        const data = response.data;
        // console.log(data);
        setResults(data);
    }

    useEffect(() => {
        fetchListings();
    }, [cityID]);

    return (
        <>
            <p>Results</p>
            {results.map(listing => (
                <Listing key={listing.id} listing={listing} />
            ))}
        </>
        
    );
}