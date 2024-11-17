const { loginModel, 
        createUserModel } = require('../models/userModel');

async function loginController(req, res){
    try{
        const { username, password } = req.body;

        if(!username || !password){
            return res.status(400).json({ success: false, message: 'Username and password are required'});
        }

        const loginResult = await loginModel(username, password);
        if(loginResult.success){
            return res.status(200).json({success: loginResult.success, message: loginResult.message, user_id: loginResult.user_id })
        } else {
            return res.status(401).json({success: loginResult.success, message: loginResult.message});
        }
    }catch(error){
        return res.status(500).json({message: 'Internal Server Error Under Login'})
    }
}

async function createUserController(req, res){
    try{
        const { username, password } = req.body;

        if(!username || !password){
            return res.status(400).json({ success: false, message: 'Username and password are required'});
        }

        const response = await createUserModel(username, password);

        if(response){
            return res.status(201).json({success: true, message: 'User created successfully'});
        }else{
            return res.status(400).json({success: false, message: "Failed to create user"});
        }
    }catch(error){
        return res.status(500).json({message: 'Internal Server Error During Creation of User'});
    }
}

module.exports = { loginController, createUserController}