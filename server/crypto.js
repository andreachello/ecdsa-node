const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { hexToBytes, toHex } = require("ethereum-cryptography/utils");

const hashMessage = (message) => keccak256(Uint8Array.from(message))

const pubKeyToAddress = (publicKey) => {
    const hash = keccak256(publicKey.slice(1))
    return toHex(hash.slice(-20)).toUpperCase()
}

/**
 * Get the public key from the signature.
 * @param message the message.
 * @param signature the signature in hexa format with the recovery bit as the first byte.
 * @return the public key.
 */
const signatureToPubKey = (message, signature) => {
    const hash = hashMessage(message);
    const fullSignatureBytes = hexToBytes(signature);
    const recoveryBit = fullSignatureBytes[0];
    const signatureBytes = fullSignatureBytes.slice(1);
  
    return secp.recoverPublicKey(hash, signatureBytes, recoveryBit);
}

module.exports = {
    hashMessage,
    pubKeyToAddress,
    signatureToPubKey,
  };