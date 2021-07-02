const router = require('express').Router();
const userRoutes = require('./userRoutes');
const entryRoutes = require('./entryRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/entries', entryRoutes);
router.use('/comments', commentRoutes);

module.exports = router;