const graphql = require("graphql");
const gnx = require("@simtlix/gnx");

const Employee = require("../models/employee").Employee;
const Department = require("../models/department").Department;
const Dept_managerModel = require("../models/dept_manager").Dept_manager;

const { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLObjectType } = graphql;

const Dept_managerType = new GraphQLObjectType({
  name: "Dept_managerType",
  description: "Represent department managers",
  fields: () => ({
    id: { type: GraphQLID },
    empId: { type: GraphQLNonNull(GraphQLInt) },
    deptId: { type: GraphQLNonNull(GraphQLInt) },
    from_date: { type: GraphQLNonNull(GraphQLString) },
    to_date: { type: GraphQLNonNull(GraphQLString) },
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
