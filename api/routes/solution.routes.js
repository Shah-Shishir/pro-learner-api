const express = require("express");
const router = express.Router();

const {
  findAll,
  create,
  findOne,
  update,
  destroy,
} = require("../controllers/solution.controller");

router.get("/all/:problemId", findAll);
router.post("/:problemId", create);
router.get("/:solutionId", findOne);
router.patch("/:solutionId", update);
router.delete("/:solutionId", destroy);

module.exports = router;
