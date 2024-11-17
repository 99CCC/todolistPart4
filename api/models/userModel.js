const bcrypt = require('bcrypt');
const { decryptPassword } = require('../utility/decryptPassword.js');
const { hashPassword } = require('../utility/hashPassword.js');

// Get dbServiceInstance
async function getDbServiceInstance() {
    try{
        const { dbServiceInstancePromise } = require("../index.js");
        const dbServiceInstance = await dbServiceInstancePromise;
        if (!dbServiceInstance) {
            throw new Error('Database service not initialized');
        }
        return dbServiceInstance;
    } catch (error){
        throw error;
    }
}

async function loginModel(username, password){
    try{
        const dbServiceInstance = await getDbServiceInstance();
        const query = 'SELECT password, user_id FROM public.user WHERE username = $1';
        const params = [username];
        const response = await dbServiceInstance.queryMethod(query, params);

        if(response || response.length > 0){
            const storedPassword = response[0].password;
            const decryptedPassword = await decryptPassword(password);
            const isPasswordValid = await bcrypt.compare(decryptedPassword, storedPassword);
            if(isPasswordValid){
                return {success: true, message: 'Login succesfull', user_id: response[0].user_id};
            }else{
                return { success: false, message: 'incorrect password'};
            }
        } else {
            return { success: false, message: 'user not found'};
        }
    } catch(error){
        console.error('Error logging in: ', error);
        return { success: false, message: 'Login Failed due to internal server error'};
    }
}

async function createUserModel(username, password){
    try{

        const decryptedPassword = await decryptPassword(password);
        const hashedPassword = await hashPassword(decryptedPassword);

        const dbServiceInstance = await getDbServiceInstance();
        const query = 'INSERT INTO public.user (username, password) VALUES ($1, $2);'
        const params = [username, hashedPassword];
        const response = await dbServiceInstance.queryMethod(query, params);
        return response;
    }catch(error){
        throw error;
    }
}

module.exports = {loginModel, createUserModel};