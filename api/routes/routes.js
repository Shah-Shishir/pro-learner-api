const express = require("express");
const router = express.Router();

const languageRoutes = require("../routes/language.routes");
router.use("/admin/languages", languageRoutes);

const conceptRoutes = require("./concept.routes");
router.use("/admin/concepts", conceptRoutes);

module.exports = router;
