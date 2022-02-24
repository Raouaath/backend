// 1- require mongoose
const mongoose = require("mongoose");
// 2- require Schema
const { Schema } = mongoose;
// 3- Create contactSchema
const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: Number,
});
module.exports = Contact = mongoose.model("contact", contactSchema);
