var express = require('express');
var router = express.Router();
var User=require('../models/users');
var Post=require('../models/post');
var crypto = require('crypto');  


var encrypt = function(data) {  
    return crypto.createHash('md5').update(data).digest('hex').toUpperCase();  
}  //加密函数



/* GET home page. */
router.get('/', function(req, res, next) 
{
  Post.get(null,function(posts) {
  res.render('index', {
  title: '首页',
  posts: posts,
 });
 });  
});

router.get('/index', function(req, res, next) 
{
  Post.get(null,function(posts) {
  res.render('index', {
  title: '首页',
  posts: posts,
 });
 });  
});

//注册
router.get('/reg', function(req, res, next) {
  res.render('reg', { title: 'Register' });
});
router.post('/reg',function(req, res, next)
{     


	 if (req.body['password-repeat'] != req.body['password']) 
	  {  
	  	 req.flash('error', '两次输入的口令不一致'); 
       return res.redirect('/reg');
	  	
	  }
   
    var newUser = new User({
      name: req.body.username,
      password: req.body.password,
           }); 
    newUser.password=encrypt(newUser.password);
    User.get(newUser.name,function(user)
    {
        if(user)
        {
          req.flash('error', '用户已经存在');
          res.redirect('/reg'); 
        }
        else
        {
          newUser.save();
          req.session.user = newUser;
          req.flash('success', '注册成功');
          res.redirect('/');
        }

    });
});
//登录
router.get('/login', checkNotLogin); 
router.get('/login', function(req, res) {
 res.render('login', {
 title: '用户登入',
 });
}); 


router.post('/login', function(req, res) {
	 
   var newUser={name:req.body['username'],password:req.body['password']};  
   newUser.password=encrypt(newUser.password);
   console.log(newUser.password);
   
   User.get(newUser.name,function(user)
    {
        if(user&&user.password===newUser.password)
        {
          req.flash('success', newUser.name+',欢迎你！');
          req.session.user=newUser;
          res.redirect('/u/'+newUser.name); 
        }
        else
        {
          req.flash('error', '用户不存在或密码错误');
          res.redirect('/login');
        }

    });
}); 

//退出
router.get('/logout', checkLogin); 
router.get('/logout', function(req, res) {
   req.session.user=null;
   req.flash('success', '退出成功'); 
   res.redirect('/');

}); 

//发表微博

router.post('/post', checkLogin);
router.post('/post', function(req, res) 
{
 var currentUser = req.session.user;
 var post = new Post(currentUser.name, req.body.post);
 post.save();
 req.flash('success', '发表成功');
 setTimeout(function()
  {
    res.redirect('/u/' + currentUser.name);
  }
  ,500)
}); 

router.get('/u/:user', checkLogin);
router.get('/u/:user', function(req, res) {

 Post.get(req.params.user, function(posts) {
 res.render('user', {
 title: req.params.user,
 posts: posts,
 });
 });
 });



//判断是否已经登录和退出状态的中间件
function checkLogin(req, res, next) {
 if (!req.session.user) {
 req.flash('error', '未登入');
 return res.redirect('/login');
 }
 next();
}
function checkNotLogin(req, res, next) {
 if (req.session.user) {
 req.flash('error', '已登入');
 return res.redirect('/');
 }
 next();
} 

module.exports = router;
