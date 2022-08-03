const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({  // chứa thuc tính của model
    username : {
        type : String,
        required : true,
        minLength : 6,
        maxLength : 20,
        unique : true
    },
    email :{
        type : String,
        required : true,
        minLength : 10,
        maxLength : 50,
        unique : true
    },
    password :{
        type : String,
        required : true,
        minLength : 6
    },
    admin :{
        type : Boolean,
        default : false, // khi người dùng đăng nhập vào thì mặc định ko phải là admin
    },
},
    {timestamps : true} // user được tạo và update lúc nào
);

module.exports = mongoose.model("user", userSchema);

