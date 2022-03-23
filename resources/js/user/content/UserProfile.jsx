import React, { useEffect, useState, useContext, useRef } from "react";
import { UserContext } from "../../components/context/UserContext";
import { Button } from "@mui/material";
import EditRole from "./forms/EditRole";
import PersonalDetails from "./forms/PersonalDetails";

//styling
import styles from "./UserProfile.module.css";

function UserProfile() {
    //use userContext
    const { user, setUser } = useContext(UserContext);
    const [userData, setUserData] = useState({});
    const [editRole, setEditRole] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, [editRole]);

    const fetchUserData = async () => {
        try {
            // get request to get logged in user data and assign it to userContext
            const getdetails = await axios.get("api/user/logged-in");
            const userData = await getdetails.data;
            setUserData(userData);
            setUser(userData);
        } catch (error) {
            console.error("User not Logged in", error.response.data.message);
        }
    };

    return (
        <div className={styles.user__details__containers}>
            <div>Hello {user.name}</div>
            <div>
                <div>registed email:</div>
                <div>{user.email}</div>
            </div>
            <div>
                <div>Member since:</div>
                <div>{user.created_at}</div>
            </div>
            <div>
                <EditRole
                    user={user}
                    editRole={editRole}
                    setEditRole={setEditRole}
                />
            </div>
            {/* todo display current data in the form and patch on save */}
            <PersonalDetails userid={user.id} />
        </div>
    );
}

export default UserProfile;
