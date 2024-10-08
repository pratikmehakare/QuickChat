import { authendpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";

const { LOGIN_API, SIGNUP_API, GET_USER_API, UPDATE_API,DELETE_MESSGES_API,DELETE_CONVERSATION_API, DELETE_API } = authendpoints;


export async function updateUserData(name){
  try{
    const token = JSON.parse(localStorage.getItem("token"));
    
    if (!token) {
      throw new Error("No token found");
    }

    const res = await apiConnector("PUT",UPDATE_API,{name}, {
      Authorization: `Bearer ${token}`,
    })

    console.log("UPDATE API RESPONSE.....", res);

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    toast.success("Update Successful");
    return res.data;


  }catch(err){
    console.log("UPDATE USER API ERROR....", err);
    if (err.response && err.response.status === 401) {
      console.log("Unauthorized error: Possibly invalid or expired token");
    }
    toast.error("Can't Update");
  }
}

export async function deleteConversation(){
  try{
    const token = JSON.parse(localStorage.getItem("token"));
    
    if (!token) {
      throw new Error("No token found");
    }

    const res = await apiConnector("DELETE", DELETE_CONVERSATION_API, null, {
      Authorization: `Bearer ${token}`,
    })

    if (res) {
      toast.success("Conversations Deleted.");
    
    } else {
      throw new Error(`delete failed with status: ${res.status}`);
    }

  }catch (err) {
    console.log("DELETE Conversation API ERROR....", err);
    if (err.response && err.response.status === 401) {
      console.log("Unauthorized error: Possibly invalid or expired token");
    }
    toast.error("Can't Fetch");
  }
}

export async function deleteMessages(){
  try{
    const token = JSON.parse(localStorage.getItem("token"));
    
    if (!token) {
      throw new Error("No token found");
    }

    const res = await apiConnector("DELETE", DELETE_MESSGES_API, null, {
      Authorization: `Bearer ${token}`,
    })

    if (res.status === 200) {
       toast.success("Messges Deleted")   
    } else {
      throw new Error(`delete failed with status: ${res.status}`);
    }

  }catch (err) {
    console.log("DELETE MESSAGE API ERROR....", err);
    if (err.response && err.response.status === 401) {
      console.log("Unauthorized error: Possibly invalid or expired token");
    }
    toast.error("Can't Fetch");
  }
}

export async function getUser() {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    
    if (!token) {
      throw new Error("No token found");
    }

    const res = await apiConnector("GET", GET_USER_API, null, {
      Authorization: `Bearer ${token}`,
    })

    if (res.status === 200) {
      console.log("GET USER API RESPONSE..", res);
      // toast.success("Fetch Success");
      return res.data;
    } else {
      throw new Error(`Fetch failed with status: ${res.status}`);
    }

  } catch (err) {
    console.log("GET USER API ERROR....", err);
    if (err.response && err.response.status === 401) {
      console.log("Unauthorized error: Possibly invalid or expired token");
    }
    toast.error("Can't Fetch");
  }
}

export async function login(email, password) {
  try {
    const response = await apiConnector("POST", LOGIN_API, {
      email,
      password,
    });

    console.log("LOGIN API RESPONSE.....", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    localStorage.setItem("token", JSON.stringify(response.data.token));
    toast.success("Login Successful");
    return response.data;

  } catch (error) {
    console.log("LOGIN API ERROR............", error);
    toast.error("Login Failed");
  }
}

export async function signup(name,email,password){
  try{
    const response = await apiConnector("POST",SIGNUP_API,{
      name,email,password
    })

    console.log("SIGNUP API RESPONSE...",response);

    if(!response.data.success){
      throw new Error(response.data.message);
    }

    toast.success("Sign Up Successful")

    return response.data;

  }catch(err){
    console.log("SIGNUP API ERROR....",err);
    toast.error("Signup Failed")
  }

}


