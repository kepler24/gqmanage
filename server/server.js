const mongodb = require("mongodb");
const express = require("express");
const objectId = require('mongodb').ObjectId;
const mongoClient = mongodb.MongoClient;
const app = express();
const db = require('./db')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//删除
app.post("/deleteOne",function(req,res){
    const _id = objectId(req.body.id)
    db.deleteOne("dailyList",{
        _id:_id
    },function (err,results) {
        if(err){ res.json({ ok:-1, msg:"失败" })
        }else{ res.json({  ok:1,  msg:"成功" })}
    })
})
//添加笔记
app.post("/addDaily",function(req,res){
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
app.post("/updateDaily",function(req,res){
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
app.post("/addDailyTitle",function(req,res){
    db.insertOne("dailyTitleList",{
        date:+new Date(),
        title:req.body.title
    },function (err,results) {
        if(err){ res.json({ ok:-1, msg:"失败" })
        }else{ res.json({  ok:1,  msg:"成功" })}
    })
})
//获取笔记表
app.post("/getDaily",function(req,res){
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
app.post("/getDailyTitle",function(req,res){
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
app.post("/getOneDaily",function(req,res){
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