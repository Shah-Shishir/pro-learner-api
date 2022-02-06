const mongoose = require("mongoose");

const ProblemSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  conceptId: {
    type: String,
    ref: "Concept",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  solutions: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Solution",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Problem", ProblemSchema);
