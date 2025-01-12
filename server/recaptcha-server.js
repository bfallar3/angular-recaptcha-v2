const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware configuration to allow CORS requests and parse request body
app.use(
  cors({
    origin: "http://localhost:4200" // Angular dev server
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const ValidateFormData = (req, res, next) => {
  const { captchaResponse } = req.body;

  if (!captchaResponse) {
    return res
      .status(400)
      .json({ success: false, message: "Token is required" });
  }

  next();
};

// Sample API endpoint
app.post("/api/validate", ValidateFormData, (req, res) => {
  // validate the captcha response
  const RECAPTCHA_SECRET_KEY = "6Lc7vmIUAAAAADZBzSR_rzVYZvu5pSy5aj3-IV5_";
  const GOOGLE_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

  const { captchaResponse } = req.body;

  // use fetch api to send the captcha response to the google server
  try {
    fetch(GOOGLE_VERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${captchaResponse}`,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          return res
            .status(200)
            .json({ success: true, message: "Captcha verification success" });
        } else {
          return res
            .status(400)
            .json({ success: false, message: "Captcha verification failed" });
        }
      });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
