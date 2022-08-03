const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authControllers ={
    // REGISTER
    registerUser : async(req,res) => {
        try{
            const salt = await  bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            // Create new user
            const newUser = await new User ({
                username : req.body.username,
                email : req.body.email,
                password : hashed,
            });

            // Sau khi đã tạo thành công user chúng ta  phải lưu nó vào trong DB
            const user = await newUser.save();
            res.status(200).json(user);
        }catch(err){
            res.status(500).json(err);
        }
    },
    // GENERATE ACCESS TOKEN
    generateAccessToken : (user) =>{
        return jwt.sign({
                id: user.id,
                admin: user.admin,
            },
            process.env.JWT_ACCESS_KEY,
            {expiresIn: "30s"}
        );
    },

    // GENERATE REFRESH TOKEN
    generateRefreshToken : (user) =>{
        return jwt.sign({
                id: user.id,
                admin: user.admin,
            },
            process.env.JWT_REFRESH_KEY,
            {expiresIn: "365d"}
        );
    },
    // LOGIN
    loginUser : async(req,res) =>{
        try{
            const user = await User.findOne({username : req.body.username});
            if(!user){
                res.status(404).json("wrong username !");
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if(!validPassword){
                res.status(404).json("wrong password !");
            }
            if(user && validPassword){
              const accessToken = authControllers.generateAccessToken(user);
                const refreshToken =authControllers.generateRefreshToken(user);
                const {password,...others} = user._doc;
                res.status(200).json({...others,accessToken,refreshToken});
                console.log({user,accessToken,refreshToken});
            }
        }catch(err){
            res.status(500).json(err);
        }
    }
};

module.exports = authControllers;