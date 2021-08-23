const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const { appendFile } = require('fs');

const app = express();

mongoose.connect("mongodb+srv://root:r00tUser1@zwcluster1.znjzd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(() => {
  console.log("Connected to Database");
})
.catch(() => {
  console.log("Connection Failed");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS, PUT');
  next();
});

app.use("/api/posts" , postsRoutes);

module.exports = app;
