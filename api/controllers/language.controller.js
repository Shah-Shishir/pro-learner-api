const mongoose = require("mongoose");

const Language = require("../models/language.model");

const findAll = async (req, res, next) => {
  try {
    await Language.find()
      .select("_id title description concepts createdAt")
      .exec()
      .then((result) => res.json({ total: result.length, languages: result }));
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const create = async (req, res, next) => {
  const newLanguage = new Language({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const createdLanguage = await newLanguage.save();

    res.status(201).json({
      message: "New language created successfully!",
      createdLanguage,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const findOne = async (req, res, next) => {
  const { languageId } = req.params;

  try {
    await Language.findById(languageId)
      .select("_id title description concepts createdAt")
      .exec()
      .then((language) => {
        if (language) {
          res.status(200).json({
            language,
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

const update = async (req, res, next) => {
  const dataToUpdate = req.body;
  const { languageId } = req.params;

  try {
    await Language.findByIdAndUpdate(languageId, dataToUpdate)
      .exec()
      .then(() =>
        res.status(200).json({
          message: "Language updated successfully!",
        })
      );
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const destroy = async (req, res, next) => {
  const { languageId } = req.params;

  try {
    await Language.findByIdAndDelete(languageId)
      .exec()
      .then(() =>
        res.json({
          message: "Language deleted successfully!",
        })
      );
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = { findAll, create, findOne, update, destroy };
