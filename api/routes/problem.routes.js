const express = require("express");
const router = express.Router();

const {
  findAll,
  create,
  findOne,
  update,
  destroy,
} = require("../controllers/problem.controller");

router.get("/all/:conceptId", findAll);
router.post("/:conceptId", create);
router.get("/:problemId", findOne);
router.patch("/:problemId", update);
router.delete("/:problemId", destroy);

module.exports = router;
