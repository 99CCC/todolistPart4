const crypto = require('crypto');
const fs = require('fs');

async function decryptPassword(encryptedPassword) {
    try{
    const privateKey = fs.readFileSync('./utility/private_key.pem', 'utf8');
    const decryptedPassword = crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256"
    },
        Buffer.from(encryptedPassword, 'base64')
    );
    
    //console.log(decryptedPassword.toString());
    return decryptedPassword.toString();

    }catch(error){
        throw error;
    }
    
}

module.exports = { decryptPassword };