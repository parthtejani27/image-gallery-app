const { s3Client, S3_CONFIG } = require("../config/aws");

let imageDatabase = [];

class ImageController {
  static async uploadImage(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No image file provided",
        });
      }

      const imageData = {
        id: Math.random().toString(36).substring(2, 10),
        filename: req.file.filename || req.file.key?.split("/").pop(),
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: req.file.location,
        key: req.file.key,
        uploadedAt: new Date().toISOString(),
      };

      imageDatabase.push(imageData);

      res.status(201).json({
        message: "Image uploaded successfully",
        data: imageData,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({
        message: "Upload failed",
      });
    }
  }

  static async getAllImages(req, res) {
    try {
      const sortedImages = [...imageDatabase].sort(
        (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
      );

      res.status(200).json({
        data: sortedImages,
        total: imageDatabase.length,
      });
    } catch (error) {
      console.error("Fetch error:", error);
      res.status(500).json({
        message: "Failed to fetch images",
      });
    }
  }
}

module.exports = ImageController;
