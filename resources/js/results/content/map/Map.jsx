import React, {useEffect, useState} from "react";
import styles from "./map.module.css";
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-markercluster";
import Rating from "@mui/material/Rating";

export default function Map({listings, cityCoordinates}) {

    const [map, setMap] = useState('something')

    const [distance, setDistance] = useState(null);
    
    const [limit, setLimit] = useState(0);

    const all = listings.length ? listings : null;

    // console.log(map)

    let tempDistance = null;

    if (all) {
        all.forEach(element => {
            if (element.distance > tempDistance) {
                tempDistance = element.distance;
            }
        })
    }

    if (all && limit < 2) {
        setDistance((tempDistance/1000).toFixed(2));
        setLimit(limit + 1);
        // console.log(distance);
    }

    useEffect(() => {
        
        if (map !== "something") {            
            
            switch (true) {
                case distance > 7241:
                    map.setView(cityCoordinates, 1);
                    break;
                case distance > 3240:
                    map.setView(cityCoordinates, 2);
                    break;
                case distance > 1309:
                    map.setView(cityCoordinates, 3);
                    break;
                case distance > 777:
                    map.setView(cityCoordinates, 4);
                    break;
                case distance > 420:
                    map.setView(cityCoordinates, 5);
                    break;    
                case distance > 250:
                    map.setView(cityCoordinates, 6);
                    break;
                case distance > 110:
                    map.setView(cityCoordinates, 7);
                    break;
                case distance > 67:
                    map.setView(cityCoordinates, 8);
                    break;
                case distance > 30:
                    map.setView(cityCoordinates, 9);
                    break;
                case distance > 16:
                    map.setView(cityCoordinates, 10);
                    break;
                case distance > 6:
                    map.setView(cityCoordinates, 11);
                    break;
                case distance > 3:
                    map.setView(cityCoordinates, 12);
                    break;
                default:
                    map.setView(cityCoordinates, 13);
                    break;
            }
        }

    }, [distance, map])
    

    return (
        <div>
            <h2>Map</h2>
            {cityCoordinates == false ?
            null :
            (<MapContainer className={styles.container} center={cityCoordinates} whenCreated={setMap} zoom={1}>
                
                <p>{distance}</p>
                <p>{cityCoordinates}</p>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup>
                {listings.map((listing) => (
                    <Marker key={listing.id} position={listing.coordinates.split(",")}>
                        <Popup>
                           {listing.coordinates} <br /> <div className={styles.cluster}><Rating name="read-only" value={listing.rating} readOnly /></div> <br /> {(listing.distance/1000).toFixed(2)} km <br /> {listing.daily_rate} USD <br /> {listing.description}
                        </Popup>
                    </Marker>
                ))}
                </MarkerClusterGroup>
                
            </MapContainer>)}
        </div>
    );
}