const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salaryFields = {
  EmployeeID: Schema.Types.ObjectId,
  salary: Float,
  from_date: String,
  to_date: String
};

const salarySchema = new Schema(salaryFields);

const Salary = mongoose.model("Salary", salarySchema);
if (!Salary.collection.collection) {
  Salary.createCollection();
}
module.exports = { Salary, salaryFields };
