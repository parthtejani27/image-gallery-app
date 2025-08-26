const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");

const ImageController = require("../controllers/imageController");
const { s3Client, S3_CONFIG } = require("../config/aws");

const router = express.Router();

const s3Storage = multerS3({
  s3: s3Client,
  bucket: S3_CONFIG.BUCKET_NAME,
  acl: "public-read",
  key: (req, file, cb) => {
    const filename = Date.now() + "-" + file.originalname;
    cb(null, `${S3_CONFIG.FOLDER}${filename}`);
  },
  contentType: multerS3.AUTO_CONTENT_TYPE,
});

const fileValidator = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Multer configuration
const upload = multer({
  storage: s3Storage,
  fileValidator,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.get("/testing", (req, res) => {
  res.json({ status: "Ok", timeStamp: new Date() });
});

router.get("/images", ImageController.getAllImages);

router.post("/upload", upload.single("image"), ImageController.uploadImage);

module.exports = router;
