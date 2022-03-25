import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "../logout/Logout";

export default function AccountMenu({ setDisplay }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    //use userContext
    const { user, setUser } = useContext(UserContext);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Typography sx={{ minWidth: 100 }} style={{ padding: 10 }}>
                    Become a host
                </Typography>
                {user.name ? (
                    <Typography sx={{ minWidth: 100 }}>
                        Welcome {user.name}
                    </Typography>
                ) : (
                    ""
                )}
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <Avatar />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                {
                    //if user is guest and therefore NOT logged in, display Register and Login
                    user === "guest" ? (
                        <span>
                            <MenuItem onClick={() => setDisplay("register")}>
                                Register
                            </MenuItem>
                            <MenuItem onClick={() => setDisplay("login")}>
                                Login
                            </MenuItem>
                        </span>
                    ) : (
                        //if user is logged in, display Register and Login
                        <span>
                            <MenuItem
                                onClick={() => {
                                    window.location.href = "/hosting";
                                }}
                            >
                                Profile
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    window.location.href = "/user";
                                }}
                            >
                                My Account
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <Logout />
                            </MenuItem>
                        </span>
                    )
                }
            </Menu>
        </React.Fragment>
    );
}
