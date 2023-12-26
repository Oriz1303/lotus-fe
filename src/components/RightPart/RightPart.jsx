import {
  AvTimer,
  Brightness4,
  Brightness6,
  MoreHoriz,
  Search,
} from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import React, { useEffect } from "react";
import SubscribeModal from "./SubscribeModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { searchUser } from "../../Store/Auth/auth.action";

const RightPart = () => {
  const [activeSearch, setActiveSearch] = useState([]);

  const [openSubscribeModal, setOpenSubscribeModal] = useState(false);
  const handleOpenSubscribeModal = () => setOpenSubscribeModal(true);
  const handleCloseSubscribeModal = () => setOpenSubscribeModal(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  const location = useLocation();

  const decodeQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodeQueryString);
  const searchInput = searchParams.get("search");

  const handleSearchUsers = (e) => {
    const searchCurrentParam = new URLSearchParams(location.search);
    searchCurrentParam.set("search", activeSearch);
    const query = searchCurrentParam.toString();
    navigate({ search: `?${query}` });
    setActiveSearch(e.target.value);
    console.log(e.target.value);
    if (activeSearch === "") {
      setActiveSearch([]);
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  const handleChangeTheme = () => {};

  useEffect(() => {
    dispatch(searchUser(searchInput));
  }, [searchInput]);

  return (
    <div className="py-5 sticky top-0">
      <div className="relative flex items-center">
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleSearchUsers}
            type="text"
            className="py-3 rounded-full text-gray-500 w-full pl-12"
            name=""
            id=""
          />
        </form>

        <div className="absolute top-0 left-0 pl-3 pt-3">
          <Search className="text-gray-500" />
          {activeSearch.length > 0 && (
            <div className="absolute z-50 px-4 py-1 mt-5 bg-[#ffcccc] rounded-md">
              {auth?.searchUsers?.map((item) => (
                <div className="flex items-center space-x-3 my-2">
                  <Avatar src={item?.image} />
                  <span>{item?.fullName}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <Brightness4 className="ml-3 cursor-pointer" />
        <Brightness6 />
      </div>

      <section className="my-5">
        <h1 className="text-xl font-bold">Get Verified</h1>
        <h1 className="font-bold my-2">Subscribe unlock new Features</h1>
        <Button
          variant="contained"
          sx={{ padding: "10px", borderRadius: "25px" }}
          onClick={handleOpenSubscribeModal}
        >
          Get Verified
        </Button>
      </section>

      <section className="mt-7 space-y-5">
        <h1 className="font-bold text-xl py-1">Whats Happening</h1>
        <div>
          <p className="text-sm">World Cup</p>
          <p className="font-bold">Spain vs Italia</p>
        </div>

        {[1, 1, 1].map((item) => (
          <div className="flex justify-between w-full">
            <div>
              <p>Entertaiment Trending</p>
              <p className="font-bold">#Nothing</p>
              <p>34.3k Post</p>
            </div>
            <MoreHoriz />
          </div>
        ))}
      </section>

      <section>
        <SubscribeModal
          handleClose={handleCloseSubscribeModal}
          open={openSubscribeModal}
        />
      </section>
    </div>
  );
};

export default RightPart;
