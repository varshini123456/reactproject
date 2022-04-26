const jwt = require('jsonwebtoken');
const { Router } = require('express');
const Seller = require('../models/Seller');
const bcrypt=require('bcrypt')
require("dotenv").config();

const router = Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    res.status(400).json({ message: "All inputs are required" });
  }
  try {
    console.log(req.body)
    const user1 = await Seller.findOne({ email: email });
    console.log(user1)
    if (user1 && (await bcrypt.compare(password,user1.password))) {
      console.log("hiiii")  
      const token = jwt.sign(
        {id: user1._id},
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      return res.status(200).json({ user1, token });
    }
    res.status(400).json({ message: "Invalid Credentials" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

