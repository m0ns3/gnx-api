const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { Title } = require("../models/title");

const CantHaveTwoTitlesByEmployeeWithSameDept = {
  validate: async function(typeName, originalObject, materializedObject) {
    const EmployeeFinded = await Title.find({
      EmployeeID: materializedObject.EmployeeID
    });

    EmployeeFinded.forEach(emp => {
      if (emp && emp._id != materializedObject.id) {
        if (emp && emp.title != materializedObject.title) {
          throw new CantHaveTwoTitlesByEmployeeWithSameDeptError(typeName);
        }
      }
    });
  }
};

class CantHaveTwoTitlesByEmployeeWithSameDeptError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Can't have more than an title with the same dept_name by employee.",
      "CantHaveTwoTitlesByEmployeeWithSameDeptError"
    );
  }
}

const CantDeleteTitleRelated = {
  validate: async function(typeName, originalObject, materializedObject) {
    const EmployeeFinded = await Title.findOne({ EmployeeID: originalObject });

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
  CantHaveTwoTitlesByEmployeeWithSameDept,
  CantDeleteTitleRelated
};
