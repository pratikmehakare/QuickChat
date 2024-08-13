import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Password from "../components/Password"
import { validateEmail } from '../utils/helper'
import toast from "react-hot-toast";
import { signup } from "../services/oprations/authApi";
import chatapp from '../utils/chatapp.png'

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e)=>{
     e.preventDefault();

     if(!name){
      setError("Please Enter Name");
      return;
     }

     if(!validateEmail(email)){
      setError("Please Enter Valid Email..")
      return;
     }   

     if(!password){
      setError("Please Enter Password");
      return;
     }

     setError("");

     try {
        await signup(name,email,password);
        navigate('/');

    } catch (error) {
        toast.error("Fail to signup")
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again");
      }
    }

  }

  

  return (
    <div>

      <div className="flex justify-center items-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
          <div className="flex justify-center">
             <img
              src={chatapp}
              width={40}
              height={40}
              alt="logo"
             />
            <h3 className="flex justify-center items-center text-4xl font-semibold">QuickChat</h3>
            </div>
            <h4 className=" mt-2 flex justify-center items-center text-2xl mb-7">Sign Up</h4>

            <input
              type="text"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              placeholder="Name"
              className="input-box"
            />

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
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
            />

            {
              error && <p className="text-red-500 text-xs pb-1">{error}</p>
            }

            <button type="submit" className="btn-primary">
              SignUp
            </button>

            <p className="text-sm text-center mt-4">
              Already have an Account?{" "}
              <Link to="/" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp
