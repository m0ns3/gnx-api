const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { Department } = require("../models/department");

const CantRepeatDeptName = {
  validate: async function(typeName, originalObject, materializedObject) {
    const DepartmentFinded = await Department.findOne({
      dept_name: materializedObject.dept_name
    });

    if (DepartmentFinded && DepartmentFinded._id != materializedObject.id) {
      throw new CantAssignDepartmentWithNameUsedError(typeName);
    }
  }
};
class CantAssignDepartmentWithNameUsedError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Department name cant be repeated",
      "CantAssignDepartmentWithNameUsedError"
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
  CantRepeatDeptName
};
