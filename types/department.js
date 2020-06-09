const graphql = require("graphql");
const gnx = require("@simtlix/gnx");

const DepartmentModel = require("../models/department").Department;

const { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLObjectType } = graphql;

const DepartmentType = new GraphQLObjectType({
  name: "DepartmentType",
  description: "Represent departments",
  fields: () => ({
    id: { type: GraphQLID },
    dept_name: { type: GraphQLNonNull(GraphQLString) }
  })
});

gnx.connect(DepartmentModel, DepartmentType, "department", "departments");

module.exports = DepartmentType;
