import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
//css
import styles from "./resultsList.module.css";
//custom components
import Listing from "../listing/Listing";
import Map from "../map/Map";
import CircularProgress from "@mui/material/CircularProgress";

export default function ResultsList() {
    const [results, setResults] = useState([]);
    const [resultsLoaded, setResultsLoaded] = useState(false);
    const [cityID, setCityID] = useState(null);
    const [cityCoordinates, setCityCoordinates] = useState([]);

    const { type } = useParams();

    //accessing the search from the url
    const path = location.pathname;
    const pathArr = path.split("/");
    const lastPartOfPath = pathArr[pathArr.length - 1];
    const search =
        lastPartOfPath[0].toUpperCase() + lastPartOfPath.substring(1);

    //function that fetches the id of the city, that has been searched for
    const fetchCityId = async (userInput) => {
        if (userInput.startsWith("Coords")) {
            return -1;
        } else {
            const response = await axios.get(`api/cities/${userInput}`);
            const data = response.data;
            return data[0] ? data[0].id : -1;
        }
    };

    //function that fetches the coordinates of a city based on the user input
    const fetchCityCoordinates = async (userInput) => {
        if (userInput.startsWith("Coords")) {
            const arr = userInput.split(",");
            console.log(arr);
            return [arr[1], arr[2]];
        } else {
            const options = {
                params: {
                    q: userInput,
                    format: "geojson",
                },
            };

            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search`,
                options
            );
            const data = response.data;
            return data.features[0].geometry.coordinates.reverse();
        }
    };

    //function that fetches the listings based on the city, that has been searched
    const fetchListings = async () => {
        const cityID = await fetchCityId(search);
        const cityCoordinates = await fetchCityCoordinates(search);

        const response = await axios.get(
            `api/listings/${cityID}/${cityCoordinates[0]}/${cityCoordinates[1]}/${type}`
        );
        const data = response.data;

        setCityID(cityID);
        setCityCoordinates(cityCoordinates);
        setResults(data);
        setResultsLoaded(true);
    };

    useEffect(() => {
        fetchListings();
    }, []);

    return (
        <>
            {!resultsLoaded ? (
                <div>
                    <CircularProgress color="secondary" />
                    <div>Loading listings...</div>
                </div>
            ) : (
                <div className={styles.container}>
                    <div className={styles.container__results}>
                        <p>Results</p>
                        {results.map((listing) => (
                            <Listing key={listing.id} listing={listing} />
                        ))}
                    </div>
                    <div className={styles.container__map}>
                        <Map
                            listings={results}
                            cityCoordinates={cityCoordinates}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
