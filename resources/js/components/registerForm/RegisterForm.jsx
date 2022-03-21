import React, {useState} from "react";
import axios from "axios";

export default function RegisterForm() {
    
    //values in the form
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });
  
    //errors messages to be shown
    const [errors, setErrors] = useState({});

    //function handling the change
    const handleChange = (event) => {
        setValues((oldValues) => {
            return ({
                ...oldValues, [event.target.name]: event.target.value
            });
        });
    }

    //function handling submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("/register", values);
            console.log(response.data);
            setErrors({});
        } catch(error) {
            console.log(error.response.data.errors);
            setErrors(error.response.data.errors); //accessing the error messages
        }
    }

    return (
        <form action="" method="post" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <br />
            <input id="name" name="name" value={values.name} onChange={handleChange}></input>
            {errors  && errors.name ? <p>{errors.name}</p> : null}
            <br />
            <label htmlFor="email">Email:</label>
            <br />
            <input id="email" name="email" value={values.email} onChange={handleChange}></input>
            {errors && errors.email ? <p>{errors.email}</p> : null}
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input type="password" name="password" id="password" value={values.password} onChange={handleChange}/>
            <br />
            <label htmlFor="password_confirmation">Password confirmation</label>
            <br />
            <input type="password" id="password_confirmation" name="password_confirmation" value={values.password_confirmation} onChange={handleChange}/>
            {errors && errors.password ? <p>{errors.password}</p> : null}
            <br />
            <button>Register</button>
        </form>
    );
}