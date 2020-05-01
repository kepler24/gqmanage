const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

function _connect(cb){
    mongoClient.connect("mongodb://127.0.0.1:27017",{useNewUrlParser:true,useUnifiedTopology:true},function(err,client){
        if(err){
            console.log("数据库连接失败");
        }else{
            console.log("数据库连接成功");
            const db = client.db("gao");
            cb(db);
        }
    })
}
//删除一条
module.exports.deleteOne = function(collName,inserObj,cb){
    _connect(function(db){
        db.collection(collName).deleteOne(inserObj,cb);
    })
}
//插入一条
module.exports.insertOne = function(collName,inserObj,cb){
    _connect(function(db){
        db.collection(collName).insertOne(inserObj,cb);
    })
}
//编辑一条
module.exports.updateOne = function(collName,inserId,inserObj,cb){
    _connect(function(db){
        db.collection(collName).updateOne(inserId,{$set : inserObj},cb);
    })
}
//插入多条
module.exports.insertMany = function(collName,inserObj,cb){

    _connect(function(db){
        db.collection(collName).insertMany(inserObj,cb);
    })
}
//查找一个
module.exports.findOne = function(collName,inserObj,cb){
    console.log(inserObj)
    _connect(function(db){
        db.collection(collName).findOne(inserObj,cb);
    })
}
//查找多个
module.exports.findMany = function(collName,inserObj,cb){
    _connect(function(db){
        db.collection(collName).find(inserObj.find).project(inserObj.project).sort({date:-1}).skip((inserObj.pageNum - 1) * inserObj.pageSize).limit(inserObj.pageSize).toArray(cb);
    })
}
//查找多个
module.exports.findPics = function(collName,inserObj,cb){
    _connect(function(db){
        db.collection(collName).find(inserObj).sort({date:-1}).toArray(cb);
    })
}
//总数
module.exports.findManyCount = function(collName,cb){
    _connect(function(db){
        db.collection(collName).find().count(cb)
    })
}