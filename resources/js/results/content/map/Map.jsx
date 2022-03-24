import React from "react";
import styles from "./map.module.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default function Map({listings, cityCoordinates}) {

    return (
        <div>
            <h2>Map</h2>
            {cityCoordinates == false ?
            null :
            (<MapContainer className={styles.container} center={cityCoordinates} zoom={10}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {listings.map((listing) => (
                    <Marker key={listing.id} position={listing.coordinates.split(",")}>
                        <Popup>
                           {listing.coordinates} <br /> {listing.daily_rate} USD <br /> {listing.description}
                        </Popup>
                    </Marker>
                ))}
                
            </MapContainer>)}
        </div>
    );
}