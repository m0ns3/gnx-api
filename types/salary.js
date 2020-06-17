const graphql = require("graphql");
const graphqlIsoDate = require("graphql-iso-date");
const gnx = require("@simtlix/gnx");

const Employee = require("../models/employee").Employee;
const SalaryModel = require("../models/salary").Salary;

/* const {
  AuditableObjectFields
} = require("./extended_types/auditableGraphQLObjectType"); */

const { validDateRange } = require("../validators/date.validator");
const { CantDeleteSalaryRelated } = require("../validators/salary.validator");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLInt,
  GraphQLString
} = graphql;

const { GraphQLDate } = graphqlIsoDate;

const SalaryType = new GraphQLObjectType({
  name: "SalaryType",
  description: "Represent salaries",
  extensions: {
    validations: {
      CREATE: [validDateRange],
      UPDATE: [validDateRange],
      DELETE: [CantDeleteSalaryRelated]
    }
  },
  fields: () =>
    //Object.assign(AuditableObjectFields,
    ({
      id: { type: GraphQLID },
      empId: { type: GraphQLNonNull(GraphQLString) },
      salary: { type: GraphQLNonNull(GraphQLFloat) },
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
      }
    })
});

gnx.connect(SalaryModel, SalaryType, "salary", "salaries");

module.exports = SalaryType;

const EmployeeType = require("./employee");
