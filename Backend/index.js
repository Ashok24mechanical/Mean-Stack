const express = require('express');
const userRoutes = require('./Routes/userRoutes');
const bodyparser = require('body-parser');
const cors = require('cors');
let app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(userRoutes);
app.listen(8080, () => {
    console.log('listening on port 8080');
});