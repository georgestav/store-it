import React from "react";
import Rating from "@mui/material/Rating";

function ListingDetails({ listing }) {
    return (
        <div>
            <div>
                <span>Size:</span>
                <span>{listing.size} m2</span>
            </div>
            <div>
                <span>Storage Type:</span>
                <span>{listing.storage_type.name}</span>
            </div>
            <div>
                <span>Description:</span>
                <span>{listing.description}</span>
            </div>
            <div>
                <span>Last update:</span>
                <span>{listing.updated_at.split("T")[0]}</span>
            </div>
        </div>
    );
}

export default ListingDetails;
