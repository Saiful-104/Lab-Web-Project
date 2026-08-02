const { ObjectId } = require("mongodb");

const isValidObjectId = (id) => {
  return ObjectId.isValid(id);
};

const toObjectId = (id) => {
  if (!isValidObjectId(id)) {
    throw new Error("Invalid ObjectId");
  }
  return new ObjectId(id);
};

module.exports = {
  isValidObjectId,
  toObjectId,
};