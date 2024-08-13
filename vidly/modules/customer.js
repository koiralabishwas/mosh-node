const mongoose = require('mongoose')
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    maxlength: 11,
    minlength: 11,
    required: true,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

exports.Customer  = Customer