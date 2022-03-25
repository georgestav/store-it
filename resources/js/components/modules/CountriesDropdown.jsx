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

function CountriesDropdown() {
    const [countries, setCountries] = useState([]);
    useEffect(async () => {
        setCountries(await fetchCountries());
    }, []);

    return (
        <>
            <label htmlFor="country_id">Country</label>
            <select name="country_id" id="country_id">
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
