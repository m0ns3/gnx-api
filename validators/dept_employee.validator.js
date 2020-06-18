const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;

const { Dept_employee } = require("../models/dept_employee");

const InvalidCantEmployeeByDept = {
  validate: async function(typeName, originalObject, materializedObject) {
    const Dept_employeeFinded = await Dept_employee.find({
      EmployeeID: materializedObject.EmployeeID
    });

    Dept_employeeFinded.forEach(dpt_emp => {
      if (dpt_emp && dpt_emp.deptId != materializedObject.deptId) {
        if (
          materializedObject.from_date >= dpt_emp.from_date &&
          materializedObject.to_date <= dpt_emp.to_date
        ) {
          throw new InvalidCantEmployeeByDeptError(typeName);
        }
      }
    });
  }
};

class InvalidCantEmployeeByDeptError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Can't be more than an employee asigned at the same department at the same time.",
      "InvalidCantEmployeeByDeptError"
    );
  }
}

module.exports = {
  InvalidCantEmployeeByDept
};
