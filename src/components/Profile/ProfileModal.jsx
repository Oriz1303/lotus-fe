import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { Avatar, IconButton, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../Store/Auth/auth.action";
import { uploadToCloudnary } from "../../Utils/uploadToCloudnary";
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

export default function ProfileModal({open, handleClose}) {
  const [upload, setUpload] = useState(false);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");
  const {auth} = useSelector(store => store);


  const handleSubmit = (values) => {
    dispatch(updateUserProfile(values))
    console.log("form values", values);
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      fullName: auth.user?.fullName || "",
      website: auth.user?.website || "",
      location: auth.user?.location || "",
      bio: auth.user?.bio || "",
      backgroundImage: auth.user?.backgroundImage || "",
      image: auth.user?.image || "",
    },
    onSubmit: handleSubmit,
  });

  const handleImageChange = async (event) => {
    setUpload(true);
    const { name } = event.target;
    const file = await uploadToCloudnary(event.target.files[0]);
    formik.setFieldValue(name, file);
    setSelectedImage(file)
    setUpload(false);
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose} aria-label="close">
                  <Close />
                </IconButton>
                <p className="">Edit Profile</p>
              </div>
              <Button type="submit">SAVE</Button>
            </div>
            <div className=" overflow-y-scroll overflow-x-hidden no-scrollbar h-[80vh]">
              <>
                <div className="w-full ">
                  <div className="relative">
                    <img
                      className="w-full object-cover object-center"
                      src="https://th.wallha.com/ts/yeL2dUH8.jpg"
                      alt=""
                    />
                    <input
                      type="file"
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                      name="backgroundImage"
                      id=""
                    />
                  </div>
                </div>

                <div className="w-full transform -translate-y-20 ml-4 h-[6rem]">
                  <div className="relative">
                    <Avatar
                      src={auth?.user.image || selectedImage}
                      sx={{
                        width: "10rem",
                        height: "10rem",
                        border: "4px white solid",
                      }}
                    />
                    <input
                      onChange={handleImageChange}
                      className="absolute top-0 left-0  w-[10rem] h-full opacity-0 cursor-pointer"
                      type="file"
                      name="image"
                      id=""
                    />
                  </div>
                </div>
              </>

              <div className="space-y-3">
                <TextField
                  fullWidth
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fullName && Boolean(formik.errors.fullName)
                  }
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  id="bio"
                  name="bio"
                  label="Bio"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                  helperText={formik.touched.bio && formik.errors.bio}
                />

                <TextField
                  fullWidth
                  id="website"
                  name="website"
                  label="Website"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.website && Boolean(formik.errors.website)
                  }
                  helperText={formik.touched.website && formik.errors.website}
                />

                <TextField
                  fullWidth
                  id="location"
                  name="location"
                  label="Location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.location && Boolean(formik.errors.location)
                  }
                  helperText={formik.touched.location && formik.errors.location}
                />

                <div className="my-3">
                  <p className="text-lg">Birth Date . Edit</p>
                  <p className="text-2xl">March 13, 2002</p>
                </div>

                <p className="py-3 text-lg">Edit Profile</p>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
