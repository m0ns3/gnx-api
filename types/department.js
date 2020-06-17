const graphql = require("graphql");
const gnx = require("@simtlix/gnx");

const DepartmentModel = require("../models/department").Department;
/* 
const {
  AuditableObjectFields
} = require("./extended_types/auditableGraphQLObjectType"); */

const { CantRepeatDeptName } = require("../validators/department.validator");

const { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLObjectType } = graphql;

const DepartmentType = new GraphQLObjectType({
  name: "DepartmentType",
  description: "Represent departments",
  extensions: {
    validations: {
      CREATE: [CantRepeatDeptName],
      UPDATE: [CantRepeatDeptName]
    }
  },
  fields: () =>
    //Object.assign(AuditableObjectFields,
    ({
      id: { type: GraphQLID },
      dept_name: { type: GraphQLNonNull(GraphQLString) }
    })
});

gnx.connect(DepartmentModel, DepartmentType, "department", "departments");

module.exports = DepartmentType;
