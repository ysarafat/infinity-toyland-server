const express = require('express');
const cors = require('cors')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000;

// middleWare
app.use(express.json());
app.use(cors());

// server listening
app.listen(PORT, ()=> {
    console.log(`Server running on ${PORT} port`);
})