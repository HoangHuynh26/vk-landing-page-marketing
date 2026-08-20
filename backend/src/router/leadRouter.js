const express = require("express");
const { createLead } = require("../controllers/leadController");

const router = express.Router();
router.post("/leads", createLead);

module.exports = router;
