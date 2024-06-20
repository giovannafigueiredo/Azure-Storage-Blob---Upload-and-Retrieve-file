
# Upload file

This code sets up a web server using Express.js that allows users to upload CSV files via an HTML form. These files are then uploaded to Azure Blob Storage. You can check step-by-step explanation of what the code does and the APIs it uses:

## Required Libraries:

express: A web framework for Node.js to create the server and handle routing.
@azure/storage-blob: Azure SDK to interact with Azure Blob Storage.
path: Node.js module to work with file and directory paths.
multer: A middleware to handle file uploads.
fs: Node.js module to interact with the file system.

## Initialize Express Application:

app: The Express application.
port: The port on which the server will run, defaulting to 3001 if not specified in environment variables.
Configure Azure Blob Storage:

AZURE_STORAGE_CONNECTION_STRING: The connection string for Azure Blob Storage (to be filled in with actual credentials).
containerName: The name of the container in Azure Blob Storage where files will be uploaded.
Configure Multer for File Uploads:

upload: A Multer instance configured to save uploaded files temporarily in the "uploads/" directory.
Serve HTML Form:

app.get("/"): Serves an HTML file uploaddata.html when the root URL is accessed, providing a form for file uploads.
Handle File Uploads:

app.post("/upload-csv", upload.single("csvFile")): Endpoint to handle POST requests for CSV file uploads.
req.file: The uploaded file (if present).

## Upload File to Azure Storage:

BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING): Creates a client to interact with Azure Blob Storage using the provided connection string.
containerClient: A client for the specified container in Azure Blob Storage.
blockBlobClient: A client for the specific blob (file) being uploaded.
blockBlobClient.uploadFile(filePath): Uploads the file to Azure Blob Storage.
fs.unlink(filePath): Deletes the file from local storage after successful upload.

## Start the Server:

app.listen(port, () => { console.log(Server running on port ${port}); }): Starts the Express server on the specified port.
Key APIs and How They Work:
Express.js:

express(): Creates an Express application.
app.get(path, handler): Defines a route to handle GET requests.
app.post(path, middleware, handler): Defines a route to handle POST requests with middleware (e.g., Multer for file uploads).
app.listen(port, callback): Starts the server on the specified port.

## Azure Storage Blob:

BlobServiceClient.fromConnectionString(connectionString): Initializes a client to interact with Azure Blob Storage using a connection string.
blobServiceClient.getContainerClient(containerName): Gets a client for a specific container.
containerClient.getBlockBlobClient(blobName): Gets a client for a specific blob within the container.
blockBlobClient.uploadFile(filePath): Uploads a file to the blob in Azure Storage.

## Multer:

multer(options): Configures Multer with options like the destination directory for uploaded files.
upload.single(fieldname): Middleware to handle single file uploads from a form field with the specified name.

## Node.js Modules:

path.join(paths): Joins multiple path segments into a single path.
fs.unlink(path, callback): Deletes a file at the specified path.

# Retrieve File (Fetch data)

This second code also sets up a web server using Express.js, but instead of uploading files to Azure Blob Storage, it fetches a CSV file from Azure Blob Storage and serves it to the client.

## Import Required Libraries:

express: A web framework for Node.js to create the server and handle routing.
@azure/storage-blob: Azure SDK to interact with Azure Blob Storage.
path: Node.js module to work with file and directory paths.

## Initialize Express Application:

app: The Express application.
port: The port on which the server will run, defaulting to 3001 if not specified in environment variables.
Configure Azure Blob Storage:

AZURE_STORAGE_CONNECTION_STRING: The connection string for Azure Blob Storage (to be filled in with actual credentials).
containerName: The name of the container in Azure Blob Storage where the file is stored.
blobName: The name of the specific blob (file) to be fetched from the container.
Serve HTML Form:

app.get("/"): Serves an HTML file fetchdata.html when the root URL is accessed, providing a form to trigger the file fetch operation.
Fetch File from Azure Storage:

app.get("/fetch-csv", async (req, res)): Endpoint to handle GET requests to fetch the CSV file from Azure Storage.
BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING): Creates a client to interact with Azure Blob Storage using the provided connection string.
containerClient: A client for the specified container in Azure Blob Storage.
blockBlobClient: A client for the specific blob (file) being fetched.
blockBlobClient.download(0): Downloads the blob from Azure Storage starting from byte offset 0.
Sets response headers to serve the file as a CSV download (Content-Type, Content-Disposition, Content-Length).
Pipes the readable stream from Azure Storage to the response to send the file to the client.

## Start the Server:

app.listen(port, () => { console.log(Server running on port ${port}); }): Starts the Express server on the specified port.
Key Differences and Comparison:
Purpose:

First Code: Allows users to upload a CSV file to Azure Blob Storage.
Second Code: Fetches a CSV file from Azure Blob Storage and serves it to the user.

## File Handling:

First Code: Uses Multer to handle file uploads from a form and then uploads the file to Azure Blob Storage.
Second Code: Directly fetches a specified file from Azure Blob Storage and streams it to the client.
Endpoints:

## Multer vs. Stream Handling:

The upload code: Uses Multer middleware to handle file uploads and manage temporary storage.
The fetch data code: Uses streams to handle the file content directly from Azure Blob Storage and send it to the client.
File Operations:

Upload: Uploads the file to Azure and deletes the local temporary file.
Download: Downloads the file from Azure and sends it directly to the client without storing it locally.

## How the APIs Work:

Express.js:

express(): Creates an Express application.
app.get(path, handler): Defines a route to handle GET requests.
app.post(path, middleware, handler): Defines a route to handle POST requests with middleware (file upload code).
app.listen(port, callback): Starts the server on the specified port.

Azure Storage Blob:

BlobServiceClient.fromConnectionString(connectionString): Initializes a client to interact with Azure Blob Storage using a connection string.
blobServiceClient.getContainerClient(containerName): Gets a client for a specific container.
containerClient.getBlockBlobClient(blobName): Gets a client for a specific blob within the container.
blockBlobClient.uploadFile(filePath): Uploads a file to the blob in Azure Storage (first code).
blockBlobClient.download(offset): Downloads a blob starting from the specified byte offset (second code).









