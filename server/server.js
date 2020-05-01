const mongodb = require("mongodb");
const express = require("express");
const objectId = require('mongodb').ObjectId;
const mongoClient = mongodb.MongoClient;
const app = express();
const db = require('./db')
const bodyParser = require('body-parser')
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));
//获取笔记
app.post("/gao/getOnePic",function(req,res){
    const _id = objectId(req.body.id)
    db.findOne("picList",{
        _id : _id
    },function (err,results) {
        console.log(results)
        if(err){ res.json({ ok:-1, msg:"失败" })
        }else{ res.json({  ok:1,  msg:"成功",data:results })}
    })
})
//修改图片
app.post("/gao/updatePic",function(req,res){
    const _id = objectId(req.body.id)
    db.updateOne("picList",{
        _id:_id,},{
        updateDate:+new Date(),
        title:req.body.title,
        place:req.body.place,
        picurl:req.body.picurl,
    },function (err,results) {
        if(err){ res.json({ ok:-1, msg:"失败" })
        }else{ res.json({  ok:1,  msg:"成功" })}
    })
})
//获客户端取图片表
app.post("/gao/getPics",function(req,res){
    db.findPics("picList",{
    },function (err,results) {
        if(err){ res.json({ ok:-1, msg:"失败" })
        }else{ res.json({  ok:1,  msg:"成功",data:results })}
    })
})
//获取图片表
app.post("/gao/getPic",function(req,res){
    var count
    db.findManyCount('picList',
    function(err,results){
        count = results
    })
    db.findMany("picList",{
        project:{},
        pageNum:req.body.currentPage,
        pageSize:req.body.pageSize
    },function (err,results) {
        if(err){ res.json({ ok:-1, msg:"失败" })
        }else{ res.json({  ok:1,  msg:"成功",data:results,total:count })}
    })
})
//添加图片
app.post("/gao/addPic",function(req,res){
    db.insertOne("picList",{
        date:+new Date(),
        title:req.body.title,
        place:req.body.place,
        picurl:req.body.picurl,
    },function (err,results) {
        if(err){ res.json({ ok:-1, msg:"失败" })
        }else{ res.json({  ok:1,  msg:"成功" })}
    })
})
//删除
app.post("/gao/deleteOne",function(req,res){
    const _id = objectId(req.body.id)
    db.deleteOne(req.body.listName,{
        _id:_id
    },function (err,results) {
        if(err){ res.json({ ok:-1, msg:"失败" })
        }else{ res.json({  ok:1,  msg:"成功" })}
    })
})
//添加笔记
app.post("/gao/addDaily",function(req,res){
    db.insertOne("dailyList",{
        date:+new Date(),
        title:req.body.title,
        content:req.body.content
    },function (err,results) {
        if(err){ res.json({ ok:-1, msg:"失败" })
        }else{ res.json({  ok:1,  msg:"成功" })}
    })
})
//修改笔记
app.post("/gao/updateDaily",function(req,res){
    const _id = objectId(req.body.id)
    db.updateOne("dailyList",{
        _id:_id,},{
        updateDate:+new Date(),
        title:req.body.title,
        content:req.body.content
    },function (err,results) {
        if(err){ res.json({ ok:-1, msg:"失败" })
        }else{ res.json({  ok:1,  msg:"成功" })}
    })
})
//添加笔记不加内容
app.post("/gao/addDailyTitle",function(req,res){
    db.insertOne("dailyTitleList",{
        date:+new Date(),
        title:req.body.title
    },function (err,results) {
        if(err){ res.json({ ok:-1, msg:"失败" })
        }else{ res.json({  ok:1,  msg:"成功" })}
    })
})
//获取笔记表
app.post("/gao/getDaily",function(req,res){
    var count
    db.findManyCount('dailyList',
    function(err,results){
        count = results
    })
    db.findMany("dailyList",{
        project:{},
        pageNum:req.body.currentPage,
        pageSize:req.body.pageSize
    },function (err,results) {
        if(err){ res.json({ ok:-1, msg:"失败" })
        }else{ res.json({  ok:1,  msg:"成功",data:results,total:count })}
    })
})
//获取笔记表
app.post("/gao/getDailyTitle",function(req,res){
    var count
    db.findManyCount('dailyList',
    function(err,results){
        count = results
    })
    db.findMany("dailyList",{
        project:{content:0},
        pageNum:req.body.currentPage,
        pageSize:req.body.pageSize
    },function (err,results) {
        if(err){ res.json({ ok:-1, msg:"失败" })
        }else{ res.json({  ok:1,  msg:"成功",data:results,total:count })}
    })
})
//获取笔记
app.post("/gao/getOneDaily",function(req,res){
    const _id = objectId(req.body.id)
    db.findOne("dailyList",{
        _id : _id
    },function (err,results) {
        console.log(results)
        if(err){ res.json({ ok:-1, msg:"失败" })
        }else{ res.json({  ok:1,  msg:"成功",data:results })}
    })
})
app.listen(80,function(){
    console.log("success");
})