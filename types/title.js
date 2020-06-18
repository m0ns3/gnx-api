const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const graphqlIsoDate = require("graphql-iso-date");

const Employee = require("../models/employee").Employee;
const TitleModel = require("../models/title").Title;

const { validDateRange } = require("../validators/date.validator");
const {
  CantHaveTwoTitlesByEmployeeWithSameDept,
  CantDeleteTitleRelated
} = require("../validators/title.validator");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = graphql;

const { GraphQLDate } = graphqlIsoDate;

const TitleType = new GraphQLObjectType({
  name: "TitleType",
  description: "Represent titles",
  extensions: {
    validations: {
      CREATE: [CantHaveTwoTitlesByEmployeeWithSameDept, validDateRange],
      UPDATE: [CantHaveTwoTitlesByEmployeeWithSameDept, validDateRange],
      DELETE: [CantDeleteTitleRelated]
    }
  },
  fields: () =>
    //Object.assign(AuditableObjectFields,
    ({
      id: { type: GraphQLID },
      empId: { type: GraphQLNonNull(GraphQLString) },
      title: { type: GraphQLNonNull(GraphQLString) },
      from_date: { type: GraphQLNonNull(GraphQLDate) },
      to_date: { type: GraphQLNonNull(GraphQLDate) },
      employee: {
        type: EmployeeType,
        extensions: {
          embedded: false,
          relation: {
            connectionField: "EmployeeID"
          }
        },
        resolve(parent, args) {
          return Employee.findById(parent.EmployeeID);
        }
      }
    })
});

gnx.connect(TitleModel, TitleType, "title", "titles");

module.exports = TitleType;

const EmployeeType = require("./employee");
