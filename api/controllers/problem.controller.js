const mongoose = require("mongoose");

const Concept = require("../models/concept.model");
const Problem = require("../models/problem.model");

const findAll = async (req, res, next) => {
  const { conceptId } = req.params;

  try {
    await Concept.findById(conceptId)
      .select("problems -_id")
      .populate("problems")
      .exec()
      .then((concept) => {
        if (concept) {
          res.status(200).json({
            total: concept.problems.length,
            problems: concept.problems,
          });
        } else {
          res.status(404).json({
            message: `No valid concept found with provided ID ${conceptId}.`,
          });
        }
      });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const findOne = async (req, res, next) => {
  const { problemId } = req.params;

  try {
    await Problem.findById(problemId)
      .select("_id conceptId title description solutions createdAt")
      .exec()
      .then((problem) => {
        if (problem) {
          res.status(200).json({
            problem,
          });
        } else {
          res.status(404).json({
            message: `No valid problem found with provided ID ${problemId}.`,
          });
        }
      });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const create = async (req, res, next) => {
  const { conceptId } = req.params;

  const newProblem = new Problem({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    conceptId,
  });

  try {
    const createdProblem = await newProblem.save();

    await Concept.updateOne(
      {
        _id: conceptId,
      },
      {
        $push: {
          problems: createdProblem._id,
        },
      }
    );

    res.status(201).json({
      message: "New problem created successfully!",
      createdProblem,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const update = async (req, res, next) => {
  const dataToUpdate = req.body;
  const { problemId } = req.params;

  try {
    await Problem.findByIdAndUpdate(problemId, dataToUpdate);

    res.status(200).json({
      message: "Problem updated successfully!",
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const destroy = async (req, res, next) => {
  const { problemId } = req.params;

  try {
    await Problem.findByIdAndDelete(problemId);

    res.json({
      message: "Problem deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = { findAll, create, findOne, update, destroy };
