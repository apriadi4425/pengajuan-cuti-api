const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const dotenv = require("dotenv");
dotenv.config();
require('moment/locale/id');
const app = express();

const router = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({credentials: true}))

app.use('/api', router);

app.listen(8006);
