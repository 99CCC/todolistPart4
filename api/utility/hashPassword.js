const bcrypt = require('bcrypt');

async function hashPassword(password){
    console.log("hashed: ", password);
    const saltRounds = 10;

    try{
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(hashedPassword);
        return hashedPassword;
    }catch(error){
        console.error("Error hashing password: ", error);
        throw error;
    }
}

module.exports = { hashPassword };