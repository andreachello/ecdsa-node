const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

const hashMessage = (message) => keccak256(Uint8Array.from(message));

const pubKeyToAddress = (publicKey) => {
  const hash = keccak256(publicKey.slice(1));
  return toHex(hash.slice(-20)).toUpperCase();
};

/**
 * Get the public key from the signature.
 * @param message the message.
 * @param signature the signature in hexa format with the recovery bit as the first byte.
 * @return the public key.
 */
const signatureToPubKey = (message, signature) => {
  const hash = hashMessage(message);
  const signatureBytes = Buffer.from(signature.slice(2), "hex");
  const recoveryBit = parseInt(signature.slice(0, 2), 16);

  return secp.recoverPublicKey(hash, signatureBytes, recoveryBit);
};

module.exports = {
  hashMessage,
  pubKeyToAddress,
  signatureToPubKey,
};
