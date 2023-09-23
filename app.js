var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var app = express();

var mongoDb = require("./db/db");
var myEmployees = require("./routes/myEmployee");
var showUser = require("./routes/myUsers");
var room = require("./routes/rooms");
var getAdmin = require("./routes/getAdmin");
var myUsers = require("./routes/userAuth");

var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/showUser", showUser);
app.use("/getAdmin", getAdmin);
app.use("/myEmployees", myEmployees);
app.use("/room", room);

app.use("/myUsers", myUsers);

app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
