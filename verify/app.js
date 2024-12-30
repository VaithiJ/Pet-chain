var express = require('express');
var session = require("express-session");
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');

var ObjectId = require('mongodb').ObjectID;
const mongo = require('./db/db');
var db;

const VerifRouter = require('./router/VerifRouter')

var app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'web/views'));
app.use('/public', express.static(__dirname + '/web/public'));


app.use(session({secret:"pasumarket"}));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(cookieParser());


app.use(async (req, res, next) => {
	
	res.locals.UserID = req.session.UserID;
	res.locals.VerifUserID = req.session.VerifUserID;

	await mongo.getDb()
	.then(function(thisdb) {
		db=thisdb;
		req.db = thisdb;
	})
	.catch((error) => {
		return res.send("DB Connection error");
	})

	next();

});

app.use('/',VerifRouter);


app.get('/message', function (req, res) {
	var data = {UserID:"", MessageType:"M01",MessageNo:"LGRQ001", MessageDes:res.__("appMessage").UnableToReachServer}
	res.render("message",{data:data});
})


app.get('/getDistricts/:StateName', async function (req, res) {
	
	try
	{
		const StateName = req.params.StateName;
		var DataRequest = [];
		DataRequest.push(db.collection("TbDistrict").find({StateName:StateName}).sort({DistrictName:1}).toArray());
		Promise.all(DataRequest).then(function (results) {
			const DistrictList = results[0];
			res.send(DistrictList);
		}).catch(function (error) {
			console.log(error);
			 //var msg = {msgtype:'m02',msgid:'ICODSB01',des:'Opps... Something went wrong. Contact Support'};
			 //res.render("message",{msg:msg});
		});
	}
	catch(error)
	{
		console.log(error)
		res.send("Server Error");
	}

})


app.get('/getSubDistricts/:DistrictName', async function (req, res) {
	
	try
	{
		const DistrictName = req.params.DistrictName;
		var DataRequest = [];
		DataRequest.push(db.collection("TbSubDistrict").find({DistrictName:DistrictName}).sort({SubDistrictName:1}).toArray());
		Promise.all(DataRequest).then(function (results) {
			const SubDistrictList = results[0];
			res.send(SubDistrictList);
		}).catch(function (error) {
			console.log(error);
			 //var msg = {msgtype:'m02',msgid:'ICODSB01',des:'Opps... Something went wrong. Contact Support'};
			 //res.render("message",{msg:msg});
		});
	}
	catch(error)
	{
		console.log(error)
		res.send("Server Error");
	}

})


app.get('/getVillages/:SubDistrictName', async function (req, res) {
	
	try
	{
		const SubDistrictName = req.params.SubDistrictName;
		var DataRequest = [];
		DataRequest.push(db.collection("TbVillage").find({SubDistrictName:SubDistrictName}).sort({VillageName:1}).toArray());
		Promise.all(DataRequest).then(function (results) {
			const VillageList = results[0];
			res.send(VillageList);
		}).catch(function (error) {
			console.log(error);
			 //var msg = {msgtype:'m02',msgid:'ICODSB01',des:'Opps... Something went wrong. Contact Support'};
			 //res.render("message",{msg:msg});
		});
	}
	catch(error)
	{
		console.log(error)
		res.send("Server Error");
	}

})


var server = app.listen(8082, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("App listening at http://%s:%s", host, port)
})
