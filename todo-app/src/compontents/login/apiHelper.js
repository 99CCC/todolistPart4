import { cryptPassword } from '../../utility/cryptPassword.js';

const baseurl = "http://localhost:3001/api/user";

export async function loginAPI(credentials){
    try{

        const encryptedPassword = await cryptPassword(credentials.password);
        console.log(credentials.username);
        const encryptedCredentials = {username: credentials.username, password: encryptedPassword};

        const response = await fetch(baseurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(encryptedCredentials),
        });

        if(!response.ok){
            throw new Error('Login failed');
        }
        const res = await response.json();
        console.log(res);
        return res;

    }catch(error){
        console.error('Error during login: ', error);
        return null;
    }
}

export async function createUser(credentials) {
    try{
        const encryptedPassword = await cryptPassword(credentials.password);
        const encryptedCredentials = {username: credentials.username, password: encryptedPassword};
        console.log(encryptedCredentials);

        const response = await fetch(baseurl+"/newUser",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(encryptedCredentials),
        });

        if (response.ok){
            return response;
        } else{
            const errorDetails = await response.json();
            console.error('Response Error:', errorDetails);
            throw new Error('User creation failed');
        }
    }catch(error){
        console.error('Error during user creation', error);
        return {status: false};
    }
}