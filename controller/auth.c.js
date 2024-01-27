const { userRepo } = require("../config/db.config");
const asyncWrapper = require("../middleware/async-wrapper");
const hashPwd = require("../utils/hashPassword");

const register = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json("Email and password must not be empty");
  }
  const user = await userRepo.findOneBy({ email: email });
  if (user) {
    res.json(400).json({ message: "Email already in use" });
  }
  const hashedPwd = await hashPwd(password);
  await userRepo.save({ ...req.body, password: hashedPwd, role: "customer" });
  res.status(201).json({ message: "Register successfully" });
});

const validateRegisterField = async (req, res) => {
  const { username, email } = req.body;
  console.log(req.body);
  if (username) {
    const user = await userRepo.findOne({ where: { username } });
    if (user) {
      res.status(400).json({messageUsername: "Username already exists"});
    }
  }
  if (email) {
    const user = await userRepo.findOne({ where: { email } });
    if (user) {
      res.status(400).json({ messageEmail: "Email already in use" });
    }
  }
  res.json("");
  // if (password) {
  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  //   if (password.length < 8) {
  //     res.status(400).json("Password length must be at least 8 character");
  //   }
  //   if (!passwordRegex.test(password)) {
  //     res
  //       .status(400)
  //       .json(
  //         "Password must contain at least 1 lowercase, 1 uppercase, 1 number"
  //       );
  //   }
  // }
  // res.json("");
};

const renderRegister = (req, res) => {
  res.render("register");
};
const renderLogin = (req, res) => {
  res.render("login");
};
module.exports = {
  renderLogin,
  renderRegister,
  register,
  validateRegisterField,
};
