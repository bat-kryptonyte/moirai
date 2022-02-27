// using cryptojs
var CryptoJS = require("crypto-js");

/* Encrypt `inputs from online form`*/


function createCipher(username, password, key) {
    // Key should be consistent for each username,password pair

    var cipherusername = CryptoJS.AES.encrypt(username, key).toString();
    var cipherpassword = CryptoJS.AES.encrypt(password, key).toString();

    var encrypteddict = { username: cipherusername, password: cipherpassword };
    // this is what we will send to the db
    return encrypteddict;
}


function decryptMessage(dictionary, key) {

    var decryptedusername = CryptoJS.AES.decrypt(dictionary.username, key).toString(CryptoJS.enc.Utf8);
    var decryptedpassword = CryptoJS.AES.decrypt(dictionary.password, key).toString(CryptoJS.enc.Utf8);

    var decryptedData = { username: decryptedusername, password: decryptedpassword };
    // Handle false key
    if (decryptedusername === "" || decryptedpassword === "") {
        return "Invalid key";
    }
    // This is what we'll return to the user)
    return "Username: " + decryptedData.username + ", Passoword: " + decryptedData.password;
}


