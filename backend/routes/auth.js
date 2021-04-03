const router = require('express').Router(); 

router.post('/register', (req, res) => {
    res.send('register route test');
})

//router.post('/login')

module.exports = router;