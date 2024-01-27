const { userRepo } = require("../config/db.config");
const asyncWrapper = require("../middleware/async-wrapper");
const {hashPwd, comparePwd} = require("../utils/hashPassword");

const renderHomepage = (req, res) => {
  res.render("client/home");
};
const register = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.json("Email and password must not be empty");
  }
  const user = await userRepo.findOneBy({ email: email });
  if (user) {
    res.json({ message: "Email already in use" });
  }
  const hashedPwd = await hashPwd(password);
  await userRepo.save({ ...req.body, password: hashedPwd, role: "customer" });
  res.redirect("/");
});

const checkUsernameIsExist = async (req, res) => {  
  if (req.body.username) {
    const user = await userRepo.findOne({ where: { username: req.body.username } });
    if (user) {
      res.json({user: user});
    }
    else {
      res.json({ user: null });
    }
  } else {
    res.json({ user: null });
  }
};
const checkEmailIsExist = async (req, res) => {  
  if (req.body.email) {
    const user = await userRepo.findOne({ where: { email: req.body.email } });
    if (user) {
      res.json({user: user});
    }
    else {
      res.json({ user: null });
    }
  } else {
    res.json({ user: null });
  }
};

const checkAccountStatus = async (req, res) => { 
  if (req.body.email && req.body.password) {
    const user = await userRepo.findOneBy({email: req.body.email});
    if (user) {
      const hashedPwd = user.password;
      if (await comparePwd(req.body.password, hashedPwd)) {
        if (!user.locked && !user.deleted) {
          res.json({ status: true, message: "Account status is normal"});
        } else {
          res.json({ status: false, message: "This account has been banned or deleted"});
        }
      }
      else {
        res.json({ status: null, message: "Password is not matched" });
      }
    } else {
      res.json({ status: null, message: "Account does not exist" });
    }
  } else {
    res.json({ status: null, message: "Data is invalid" });
  }
};

const renderRegister = (req, res) => {
  res.render("register");
};

const renderLogin = (req, res) => {
  res.render("login");
};

const checkWhetherUserLogin = (req, res) => {
  res.json({hasLogin: false});
};
module.exports = {
  renderLogin,
  renderRegister,
  register,
  renderHomepage,
  checkEmailIsExist,
  checkUsernameIsExist,
  checkAccountStatus,
  checkWhetherUserLogin,
};
