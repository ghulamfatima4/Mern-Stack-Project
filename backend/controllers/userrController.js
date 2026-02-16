import { User } from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { VerifyEmail } from "../emailVerify/VerifyEmail.js";
import {Session} from '../models/sessionModel.js'
import {sendOtpMail} from '../emailVerify/sendOtpMail.js'
//register user controller
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({
        success: false,
        message: "User already Exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id }, // Payload
      process.env.JWT_SECRET_KEY, // Secret key from .env
      { expiresIn: "10d" }, // Token expiration
    );
    VerifyEmail(token, email);
    newUser.token = token;
    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//verify controller
export const Verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Authorization token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "the reistration token has expired",
        });
      }
      return res.status(400).json({
        success : false,
        message : "Token Verification Faild"
      })
    };

    const user = await User.findById(decoded.id)
      if(!user){
        return res.status(404).json({
          success : false,
          message : "User not found"
        })
      }
      user.token = null;
      user.isVerified= true;
      await user.save()
      return res.status(200).json({
        success : true,
        message : "Email Verified successfully"
      })
  } catch (error) {
    res.status(500).json({
      success : false,
      message : error.message
    })
  }
};
//reverify controller
export const reVerify = async (req, res) => {
  try {
    const {email} = req.body;
    const user = await User.findOne({email})
    if(!user) {
      return res.status(404).json({
        success : false,
        message : "User not found"
      })
    }
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id }, // Payload
      process.env.JWT_SECRET_KEY, // Secret key from .env
      { expiresIn: "20d" }, // Token expiration
    );
    VerifyEmail(token, email);
    user.token = token;
    await user.save();
    return res.status(200).json({
      success: true,
      message : "Verification Email sent again successfully",
      token : user.token
    })
  } catch (error) {
    return res.status(500).json({
      success : false,
      message : error.message
    })
  }
}
//login controller
export const login = async(req, res) => {
  try {
    const {email, password} = req.body;
    if(!email || !password) {
      return res.status(400).json({
        success : false,
        message : "all fields are required"
      })
    }
  
    const userExist = await User.findOne({email})
    if(!userExist){
      return res.status(404).json({
        success : false,
        message : "user not Exists"
      })
    }

    const passwordValid = await bcrypt.compare(password, userExist.password);
    if(!passwordValid){
      return res.status(401).json({
        success : false,
        message : "password is invalid"
      })
    }
    if(userExist.isVerified === false){
      return re.status(403).json({
        success : false,
        message : "please firstly verify and then login"
      })
    }

    //tokens
    const accesstoken = jwt.sign( { id: userExist._id }, process.env.JWT_SECRET_KEY, { expiresIn: "20d" }, // Token expiration
    );
    const refreshtoken = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET_KEY, { expiresIn: "20d" }, // Token expiration
);
userExist.isLoggedin = true;
userExist.save();
//check session already exist.
const existingsession = await Session.findOne({userId:userExist._id})
if(existingsession){
  await Session.deleteOne({userId : userExist._id})
}
//create session
await Session.create({userId : userExist._id})

return res.status(200).json({
  success : true,
  message : `Welocome ${userExist.firstName}`,
  user : userExist,
  accesstoken,
  refreshtoken
})

  } catch (error) {
    res.status(500).json({
      success : false,
      message : error.message
    })
  }
}

 //logout controller
export const logout = async(req,res) => {
  try {
    const userId = req.id;
    await Session.deleteMany({userId:userId})
    await User.findByIdAndUpdate(userId, {isLoggedin : false});
    return res.status(200).json({
      success : true,
      message : "User logout successfully"
    })

  } catch (error) {
    return res.status(500).json({
      success : false,
      messsage : error.message
    })
  }
}

//forgot password controller
export const forgotpassword = async(req, res) => {
  try {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({
        success : false,
        message : "user not found"
      })
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); //6 digit otp
    const otpExpiry = new Date(Date.now() + 10*60*1000) //10mint
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    await sendOtpMail(otp, email)

    return res.status(200).json({
      success : true,
      message : "otp sent on your mail successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success : false,
      message : error.message
    })
  }
}

export const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const { email } = req.params;

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP is not generated or already verified"
      });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired, please request a new one"
      });
    }

    if (String(otp) !== String(user.otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const changepassword = async(req, res) => {
  try {
    const {newpassword, conformpassword} = req.body;
    const {email} = req.params;
    const user = await User.findOne({email})
    if(!user){
      return res.status(404).json({
        success : false,
        message : "User are not found"
      })
    }

    if(!newpassword || !conformpassword) {
      return res.status(400).json({
        success : false,
        message : "All fields are required"
      })
    }
    if(newpassword !== conformpassword){
      return res.status(400).json({
        success : false,
        message : "Password are not match"
      })
    }
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    // const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({
      success : true,
      message: "password changed successfully"
    })
    
  } catch (error) {
    return res.status(500).json({
      success : false,
      message : error.message
    })
  }
}

// get all users by admin this is only for admin not for other becasue just admin have the access of this
export const getallusers = async (_, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success : true,
      users
    })
  } catch (error) {
    return res.status(500).json({
      success : false,
      message : error.message
    })
  }
}

//get one user data by id
export const getoneuser = async(rq, res) =>{
  try {
    const {userId} = req.params;
    const user = await User.findOneById(userId).select("-password -otp -token -otpExpiry");
    if(!user){
      return res.status(404).json({
        success : false,
        message : "User not found"
      })
    }
    res.status(200).json({
      success : true,
      user
    })
    
  } catch (error) {
    return res.status(500).json({
      success : false,
      message : error.message
    })
  }
}

