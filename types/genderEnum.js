const graphql = require("graphql");

const { GraphQLEnumType } = graphql;

const genderEnumType = new GraphQLEnumType({
  name: "GenderEnum",
  values: {
    FEMALE: {
      value: "Woman"
    },
    MALE: {
      value: "Man"
    },
    OTHER: {
      value: "Other"
    }
  }
});

module.exports = genderEnumType;
