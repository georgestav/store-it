import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function RegisterForm() {
    const [open, setOpen] = useState(false);
    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);
    //values in the form
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    //errors messages to be shown
    const [errors, setErrors] = useState({});

    //function handling the change
    const handleChange = (event) => {
        setValues((oldValues) => {
            return {
                ...oldValues,
                [event.target.name]: event.target.value,
            };
        });
    };

    //function handling submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("/register", values);

            setErrors({});
            handleCloseModal();
        } catch (error) {
            console.error(error.response.data.errors);
            setErrors(error.response.data.errors); //accessing the error messages
        }
    };

    return (
        <div>
            <Button onClick={handleOpenModal}>Register</Button>
            <Modal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form action="" method="post" onSubmit={handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <br />
                        <input
                            id="name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                        ></input>
                        {errors && errors.name ? <p>{errors.name}</p> : null}
                        <br />
                        <label htmlFor="email">Email:</label>
                        <br />
                        <input
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            autoComplete="new-email"
                        ></input>
                        {errors && errors.email ? <p>{errors.email}</p> : null}
                        <br />
                        <label htmlFor="password">Password</label>
                        <br />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={values.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />
                        <br />
                        <label htmlFor="password_confirmation">
                            Password confirmation
                        </label>
                        <br />
                        <input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            autoComplete="new-password"
                            value={values.password_confirmation}
                            onChange={handleChange}
                        />
                        {errors && errors.password ? (
                            <p>{errors.password}</p>
                        ) : null}
                        <br />
                        <button>Register</button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
