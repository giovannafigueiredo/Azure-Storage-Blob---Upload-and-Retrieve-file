const express = require("express");
const { BlobServiceClient } = require("@azure/storage-blob");
const path = require("path");

const app = express();
const port = process.env.PORT || 3001;

// Azure Storage Blob configuration
const AZURE_STORAGE_CONNECTION_STRING = "";
const containerName = "testcontainer";
const blobName = "data.csv";

// Serve the HTML form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "fetchdata.html"));
});

// API endpoint to fetch CSV data from Azure Storage
app.get("/fetch-csv", async (req, res) => {
  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const downloadBlockBlobResponse = await blockBlobClient.download(0);

    const contentLength = downloadBlockBlobResponse.contentLength;
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=output.csv");
    res.setHeader("Content-Length", contentLength);

    const readableStream = downloadBlockBlobResponse.readableStreamBody;
    readableStream.pipe(res);
  } catch (err) {
    console.error("Error fetching CSV data from Azure Storage:", err);
    res
      .status(500)
      .send({ message: "Failed to fetch CSV data from Azure Storage" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
