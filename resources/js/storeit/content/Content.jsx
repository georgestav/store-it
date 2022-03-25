import React, { useContext } from "react";
import { UserContext } from "../../components/context/UserContext";
import Search from "./search/Search";
import LoginForm from "../../components/loginFrom/LoginForm";
import RegisterForm from "../../components/registerForm/RegisterForm";
import WhyUs from "./whyus/WhyUs";
import OurProcess from "./ourprocess/OurProcess";
import StorageTypes from "./storagetypes/StorageTypes";

function Content({ display, setDisplay }) {
    //use userContext
    const { user, setUser } = useContext(UserContext);
    let roleName = user.role?.name;

    if (display === "login") {
        return (
            <>
                <LoginForm
                    setDisplay={setDisplay}
                    values={{ display, setDisplay }}
                />
            </>
        );
    } else if (display === "register") {
        return (
            <>
                <RegisterForm setDisplay={setDisplay} />
            </>
        );
    } else {
        return (
            <>
                <Search />
                <WhyUs />
                <OurProcess />
                <StorageTypes />
            </>
        );
    }
}

export default Content;
