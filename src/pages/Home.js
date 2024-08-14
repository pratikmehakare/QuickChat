import React, { useEffect } from "react";
import { getUser } from "../services/oprations/authApi";
import { Outlet, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  setOnlineUser,
  setSocketConnection,
  setUser,
} from "../redux/userSlice";
import SideBar from "../components/SideBar";
import io from "socket.io-client";
import logo from "../utils/chatapp.png";

const Home = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log("selector:", user);
  console.log("locaiton", location.pathname);

  const fetchUser = async () => {
    if (localStorage.getItem("token")) {
      const res = await getUser();
      dispatch(setUser(res.data));
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  /*socket */
  useEffect(() => {
    const socket = io(process.env.REACT_APP_BASE_URL, {
      auth: {
        token: JSON.parse(localStorage.getItem("token")), // Assuming the token is stored as a plain string
      },
      transports: ["websocket", "polling"],
    });

    socket.on("onlineUser", (data) => {
      console.log(data);
      dispatch(setOnlineUser(data));
    });

    dispatch(setSocketConnection(socket));

    socket.on("connect", () => {
      console.log("Connected to server with ID:", socket.id);
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const basePath = location.pathname === "/home";

  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <SideBar />
      </section>
      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      {basePath && (
        <div className="lg:flex justify-center items-center flex-col gap-2 hidden sm:hidden">
          <div>
            <img src={logo} width={150} alt="logo" />
            <h3 className="flex justify-center items-center text-4xl font-semibold">
              QuickChat
            </h3>
          </div>
          <p className="text-lg mt-2 text-slate-500">
            Select User to send message
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
