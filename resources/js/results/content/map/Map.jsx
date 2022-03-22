import styles from "./map.module.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default function Map({listings}) {

    const position = [50.073658, 14.418540];

    return (
        <div>
            <h2>Map</h2>
            <MapContainer className={styles.container} center={position} zoom={10}>
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
                
            </MapContainer>
        </div>
    );
}