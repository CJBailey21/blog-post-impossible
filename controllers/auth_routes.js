const auth_router = require("express").Router();
const User = require("../models/User");
const { isLoggedIn } = require("./helpers");

auth_router.post("/register", isLoggedIn, (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    req.session.errors = ["read error message and try again."];
    return res.redirect("/register");
  }

  User.create(req.body)
    .then((new_user) => {
      req.session.save(() => {
        req.session.user_id = new_user.id;
        res.redirect("/index");
      });
    })
    .catch((err) => {
      req.session.errors = err.errors.map((e) => e.message);
      res.redirect("/register");
    });
});

auth_router.post("/login", isLoggedIn, async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    req.session.errors = [
      "That Username/Password is incorrect, please try again.",
    ];
    return res.redirect("/login");
  }

  const user = await User.findOne({
    where: {
      username,
    },
  });

  if (!user) {
    req.session.errors = ["User with that username could not be found."];
    return res.redirect("/login");
  }
  const pass_is_valid = await user.validatePassword(password, user.password);
  if (!pass_is_valid) {
    req.session.errors = ["Your password is incorrect"];
    res.redirect("/login");
  }
  req.session.save(() => {
    req.session.user_id = user.id;
    res.redirect("/index");
  });
});

auth_router.get("/logout", (req, res) => {
  if (!req.session.user_id) return res.redirect("/");
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = auth_router;
