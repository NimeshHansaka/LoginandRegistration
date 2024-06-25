const router = require("express").Router();
let Student = require("../models/Student.js");

//  http://Localhost:8070/student/add
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const age = Number(req.body.age);
  const gender = req.body.gender;

  const newStdent = new Student({
    name,
    age,
    gender,
  });
  newStdent
    .save()
    .then(() => {
      res.json("Student Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//  http://Localhost:8070/student/
router.route("/").get((req, res) => {
  Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.log(err);
    });
});

//  http://Localhost:8070/student/update/3624727475
router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;
  //const name = req.body.name;
  const { name, age, gender } = req.body;
  const updateStudent = {
    name,
    age,
    gender,
  };

  const update = await Student.findByIdAndUpdate(userId, updateStudent)
    .then(() => {
      res.status(200).send({ status: "User Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with updating data" });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;
  await Student.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "User deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with delete user", error: err.message });
    });
});

router.route("/get/:id").delete(async (req, res) => {
  let userId = req.params.id;
  const user = await Student.findById(userId)
    .then(() => {
      res.status(200).send({ status: "User fetchedd", user: user });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with fetch user", error: err.message });
    });
});

module.exports = router;
