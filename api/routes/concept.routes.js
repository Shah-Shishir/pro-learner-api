const express = require("express");
const router = express.Router();

const {
  findAll,
  create,
  findOne,
  update,
  destroy,
} = require("../controllers/concept.controller");

router.get("/all/:languageId", findAll);
router.post("/:languageId", create);
router.get("/:conceptId", findOne);
router.patch("/:conceptId", update);
router.delete("/:conceptId", destroy);

module.exports = router;
