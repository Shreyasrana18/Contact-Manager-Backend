const express = require('express');
const errorHandler = require('./middleware/errorhandling');
const app = express();
const dotenv = require('dotenv').config();

const port = process.env.PORT || 5000;


app.use(express.json()); // helps us to parse data from the body of the request
app.use("/api/contacts", require("./routes/contactRoutes")); 
app.use(errorHandler); // Error handling middleware
// for any middleware we use app.use() method

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
