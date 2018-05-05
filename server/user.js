const express = require('express')
const utils = require('utility')
const Router = express.Router()
const models = require('./model')
const User = models.getModel('user')
const _filter = {'pwd': 0, '__v': 0}

Router.get('/list', function (req, res) {
    //User.remove({},function (e,d) {})
    User.find({}, function (err, doc) {
        return res.json(doc)
    })

})
Router.post('/login', function (req, res) {
    const {user, pwd} = req.body
    User.findOne({user, pwd: md5PWD(pwd)}, {'pwd': 0}, function (err, doc) {
        if (!doc) {
            return res.json({code: 1, msg: 'User not exsiting or wrong password'})
        }
        res.cookie('userid', doc._id)
        return res.json({code: 0, data: doc})

    })
})

Router.post('/update', function (req, res) {
    console.log(req.body);
    const userid = req.cookies.userid
    if (!userid) {
        return json.dumps({code: 1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid, body, function (err, doc) {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({code: 0, data})
    })
})
Router.post('/register', function (req, res) {
    const {user, pwd, type} = req.body
    User.findOne({user: user}, function (err, doc) {
        if (doc) {
            return res.json({code: 1, msg: 'User exsiting'})
        }
        User.create({user, pwd: md5PWD(pwd), type}, function (e, d) {
            if (e) {
                return res.json({code: 1, msg: 'Server wrong'})
            }
            return res.json({code: 0})
        })
    })
})


Router.get('/info', function (req, res) {
    const {userid} = req.cookies
    if (!userid) {
        return res.json({code: 1})
    }
    User.findOne({_id: userid}, _filter, function (err, doc) {
        if (err) {
            return res.json({code: 1, msg: 'server wrong'})
        }
        if (doc) {
            return res.json({code: 0, data: doc},)
        }
    })
    //用户有没有cookie
})

function md5PWD(pwd) {
    const salt = 'date_is_good_39859019300xdassaj!'
    return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router