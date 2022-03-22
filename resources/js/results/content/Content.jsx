import React, {useContext} from "react";
//custom components
import ResultsList from "./resultsList/ResultsList";
import LoginForm from "../../components/loginFrom/LoginForm";
import RegisterForm from "../../components/registerForm/RegisterForm";
import { UserContext } from "../../components/context/UserContext";


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
                <ResultsList />
            </>
        );
    }
}

export default Content;