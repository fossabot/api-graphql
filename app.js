var { buildSchema } = require('graphql');

import express from "express";
import expressGraphQL from "express-graphql";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import schema from "./graphql/";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;
const db = process.env.MONGO;

// Connect to MongoDB with Mongoose.
mongoose
  .connect(
    db,
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(
  "/graphql",
  cors(),
  bodyParser.json(),
  expressGraphQL({
    schema,
    graphiql: true
  })
);


app.listen(PORT, () => console.log('Now browse to localhost:4000/graphql'));