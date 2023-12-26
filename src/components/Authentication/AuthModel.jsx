import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useLocation, useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

const AuthModel = ({ open, handleClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    const path = location.pathname === "/signup" ? "/signin" : "/signup";
    navigate(path);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-center font-bold text-3xl pb-20 ">
            
          {location.pathname === "/signup" ? "Create your account" : "Login"}
          </h1>
          {location.pathname === "/signup" ? <RegisterForm /> : <LoginForm />}

          <h1 className="text-center py-5 font-semibold text-lg text-gray-500">
            {location.pathname === "/signup"
              ? "Already have an Account"
              : "If u dont have"}
          </h1>
          <Button
            onClick={handleNavigate}
            fullWidth
            variant="outlined"
            sx={{
              borderRadius: "29px",
              py: "15px",
            }}
          >
            {location.pathname === "/signup" ? "Login" : "Register"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModel;
