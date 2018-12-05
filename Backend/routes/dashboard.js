require("../config/passport");

const passport = require("passport");
var express = require("express");
var router = express.Router();
var kafka = require("../kafka/client");

var requireAuth = passport.authenticate("jwt", { session: false });

router.get("/", function(req, res) {
  console.log("Inside Dashboard GET request");
  console.log("Request body: ", req.query);
  kafka.make_request("get_dashboard", req.query, function(err, result) {
    console.log("In result");
    console.log(result);

    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.status(200).send(result);
    }
  });
});

module.exports = router;
