import {
  BarChart,
  ChatBubble,
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
  FileUpload,
  MoreHoriz,
  Repeat,
  Verified,
} from "@mui/icons-material";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import CommentModal from "./CommentModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createSharedPost,
  deletePost,
  likePost,
} from "../../Store/Post/post.action";

const PostCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeletePost = (event) => {
    dispatch(deletePost(item?.id))
    handleClose();
  };

  // Menu click handle begin
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // END

  const handleCreateShared = () => {
    dispatch(createSharedPost(item.id));
  };
  const handleLikePost = () => {
    dispatch(likePost(item.id));
  };

  // handle comment modal
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const handleOpenCommentModal = () => setOpenCommentModal(true);
  const handleCloseCommentModal = () => setOpenCommentModal(false);

  return (
    <>
      <div className="flex items-center font-semibold text-gray-700 py-2">
        {/* <Repeat /> */}
      </div>

      <div className="flex space-x-5">
        <Avatar
          onClick={() => navigate(`/profile/${item?.user?.id}`)}
          className="cursor-pointer"
          alt="username"
          src={item?.user?.image}
        />

        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="cursor-pointer">
              <span className="font-semibold">{item?.user?.fullName}</span>
              {/* <span className="text-gray-600">
                @{item.user.fullName.split(" ").join("_").toLowercase()} . 1b
              </span> */}
              <Verified className="ml-2 w-5 h-5 text-blue-600" />
              <p className="text-gray-500 text-[12px]">
                {item?.createdAt?.slice(11, 16)}
              </p>
            </div>

            <div>
              <span>{item?.createdAt?.slice(0, 10)}</span>
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
            </div>
          </div>

          <div className="mt-2">
            <div
              onClick={() => navigate(`/post/${item?.id}`)}
              className="cursor-pointer "
            >
              <p className="mb-2 p-0">{item?.content}</p>
              {item?.image && (
                <img
                  className="w-[28rem] border border-gray-500 p-5 rounded-md"
                  src={item?.image}
                  alt=""
                />
              )}
            </div>

            <div className="py-5 flex flex-wrap justify-between items-center">
              <div className="space-x-3 flex items-center text-gray-600">
                <ChatBubbleOutline
                  className="cursor-pointer"
                  onClick={handleOpenCommentModal}
                />
                <p>{item?.totalComments}</p>
              </div>

              <div
                className={`${
                  item?.shared ? "text-pink-600" : "text-gray-600"
                } space-x-3 flex items-center`}
              >
                <Repeat
                  onClick={handleCreateShared}
                  className="cursor-pointer"
                />
                <p>{item?.totalSharedPost}</p>
              </div>

              <div
                className={`${
                  item?.liked ? "text-pink-600" : "text-gray-600"
                } space-x-3 flex items-center`}
              >
                {item?.liked ? (
                  <Favorite
                    onClick={handleLikePost}
                    className="cursor-pointer"
                  />
                ) : (
                  <FavoriteBorder
                    onClick={handleLikePost}
                    className="cursor-pointer"
                  />
                )}
                <p>{item?.totalLikes}</p>
              </div>

              <div className="space-x-3 flex items-center text-gray-600">
                <BarChart
                  className="cursor-pointer"
                  // onClick={handleOpenReplyModel}
                />
                <p>430</p>
              </div>

              <div className="space-x-3 flex items-center text-gray-600">
                <FileUpload
                  className="cursor-pointer"
                  // onClick={handleOpenReplyModel}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section>
        <CommentModal
          handleClose={handleCloseCommentModal}
          open={openCommentModal}
          item={item}
        />
      </section>
    </>
  );
};

export default PostCard;
