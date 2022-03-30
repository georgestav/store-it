import React, {useContext} from "react";
import { UserContext } from "../../../components/context/UserContext";
import LoginForm from "../../../components/loginFrom/LoginForm";
import BookingForm from "../bookingForm/BookingForm";
import RegisterForm from "../../../components/registerForm/RegisterForm";


export default function Protected({user, display, setDisplay}) {

    console.log(user);

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

    if (user == "guest") {
        return <LoginForm/>;
    } else {
        return <BookingForm />;
    }
}
}