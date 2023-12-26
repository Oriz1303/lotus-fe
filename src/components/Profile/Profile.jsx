import {
  BusinessCenter,
  CalendarMonth,
  KeyboardBackspace,
  LocationOn,
  Verified,
} from "@mui/icons-material";
import { Avatar, Box, Button, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import PostCard from "../HomeSection/PostCard";
import ProfileModal from "./ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { findUserById, followUserAction } from "../../Store/Auth/auth.action";
import { getUsersPost } from "../../Store/Post/post.action";

const Profile = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const dispatch = useDispatch();
  const handleFollowUser = () => {
    dispatch(followUserAction(id))
  };
  const {id} = useParams();

  const { auth, postStore } = useSelector((store) => store);

  const [openProfileModal, setOpenProfileModal] = useState(false);
  const handleOpenProfileModel = () => setOpenProfileModal(true);
  const handleClose = () => setOpenProfileModal(false);

  const [value, setValue] = React.useState("1");

  const handleTableChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 4) {
      console.log("Like");
    } else if (newValue === 1) {
      console.log("user");
    }
  };

  useEffect(() => {
    dispatch(findUserById(id));
    dispatch(getUsersPost(id));
  }, [id]);
  return (
    <div>
      <section
        className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95 `}
      >
        <KeyboardBackspace className=" cursor-pointer" onClick={handleBack} />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">My Profile</h1>
      </section>

      <section>
        <img
          className="w-full  object-cover"
          src="https://th.wallha.com/ts/yeL2dUH8.jpg"
          alt=""
        />
      </section>

      <section className="pl-6">
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            alt="Avatar"
            src={auth.findUser?.image}
            sx={{ width: "10rem", height: "10rem", border: "4px white solid" }}
          />

          {auth.findUser?.req_user ? (
            <Button
              onClick={handleOpenProfileModel}
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={handleFollowUser}
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              {!auth.findUser?.followed ? "Follow" : "Unfollow"}
            </Button>
          )}
        </div>

        <div>
          <div className="flex items-center">
            <h1 className="font-bold text-lg">{auth?.findUser?.fullName}</h1>
            {true && <Verified className="ml-2 w-5 h-5 text-blue-600" />}
          </div>
          <h1 className="text-gray-500">
            @{auth.findUser?.fullName.split(" ").join("_").toLowerCase()}
          </h1>
        </div>

        <div className="mt-2 space-y-3">
          <p>{auth.findUser?.bio}</p>
          <div className="py-1 flex  space-x-5">
            <div className="flex items-center text-gray-500">
              <BusinessCenter />
              <p className="ml-2">Education</p>
            </div>

            <div className="flex items-center text-gray-500">
              <LocationOn />
              <p className="ml-2">{auth.findUser?.location}</p>
            </div>
            <div className="flex items-center text-gray-500">
              <CalendarMonth />
              <p className="ml-2">Joined June 2002</p>
            </div>
          </div>

          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-1 font-semibold">
              <span>{auth.findUser?.following.length}</span>
              <span className="text-gray-500">Following</span>
            </div>
            <div className="flex items-center space-x-1 font-semibold">
              <span>{auth.findUser?.followers.length}</span>
              <span className="text-gray-500">Followers</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTableChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Posts" value="1" />
                <Tab label="Replies" value="2" />
                <Tab label="Media" value="3" />
                <Tab label="Likes" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {postStore.posts?.map((item) => (
                <PostCard item={item} />
              ))}
            </TabPanel>
            <TabPanel value="2">User replies Two</TabPanel>
            <TabPanel value="3">Media </TabPanel>
            <TabPanel value="4">Likes</TabPanel>
          </TabContext>
        </Box>
      </section>

      <section>
        <ProfileModal open={openProfileModal} handleClose={handleClose} />
      </section>
    </div>
  );
};

export default Profile;
