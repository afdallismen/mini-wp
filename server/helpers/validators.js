module.exports = {
  schemaValidators: {
    isUnique: (model, instance, field, value) => {
      return model
        .findOne({
          $and: [
            { [field]: value },
            { _id: { $ne: instance._id }}
          ]
        })
        .then(found => !found)
        .catch(_ => false)
    }
  }
}