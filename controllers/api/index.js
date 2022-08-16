const router = require("express").Router();
const user_router = require("./user_routes");
const comment_router = require("./comment_routes");
const post_router = require("./post_routes");

router.use("/user", user_router);
router.use("/comment", comment_router);
router.use("/post", post_router);

module.exports = router;
