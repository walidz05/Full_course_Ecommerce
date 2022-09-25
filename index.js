const express = require('express');
const app = express();
const {PORT,DB} = require('./config/envConfig');
const  {connect} = require("./config/db");
const userRoutes = require('./routes/users/userRoutes');

const port = PORT || 5000;

app.listen(port, () => {
      console.log(`port is runing on ${port}`);
});

app.use(express.json());
app.use("/api/user", userRoutes);

connect(DB);










