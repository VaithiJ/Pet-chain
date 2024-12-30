var MongoClient = require('mongodb').MongoClient;
const murl = "mongodb://admin:petchain10493@43.205.3.109:27017/petchain?directConnection=true&appName=mongosh+1.10.5";

var MongoDbClient;
var db;

module.exports = {
	getDb: async function() {

		await new Promise((resolve, reject) => {
			if(!MongoDbClient)
			{
				MongoClient.connect(murl,{useNewUrlParser:true, useUnifiedTopology:true}, async function(error, client){
					if(error)
					{
						reject(error);
					}
					else{
						MongoDbClient=client;
						db = await client.db("petchain");
						resolve();
					}
				});
			}
			else if(MongoDbClient.isConnected())
			{
				resolve();
			}
			else
			{
				MongoClient.connect(murl,{useNewUrlParser:true, useUnifiedTopology:true}, function(error, client){
					if(error)
					{
						reject(error);
					}
					else{
						db = client.db("petchain");
						MongoDbClient=client;
						resolve();
					}
				});
			}
		});
		return db;
	}

};

