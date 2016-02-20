var post=require('./connect');//获取链接数据库中post表的sequelize对象


function Post(name,post,time)
{
   this.name=name;
   this.post=post;
   this.time=(new Date()).toUTCString();
};

module.exports=Post;


Post.prototype.save=function()
{
   post.create
   ({
    userName: this.name,
    post:this.post,
    time:this.time
    });
}

Post.get=function(name,callback)
{
     if(!name)
        {
          post.findAll().then(function (posts) {
               callback(posts);
             })
        }
      else
        {
          post.findAll(
          {
           'where': 
           {
             'userName': name
           }
           }).then(function (posts) {
               callback(posts);
             })
        }
}

Post.getAll=function(callback)
{
     post.findAll().then(function (posts) {
               callback(posts);
             })
}


