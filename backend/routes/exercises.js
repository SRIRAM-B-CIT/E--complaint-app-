const router = require("express").Router(); 
let Exercise = require("../models/exercises.model");

const multer = require("multer");
const path = require("path");

// ================= MULTER CONFIG =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // store images in backend/uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage: storage });

// ================= ROUTES =================

// GET all complaints
router.route("/").get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json("Error: " + err));
});

// ADD complaint with optional image
router.post("/add", upload.single("image"), (req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  const area = req.body.area;
  const assignedAdmin = req.body.assignedAdmin;

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
    area,
    assignedAdmin,
    image: req.file ? req.file.filename : null,
  });

  newExercise.save()
    .then(() => res.json("Complaint added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

// GET complaint by ID
router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json("Error: " + err));
});

// DELETE complaint
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Complaint deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

// UPDATE complaint (with optional new image)
router.post("/update/:id", upload.single("image"), (req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      if (req.file) {
        exercise.image = req.file.filename; // ✅ update image if new one uploaded
      }

      exercise.save()
        .then(() => res.json("Complaint updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

// ✅ ADMIN RESPONDS TO COMPLAINT
router.post("/respond/:id", (req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.response = req.body.response || exercise.response;
      exercise.status = req.body.status || exercise.status;

      exercise.save()
        .then(() => res.json("Response added!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
