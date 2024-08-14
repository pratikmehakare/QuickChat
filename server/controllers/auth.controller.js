const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Feilds are required.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exists.",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        id: user._id,
        email: user.email,
      };
      const token = jwt.sign(payload, process.env.ACCESS_TOKEN, {
        expiresIn: "24hr",
      });

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Login Success..",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is Incorrect",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Internal Error",
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, photo } = req.body;

    if (!email || !name || !password) {
      return res.status(403).json({
        success: false,
        message: "All Feilds are required.",
      });
    }

    const userexists = await User.findOne({ email });

    if (userexists) {
      return res.status(400).json({
        success: false,
        message: "User already register.",
      });
    }

    let hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(200).json({
      success: true,
      user,
      message: "Register successful..",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Internal Error",
    });
  }
};

exports.updateUsersDetails = async (req, res) =>{
  try{

    const id = req.user.id;
    const {name ,photo} = req.body;

    
    if(!name ){
      return res.status(400).json({
        success:false,
        message:"No Changes not found"
      })
    }

    if(!id){
      return res.status(400).json({
        success:false,
        message:"Id not found"
      })
    }

    const user = await User.findOne({_id:id}).select('-password');

    if(!user){
      return res.status(400).json({
        success:false,
        message:"User not found"
      })
    }

    if(name) user.name=name
    if(photo) user.photo = photo

    user.save();

    res.json({
      success:true,
      message:"Updated..",
      data:user
    })



  } catch (err) {
    return res.status(500).json({
      message: "Internal Error",
      success: false,
      error: err.message
    });
  }
}

exports.deleteUser = async (req,res) =>{
  try{
    const id = req.user.id;
    
    if(!id){
      return res.status(400).json({
        success:false,
        message:"Id not found"
      })
    }

    const user = await User({_id:id});

    if(!user){
      return res.status(400).json({
        success:false,
        message:"User not found"
      })
    }

    await User.findOneAndDelete({_id:id});

    res.json({
      success:true,
      message:"Deleted."
    })

    
  } catch (err) {
    return res.status(500).json({
      message: "Internal Error",
      success: false,
      error: err.message
    });
  }
}

exports.getUsersDetails = async (req,res) =>{
  try{
    const id = req.user.id;

    if(!id){
      return res.status(400).json({
        success:false,
        message:"Id not found"
      })
    }

    const user = await User.findOne({_id:id}).select("-password");

    if(!user){
      return res.status(400).json({
        success:false,
        message:"User not found"
      })
    }

    // console.log("User:",user);

    res.status(200).json({
      success:true,
      message:"User Data fetch successful.",
      data:user
    })

  }catch(err){
    return res.status(500).json({
      message:"Internal Error",
      success:false,
      error:err.message
    })
  }
}

exports.searchUser = async (req,res) =>{
   try{
    const {search} = req.body;

    const query = new RegExp(search,"i","g")

    const user = await User.find({
      "$or":[
        {name:query},
        {email:query}
      ]
    }).select("-password")

    return res.json({
      success:true,
      message:"All User",
      data:user
    })

   }catch(err){
    return res.status(500).json({
      message:"Internal Error",
      success:false,
      error:err.message
    })
   }
}

exports.getUserDetailsFromToken = async (token) =>{
  if(!token){
    return {
      message:"Token not found",
      logout: true,
    }
  }

  const decode = await jwt.verify(token, process.env.ACCESS_TOKEN)

  const user = await User.findById(decode.id).select("-password")

  return user
}