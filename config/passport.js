var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// db
var models = require('../models');

passport.use('local.login', new LocalStrategy(function(username, password, done) {

    models.User.find({where:{username: username}}).then(function(user) {
        if (!user) {
            return done(null, false, { message: '用户名不存在!' });
        }
        user.verifyPassword(password, function(err, value, user){
            if (!value){
                return done(null, false, { message: '密码不匹配!' });
            }else{
                return done(null, user);
            }
        });
    });
}));

passport.use('local.register', new LocalStrategy(function(username, password, done) {

    models.User.find({where:{username: username}}).then(function(user) {
        if (user) {
            return done(null, false, { message: '此用户已经被注册!' });
        }

        models.User.build({username: username}).setPassword(password).save()
        .then(function(user) {
            return done(null, user);
        });

    });
}));

//保存user对象
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

//删除user对象
passport.deserializeUser(function (id, done) {
    models.User.find({where: {id: id}}).then(function(user) {
        done(null, user);
    });
});
