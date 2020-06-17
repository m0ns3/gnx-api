const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { Employee } = require("../models/employee");

const CantDeleteSalaryRelated = {
  validate: async function(typeName, originalObject, materializedObject) {
    const EmployeeFinded = await Employee.findOne({ SalaryID: originalObject });

    if (EmployeeFinded) {
      throw new CantDeleteSalaryRelatedError(typeName);
    }
  }
};
class CantDeleteSalaryRelatedError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Salary have at least 1 employee related",
      "CantDeleteSalaryRelatedError"
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
  CantDeleteSalaryRelated
};
