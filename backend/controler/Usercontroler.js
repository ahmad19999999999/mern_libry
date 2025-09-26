import HandelAsyncError from "../midelware/HandelAsyncError.js";
import User from "../models/Usermodel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendToken from "../utils/token.js";
import cloudinary from "../utils/CloudinaryConfig.js";


// register user
export const Regesteruser = HandelAsyncError(async (req, res, next) => {
     const { username, email, password } = req.body;

    let avatarData = {};

    // تحقق إذا كان هناك ملف صورة مرفوع
    if (req.files && req.files.avatar) {
        const filePath = req.files.avatar.tempFilePath;

        // رفع الصورة إلى Cloudinary
        const mycloude = await cloudinary.uploader.upload(filePath, {
            folder: 'avatars',
            width: 150,
            crop: 'scale'
        });

        avatarData = {
            public_id: mycloude.public_id,
            url: mycloude.secure_url
        };
    }

    // إنشاء المستخدم
    const user = await User.create({
        username,
        email,
        password,
        avatar: avatarData // إذا لم يكن هناك صورة، ستكون القيمة فارغة {}
    });

    sendToken(user, 201, res);
});

// login user
export const LoginUser=HandelAsyncError(async(req,res,next)=>{
    const {email,password}=req.body
    if(!email||!password){
        return next(new ErrorHandler(400,"email or password is empty"))
    }
    const user=await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler(401,"invalid email or password"))
    }
    const isPasswordMatched = await user.comparePassword(password);
if (!isPasswordMatched) {
    return next(new ErrorHandler(401,"invalid email or password"));
}

    sendToken(user,200,res);
})

// logout user
export const Logout=HandelAsyncError(async(req,res,next)=>{
    res.cookie('token',null,{expires:new Date (Date.now()),httpOnly: true})

    res.status(200).json({
        succuss:true,
        message:"succussflly logout"

    })
})

