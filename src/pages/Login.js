import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Password from "../components/Password";
import { validateEmail } from "../utils/helper";
import toast from "react-hot-toast";
import { login } from "../services/oprations/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../redux/userSlice";
import chatapp from '../utils/chatapp.png'


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user)



  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please Enter Valid Email..");
      return;
    }

    if (!password) {
      setError("Please Enter Password");
      return;
    }

    setError("");

    try {
      const res = await login(email, password);
      dispatch(setUser(res?.user))
      dispatch(setToken(res?.token))
      navigate("/home");
    } catch (error) {
      toast.error("Fail to login");
    }
  };

  console.log("user",user)

  

  return (
    <div>
      <div className="flex justify-center items-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <div className="flex justify-center">
             <img
              src={chatapp}
              width={40}
              height={40}
              alt="logo"
             />
            <h3 className="flex justify-center items-center text-4xl font-semibold">QuickChat</h3>
            </div>
            <h4 className=" mt-2 flex justify-center items-center text-2xl mb-7">Login</h4>

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <Password
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not yet registered?{" "}
              <Link to="/signup" className="font-medium text-primary underline">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
