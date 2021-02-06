import pwd from "./password.js";
const dbName = "History";

const connUrl = `mongodb+srv://crispen:${pwd}@cluster0.0ipwn.mongodb.net/${dbName}?retryWrites=true&w=majority`;
export default connUrl;
