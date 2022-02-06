const mongoose = require("mongoose");

const Problem = require("../models/problem.model");
const Solution = require("../models/solution.model");

const findAll = async (req, res, next) => {
  const { problemId } = req.params;

  try {
    await Problem.findById(problemId)
      .select("solutions -_id")
      .populate("solutions")
      .exec()
      .then((problem) => {
        if (problem) {
          res.status(200).json({
            total: problem.solutions.length,
            solutions: problem.solutions,
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

const findOne = async (req, res, next) => {
  const { solutionId } = req.params;

  try {
    await Solution.findById(solutionId)
      .select("_id problemId code rating createdAt")
      .exec()
      .then((solution) => {
        if (solution) {
          res.status(200).json({
            solution,
          });
        } else {
          res.status(404).json({
            message: `No valid solution found with provided ID ${solutionId}.`,
          });
        }
      });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const create = async (req, res, next) => {
  const { problemId } = req.params;

  const newSolution = new Solution({
    _id: new mongoose.Types.ObjectId(),
    code: req.body.code,
    rating: req.body.rating,
    problemId,
  });

  try {
    const createdSolution = await newSolution.save();

    await Problem.updateOne(
      {
        _id: problemId,
      },
      {
        $push: {
          solutions: createdSolution._id,
        },
      }
    );

    res.status(201).json({
      message: "New solution created successfully!",
      createdSolution,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const update = async (req, res, next) => {
  const dataToUpdate = req.body;
  const { solutionId } = req.params;

  try {
    await Solution.findByIdAndUpdate(solutionId, dataToUpdate);

    res.status(200).json({
      message: "Solution updated successfully!",
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const destroy = async (req, res, next) => {
  const { solutionId } = req.params;

  try {
    await Solution.findByIdAndDelete(solutionId);

    res.json({
      message: "Solution deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = { findAll, create, findOne, update, destroy };
