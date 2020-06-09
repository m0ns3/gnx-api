const graphql = require("graphql");
const gnx = require("@simtlix/gnx");

const Employee = require("../models/employee").Employee;
const SalaryModel = require("../models/salary").Salary;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLFloat
} = graphql;

const SalaryType = new GraphQLObjectType({
  name: "SalaryType",
  description: "Represent salaries",
  fields: () => ({
    id: { type: GraphQLID },
    empId: { type: GraphQLNonNull(GraphQLInt) },
    salary: { type: GraphQLNonNull(GraphQLFloat) },
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
    }
  })
});

gnx.connect(SalaryModel, SalaryType, "salary", "salaries");

module.exports = SalaryType;

const EmployeeType = require("./employee");
