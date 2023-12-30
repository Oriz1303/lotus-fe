import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import AuthModel from "./AuthModel";

const Authentication = () => {
const [openAuthModel, setOpenAuthModel] = useState(false);
const handleOpenAuthModel = () => setOpenAuthModel(true);
const handleCloseAuthModel = () => setOpenAuthModel(false);

  return (
    <div>
      <Grid container className="overflow-y-hidden">
        <Grid item className="hidden lg:block" lg={7}>
          <img
            className="w-full h-screen"
            src="https://w.wallha.com/ws/10/K8M9UGdc.jpg"
            alt=""
          />

          <div className="absolute top-[26%] left-[19%] ">
            <svg
              height="300"
              width="300"
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="r-1nao33i r-4qtqp9 r-yyyyoo r-rxcuwo r-1777fci r-m327ed r-dnmrzs r-494qqr r-bnwqim r-1plcrui r-lrvibr"
            >
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </g>
            </svg>
          </div>
        </Grid>

        <Grid item className="px-10" xs={12} lg={5}>
          <h1 className="mt-10 font-bold text-7xl">Lotus</h1>
          <h1 className="font-bold text-3xl py-16">Join My Social Now</h1>
          <div className="w-[60%]">
            <div className="w-full">
              <GoogleLogin width={330} />
              <p className="py-5 text-center">OR</p>
              <Button
              onClick={handleOpenAuthModel}
                variant="contained"
                fullWidth
                size="large"
                sx={{ borderRadius: "29px", py: "7px" }}
              >
                Create Account
              </Button>

              <p className="text-sm mt-2">
                By sign up, u agree to the Term of Service and Privacy Policy,
                including Cookie User. By Oiz
              </p>
            </div>

            <div className="mt-10">
              <h1 className="font-bold text-xl mb-5">Already Have Account?</h1>
              <Button
              onClick={handleOpenAuthModel}
                variant="outlined"
                fullWidth
                size="large"
                sx={{ borderRadius: "29px", py: "7px" }}
              >
                Login
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      <AuthModel open={openAuthModel} handleClose={handleCloseAuthModel}/>
    </div>
  );
};

export default Authentication;
