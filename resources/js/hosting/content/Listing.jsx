import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import React, { useEffect } from "react";
import Badge from "@mui/material/Badge";
//styles
import styles from "./Listing.module.css";

const deleteListing = async (id) => {
    try {
        // get request to get list of cities in the DB that the user can register to
        const getdetails = await axios.delete(`api/listings/${id}`);
        const data = await getdetails;
        return data;
    } catch (error) {
        console.error("Could not delete", error.response.data.message);
    }
};

function Listing({ listing, forceRefresh, switchListingManagement }) {
    const deleteListingHandler = async () => {
        const status = await deleteListing(listing.id);
        if (status.status === 200) forceRefresh();
    };

    const countPending = () => {
        let count = 0;
        listing.bookings.filter((booking) => {
            if (booking.status === "pending") {
                count++;
            }
        });
        return count;
    };

    useEffect(() => {}, []);
    //src='data:image/jpeg;base64,${image[0]["photo"]}'

    if (!listing) {
        return <div>No listings</div>;
    } else {
        return (
            <Badge
                className={styles.listing__container}
                color="secondary"
                badgeContent={countPending()}
                style={{ width: "32rem" }}
            >
                <div className={styles.image__container}>
                    <img
                        className={styles.image}
                        src={
                            listing.pictures.length > 0
                                ? `data:image/jpeg;base64,${listing.pictures[0].photo}`
                                : "https://picsum.photos/200?blur=2"
                        }
                        alt=""
                    />
                </div>
                <div className={styles.details__container}>
                    <div>
                        <div className={styles.details__line}>
                            <span className={styles.title}>
                                Location:&nbsp;
                            </span>
                            <span>{listing.address}</span>
                        </div>
                        <div>
                            <span className={styles.title}>
                                Rate per day:&nbsp;
                            </span>
                            <span>{listing.daily_rate}</span>
                        </div>
                        <div>
                            <span className={styles.title}>
                                Open until:&nbsp;
                            </span>
                            <span>
                                {listing.availabilities.length
                                    ? listing.availabilities[0].available_until.split(
                                          " "
                                      )[0]
                                    : "n/a"}
                            </span>
                        </div>
                        <div>
                            <span className={styles.title}>
                                Total Bookings:&nbsp;
                            </span>
                            <span>{listing.bookings.length}</span>
                        </div>
                        <div>
                            <Rating
                                name="read-only"
                                value={listing.rating}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className={styles.actions__container}>
                        <Button
                            onClick={() => switchListingManagement(listing)}
                        >
                            Manage
                        </Button>
                        <Button color="error" onClick={deleteListingHandler}>
                            Delete Listing
                        </Button>
                    </div>
                </div>
            </Badge>
        );
    }
}

export default Listing;
