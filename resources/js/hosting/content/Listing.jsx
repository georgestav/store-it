import React from "react";

function Listing({ listing }) {
    return (
        <>
            <div>{listing.coordinates}</div>
        </>
    );
}

export default Listing;
