import express from 'express';
import webRoutes from "./routes/web.js";
import bodyParser from 'body-parser';

const app = express();
const port = 3030;


// Middleware
app.use(bodyParser.json());


// Mount your routes under a specific base path (e.g., "/api")
app.use("/api", webRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
