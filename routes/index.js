var express = require('express');
var router = express.Router();
var models = require('../models');
var passport = require('passport');

module.exports = function (app) {

    var auth =  function (req,res,next) { 
        if (req.isAuthenticated()) return next(); 
        res.redirect('/login');
    }

    /* ---------------- 前台 ---------------*/
    app.get('/', function (req, res) {
        res.render('index', {title: '首页'});
    });
    
    app.get('/about', auth, function (req, res) {
        res.render('about', {title: '关于'});
    });

    /* ---------------- 后台 ---------------*/
    app.get('/system', auth, function (req, res) {
        res.render('system', {title: '后台首页'});
    });

    /* ---------------- 登录授权 ---------------*/
    app.get('/login', function(req, res) {
        res.render('login', { title: 'Login'});
    });

    app.post('/login', passport.authenticate('local.login', { successRedirect: '/system', failureRedirect: '/login', failureFlash:true }));

    app.get('/register', function(req, res, next) {
        res.render('register', { title: '注册'});
    });

    app.post('/register', passport.authenticate('local.register', { successRedirect: '/system', failureRedirect: '/register', failureFlash:true }));

    app.get('/logout', function(req, res){
        req.logOut();
        req.session.destroy(function (err) {
            res.redirect('/login');
        });
    });

    // --------------------------- Todo: api接口 -------------------------
    app.get('/db', function () {
        models.sequelize.sync();
        
        return res.send(ok);
    });

    app.get('/search', function (req, res) {
        res.json({'a':'a'});
    });

    app.all('/api/*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method == 'OPTIONS') {
            // 让options请求快速返回
            res.sendStatus(200);
        }
        else {
            next();
        }
    });

    // app.get('/api/patient', function (req, res) {

    // });
    // app.get('/api/patient/:id', function (req, res) {
    //     res.json(patient[req.params.id]);
    // });
    // app.get('/api/patient/1/anamnesis', function (req, res) {

    // });

    app.get('/api/anamnesis', function (req, res) {
        // 第几页
        var page = req.query.page;
        // 每页数量
        var limit = req.query.limit;
        // ...query

        // 总数
        var total = 400;
        var data = models.Anamnesis.findAll({limit: 10}).then(function (anamnesis) {
            res.json({code: 600, data: anamnesis, message: 'success'});
        }, function (err) {
            res.json({code: 602, data: err, message:'error'});
        });
    });

    app.post('/api/anamnesis', function (req, res) {
        // 存储数据
        _obj = {};
        var recipes = '';
        var t1 = new Date(req.body.utime).toLocaleDateString();
        var t2 = new Date(req.body.utime2).toLocaleTimeString();

        _obj.when = t1 + ' ' +t2;
        _obj.uname = req.body.uname;
        _obj.cc = req.body.cc;
        _obj.age = req.body.age;
        _obj.sex = req.body.sex;
        _obj.diagnosis = req.body.diagnosis;
        
        req.body.recipes.map(function (item) {
            recipes += item.value;
            recipes += '\n';
        });
        _obj.recipes = recipes;
        _obj.satisfaction = req.body.satisfaction;
        _obj.utype = req.body.utype;
        // _obj.anumber = models.Sequelize.Utils.generateUUID();
        
        models.Anamnesis.create(_obj).then(function(anamnesis) {
            res.json({code:600, data: anamnesis, message:'success'});
        }, function (err) {
            res.json({code:602, data: err, message:'error'});
        })

    });

}