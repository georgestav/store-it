import React, { useEffect, useState } from "react";

const fetchCities = async () => {
    try {
        // get request to get list of cities in the DB that the user can register to
        const getdetails = await axios.get("api/cities");
        const data = await getdetails.data;
        return data;
    } catch (error) {
        console.error("Could not get cities", error.response.data.message);
    }
};

/* 
CitiesDropdown to be used inside a form
city_id expected to reflect the changes or fetched data
function formChangeHandler expected, to update the parent element form data
*/
function CitiesDropdown({ city_id, formChangeHandler }) {
    const [cities, setCities] = useState([]);

    useEffect(async () => {
        setCities(await fetchCities());
    }, []);

    return (
        <>
            <label htmlFor="city_id">City</label>
            <select
                name="city_id"
                id="city_id"
                value={city_id}
                onChange={formChangeHandler}
                required
            >
                {cities.map((city) => {
                    return (
                        <option value={city.id} key={city.id}>
                            {city.name}
                        </option>
                    );
                })}
            </select>
        </>
    );
}

export default CitiesDropdown;
