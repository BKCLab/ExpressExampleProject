const { Storage } = require("@google-cloud/storage");
const { config } = require("../config");

const fs = require('fs');
fs.writeFileSync("./service-account-key.json", process.env.GG_STORAGE_KEY);

const storage = new Storage({ keyFilename: "./service-account-key.json" });

async function uploadFile(buff, destFileName) {
  return storage.bucket(config.BUCKET_NAME).file(destFileName).save(buff);
}

module.exports = { uploadFile };
