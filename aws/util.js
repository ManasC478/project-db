import hmacSHA256 from "crypto-js/hmac-sha256";
import CryptoJS from "crypto-js";
// import sha256 from "crypto-js/sha256";
// import Base64 from "crypto-js/enc-base64";

export const createSecretHash = (username) => {
  return hmacSHA256(
    username + process.env.AWS_CLIENT_ID,
    process.env.AWS_CLIENT_SECRET
  ).toString(CryptoJS.enc.Base64);
};
