const express = require('express');
const app = express();
const {PORT,DB} = require('./config/envConfig');
const  {connect} = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require("./routes/categoryRoutes");
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const port = PORT || 5000;

app.listen(port, () => {
console.log(`port is runing on ${port}`);
});

app.use(express.json());
app.use(cors());
app.use("/api/user", userRoutes);
app.use("/api", categoryRoutes);
app.use('/api',productRoutes);

connect(DB);










