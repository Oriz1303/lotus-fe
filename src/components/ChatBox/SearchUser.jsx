import { Avatar, Card, CardHeader } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../Store/Auth/auth.action";
import { createChat } from "../../Store/Message/message.action";

const SearchUser = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const handleSearchUser = (e) => {
    setUsername(e.target.value);
    dispatch(searchUser(username));
  };

  const handleClickUser = (id) => {
    dispatch(createChat({ partnerId: id }));
  };

  return (
    <div>
      <div className="py-5 relative ">
        <input
          className="bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full "
          placeholder="Search"
          type="text"
          name=""
          id=""
          onChange={handleSearchUser}
        />

        {username && (
          <Card className="absolute w-full z-10 top-[4.5rem] cursor-pointer">
            {auth.searchUser.map((user) => (
              <CardHeader
                key={user.id}
                onClick={() => {
                  handleClickUser(user.id);
                  setUsername("");
                  console.log(user.id);
                }}
                title={user.fullName}
                // subheader={}
                avatar={<Avatar src="https://th.wallha.com/ts/HeblJ2LU.png" />}
              />
            ))}
          </Card>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
