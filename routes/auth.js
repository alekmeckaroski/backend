var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const {USERS} = require("../data");

router.post('/login', (req, res) => {
    const body = req.body;

    const user = USERS.find(user => user.username === body.username);
    if(!user || body.password !== 'test1pass') return res.sendStatus(401);

    var token = jwt.sign({user: user}, 'sayollo', {expiresIn: '2h'});
    res.send({token});
})

module.exports = router;
