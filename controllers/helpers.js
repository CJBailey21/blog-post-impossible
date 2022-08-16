exports.isLoggedIn = function (req, res, next) {
  const user_id = req.session.user_id;
  const is_auth_route = req.path.match(/register|login/gi);

  if (is_auth_route && user_id) {
    return res.redirect("/index");
  }

  next();
};

exports.isLoggedOut = function (req, res, next) {
  const user_id = req.session.user_id;
  const is_main_page = req.path.match(/dash|edit|post/gi);

  if (is_main_page && !user_id) {
    return res.redirect("/login");
  }

  next();
};
