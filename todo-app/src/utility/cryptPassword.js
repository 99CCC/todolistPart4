import forge from 'node-forge';

export async function cryptPassword(password){
    const publicKeyPem = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqvi/VidxywxBPma0b2JL
FhAo0FSDLMk/wrgWmd+ptA+Wx87ZBy7LOGP8oFFpacEibSBOavj8KVsXDbnxOCt9
hc6UOE05+UJokkkcaKMWk6HcgjmVoKWz44OahGQiCL0xL9rY9PDOcYUchUxPp0nj
F0MLZfjVKGcHOMVewphRYopws2SrwfIHU/8KBKNoAlk4tRoYT8xFaa2hxkxGYRO2
Ah/r4fxCgOUUtqsncxCHrSCBcoeSirYGuFZOV/i0cfuGxlzc3KfKmuyrCH6HVYIe
bzXWwZj7MKgh2D+5aozdp8EbY+5+upkWMvVqTGSp3NW44M2ibyNXdqjXzKASd+A4
CwIDAQAB
-----END PUBLIC KEY-----
    `;

    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

    const encryptedPassword = publicKey.encrypt(password, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
        mgf1: {
            md: forge.md.sha256.create(),
        },
    });

    const base64EncryptedPassword = forge.util.encode64(encryptedPassword);

    console.log(base64EncryptedPassword);
    
    return base64EncryptedPassword;
}