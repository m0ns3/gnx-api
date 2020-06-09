const graphql = require("graphql");
const gnx = require("@simtlix/gnx");

const Employee = require("../models/employee").Employee;
const Dept_employeeModel = require("../models/dept_employee").Dept_employee;

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = graphql;

const Dept_employeeType = new GraphQLObjectType({
  name: "Dept_employeeType",
  description: "Represent Department employees",
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
  Dept_employeeModel,
  Dept_employeeType,
  "dept_employee",
  "dept_employees"
);

module.exports = ept_employeeType;

const EmployeeType = require("./employee");
const DepartmentType = require("./department");
