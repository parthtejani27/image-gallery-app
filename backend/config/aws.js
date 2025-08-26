const { S3Client } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const S3_CONFIG = {
  BUCKET_NAME: process.env.AWS_S3_BUCKET || "",
  REGION: process.env.AWS_REGION || "",
  FOLDER: "images/",
};

module.exports = { s3Client, S3_CONFIG };
