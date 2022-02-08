const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schemas/schemas");


//Creating the app using express
const app = express();

//Using the express-graphql as a middleware 
app.use("/graphql",graphqlHTTP.graphqlHTTP({
    schema,
    graphiql: true
}));


//Starting the express server on port 4000
app.listen(4000,()=>{
    console.log("Backend server started on port 4000");
});
