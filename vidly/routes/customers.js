const {Customer} = require('../modules/customer')
const express = require("express");
const router = express.Router();




// get
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name ");
  res.send(customers);
});
// post
router.post("/", async (req, res) => {
  const body = await req.body;
  const customer = await Customer(body);
  const result = await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
    { new: true }
  );
  res.send(customer);
});

router.delete("/:id" , async (req , res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id , {new : true})
  res.send(customer)
})

module.exports = router;
