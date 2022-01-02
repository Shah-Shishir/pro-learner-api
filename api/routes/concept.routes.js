const express = require("express");
const router = express.Router();

const {
  findAll,
  create,
  findOne,
  update,
  destroy,
} = require("../controllers/concept.controller");

router.get("/:languageId", findAll);
router.post("/:languageId", create);
router.get("/:languageId/:conceptId", findOne);
router.patch("/:conceptId", update);
router.delete("/:conceptId", destroy);

module.exports = router;
