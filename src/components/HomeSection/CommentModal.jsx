import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  AccountCircle,
  BarChart,
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
  FileUpload,
  FmdGood,
  ImageSearch,
  MoreHoriz,
  Repeat,
  TagFaces,
  Verified,
} from "@mui/icons-material";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPostComment } from "../../Store/Post/post.action";

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

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Oriz text is required!"),
});

export default function CommentModal({ handleClose, open, item }) {
  const [uploadImage, setUploadImage] = useState(false);
  const [selectImage, setSelectImage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(createPostComment(values));
    handleClose();
    console.log("comment ", values);
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      postId: item?.id,
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const handleSelectImage = (event) => {
    setUploadImage(true);
    const imgUrl = event.target.files[0];
    formik.setFieldValue("image", imgUrl);
    setSelectImage(imgUrl);
    setUploadImage(false);
  };

  const navigate = useNavigate();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex space-x-5">
            <Avatar
              onClick={() => navigate(`/profile/${item?.user.id}`)}
              className="cursor-pointer"
              alt="username"
              src=""
            />

            <div className="w-full">
              <div className="flex justify-between items-center">
                <div className="flex items-center cursor-pointer space-x-2">
                  <span className="font-semibold">{item?.id}</span>
                  <span className="text-gray-600">@oriz . 2m</span>
                  <Verified className="ml-2 w-5 h-5 text-blue-600" />
                </div>

                {/* <div>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <MoreHoriz />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
                    <MenuItem onClick={handleDeletePost}>Edit</MenuItem>
                  </Menu>
                </div> */}
              </div>

              <div className="mt-2">
                <div
                  onClick={() => navigate(`/post/${item?.id}`)}
                  className="cursor-pointer "
                >
                  <p className="mb-2 p-0">{item?.content}</p>
                  <img
                    className="w-[28rem] border border-gray-500 p-5 rounded-md"
                    src={item?.image}
                    alt=""
                  />
                </div>

                {/* <div className="py-5 flex flex-wrap justify-between items-center">
                  <div className="space-x-3 flex items-center text-gray-600">
                    <ChatBubbleOutline
                      className="cursor-pointer"
                      onClick={handleOpenReplyModel}
                    />
                    <p>43</p>
                  </div>

                  <div
                    className={`${
                      true ? "text-pink-600" : "text-gray-600"
                    } space-x-3 flex items-center`}
                  >
                    <Repeat
                      onClick={handleCreateRePost}
                      className="cursor-pointer"
                    />
                    <p>54</p>
                  </div>

                  <div
                    className={`${
                      true ? "text-pink-600" : "text-gray-600"
                    } space-x-3 flex items-center`}
                  >
                    {true ? (
                      <FavoriteBorder
                        onClick={handleLikePost}
                        className="cursor-pointer"
                      />
                    ) : (
                      <Favorite
                        onClick={handleLikePost}
                        className="cursor-pointer"
                      />
                    )}
                    <p>54</p>
                  </div>

                  <div className="space-x-3 flex items-center text-gray-600">
                    <BarChart
                      className="cursor-pointer"
                      onClick={handleOpenReplyModel}
                    />
                    <p>430</p>
                  </div>

                  <div className="space-x-3 flex items-center text-gray-600">
                    <FileUpload
                      className="cursor-pointer"
                      onClick={handleOpenReplyModel}
                    />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <section className="pt-10">
            <div className="flex space-x-5">
              <Avatar alt="username">
                <AccountCircle />
              </Avatar>
              <div className="w-full ">
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <input
                      type="text"
                      name="content"
                      placeholder="What is happening"
                      className="border-none outline-none text-xl bg-transparent "
                      {...formik.getFieldProps("content")}
                    />
                    {formik.errors.content && formik.touched.content && (
                      <span className="text-red-600">
                        {formik.errors.content}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-5">
                    <div className="flex space-x-5 items-center">
                      <label className=" flex items-center space-x-2 rounded-md cursor-pointer">
                        <ImageSearch className="text-[#1d9bf0]" />
                        <input
                          type="file"
                          name="imageFile"
                          id=""
                          className="hidden"
                          onChange={handleSelectImage}
                        />
                      </label>

                      <FmdGood className="text-[#1d9bf0]" />
                      <TagFaces className="text-[#1d9bf0]" />
                    </div>

                    <div className="">
                      <Button
                        variant="contained"
                        sx={{
                          width: "100%",
                          borderRadius: "20px",
                          paddingY: "8px",
                          paddingX: "20px",
                          bgcolor: "#1e88e5",
                        }}
                        type="submit"
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </Box>
      </Modal>
    </div>
  );
}
