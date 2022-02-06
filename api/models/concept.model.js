const mongoose = require("mongoose");

const ConceptSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  languageId: {
    type: String,
    ref: "Language",
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  problems: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Problem",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Concept", ConceptSchema);
