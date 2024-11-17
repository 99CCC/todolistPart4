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
            if(password == storedPassword){
                return { success: true, message: 'Login successful', user_id: response[0].user_id};
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
        const dbServiceInstance = await getDbServiceInstance();
        const query = 'INSERT INTO public.user (username, password) VALUES ($1, $2);'
        const params = [username, password];
        const response = await dbServiceInstance.queryMethod(query, params);
        return response;
    }catch(error){
        throw error;
    }
}

module.exports = {loginModel, createUserModel};