import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  age: {
    type: String,
  },
  congenitalDisease: {
    type: String,
  },
  drugAllergy: {
    type: String,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
