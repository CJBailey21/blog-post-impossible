const router = require('express').Router();
const apiRoutes = require('./api');
const home_routes = require('./home_routes.js');
const dash_routes = require('./dash_routes.js');
const auth_routes = require('./auth_routes.js')
router.use('/api', apiRoutes);
router.use('/', home_routes);
router.use('/dashboard', dash_routes);
router.use('/auth', auth_routes)
router.use((req, res) => {
    res.status(404).end();
});
module.exports = router;