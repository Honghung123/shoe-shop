const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.c");
const passport = require("passport");
const authorize = require("../middleware/authorize");

// router.get("/", authorize("customer"), authController.renderHomepage);
router
  .route("/register")
  .get(authController.renderRegister)
  .post(authController.register); 
router
  .route("/login/validate-email")
  .post(authController.checkEmailIsExist);
  router
  .route("/login/validate-username")
  .post(authController.checkUsernameIsExist);
router
  .route("/login/validate-account")
  .post(authController.checkAccountStatus);
router
  .route("/login/has-login")
  .post(authController.checkWhetherUserLogin);
router
  .route("/login")
  .get(authController.renderLogin)
  .post(
    // passport.authenticate("local", { failureRedirect: "/register" }),
    (req, res, next) => {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          return res.status(500).json({ error: "Internal Server Error" });
        }

        console.log('ìno', err, user, info);
        if (!user) {
          return res.status(401).json({ error: info });
        }
        req.logIn(user, (err) => {
          if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
          }

          if (user.role == "admin") {
            return res.redirect("/admin");
          } else {
            return res.redirect("/");
          }
        });
      })(req, res, next);
    },
    (req, res) => {
      if (req.user.role == "admin") {
        res.redirect("/admin");
      } else {
        res.redirect("/");
      }
    }
  );
router.get(
  "/google/login",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    state: "login",
  }),
  (req, res) => { }
);

router.get(
  "/google/register",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    state: "register",
  })
);

router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", {}, (err, user, info) => {
    const msg = info?.message;
    if (msg === "Logged in") {
      req.logIn(user, (error) => {
        console.log(error);
      });
      req.session.save(() => res.redirect("/"));
    } else if (msg === "Account already registered") {
      res.locals.message = msg;
      res.render("register");
    } else if (msg === "Account did not exist") {
      res.locals.message = msg;
      res.render("login");
    } else {
      res.locals.message = msg;
      res.redirect("/login");
    }
  })(req, res, next);
});

router.route("/logout").get((req, res) => {
  req.logout(err => {
    console.log(err);
  });
  res.redirect('/');
});

module.exports = router;
