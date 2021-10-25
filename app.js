const express = require("express");
const app = express();

require('./config')
require('./Model')
const userRoutes = require('./controllers')
app.use(express.json())

app.use('/user', userRoutes)
app.listen(3232, () => console.log("app is running in port 3232"));