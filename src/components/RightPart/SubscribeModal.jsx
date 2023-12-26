import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { Close, FiberManualRecord, Verified } from "@mui/icons-material";
import { useState } from "react";

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
  borderRadius: 4,
};

const features = [
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
];

const SubscribeModal = ({handleClose, open}) => {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

  const [plan, setPlan] = useState("Annually");

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center space-x-3">
            <IconButton onClick={handleClose} aria-label="close">
              <Close />
            </IconButton>
            {/* <p className="">Edit Profile</p> */}
          </div>

          <div className="flex justify-center py-10 ">
            <div className="w-[80%] space-y-10">
              <div className="p-5 rounded-md flex justify-between items-center shadow-lg bg-slate-500">
                <h1 className="text-lg pr-5">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Error voluptas reiciendis illum. Sed molestias repudiandae
                  recusandae quia magni rem veniam?
                </h1>
                <img
                  className="w-24 h-24"
                  src="https://o.remove.bg/downloads/b664c9a2-9c1e-4b98-a531-35409167ef95/4cf05ab41d00679a76de02c038e14f95-removebg-preview.png"
                  alt=""
                />
              </div>

              <div className="flex justify-between border rounded-full px-5 py-3 border border-gray-600">
                <div>
                  <span
                    onClick={() => setPlan("Annually")}
                    className={`${
                      plan === "Annually" ? "text-black" : "text-gray-400"
                    } cursor-pointer`}
                  >
                    Annually
                  </span>
                  <span className="text-green-500 text-sm ml-5"> Save 20%</span>
                </div>

                <p
                  onClick={() => setPlan("Monthly")}
                  className={`${
                    plan === "Monthly" ? "text-black" : "text-gray-400"
                  } cursor-pointer`}
                >
                  Monthly
                </p>
              </div>

              <div className="space-y-3">
                {features.map((item) => (
                  <div className="flex items-center space-x-5 ">
                    <FiberManualRecord sx={{ width: "7px", height: "7px" }} />
                    <p className="text-xs">{item}</p>
                  </div>
                ))}
              </div>

              <div className="cursor-pointer flex justify-center bg-gray-700 text-white rounded-full px-5 py-3">
                <span className="line-through italic">$588.00</span>
                <span className="px-5">$470.40/year</span>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SubscribeModal;
