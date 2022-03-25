import React, { useEffect, useState } from "react";

const fetchCountries = async () => {
    try {
        // get request to get list of counties in the DB that the user can register to
        const getdetails = await axios.get("api/countries");
        const data = await getdetails.data;
        return data;
    } catch (error) {
        console.error("Could not get countries", error.response.data.message);
    }
};

/* 
CountriesDropdown to be used inside a form
country_id expected to reflect the changes or fetched data
function formChangeHandler expected, to update the parent element form data
*/
function CountriesDropdown({ country_id, formChangeHandler }) {
    const [countries, setCountries] = useState([]);
    useEffect(async () => {
        if (countries.length > 0) {
            return;
        } else {
            setCountries(await fetchCountries());
        }
    }, []);

    return (
        <>
            <label htmlFor="country_id">Country</label>
            <select
                name="country_id"
                id="country_id"
                value={country_id}
                onChange={formChangeHandler}
                required
            >
                {countries.map((country) => {
                    return (
                        <option value={country.id} key={country.id}>
                            {country.name}
                        </option>
                    );
                })}
            </select>
        </>
    );
}

export default CountriesDropdown;
