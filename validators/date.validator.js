const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;

const validDateRange = {
  validate: async function(typeName, originalObject, materializedObject) {
    if (materializedObject.to_date - materializedObject.from_date < 0) {
      throw new InvalidDateRangeError(typeName);
    }
  }
};
class InvalidDateRangeError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "From_date must be smaller than To_date",
      "InvalidDateRangeError"
    );
  }
}

module.exports = {
  validDateRange
};
