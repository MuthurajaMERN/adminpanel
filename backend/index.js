const express = require("express")
const cors = require("cors")
require("dotenv").config()
const bodyParser = require('body-parser');
const path = require('path');
const userRoute = require('./routes/adminRoutes')
const productRoute = require('./routes/productRoutes')
const connectDb = require('./config/db')
const testimonialsRouter = require('./routes/testimonials');

const touristCardsRoute = require('./routes/touristCardRoute');
const countryRoutes = require('./routes/countryRoutes');


const app = express()
const PORT = process.env.PORT || 8000
connectDb();


app.use(cors())
app.use(express.json())

// Middleware
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

app.use('/auth',userRoute)
app.use('/product',productRoute)
app.use('/testimonials', testimonialsRouter);

app.use('/api/touristcards', touristCardsRoute);
app.use('/api/countries', countryRoutes);


app.get('/',(req,res)=>{
    res.send('Tuorist Admin Backend Running')
})

app.listen(PORT ,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})