const router = require('express').Router(); 
const verify = require('./verification');

router.get('/', verify, (req, res) => {
    res.json({ user: 'test user route'});
});


module.exports = router;