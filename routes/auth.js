
const authControllers = require("../controllers/authControllers");
const router = require("express"). Router();

// register
router.post("/register",authControllers.registerUser);

// login
router.post("/login", authControllers.loginUser);

module.exports = router;