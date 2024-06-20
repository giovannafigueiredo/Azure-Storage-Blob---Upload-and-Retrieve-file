const express = require("express");
const { BlobServiceClient } = require("@azure/storage-blob");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3001;

// Azure Storage Blob configuration
const AZURE_STORAGE_CONNECTION_STRING = "";
const containerName = "testcontainer";

// Configure Multer for file uploads
const upload = multer({ dest: "uploads/" });

// Serve the HTML form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "uploaddata.html"));
});

// API endpoint to upload CSV data to Azure Storage
app.post("/upload-csv", upload.single("csvFile"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded" });
  }

  const filePath = path.join(__dirname, req.file.path);

  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(
      req.file.originalname
    );

    // Upload the file to Azure Storage
    await blockBlobClient.uploadFile(filePath);

    // Delete the uploaded file from local storage
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting uploaded file:", err);
      }
    });

    res.send({ message: "CSV file successfully uploaded to Azure Storage" });
  } catch (err) {
    console.error("Error uploading CSV to Azure Storage:", err);
    res.status(500).send({ message: "Failed to upload CSV to Azure Storage" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
