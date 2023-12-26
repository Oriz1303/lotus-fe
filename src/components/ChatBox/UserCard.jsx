import { Avatar, Card, CardHeader, Icon, IconButton } from "@mui/material";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";

const UserCard = ({ user }) => {
  const { auth } = useSelector((store) => store);

  return (
    <Card className="shadow-xl">
      <CardHeader
        avatar={
          <Avatar
            sx={{
              fontWeight: "",
              width: "3.5rem",
              height: "3.5rem",
              fontSize: "1.5rem",
              bgcolor: "#191c29",
              color: "rgb(88, 199, 250)",
            }}
            src={
              "https://th.bing.com/th/id/OIP.xKT5GHzrMWeNYB7OoxUz2QHaHa?w=170&h=180&c=7&r=0&o=5&pid=1.7"
            }
          />
        }
        action={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
        title={
          auth.user.id === user.users[0].id
            ? user.users[1].fullName
            : user.users[0].fullName
        }
        subheader={"new message!"}
      />
    </Card>
  );
};

export default UserCard;
