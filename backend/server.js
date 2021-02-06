import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import model from "./models/index.js";
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
mongoose.connection.once("open", () => {
  console.log("MongDB has been LINKED with localhost:" + port);
});

// END POINTS
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

// deleting history
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

app.listen(port, host, (error) => {
  if (error) {
    return error;
  }
  console.log(`The server is running at port: ${port}`);
  console.log(`Visit: http://${host}:${port}`);
});
