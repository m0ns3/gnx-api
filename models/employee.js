const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeFields = {
  dni: Number,
  birth_date: String,
  first_name: String,
  last_name: String,
  gender: String,
  hire_date: String,
  SalaryID: Schema.Types.ObjectId,
  TitleID: Schema.Types.ObjectId,
  Dept_managerID: Schema.Types.ObjectId,
  Dept_employeeID: Schema.Types.ObjectId
};

const employeeSchema = new Schema(employeeFields);

const Employee = mongoose.model("Employee", employeeSchema);
if (!Employee.collection.collection) {
  Employee.createCollection();
}
module.exports = { employeeFields, Employee };
