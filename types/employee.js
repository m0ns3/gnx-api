const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const EmployeeModel = require("../models/employee").Employee;

const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLObjectType,
  GraphQLEnumType
} = graphql;

const EmployeeType = new GraphQLObjectType({
  name: "EmployeeType",
  description: "Represent employees",
  fields: () => ({
    id: { type: GraphQLID },
    dni: { type: GraphQLNonNull(GraphQLInt) },
    birth_date: { type: GraphQLNonNull(GraphQLString) },
    first_name: { type: GraphQLNonNull(GraphQLString) },
    last_name: { type: GraphQLNonNull(GraphQLString) },
    gender: { type: GraphQLNonNull(GraphQLEnumType) },
    hire_date: { type: GraphQLNonNull(GraphQLString) },
    salary: {
      type: SalaryType,
      extensions: {
        relation: {
          embedded: false,
          connectionField: "SalaryID"
        }
      },
      resolve(parent, args) {
        return Salary.findById(parent.SalaryID);
      }
    },
    titles: {
      type: new GraphQLList(TitleType),
      extensions: {
        relation: {
          embedded: false,
          connectionField: "TitleID"
        }
      },
      resolve(parent, args) {
        return Title.findById(parent.TitleID);
      }
    },
    dept_manager: {
      type: Dept_managerType,
      extensions: {
        relation: {
          embedded: false,
          connectionField: "Dept_managerID"
        }
      },
      resolve(parent, args) {
        return Dept_manager.findById(parent.Dept_managerID);
      }
    },
    dept_employee: {
      type: Dept_employeeType,
      extensions: {
        relation: {
          embedded: false,
          connectionField: "Dept_employeeID"
        }
      },
      resolve(parent, args) {
        return Dept_employee.findById(parent.Dept_employeeID);
      }
    }
  })
});

gnx.connect(EmployeeModel, EmployeeType, "employee", "employees");

module.exports = EmployeeType;

const SalaryType = require("./salary");
const TitleType = require("./title");
const Dept_managerType = require("./dept_manager");
const Dept_employeeType = require("./dept_manager");
