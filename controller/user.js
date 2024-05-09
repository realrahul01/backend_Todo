import { User } from "../model/user.js";
import bcrypt from 'bcrypt'
import { sendCookie } from "../utils/features.js";


export const login = async (req,res,next)=>{
      try {
        const {email, password} = req.body

        const user = await User.findOne({email})
        if(!user){
          res.status(404).json({
            success: false,
            message: "Invalid email or password"
          })
        }
        const isMatch = await bcrypt.compare(password, user.password)
      
        if(!isMatch){
          res.status(404).json({
            success: false,
            message: "Invalid email or password"
          })
        }
        sendCookie(user,res, `welcome ${user.name}`, 200)

      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Internal Server Error"
        })
      }
}

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

  let user = await User.findOne({email})

  if(user){
    res.status(404).json(({
      success: false,
      message: "User already exits"
    }))
  } 

  const hashPassword = await bcrypt.hash(password, 10)

  user = await User.create({name,email,password: hashPassword});
  
  sendCookie(user,res, "Register successful", 201)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
};

export const getAllUser = async (req, res) => {
  try {
    const user = await User.find({});
  res.json({
    success: true,
    user,
  });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
};


export const getMyProfile= (req,res)=>{
  res.status(200).json({
    success: true,
    user:req.user
})
}

export const logout = (req,res)=>{ 
  try {
    res.status(200).cookie('token', "",{
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none" ,
      secure: process.env.NODE_ENV === "Development" ? false : true 
    }).json({
      message: "Logout successful",
      user: req.user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

