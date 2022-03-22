import React, {useState, useEffect} from "react";
import axios from "axios";
//css
import styles from "./resultsList.module.css";
//custom components
import Listing from "../listing/Listing";
import Map from "../map/Map";

export default function ResultsList() {

    const [results, setResults] = useState([]);
    const [cityID, setCityID] = useState(null);
    const [cityCoordinates, setCityCoordinates] = useState([]);

    //accessing the search from the url
    const path = location.pathname;
    const pathArr = path.split("/");
    const lastPartOfPath = pathArr[pathArr.length - 1];
    const search = lastPartOfPath[0].toUpperCase() + lastPartOfPath.substring(1);

    //function that fetches the id of the city, that has been searched for
    const fetchCityId = async (userInput) => {
        const response = await axios.get(`api/cities/${userInput}`);
        const data = response.data;

        if (userInput !== "Results") {
            setCityID(data[0].id);
        } else {
            setCityID("");
        }
    }

    const fetchCityCoordinates = async (userInput) => {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${userInput}&format=geojson`);
        const data = response.data;
        // console.log('fetchCityCoordinates',data.features[0].geometry.coordinates.reverse());

        if (userInput !== "Results") {
            setCityCoordinates(data.features[0].geometry.coordinates.reverse());
        } else {
            setCityCoordinates([51.509865, -0.118092]);
        }
    }
    
    //function that fetches the listings based on the city, that has been searched
    const fetchListings = async () => {
        fetchCityId(search);
        // console.log(cityID);
        const response = await axios.get(`api/listings/${cityID}`);
        const data = response.data;
        // console.log(data);
        setResults(data);
    }

    useEffect(() => {
        fetchListings();
        fetchCityCoordinates(search);
    }, [cityID]);

    return (
        <div className={styles.container}>
            <div className={styles.container__results} >
                <p>Results</p>
                {results.map(listing => (
                    <Listing key={listing.id} listing={listing} />
                ))}
            </div>
            <div className={styles.container__map}>
                <Map listings={results} cityCoordinates={cityCoordinates}/>
            </div>
        </div>
        
    );
}