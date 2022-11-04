const express = require('express');
const app = express();
const {PORT,DB} = require('./config/envConfig');
const  {connect} = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require("./routes/categoryRoutes");
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/payment');
const orderRoutes = require('./routes/order');
const bodyParser = require("body-parser");
const port = PORT || 5000;

app.listen(port, () => {
console.log(`port is runing on ${port}`);
});

app.post(
  "/api/webhook",
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(express.json());
app.use(bodyParser.json())
app.use(cors());
app.use("/api/user", userRoutes);
app.use("/api", categoryRoutes);
app.use('/api',productRoutes);
app.use("/api", paymentRoutes);
app.use("/api", orderRoutes);



connect(DB);










