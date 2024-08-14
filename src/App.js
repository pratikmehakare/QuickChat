import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import "./App.css";
import MessagePage from "./components/MessagePage";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user);
  const isLoggedIn = localStorage.getItem("token") || user.token;
  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/home" replace /> : <Login />}
      />
      <Route path="/signup" element={<SignUp />} />
      {isLoggedIn ? (
        <Route path="/home" element={<Home />}>
          <Route path=":userId" element={<MessagePage />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/" replace />} />
      )}
    </Routes>
  );
};

export default App;
