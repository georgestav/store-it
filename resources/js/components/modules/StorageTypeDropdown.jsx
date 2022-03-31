import React, { useEffect, useState } from "react";

const fetchStorageTypes = async () => {
    try {
        // get request to get storage type a listing can register to
        const getdetails = await axios.get("/api/storagetypes");
        const data = await getdetails.data;
        return data;
    } catch (error) {
        console.error(
            "Could not get storage types",
            error.response.data.message
        );
    }
};

/* 
StorageTypeDropdown to be used inside a form
storage_type_id expected to reflect the changes or fetched data
function formChangeHandler expected, to update the parent element form data
*/
function StorageTypeDropdown({ storage_type_id, formChangeHandler }) {
    const [storageTypes, setStorageType] = useState([]);

    useEffect(async () => {
        setStorageType(await fetchStorageTypes());
    }, []);
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
                {storageTypes.map((storageType) => {
                    return (
                        <option value={storageType.id} key={storageType.id}>
                            {storageType.name}
                        </option>
                    );
                })}
            </select>
        </>
    );
}

export default StorageTypeDropdown;
