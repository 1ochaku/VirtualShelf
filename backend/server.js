const express = require('express');
const app = express();
const port = 5000;

require('dotenv').config();

const mongoURL = process.env.MONGO_URL;

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

app.get('/getItems', (req, res) => {
    res.send('<h1>Here are the list of Items.</h1>');
});

app.post('/addItems', (req, res) => {
    // to add the adding of items logic here
});

app.patch('/updateItems', (req, res) => {
    // to add the updation  of items logic here
});

app.delete('/deleteItems', (req, res) => {
    // to add the deletion of items logic here
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});