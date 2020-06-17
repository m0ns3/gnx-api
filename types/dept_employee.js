const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const graphqlIsoDate = require("graphql-iso-date");

const Employee = require("../models/employee").Employee;
const Dept_employeeModel = require("../models/dept_employee").Dept_employee;

const { validDateRange } = require("../validators/date.validator");
const {
  InvalidCantEmployeeByDept
} = require("../validators/dept_employee.validator");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = graphql;

const { GraphQLDate } = graphqlIsoDate;

const Dept_employeeType = new GraphQLObjectType({
  name: "Dept_employeeType",
  description: "Represent Department employees",
  extensions: {
    validations: {
      CREATE: [InvalidCantEmployeeByDept, validDateRange],
      UPDATE: [InvalidCantEmployeeByDept, validDateRange]
    }
  },
  fields: () => ({
    id: { type: GraphQLID },
    empId: { type: GraphQLNonNull(GraphQLString) },
    deptId: { type: GraphQLNonNull(GraphQLString) },
    from_date: { type: GraphQLNonNull(GraphQLDate) },
    to_date: { type: GraphQLNonNull(GraphQLDate) },
    employee: {
      type: EmployeeType,
      extensions: {
        relation: {
          embedded: false,
          connectionField: "EmployeeID"
        }
      },
      resolve(parent, args) {
        return Employee.findById(parent.EmployeeID);
      }
    },
    department: {
      type: DepartmentType,
      extensions: {
        relation: {
          embedded: false,
          connectionField: "DepartmentID"
        }
      },
      resolve(parent, args) {
        return Department.findById(parent.DepartmentID);
      }
    }
  })
});

gnx.connect(
  Dept_employeeModel,
  Dept_employeeType,
  "dept_employee",
  "dept_employees"
);

module.exports = Dept_employeeType;

const EmployeeType = require("./employee");
const DepartmentType = require("./department");
