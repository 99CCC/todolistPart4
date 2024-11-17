const crypto = require('crypto');
const fs = require('fs');

function generateKeyPair() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: "spki",
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        },
    });

    fs.writeFileSync('public_key.pem', publicKey);
    fs.writeFileSync('private_key.pem', privateKey);
}
generateKeyPair();