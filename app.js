

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const mongoose = require('mongoose');
const User = require('./models/User');
const Form = require('./models/ContactForm')

const path=require('path')

const app = express();

app.use(express.static('public'))



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());


// Step 1: Define a schema
const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  touristPlace: String,
  adults: Number,
  children: Number,
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

app.get('/travel', (req, res) => {
  const filePath = path.join(__dirname,'travel.html');
  res.sendFile(filePath, (err) => {
      if (err) {
          res.status(500).send("Error sending the file.");
      }
  });
});

app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/index.html')
 
})
app.get('/login',(req,res)=>{
  res.sendFile(__dirname+'/login.html')
 
})
app.get('/reset',(req,res)=>{
  res.sendFile(__dirname+'/reset.html')
 
})
app.get('/travel.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'travel.html'));
});

app.get('/booking',(req,res)=>{
  res.sendFile(__dirname+'/booking.html')
 
})
app.get('/index',(req,res)=>{
  res.sendFile(__dirname+'/index.html')
 
})
app.get('/details',(req,res)=>{
  res.sendFile(__dirname+'/details.html')
 
})



// Step 3: Handle form submission and save data to MongoDB
app.post('/submit', async (req, res) => {
  try {
   
    const newBooking = new Booking({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      // touristPlace: req.body.place,
      touristPlace: req.body['tourist-place'],
      adults: req.body.adults,
      children: req.body.children,
      // paymentDetails: req.body['payment-details'],
    });

    // Save the new booking to the database
    await newBooking.save();

    console.log('Form data saved to MongoDB');

    res.sendFile(__dirname+'/popup.html')
    // res.send('Form submitted successfully');
  } catch (error) {
    console.error('Error saving form data to MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Signup route
app.post('/signup', async (req, res) => {
  try {
      const { name, email, password } = req.body;
      const user = new User({ name, email, password });
      await user.save();

      req.flash('success', 'User created successfully'); // Flash success message
      res.redirect('/travel.html');
  } catch (error) {
      req.flash('error', error.message); 
      res.redirect('/'); 
  }
});



// Login route
app.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email, password });
      if (user) {
        req.flash('success', 'User created successfully'); // Flash success message
        res.redirect('/travel.html');
      } else {
          res.status(401).send('Invalid credentials');
      }
  } catch (error) {
      res.status(400).send(error.message);
  }
});

// contact form

app.post('/contactForm', async (req, res) => {
  try {
      const { email, phone, message } = req.body;
      const form = new Form({ email, phone, message });
      await form.save();
      res.send('thank you');
    
  } catch (error) {
      req.flash('error', error.message); 
  }
});



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
