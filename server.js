//console.log('Im in the express project')
const express = require("express");
const connectDb=require('./config/dbConnection')
const dotenv = require("dotenv").config();
const routes=require('./routes/contactRoutes');
const errorHandler = require("./middleware/errorHandler");

connectDb();
const app = express();

const port = process.env.PORT || 5000;;

// app.get('/api/contacts', (req, res) => {
//     res.status(200).json({
//         message:"Get all contacts"
//     })
// })

//middleware
app.use(express.json())
app.use('/api/contacts', routes);
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);


app.listen(port, () => {
    console.log('Server running on port ', port)
})