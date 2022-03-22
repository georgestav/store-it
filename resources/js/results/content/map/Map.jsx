import styles from "./map.module.css";

export default function Map() {

    return (
        <>
            <h2>Map</h2>
            <div id="map" className={styles.container}></div>
        </>
    );
}