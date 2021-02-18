const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const router = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

app.use('/api', router);

app.listen(8005);
