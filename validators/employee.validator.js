const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { Employee } = require("../models/employee");
const { Salary } = require("../models/salary");
const { Title } = require("../models/title");
const { Dept_manager } = require("../models/dept_manager");

const CantRepeatDni = {
  validate: async function(typeName, originalObject, materializedObject) {
    const DniFinded = await Employee.findOne({
      dni: materializedObject.dni
    });

    if (DniFinded && DniFinded._id != materializedObject.id) {
      throw new CantRepeatExistingDniError(typeName);
    }
  }
};
class CantRepeatExistingDniError extends GNXError {
  constructor(typeName) {
    super(typeName, "Dni cant be repeated", "CantRepeatExistingDniError");
  }
}

const CantAgeLess18 = {
  validate: async function(typeName, originalObject, materializedObject) {
    const todayIsoDate = new Date();
    const currentYear = todayIsoDate.toISOString().substring(0, 4);

    const birthYear = materializedObject.birth_date
      .toISOString()
      .substring(0, 4);

    const age = currentYear - birthYear;

    if (age < 18) {
      throw new CantAgeLess18Error(typeName);
    }
  }
};
class CantAgeLess18Error extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Employee must have more than 18 years old.",
      "CantAgeLess18Error"
    );
  }
}

const CantDeleteEmployeeRelated = {
  validate: async function(typeName, originalObject, materializedObject) {
    const SalaryFinded = await Salary.findOne({ SalaryID: originalObject });
    const TitleFinded = await Title.findOne({ TitleID: originalObject });
    const Dept_managerFinded = await Dept_manager.findOne({
      Dept_managerID: originalObject
    });
    const Dept_employeeFinded = await Dept_employee.findOne({
      Dept_employeeID: originalObject
    });

    if (
      SalaryFinded ||
      TitleFinded ||
      Dept_managerFinded ||
      Dept_employeeFinded
    ) {
      throw new CantDeleteEmployeeRelatedError(typeName);
    }
  }
};
class CantDeleteEmployeeRelatedError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Employee have at least 1 relation with other collection",
      "CantDeleteEmployeeRelatedError"
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
  CantRepeatDni,
  CantAgeLess18,
  CantDeleteEmployeeRelated
};
