const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Import the router module
const router = require('./router');

// Mount the router
app.use('/api', router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
