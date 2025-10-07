import express from "express";
import https from "https";
import fs from "fs";
import path from "path";
const app = express();
const __dirname = path.resolve();
app.use(express.static(__dirname)); // serve login.html, css, js, etc.
const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};
https.createServer(options, app).listen(8443, () => {
  console.log("HTTPS server running at https://localhost:8443");
});