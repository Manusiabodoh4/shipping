const crypto = require("crypto");
const algorithm = 'aes-256-cbc';
const key = "89894971971db73183ea76f458d44c2a";
const iv = crypto.randomBytes(16);

function enc(message){
  message = (message||"")
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(message);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function des(message){
  message = (message||"")
  let iv = Buffer.from(message.iv, 'hex');
  let encryptedText = Buffer.from(message.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

module.exports = {enc, des}