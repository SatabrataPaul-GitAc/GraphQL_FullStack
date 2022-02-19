require("dotenv").config();
const express = require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const schema = require("./schemas/schemas");
const mongoose = require("mongoose");

//Connecting to the database
mongoose.connect(process.env.MONGO_DATABASE_URI,()=>{
    console.log("Connected to the database successfully !!!");
})


//Creating the app using express
const app = express();

//Using cors for giving access to the front-end client server
app.use(cors());

//Using the express-graphql as a middleware 
app.use("/graphql",graphqlHTTP.graphqlHTTP({
    schema,
    graphiql: true
}));


//Starting the express server on port 4000
app.listen(process.env.PORT | 4000,()=>{
    console.log("Backend server started on port 4000");
});
