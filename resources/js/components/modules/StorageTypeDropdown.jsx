import React, { useEffect, useState } from "react";

const fetchStorageTypes = async () => {
    try {
        // get request to get storage type a listing can register to
        const getdetails = await axios.get("api/countries");
        const data = await getdetails.data;
        return data;
    } catch (error) {
        console.error("Could not get countries", error.response.data.message);
    }
};

/* 
StorageTypeDropdown to be used inside a form
storage_type_id expected to reflect the changes or fetched data
function formChangeHandler expected, to update the parent element form data
*/
function StorageTypeDropdown({ storage_type_id, formChangeHandler }) {
    const [storageType, setStorageType] = useState([]);

    useEffect(() => {}, []);

    return (
        <>
            <label htmlFor="storage_type_id">Storage Type</label>
            <select
                name="storage_type_id"
                id="storage_type_id"
                value={storage_type_id}
                onChange={formChangeHandler}
                required
            >
                <option value="1">First Option</option>
                <option value="2">Second Option</option>
            </select>
        </>
    );
}

export default StorageTypeDropdown;
