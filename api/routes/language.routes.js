const express = require("express");
const router = express.Router();

const {
  findAll,
  create,
  findOne,
  update,
  destroy,
} = require("../controllers/language.controller");

router.get("/", findAll);
router.post("/", create);
router.get("/:languageId", findOne);
router.patch("/:languageId", update);
router.delete("/:languageId", destroy);

module.exports = router;
