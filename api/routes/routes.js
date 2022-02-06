const express = require("express");
const router = express.Router();

const languageRoutes = require("../routes/language.routes");
router.use("/admin/languages", languageRoutes);

const conceptRoutes = require("./concept.routes");
router.use("/admin/concepts", conceptRoutes);

const problemRoutes = require("./problem.routes");
router.use("/admin/problems", problemRoutes);

const solutionRoutes = require("./solution.routes");
router.use("/admin/solutions", solutionRoutes);

module.exports = router;
