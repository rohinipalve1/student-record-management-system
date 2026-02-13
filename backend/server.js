const express = require('express');
const cors = require('cors');   // 👈 THIS WAS MISSING
require('./config/db');
const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/students", studentRoutes);


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));

app.get('/', (req,res)=>{
  res.send("Backend working");
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
