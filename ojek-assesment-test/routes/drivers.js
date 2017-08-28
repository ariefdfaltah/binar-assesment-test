var express = require('express');
var router = express.Router();

var driversDB = require('../db/drivers');

/* GET users listing. */
router.get('/', function(req, res) {
    driversDB.find()
        .exec(getall);
    function getall(err,dr) {
        if(err) {
            res.json({
                Msg : 'Error DB',
                Code : 500
            })
        }
        res.json({
            Msg : 'Success',
            Code : 200,
            Data : dr
        })
    }
});
router.post('/getone', function(req, res) {
    driversDB.findOne({
        nama: req.body.nama
    })
        .exec(getall);
    function getall(err,dr) {
        if(err) {
            res.json({
                Msg : 'Error DB',
                Code : 500
            })
        }
        res.json({
            Msg : 'Success',
            Code : 200,
            Data : dr
        })
    }
});
router.post('/add', function(req, res) {
    var driversDBModel = new driversDB();
    driversDBModel.nama = req.body.nama;
    driversDBModel.no_plat = req.body.no_plat;
    driversDBModel.gender = req.body.gender;
    driversDBModel.save(add);
    function add(err) {
        if(err) {
            res.json({
                Msg : 'Error DB',
                Code : 500
            })
        }
        res.json({
            Msg : 'Success',
            Code : 200
        })
    }
});
router.post('/update', function(req, res) {
    driversDB.findOneAndUpdate({
        _id: req.body._id
    },{
        nama : req.body.nama,
        no_plat : req.body.no_plat,
        gender : req.body.gender
    })
        .exec(update);
    function update(err) {
        if(err) {
            res.json({
                Msg : 'Error DB',
                Code : 500
            })
        }
        res.json({
            Msg : 'Success',
            Code : 200
        })
    }
});
router.post('/delete', function(req, res) {
    driversDB.findByIdAndRemove({
        _id: req.body._id
    })
        .exec(remove);
    function remove(err) {
        if(err) {
            res.json({
                Msg : 'Error DB',
                Code : 500
            })
        }
        res.json({
            Msg : 'Success',
            Code : 200
        })
    }
});

module.exports = router;
