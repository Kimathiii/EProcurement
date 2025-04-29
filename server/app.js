const express = require("express");
require("dotenv").config();
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const app = express();

// Set up middleware FIRST
app.use(logger("dev"));
app.use(express.json()); // Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies (as sent by HTML forms)
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // Allow cookies to be sent and received
  })
);

// Security measures
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      objectSrc: ["'none'"],
    },
  },
  frameguard: { action: "deny" },
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  xssFilter: true,
  dnsPrefetchControl: { allow: false },
}));

// Then register routes AFTER middleware is set up
const authRoute = require("./routes/authentication");
const userRoute = require("./routes/users");
const supplierRoute = require("./routes/suppliers");
const inventoryRoute = require("./routes/inventory");
const orderRoute = require("./routes/order");

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute); // Changed from /api/auth to /api/users
app.use("/api/suppliers", supplierRoute);
app.use("/api/inventory", inventoryRoute);
app.use("/api/orders", orderRoute);

module.exports = app;