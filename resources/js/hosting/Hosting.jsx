import React, { useState, useMemo, useEffect } from "react";
import { UserContext } from "../components/context/UserContext";
import NavigationBar from "../components/navigation/NavigationBar";
import Footer from "../components/footer/Footer";
import Listings from "./content/Listings";
import Bookings from "./content/Bookings";
import CreateListing from "./content/CreateListing";
import ManageListing from "./content/ManageListing";
//styling
import styles from "./Hosting.module.css";

function Hosting() {
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const [display, setDisplay] = useState(""); //set empty display
    const [user, setUser] = useState("guest"); //set default user to guest
    const [manageListing, setManageListing] = useState(false); // set state of the listing to manage

    //passed values with UserContext custom effect hook
    const values = useMemo(() => ({ user, setUser }), [user]);

    //function to trigger a refresh
    const forceRefresh = () => {
        setRefreshTrigger(!refreshTrigger);
    };

    /* function to trigger set to the listing to manage
    also causes the listings view to hide calling the 
    indivudual listing manager */
    const switchListingManagement = (listing) => {
        setManageListing(listing);
    };

    //Use effect triggered when display changes, ex register, login
    useEffect(() => {
        checkUserLogged();
    }, [display, refreshTrigger]);

    //check for already logged in user
    const checkUserLogged = async () => {
        try {
            // get request to get logged in user data and assign it to userContext
            const getdetails = await axios.get("api/user/logged-in");
            const userData = await getdetails.data;
            setUser(userData);
        } catch (error) {
            console.error("User not Logged in", error.response.data.message);
        }
    };
    return (
        <>
            <UserContext.Provider value={values}>
                <NavigationBar setDisplay={setDisplay} />
                <div className={styles.hosting__container}>
                    {!manageListing ? (
                        <>
                            <CreateListing
                                user={user}
                                forceRefresh={forceRefresh}
                            />
                            <Listings
                                user={user}
                                forceRefresh={forceRefresh}
                                switchListingManagement={
                                    switchListingManagement
                                }
                            />
                        </>
                    ) : (
                        <ManageListing
                            manageListing={manageListing}
                            switchListingManagement={switchListingManagement}
                        />
                    )}
                    <Bookings user={user} forceRefresh={forceRefresh} />
                </div>
            </UserContext.Provider>
            <Footer />
        </>
    );
}

export default Hosting;
