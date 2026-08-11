import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import {v2 as cloudinary} from 'cloudinary'

// API to register user
const registerUser = async(req,res)=>{
  try {

    const {name,email,password}=req.body
    if(!name || !password || !email){
      return res.json({success:false,message:'Missing Details'})
    }
    if(!validator.isEmail(email)){
      return res.json({success:false,message:'enter a valid email'})
    }
    if(password.length<8){
      return res.json({success:false,message:'enter a strong password '})
    }

    const userExists = await userModel.findOne({ email });

if (userExists) {
  return res.json({
    success: false,
    message: "User already exists",
  });
}

    //hasing user password
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    const userData={
      name,email,password:hashedPassword
    }

    const newUser=new userModel(userData)
    const user = await newUser.save()

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.json({success:true,token})
    
  } catch (error) {
    console.log(error);
    res.json({success:false , message:error.message})
  }
}

//api for user login

const loginUser=async(req,res)=>{
  try {

    const {email,password}=req.body
    const user=await userModel.findOne({email})

    const isMatch=await bcrypt.compare(password,user.password)

    if(isMatch){
      const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
      res.json({success:true,token})
    }else{
      console.log(error);
      res.json({success:false,message:error.message})
    }

    if(!user){
      return res.json({success:false , message:'User does not exist'})
    }
  
} catch (error) {
  console.log(error);
  res.json({success:false , message:error.message})
}
}

const getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel
      .findById(userId)
      .select("-password");

    res.json({
      success: true,
      userData,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to update user profile

const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;
    const userId = req.userId;
    const imageFile = req.file;

    console.log("USER ID:", userId);
    console.log("BODY:", req.body);
    console.log("FILE:", imageFile);

    // Check required data
    if (!name || !phone || !dob || !gender) {
      return res.json({
        success: false,
        message: "Data Missing",
      });
    }

    // Update user details
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        name,
        phone,
        address: address ? JSON.parse(address) : {},
        dob,
        gender,
      },
      { new: true }
    );

    console.log("UPDATED USER:", updatedUser);

    // Check if user exists
    if (!updatedUser) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // Upload new profile image if provided
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(
        imageFile.path,
        {
          resource_type: "image",
        }
      );

      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(
        userId,
        {
          image: imageURL,
        }
      );
    }

    res.json({
      success: true,
      message: "Profile Updated",
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {registerUser,loginUser,getProfile,updateProfile}