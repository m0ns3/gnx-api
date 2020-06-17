const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { Employee } = require("../models/employee");

const CantDeleteTitleRelated = {
  validate: async function(typeName, originalObject, materializedObject) {
    const EmployeeFinded = await Employee.findOne({ TitleID: originalObject });

    if (EmployeeFinded) {
      throw new CantDeleteTitleRelatedError(typeName);
    }
  }
};
class CantDeleteTitleRelatedError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Tittle have at least 1 employee related",
      "CantDeleteTitleRelatedError"
    );
  }
}

const executeAuditableOnUpdating = async (objectId, modifiedObject) => {
  const promotionModel = gnx.getModel(PromotionType);
  return AuditableGraphQLObjectTypeController.onUpdating(
    objectId,
    modifiedObject,
    promotionModel
  );
};

module.exports = {
  CantDeleteTitleRelated
};
