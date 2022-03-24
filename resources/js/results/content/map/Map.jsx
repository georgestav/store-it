import React from "react";
import styles from "./map.module.css";
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';

export default function Map({listings, cityCoordinates}) {

    const all = listings.length ? listings : null;

    let max = null;

    if (all) {
        all.forEach(element => {
            const dist = Math.abs(element.coordinates.split(", ")[0] - cityCoordinates[0]);
            if(dist > max) {
                max = dist;
            }
        })

        all.forEach(element => {
            const dist = Math.abs(element.coordinates.split(", ")[1] - cityCoordinates[1]);
            if (dist > max) {
                max = dist;
            }
        })
    }

    console.log("max", max);

    return (
        <div>
            <h2>Map</h2>
            {cityCoordinates == false ?
            null :
            (<MapContainer className={styles.container} center={cityCoordinates} bounds={max ? [[cityCoordinates[0] - max, cityCoordinates[1] - max], [[cityCoordinates[0] + max, [cityCoordinates[1] + max]]]] : null}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {listings.map((listing) => (
                    <Marker key={listing.id} position={listing.coordinates.split(",")}>
                        <Popup>
                           {listing.coordinates} <br /> {(listing.distance/1000).toFixed(2)} km <br /> {listing.daily_rate} USD <br /> {listing.description}
                        </Popup>
                    </Marker>
                ))}
                
            </MapContainer>)}
        </div>
    );
}