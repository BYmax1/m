var user=require('./connect');//获取链接数据库中user表的sequelize对象


function User(user)
{
   this.name=user.name;
   this.password=user.password;
};

module.exports=User;


User.prototype.save=function()
{
   user.create
   ({
    userName: this.name,
    password:this.password,
    });
}

User.get=function(name,callback)
{
     user.findOne(
          {
           'where': 
           {
             'userName': name
           }
           }).then(function (user) {
               callback(user);
               console.log("user所在函数执行了");
             })
}


