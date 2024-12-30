var ObjectId = require('mongodb').ObjectID;

function WritePostViewLog(db, CategoryTable, UserID, PostID)
{
	db.collection(CategoryTable).updateOne({_id:ObjectId(PostID), UserID:{$ne:UserID}}, { $inc:{ViewCount:1} }, { upsert:false}, function(error, result) {
		if(error)
		{
			throw error
		}
	});

	const ViewLogTable=CategoryTable+'_ViewLog';
	var DataObj = {PostID:PostID, UserID:UserID, Using:"WebApp", CreatedAt:new Date()};
	db.collection(ViewLogTable).insertOne(DataObj, function(error, result) {
		if(error)
		{
			throw error
		}
	});
}

function WritePageViewLog(db, PageName, UserID)
{
	var DataObj = {PageName:PageName, UserID:UserID, Using:"WebApp", CreatedAt:new Date()};
	db.collection("TbPageViewLog").insertOne(DataObj, function(error, result) {
		if(error)
		{
			throw error
		}
	});
}

module.exports = {
	WritePostViewLog,
	WritePageViewLog
}