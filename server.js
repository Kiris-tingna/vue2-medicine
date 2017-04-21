var express = require('express'),
    path = require('path'),
    xAdmin = require('express-admin'),
    multer = require('multer'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    flash = require('connect-flash'),
    passport = require('passport');
    
// passport
require('./config/passport.js');

var config = {
    dpath: './config/',
    config: require('./config/config.json'),
    settings: require('./config/settings.json'),
    custom: require('./config/custom.json'),
    users: require('./config/users.json')
    // additionally you can pass your own session middleware to use
    // session: session({...})
};

/**
 *  multer 中间件设置
 */
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    }, 
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});

var upload = multer({ storage: storage });


xAdmin.init(config, function (err, admin) {
    var routes = require('./routes');

    if (err) return console.log(err);

    // web site
    var app = express();
    // views
    app.set('view engine', 'html');
    app.engine('html', require('hbs').__express);
    app.set('views', 'views');

    // mount express-admin before any other middlewares
    app.use('/admin', admin);

    /**
     *  ---------------- site specific middlewares ----------------
     */
    app.use(bodyParser.json());   // parse application/json                     
    app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded 
    app.use(upload.any()); // parse multipart/form-data
    app.use(express.static('public'));

    app.use(cookieParser("kiristingna"));
    // resave 是指每次请求都重新设置session cookie
    // saveUninitialized 是指无论有没有session cookie，每次请求都设置个session cookie 默认给个标示为 connect.sid
    // @impotrant: 注意 页面重定向两次可能与这里的设置有关 !!!
    app.use(session({secret: 'kiristingna', resave: false, saveUninitialized: false, cookie: { maxAge: 24*60*1000 }}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash())

    app.use(function (req, res, next) {
        var error = req.flash('error');
        res.locals.error = error.length ? error : null;
        
        res.locals.user = req.user || {};
        res.locals.isAuthenticated = req.isAuthenticated();

        // if(!req.session.time){
        //     req.session.time = 1
        // }else{
        //     req.session.time = req.session.time+1;
        //     res.locals.time = req.session.time;
        // }
        next();
    });

    routes(app);

    // site server
    app.listen(3000, function () {
        console.log('My awesome site listening on port 3000');
    });
});