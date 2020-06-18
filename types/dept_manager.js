const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const graphqlIsoDate = require("graphql-iso-date");

const Employee = require("../models/employee").Employee;
const Department = require("../models/department").Department;
const Dept_managerModel = require("../models/dept_manager").Dept_manager;

const { validDateRange } = require("../validators/date.validator");
const {
  InvalidCantManagerByDept
} = require("../validators/dept_manager.validator");

const { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLObjectType } = graphql;

const { GraphQLDate } = graphqlIsoDate;

const Dept_managerType = new GraphQLObjectType({
  name: "Dept_managerType",
  description: "Represent department managers",
  extensions: {
    validations: {
      CREATE: [InvalidCantManagerByDept, validDateRange],
      UPDATE: [InvalidCantManagerByDept, validDateRange]
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
  Dept_managerModel,
  Dept_managerType,
  "dept_manager",
  "dept_managers"
);

module.exports = Dept_managerType;

const EmployeeType = require("./employee");
const DepartmentType = require("./department");
