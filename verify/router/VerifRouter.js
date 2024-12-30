const express = require('express')
const VerifRouter = express.Router()
var path = require('path');
var ObjectId = require('mongodb').ObjectID;
var bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken")

const ClientID = 100;
const SigningPrivateKey = "e56b6462947987bd87f51c067b25ae191f022a5e2741d8637acc3048c8894a61";
const web2toweb3 = require('web2toweb3');


VerifRouter.get('/verification', async function (req, res) {
	var data = {};
	res.render("verif-login", { data: data });
})


VerifRouter.post('/verif-login', function (req, res) {

    try {

      var MobileNo = req.body.txtMobileNo;

      var Password = req.body.txtPassword;

      var DataRequest = [];

      DataRequest.push(req.db.collection("TbVerifAgent").findOne({ "MobileNo": MobileNo }, { 'projection': { _id: 1, pwdhash: 1 } }));

      Promise.all(DataRequest).then(async function (results) {

        if (results[0]) {

          if (bcrypt.compareSync(Password, results[0].pwdhash)) {

            req.session.VerifUserID = results[0]._id;

 

            const verifAgent = await req.db.collection("TbVerifAgent").findOne({ "_id": results[0]._id }, { 'projection': { Name: 1 } });

 

            const token = jwt.sign({ name: verifAgent.Name }, 'pasumarket');

            res.cookie('verifier_sessionId', token);

            var data = {};

            res.redirect("/verif-veriflist");

          } else {

            var data = { MobileNo: MobileNo, MessageType: "M01", MessageNo: "LOGPWD-INV", MessageDes: "Invalid Mobile No. or Password. Please try again." }

            res.render("verif-login", { data: data });

          }

        } else {

          var data = { MobileNo: MobileNo, MessageType: "M01", MessageNo: "LOGPWD-INV", MessageDes: "Invalid Mobile No. or Password. Please try again." }

          res.render("verif-login", { data: data });

        }

      }).catch(function (error) {

        var data = { MobileNo: MobileNo, MessageType: "M01", MessageNo: "LGRQ001", MessageDes: "Unable to reach Server. Please try after sometime." }

        res.render("verif-login", { data: data });

      });

 

    } catch (error) {

      var MobileNo = req.body.txtMobileNo;

      var data = { MobileNo: MobileNo, MessageType: "M01", MessageNo: "LGRQ001", MessageDes: "Unable to reach Server. Please try after sometime." }

      res.render("verif-login", { data: data });

    }

  });
VerifRouter.post('/test', async function (req, res) {
	try {
		const receivedData = req.body;
		console.log(receivedData)
		const result = await req.db.collection("PropertyDetials").insertOne(receivedData);

		if (result.insertedCount === 1) {
			console.log("Data stored in the database:", receivedData);
			res.json({ success: true });
		} else {
			console.log("Failed to store data in the database");
			res.json({ success: false });
		}
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
});


VerifRouter.get('/verif-register', async function (req, res) {
	var data = {};
	res.render("verif-register", { data: data });
})


VerifRouter.post('/verif-register', async function (req, res) {

	try {

		const Name = req.body.txtName;
		const MobileNo = req.body.txtMobileNo;
		const EmailID = req.body.txtEmailID;
		const Password = req.body.txtPassword;
		const AadharNo = req.body.txtAadharNo;
		const Qualification = req.body.txtQualification;
		const Address = req.body.txtAddress;
		const pwdhash = bcrypt.hashSync(Password, 10);

		var DataRequest = [];
		DataRequest.push(req.db.collection("TbVerifAgent").findOne({ "MobileNo": MobileNo }, { 'projection': { _id: 1 } }));
		Promise.all(DataRequest).then(async function (results) {
			if (results[0]) {
				const data = { MessageType: "VerifAgentMobileExists", MessageDes: "Your Mobile No. already exists. Please login with your Mobile No." };
				res.render("verif-message", { data: data });
			}
			else {
				var DataObj = { Name: Name, MobileNo: MobileNo, EmailID: EmailID, pwdhash: pwdhash, AadharNo: AadharNo, Qualification: Qualification, Address: Address, CreatedAt: new Date(), UpdatedAt: new Date() };
				req.db.collection("TbVerifAgent").insertOne(DataObj, function (error, result) {
					if (error) {
						const data = { MessageType: "VerifAgentRegError", MessageDes: "Unable to reach Server. Please try after sometime." };
						res.render("verif-message", { data: data });
					}
					else {
						const VerifUserID = result.insertedId;
						req.session.VerifUserID = VerifUserID;
						const data = { VerifUserID: VerifUserID, MessageType: "VerifAgentRegSuccess", MessageDes: "You are successfully registered as Verification Agent. You can now login and do verification." };
						res.render("verif-message", { data: data });
					}
				});
			}
		});

	}
	catch (error) {
		const data = { MessageType: "VerifAgentRegError", MessageDes: "Unable to reach Server. Please try after sometime." };
		res.render("verif-message", { data: data });
	}

})

VerifRouter.get("/verif-veriflist", async function (req, res) {
	try {
	  const verifListData = await req.db.collection("sells").find().toArray();
	  const filteredData = verifListData.filter(item => parseFloat(item.price) > 0);
	  console.log(filteredData, "vereererererere");
	  res.render("verif-veriflist", { data: filteredData });
	} catch (error) {
	  res.send(error);
	}
  });
  
VerifRouter.get('/verify-form/:id', async function (req, res) {
	try {
	  const propertyId = req.params.id;
  
	  // Fetch the selected property from the database using the propertyId
	  const property = await req.db.collection("sells").findOne({ _id: ObjectId(propertyId) });
	  if (property) {
		// Render the form template with the property data
		res.render("verif-verifform", { data: property });
	} else {
		// Property not found
		res.status(404).send("Property not found");
	  }
	} catch (error) {
	  console.error(error);
	  res.status(500).send("Internal server error");
	}
  });
  
  
//   VerifRouter.get('/verif-verifform/:postID', async function(req, res) {
// 	try {
// 	  const PostID = req.params.postID;
// 	  // Add your logic here to fetch data for the verif-verifform component using the PostID
  
// 	  // Render the verif-verifform component with the data
// 	  res.render("verif-verifform", { data: PostID });
// 	} catch (error) {
// 	  console.log(error);
// 	  res.send(error);
// 	}
//   });
  
// VerifRouter.get('/verif-veriflist', async function (req, res) {

// 	try {
// 		if(req.session.VerifUserID)
// 		{
// 			var DataRequest = [];
// 			DataRequest.push(req.db.collection("TbState").find({}).sort({StateName:1}).toArray());
// 			Promise.all(DataRequest).then(function (results) {
// 				var data = {Search:false, StateList:results[0], DistrictList:[], SubDistrictList:[]}
// 				res.render("verif-veriflist",{data:data});
// 			}).catch(function (error) {
// 				res.send(error);
// 			});
// 		}
// 		else
// 		{
// 			res.send("access denied");
// 		}
// 	}
// 	catch(error) {
// 		res.send(error);
// 	}	

// });

// VerifRouter.post('/verif-veriflist', async function (req, res) {

// 	try {
// 		if(req.session.VerifUserID)
// 		{

// 			const SelectedState = req.body.lstState;
// 			const SelectedDistrict = req.body.lstDistrict;
// 			const SelectedSubDistrict = req.body.lstSubDistrict;

// 			var DataRequest = [];

// 			DataRequest.push(req.db.collection("TbState").find({}).sort({StateName:1}).toArray());
// 			DataRequest.push(req.db.collection("TbDistrict").find({StateName:SelectedState}).sort({DistrictName:1}).toArray());
// 			DataRequest.push(req.db.collection("TbSubDistrict").find({DistrictName:SelectedDistrict}).sort({SubDistrictName:1}).toArray());

// 			DataRequest.push(
// 				req.db.collection("TbCattle").aggregate( [
// 				  { 
// 					 $match: { PostStatus:'C', ReqVerif:'I', StateName:SelectedState, DistrictName:SelectedDistrict, SubDistrictName:SelectedSubDistrict }
// 				  },
// 				  { 
// 					"$lookup": 
// 					{
// 						"from": "TbUser",
// 						let: { "userid" : { "$toObjectId": "$UserID" } },
// 						"pipeline": [
// 						  { $match: {$expr: { $eq: [ "$_id", "$$userid" ] } } },
// 						],
// 						"as": "TbUser"
// 					}
// 				  },
// 				  {
// 						$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$TbUser", 0 ] }, "$$ROOT" ] } }
// 				  },
// 				  { $project: { SubCategory:1, StateName:1, DistrictName:1, SubDistrictName:1, VillageName:1, CreatedAt:1, Name:1, Price:1 } },
// 				]).toArray()
// 			);

// 			DataRequest.push(
// 				req.db.collection("TbBuffalo").aggregate( [
// 				  { 
// 					 $match: { PostStatus:'C', ReqVerif:'I', StateName:SelectedState, DistrictName:SelectedDistrict, SubDistrictName:SelectedSubDistrict }
// 				  },
// 				  { 
// 					"$lookup": 
// 					{
// 						"from": "TbUser",
// 						let: { "userid" : { "$toObjectId": "$UserID" } },
// 						"pipeline": [
// 						  { $match: {$expr: { $eq: [ "$_id", "$$userid" ] } } },
// 						],
// 						"as": "TbUser"
// 					}
// 				  },
// 				  {
// 						$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$TbUser", 0 ] }, "$$ROOT" ] } }
// 				  },
// 				  { $project: { SubCategory:1, StateName:1, DistrictName:1, SubDistrictName:1, VillageName:1, CreatedAt:1, Name:1, Price:1 } },
// 				]).toArray()
// 			);

// 			Promise.all(DataRequest).then(function (results) {
// 				const StateList = results[0];
// 				const DistrictList = results[1];
// 				const SubDistrictList = results[2];
// 				const CattleList = results[3];
// 				const BuffaloList = results[4];
// 				var data = {Search:true, CattleList:CattleList, BuffaloList:BuffaloList, StateList:StateList, DistrictList:DistrictList, SubDistrictList:SubDistrictList, SelectedState:SelectedState, SelectedDistrict:SelectedDistrict, SelectedSubDistrict:SelectedSubDistrict};
// 				res.render("verif-veriflist",{data:data});
// 			}).catch(function (error) {
// 				//console.log(error);
// 			});

// 		}
// 		else
// 		{
// 			res.send("access denied");
// 		}
// 	}
// 	catch(error) {
// 		res.send(error);
// 	}	



// })


VerifRouter.post('/get-verif-verifform', async function (req, res) {

	try {
		var PostID = req.body.hdnPostID;
		var CategoryTable = req.body.hdnCategoryTable;

		var DataRequest = [];

		DataRequest.push(
			req.db.collection(PropertyDetials).aggregate([
				{
					$match: { _id: ObjectId(PostID) }
				},
				{
					"$lookup":
					{
						"from": "TbUser",
						let: { "userid": { "$toObjectId": "$UserID" } },
						"pipeline": [
							{ $match: { $expr: { $eq: ["$_id", "$$userid"] } } },
						],
						"as": "TbUser"
					}
				},
				{
					$replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$TbUser", 0] }, "$$ROOT"] } }
				},
				{ $project: { SubCategory: 1, StateName: 1, DistrictName: 1, SubDistrictName: 1, VillageName: 1, CreatedAt: 1, Name: 1, Price: 1, MobileNo: 1, BreedName: 1 } },
			]).toArray()
		);

		await Promise.all(DataRequest).then(async function (results) {
			const CattleList = results[0];
			const Cattle = CattleList[0];

			const ReadStatus = await web2toweb3.readBlockData(ClientID, SigningPrivateKey, PostID + '_cert');
			console.log(ReadStatus)
			if (!(ReadStatus.txstatus)) {
				throw 'Unable to read data from Blockchain';
			}

			const BlockchainData = ReadStatus.blockJSON[0][0];
			const data = { PostID: PostID, CategoryTable: CategoryTable, Cattle: Cattle, BlockchainData: BlockchainData };
			//console.log(data);
			res.render("verif-verifform", { data: data });

		}).catch(function (error) {
			throw error;
		});

	}
	catch (error) {
		console.log(error);
		res.send(error);
	}

})

VerifRouter.get('/verif-verifform', async function (req, res) {
	try {
		const updatedProperty = await req.db.db("petchain").collection("sells").find().toArray();
		const data = {
			updatedProperty: updatedProperty.map(property => ({
				_id: property._id, // Include the MongoDB _id field
				prop_id: property.prop_id, 
				meta_input: property.meta_input
			}))
		};
		res.json(data);
	} catch (error) {
		res.send(error.toString());
	}
});





VerifRouter.post('/verif-verifform', async function (req, res) {
	try {
		var PostID = req.body.hdnPostID;
		console.log("postdbid:::::", PostID);
const token = req.cookies.verifier_sessionId;
console.log("asdasdsa",token)
const decodedToken = jwt.verify(token, 'pasumarket');
const verifierName = decodedToken.name;
		// var CategoryTable = req.body.hdnCategoryTable;
		var UniqueTxID = PostID + "_info";

		var Activeness = req.body.txtActiveness;
		var Colour = req.body.txtColour;
		var VaccinationDate = req.body.txtvaccinationDate;
		var VaccinationName = req.body.txtvaccinationname;
		var Weight = req.body.txtWeight;
		var Age = req.body.txtAge;
		var Sex = req.body.lstSex;
		var Breed = req.body.txtBreed;
		var Temperament = req.body.txtTemperament;
		var OwnerName = req.body.txtOwnerName;
		var OwnerAddress = req.body.txtOwnerAddress;
		var OwnerNumber = req.body.txtOwnerNumber;
		var verifiedDate = new Date();



		var blockJSON = {
			Activeness: Activeness,
			Colour: Colour,
			VaccinationName: VaccinationName,
			VaccinationDate: VaccinationDate,
			Weight: Weight,
			Age: Age,
			Sex: Sex,
			Breed: Breed,
			Temperament: Temperament,
			OwnerName : OwnerName,
			OwnerAddress : OwnerAddress,
			OwnerNumber : OwnerNumber,
			verifiedDate:verifiedDate,
			verifierName:verifierName
		};
		blockJSON = JSON.stringify(blockJSON);
		console.log(blockJSON)
		const WriteStatus = await web2toweb3.writeBlockData(ClientID, SigningPrivateKey, UniqueTxID, blockJSON, []);

		if (WriteStatus.txstatus) {
			// Update the verify_property meta field to "c"
			const updateResult = await req.db.collection("sells").updateOne(
				{ _id: ObjectId(PostID) },
				{ $set: { "verifyStatus": "verified" } }
			);

			if (updateResult.modifiedCount > 0) {
				const updatedProperty = await req.db.collection("sells").findOne({ _id: ObjectId(PostID) });
				
				const data = {
					updatedProperty:updatedProperty,
					MessageType: 'UpdateVerification',
					UniqueTxID: UniqueTxID,
					WriteStatus: WriteStatus
				};
				console.log("dataaaa".data)
				// res.json( data );
				res.render("verif-message", { data: data });
				// console.log("response::::",res)
			} else {
				throw 'Error while updating meta field.';
			}
		} else {
			throw 'Error while writing data into Blockchain.';
		}
	} catch (error) {
		res.send(error.toString());
	}
});



VerifRouter.get('/verifViewFile', async function (req, res) {

	try {
		var FileName = req.query.FileName;
		var FileHash = req.query.FileHash;
		const FileBuffer = await web2toweb3.viewFile(ClientID, FileName, FileHash);
		res.set('Content-type', 'application/pdf');
		res.send(FileBuffer);

	} catch (error) {
		res.send(error.toString());
	}

});


VerifRouter.get('/trace/:PostID', async function (req, res) {
	try {
		const PostID = req.params.PostID;
		console.log(PostID);

		const ReadStatus = await web2toweb3.readBlockData(ClientID, SigningPrivateKey, PostID + '_info');
		if (!ReadStatus.txstatus) {
			throw new Error('Unable to read data from Blockchain');
		}

		const BlockchainData_info = ReadStatus.blockJSON[0][0];

		const data = { PostID: PostID, BlockchainData_info: BlockchainData_info };
		//console.log(data);
		res.render("verif-trace", { data: data });
	} catch (error) {
		console.log(error);
		throw error;
	}
});



module.exports = VerifRouter;