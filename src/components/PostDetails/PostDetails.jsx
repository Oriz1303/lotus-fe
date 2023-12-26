import { KeyboardBackspace } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PostCard from "../HomeSection/PostCard";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { findPostById } from "../../Store/Post/post.action";

const PostDetails = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { postStore } = useSelector((store) => store);

  useEffect(() => {
    if (id) {
      dispatch(findPostById(id));
    }
  }, []);

  return (
    <>
      <section
        className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95 `}
      >
        <KeyboardBackspace className=" cursor-pointer" onClick={handleBack} />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">Post</h1>
      </section>

      <section>
        <PostCard item={postStore.post} />
        <Divider sx={{ margin: "2rem 0rem" }} />
      </section>

      <section>

        {postStore.post?.commentsPost.map((item) => (
          <PostCard item={item} />
        ))}
      </section>
    </>
  );
};

export default PostDetails;
