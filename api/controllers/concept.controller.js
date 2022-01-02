const mongoose = require("mongoose");

const Language = require("../models/language.model");
const Concept = require("../models/concept.model");

const findAll = async (req, res, next) => {
  const { languageId } = req.params;

  try {
    await Language.findById(languageId)
      .select("concepts -_id")
      .populate("concepts")
      .exec()
      .then((language) => {
        if (language) {
          res.status(200).json({
            total: language.concepts.length,
            concepts: language.concepts,
          });
        } else {
          res.status(404).json({
            message: `No valid language found with provided ID ${languageId}.`,
          });
        }
      });
  } catch (error) {
    return res.status(500).json({ error: err });
  }
};

const create = async (req, res, next) => {
  const { languageId } = req.params;

  const newConcept = new Concept({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    content: req.body.content,
    languageId,
  });

  try {
    const createdConcept = await newConcept.save();

    await Language.updateOne(
      {
        _id: languageId,
      },
      {
        $push: {
          concepts: createdConcept._id,
        },
      }
    );

    res.status(201).json({
      message: "New concept created successfully!",
      createdConcept,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const findOne = async (req, res, next) => {
  const { conceptId } = req.params;

  try {
    await Concept.findById(conceptId)
      .select("_id languageId title content createdAt")
      .exec()
      .then((concept) => {
        res.json({ concept });

        if (concept) {
          res.status(200).json({
            concept,
          });
        } else {
          res.status(404).json({
            message: `No valid concept found with provided ID ${conceptId}.`,
          });
        }
      });
  } catch (error) {
    return res.status(500).json({ error: err });
  }
};

const update = async (req, res, next) => {
  const updatedData = req.body;
  const { conceptId } = req.params;

  try {
    await Concept.findByIdAndUpdate(conceptId, updatedData);

    res.status(200).json({
      message: "Concept updated successfully!",
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const destroy = async (req, res, next) => {
  const { conceptId } = req.params;

  try {
    await Concept.findByIdAndDelete(conceptId);

    res.json({
      message: "Concept deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = { findAll, create, findOne, update, destroy };
