const Tag = require("../models/tag");
const HttpError = require("../models/http-error");

const getAllTags = async (req, res) => {
  let tags;
  try {
    tags = await Tag.find();
  } catch (err) {
    const error = new HttpError("Something went wrong on DB", 500);
    return next(error);
  }
  if (!tags) {
    const error = new HttpError("No tags found", 404);
    return next(error);
  }
  res.json({ tags: tags.toObject({ getters: true }) });
};

const addTag = async (req, res, next) => {
  const { tagType } = req.body;

  const newTag = new Tag({
    tagType,
  });

  try {
    await newTag.save();
  } catch (err) {
    console.log(newTag);
    const error = new HttpError(
      "Tag has not created successfully, error on db",
      500
    );
    return next(error);
  }

  res.status(201).json({ Location: newTag.toObject({ getters: true }) });
};

exports.getAlltags = getAlltags;
exports.addTag = addTag;
