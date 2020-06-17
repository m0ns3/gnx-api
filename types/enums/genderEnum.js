const graphql = require("graphql");

const { GraphQLEnumType } = graphql;

const genderEnumType = new GraphQLEnumType({
  name: "GenderEnumType",
  values: {
    F: {
      value: "Femenine"
    },
    M: {
      value: "Masculine"
    },
    OTHER: {
      value: "Other"
    }
  }
});

module.exports = genderEnumType;
