import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Authentication from "./components/Authentication/Authentication";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProfile } from "./Store/Auth/auth.action";
import ChatBox from "./components/ChatBox/ChatBox";

function App() {
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfile(jwt));
      navigate("/*");
    }
  }, [auth.jwt]);

  return (
    <div className="">
      <Routes>
        <Route
          path="/*"
          element={auth.user ? <HomePage /> : <Authentication />}
        ></Route>
        <Route path="/chat" element={<ChatBox />}></Route>
      </Routes>
    </div>
  );
}

export default App;
