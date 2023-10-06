const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const password = "123Hotel";
const url = `mongodb+srv://amadirfan443:${password}@users.lu1qspo.mongodb.net/`;

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
let db = mongoose.connection;

db.on("error", () => console.log("mdb not connected"));
db.once("open", () => console.log("mdb connected"));

module.exports = { db };
