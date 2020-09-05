const Tag = require("../models/tag");
const HttpError = require("../models/http-error");

const getTagById = async (req, res, next) => {
  const tagid = req.params.tagid;
  let tag;
  try {
    tag = await Tag.findById(tagid);
  } catch (err) {
    const error = new HttpError("Something went wrong on DB side", 500);
    return next(error);
  }

  if (!tag) {
    return next(new HttpError("No tag found for the given id!!", 404));
  }
  res.json({ tag: tag.toObject({ getters: true }) });
};

const getAllTags = async (req, res) => {
  let tags;
  try {
    tags = await Tag.find();
  } catch (err) {
    const error = new HttpError("Something went wrong on DB", 500);
    return next(error);
  }
  if (!tags) {
    const error = new HttpError("No Tags found", 404);
    return next(error);
  }
  res.json({ tags: tags.map((b) => b.toObject({ getters: true })) });
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

  res.status(201).json({ msg: "Tag has been added successfully!" });
};

const updateTag = async (req, res, next) => {
  const tagId = req.params.tagid;
  const { tagType } = req.body;
  let selectedTag;
  try {
    selectedTag = await Tag.findById(tagId);
  } catch (err) {
    const error = new HttpError(
      "something went wrong on db side, when finding the Tag id",
      500
    );
    return next(error);
  }
  selectedTag.tagType = tagType;

  try {
    await selectedTag.save();
  } catch (err) {
    const error = new HttpError("something went wrong on db side", 500);
    return next(error);
  }

  res.status(200).json({
    tag: selectedTag.toObject({ getters: true }),
    msg: "Tag has updated successfully!!",
  });
};

const deleteTag = async (req, res, next) => {
  const tagId = req.params.tagid;
  let selectedTag;
  try {
    selectedTag = await Tag.findById(tagId);
  } catch (err) {
    const error = new HttpError(
      "something went wrong on db side, when finding the given tag id"
    );
    return next(error);
  }

  if (!selectedTag) {
    return next(new HttpError("there is no record for the given tag id", 404));
  }

  try {
    await selectedTag.remove();
  } catch (err) {
    const error = new HttpError(
      "couldnt delete the record, something went wrong on db side"
    );
    return next(error);
  }

  res.status(200).json({ tag: "Tag has been deleted" });
};

exports.getAllTags = getAllTags;
exports.addTag = addTag;
exports.updateTag = updateTag;
exports.deleteTag = deleteTag;
exports.getTagById = getTagById;
