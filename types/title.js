const graphql = require("graphql");
const gnx = require("@simtlix/gnx");

const Employee = require("../models/employee").Employee;
const TitleModel = require("../models/title").Title;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt
} = graphql;

const TitleType = new GraphQLObjectType({
  name: "TitleType",
  description: "Represent titles",
  fields: () => ({
    id: { type: GraphQLID },
    empId: { type: GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLNonNull(GraphQLString) },
    from_date: { type: GraphQLNonNull(GraphQLString) },
    to_date: { type: GraphQLNonNull(GraphQLString) },
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
