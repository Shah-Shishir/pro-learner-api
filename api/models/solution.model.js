const mongoose = require("mongoose");

const SolutionSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  problemId: {
    type: String,
    ref: "Problem",
  },
  code: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Solution", SolutionSchema);
