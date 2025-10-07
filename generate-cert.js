import { writeFileSync } from "fs";
import { generateKeyPairSync } from "crypto";
import selfsigned from "selfsigned";

// Generate RSA key pair
const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });

// Create a self-signed certificate
const pems = selfsigned.generate([{ name: "commonName", value: "localhost" }], {
  days: 365,
  keySize: 2048,
  algorithm: "sha256",
});

writeFileSync("key.pem", pems.private);
writeFileSync("cert.pem", pems.cert);
console.log("key.pem and cert.pem created.");