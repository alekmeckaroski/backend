var express = require('express');
var router = express.Router();
var axios = require('axios');
var fs = require('fs');

router.get('/data', async (req, res, next) =>  {

    try {
        const response = await axios('https://6u3td6zfza.execute-api.us-east-2.amazonaws.com/prod/user/transactions');
        res.json(response.data);

    } catch (ex) {
        res.status(500).json({error: "Something wrong with external data"});
    }

});

router.get('/cancel', async (req, res, next) => {
    fs.readFile('./logs/cancelData.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({message: "Error writing file!"});
        } else {
            var obj = JSON.parse(data);
            console.log(obj);

            obj['cancels'].push({time: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')});

            fs.writeFile('./logs/cancelData.json', JSON.stringify(obj), 'utf-8', (err, done) => {
                if (err) {
                    res.status(500).json({message: "Error writing file"});
                } else {
                    res.json({message: "Success"});
                }
            })
        }
    });
})

module.exports = router;
