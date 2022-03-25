import React from "react";

function ListingDetails({ listing }) {
    return (
        <div>
            <div>
                <span>Size:</span>
                <span>{listing.size} m2</span>
            </div>
            <div>
                <span>Storage Type:</span>
                <span>{listing.storage_type_id}</span>
            </div>
            <div>
                <span>Description:</span>
                <span>{listing.description}</span>
            </div>
            <div>
                <span>Last update:</span>
                <span>{listing.updated_at}</span>
            </div>
            <div>
                <span>Location:</span>
                <span>{listing.coordinates}</span>
            </div>
        </div>
    );
}

export default ListingDetails;
