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

function StorageTypeDropdown() {
    const [storageType, setStorageType] = useState([]);

    useEffect(() => {}, []);

    return (
        <>
            <label htmlFor="storage_type_id">Storage Type</label>
            <select name="storage_type_id" id="storage_type_id">
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
        </>
    );
}

export default StorageTypeDropdown;
