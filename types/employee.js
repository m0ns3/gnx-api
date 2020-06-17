const graphql = require("graphql");
const graphqlIsoDate = require("graphql-iso-date");
const gnx = require("@simtlix/gnx");
const EmployeeModel = require("../models/employee").Employee;
const Salary = require("../models/salary").Salary;
const Title = require("../models/title").Title;
const Dept_manager = require("../models/dept_manager").Dept_manager;
const Dept_employee = require("../models/dept_employee").Dept_employee;
/* 
const {
  AuditableObjectFields
} = require("./extended_types/auditableGraphQLObjectType"); */

const {
  CantRepeatDni,
  CantAgeLess18,
  CantDeleteEmployeeRelated
} = require("../validators/employee.validator");

const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList
} = graphql;

const { GraphQLDate } = graphqlIsoDate;

const EmployeeType = new GraphQLObjectType({
  name: "EmployeeType",
  description: "Represent employees",
  extensions: {
    validations: {
      CREATE: [CantRepeatDni, CantAgeLess18],
      UPDATE: [CantRepeatDni, CantAgeLess18],
      DELETE: [CantDeleteEmployeeRelated]
    }
  },
  fields: () =>
    //Object.assign(AuditableObjectFields,
    ({
      id: { type: GraphQLID },
      dni: { type: GraphQLNonNull(GraphQLInt) },
      birth_date: { type: GraphQLNonNull(GraphQLDate) },
      first_name: { type: GraphQLNonNull(GraphQLString) },
      last_name: { type: GraphQLNonNull(GraphQLString) },
      gender: { type: GraphQLNonNull(GenderEnumType) },
      hire_date: { type: GraphQLNonNull(GraphQLDate) },
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
const GenderEnumType = require("./enums/genderEnum");
