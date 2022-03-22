import styles from "./listing.module.css";

export default function Listing({listing}) {
    
    const {coordinates, daily_rate: dailyRate, description, rating, size, storage_type: storageType, user_id: userId} = listing;
    
    return (
        <div className={styles.container}>
            <h3>Location: {coordinates}</h3>
            <p>Daily rate: {dailyRate}</p>
            <p>Description: {description}</p>
            <p>Size: {size}</p>
        </div>
    );
}