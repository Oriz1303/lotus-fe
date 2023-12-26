import { AccountCircle } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import PostCard from "./PostCard";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getAllPosts } from "../../Store/Post/post.action";
import { uploadToCloudnary } from "../../Utils/uploadToCloudnary";

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Oriz text is required!"),
});

const HomeSection = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const [selectImage, setSelectImage] = useState("");
  const dispatch = useDispatch();

  const { auth, postStore } = useSelector((store) => store);

  const handleSubmit = (values, actions) => {
    dispatch(createPost(values));
    actions.resetForm();
    console.log("value,", values);
    setSelectImage("");
  };

  const handleSelectImage = async (event) => {
    setUploadImage(true);
    const imgUrl = await uploadToCloudnary(event.target.files[0]);
    formik.setFieldValue("image", imgUrl);
    setSelectImage(imgUrl);
    setUploadImage(false);
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  useEffect(() => {
    dispatch(getAllPosts());
  }, [postStore.like, postStore.shared]);

  return (
    <div className="space-y-5">
      <section>
        <h1 className="py-5  text-xl font-bold opacity-90">HOme</h1>
      </section>
      <section className="pb-10">
        <div className="flex space-x-5">
          <Avatar alt="username"
          src={auth.user?.image}
          />
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
                  <span className="text-red-600">{formik.errors.content}</span>
                )}
              </div>

              <div className="flex justify-between items-center mt-5">
                <div className="flex space-x-5 items-center">
                  <label className=" flex items-center space-x-2 rounded-md cursor-pointer">
                    <ImageSearchIcon className="text-[#1d9bf0]" />
                    <input
                      type="file"
                      name="imageFile"
                      id=""
                      className="hidden"
                      onChange={handleSelectImage}
                    />
                  </label>

                  <FmdGoodIcon className="text-[#1d9bf0]" />
                  <TagFacesIcon className="text-[#1d9bf0]" />
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
                    Oriz
                  </Button>
                </div>
              </div>
            </form>

            <div>{selectImage && <img src={selectImage} alt="" />}</div>
          </div>
        </div>
      </section>
      <section>
        {postStore?.posts?.map((item) => (
          <PostCard item={item} />
        ))}
      </section>
    </div>
  );
};

export default HomeSection;
