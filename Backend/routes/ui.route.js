const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../UI/view/main.html");

router.get("/main", (req, res) => {
    res.sendFile(filePath);
});

module.exports = router;