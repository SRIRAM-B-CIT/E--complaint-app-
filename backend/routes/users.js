const router = require("express").Router();
let User = require("../models/user.model");

// Get all users
router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Add new user
router.post("/add", (req, res) => {
  const { username, role, corporation, area } = req.body;

  const newUser = new User({
    username,
    role: role || "user",
    corporation: role === "admin" ? corporation : null,
    area: role === "admin" ? area : null,
  });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
