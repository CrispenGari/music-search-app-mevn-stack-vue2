import mongoose from "mongoose";
const collection_name = "history";
const historySchema = mongoose.Schema({
  name: String,
  genre: String,
  profile: String,
});

const model = mongoose.model(collection_name, historySchema);
export default model;
