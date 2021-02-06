# MUSIC SEARCH ENGINE BACKEND

THIS IS JUST THE EXPRESS BACKEND SERVER FOR THE MUSIC APPLICATION USING `VUE.JS 2`.

## Packages used

- mongoose
- express
- cors

## installation of packages

```shell
$npm install express mongoose cors
```

## SERVER IMPLEMENTATION

### 1. CREATE A MODEL

I've created a models file in a folder called `models` the file has the following code:

```

// import mongoose
import mongoose from "mongoose";

// declare a collection name
const collection_name = "history";
// Create a Schema
const historySchema = mongoose.Schema({
  name: String,
  genre: String,
  profile: String,
});
// create a model and export it as default
const model = mongoose.model(collection_name, historySchema);
export default model;
```

### 2. CREATE A CLUSTER ON MONGODB CLOUD DATABASE

- [MONGODB-CLOUD](https://cloud.mongodb.com/v2/601ebe02e935a617927c05b4#clusters/connect?clusterId=Cluster0)

- Get the password and the connection URL from the site.

I've created the key's files in the folder called `keys`

### 4. IN THE SERVER.JS FILE

The following is the code that is in the `server.js` file and is being explained using inline comments:

```
// IMPORT ALL THE PACKAGES
import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";

// IMPORT THE DATABASE MODEL FROM THE models folder
import model from "./models/index.js";

// IMPORT connection url FROM THE keys folder
import connUrl from "./keys/index.js";

// app instance
const app = express();
// Variables
const host = "localhost" || "127.0.0.1";
const port = 8081 || process.env.PORT;
// Midlewares
app.use(express.json());
app.use(cors());

// DATABASE CONNECTION
mongoose
  .connect(connUrl, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to Cloud MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

// LISTEN TO THE CONNECTION EVENT ON THE CLOUD MONGODB
mongoose.connection.once("open", () => {
  console.log("MongDB has been LINKED with localhost:" + port);
});

// END POINTS

// ON THE HOME ROUTE REDIRECT TO HISTORY ROUTE
app.get("/", (req, res, next) => {
  res.status(200).redirect("/v1/history");
});
// getting all histories
app.get("/v1/history", (req, res, next) => {
  model.find({}, (error, data) => {
    if (!error) {
      res.status(200).send(data);
    } else {
      res.status(500).send(error);
    }
  });
});
// adding history
app.post("/v1/history", (req, res, next) => {
  const history = req.body;
  model.create(history, (error, data) => {
    if (!error) {
      res.status(201).send(data);
    } else {
      res.status(500).send(error);
    }
  });
});
// searching for a history
app.get("/v1/history/:artistName", (req, res, next) => {
  const { artistName } = req.params;
  model.find({ name: artistName }, (error, data) => {
    if (!error) {
      res.status(200).send(data);
    } else {
      res.status(500).send(error);
    }
  });
});

// deleting history BASED ON THE _ID
app.delete("/v1/history/:historyId", (req, res, next) => {
  const { historyId } = req.params;
  model.deleteOne({ _id: historyId }, (error, data) => {
    if (!error) {
      res.status(200).send("Deleted");
    } else {
      res.status(500).send(error);
    }
  });
});

// STARTING THE APP

app.listen(port, host, (error) => {
  if (error) {
    return error;
  }
  console.log(`The server is running at port: ${port}`);
  console.log(`Visit: http://${host}:${port}`);
});

```

- THAT'S ALL

## CREDITS

- [NONE](https://)
