

const express = require('express');
const mongoose = require('mongoose');
const path=require('path')

const app = express();

app.use(express.static('public'))

// Step 1: Define a schema
const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  touristPlace: String,
  adults: Number,
  children: Number,
  paymentDetails: String,
});

// Step 2: Create a model based on the schema
const Booking = mongoose.model('Booking', bookingSchema);

// Connect to the MongoDB database
const database = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect('mongodb+srv://geethesh_kulal:12345@cluster0.b8c0waq.mongodb.net/sample?retryWrites=true&w=majority', connectionParams);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
    console.log('Failed to connect to MongoDB');
  }
};

database();
app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/index.html')
 
})
app.get('/login',(req,res)=>{
  res.sendFile(__dirname+'/login.html')
 
})
app.get('/reset',(req,res)=>{
  res.sendFile(__dirname+'/reset.html')
 
})
app.get('/travel',(req,res)=>{
  res.sendFile(__dirname+'/travel.html')
 
})
app.get('/booking',(req,res)=>{
  res.sendFile(__dirname+'/booking.html')
 
})
app.get('/index',(req,res)=>{
  res.sendFile(__dirname+'/index.html')
 
})
app.get('/details',(req,res)=>{
  res.sendFile(__dirname+'/details.html')
 
})

// Express middleware to parse incoming form data
app.use(express.urlencoded({ extended: true }));

// Step 3: Handle form submission and save data to MongoDB
app.post('/submit', async (req, res) => {
  try {
    // Create a new instance of the Booking model with form data
    const newBooking = new Booking({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      touristPlace: req.body['tourist-place'],
      adults: req.body.adults,
      children: req.body.children,
      paymentDetails: req.body['payment-details'],
    });

    // Save the new booking to the database
    await newBooking.save();

    console.log('Form data saved to MongoDB');
    res.send('Form submitted successfully');
  } catch (error) {
    console.error('Error saving form data to MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(5500, () => {
  console.log('Server is running on port 5500');
});
