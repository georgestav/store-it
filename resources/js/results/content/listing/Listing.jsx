import styles from "./listing.module.css";

export default function Listing({listing, address}) {
    
    const {coordinates, daily_rate: dailyRate, description, rating, size, storage_type: storageType, user_id: userId} = listing;

    console.log("haha", address);
    return (
        <div className={styles.container}>
            <h3>Location: {address}</h3>
            <p>Daily rate: {dailyRate}</p>
            <p>Description: {description}</p>
            <p>Size: {size}</p>
        </div>
    );
}