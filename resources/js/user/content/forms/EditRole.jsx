import React, { useRef } from "react";
import axios from "axios";
import { Button } from "@mui/material";

function EditRole({ user, editRole, setEditRole }) {
    const newRole = useRef(); //role input

    const roleSubmitHandler = async (e) => {
        e.preventDefault();

        const userUpdated = { ...user };
        userUpdated.role_id = Number(newRole.current.value);

        await axios
            .patch(`/api/user/${user.id}`, userUpdated)
            .then(function (response) {
                setEditRole(!editRole);
            })
            .catch(function (error) {
                console.warn(error);
            });
    };

    const editRoleHandler = () => {
        setEditRole(!editRole);
    };

    if (editRole) {
        return (
            <>
                <form action="" onSubmit={roleSubmitHandler}>
                    <label htmlFor="roles">Editing role:</label>
                    <select id="roles" ref={newRole}>
                        <option value="3">Host</option>
                        <option value="4">User</option>
                    </select>
                    <Button type="submit">Update</Button>
                </form>
            </>
        );
    } else {
        return (
            <>
                <div>Registed as:</div>
                <div>{user.role?.name}</div>
                <Button onClick={editRoleHandler}>edit role</Button>
            </>
        );
    }
}

export default EditRole;
