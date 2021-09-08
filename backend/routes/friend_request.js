import express from "express";
import connection from "../db.js";
let requestRouter = express.Router();


requestRouter.post("/allusers",(req,res)=>{	
	let sql = "select id,fullname,profile_pic from users";
	connection.query(sql,(err,result)=>{
		if(err) {
			console.log(err);
			res.json({
				err:err.message
			});
		}else{
			res.json(result)
		}
	})
})


requestRouter.post("/myfriends",(req,res)=>{
	let {user_id} = req.body;
	let sql = `select id,fullname,profile_pic from users where id in (select receiver_id from friend_requests where sender_id = ${user_id} and status=1)`
	console.log("My friends",sql);
	connection.query(sql,(err,result)=>{
		if(err) {
			console.log(err)
			res.json({err:err.message});
		}else{
			res.json({
				success:1,
				result
			});
		}
	})
})


requestRouter.post("/pendingrequests",(req,res)=>{
	let {receiver_id} = req.body;

	let sql = `select id,fullname,profile_pic from users where id in (select sender_id from friend_requests where receiver_id = ${receiver_id} and status=0)`
	console.log("Pending Requests",sql);

	connection.query(sql,(err,result)=>{
		if(err) {
			console.log(err)
			res.json({err:err.message});
		}else{
			res.json({
				success:1,
				result
			});
		}
	})
})


requestRouter.post("/sendrequest",(req,res)=>{
	let {sender_id,receiver_id} = req.body
	let sql = `INSERT INTO friend_requests (sender_id, receiver_id, status) VALUES ('${sender_id}', '${receiver_id}', '0')`;
	connection.query(sql,(err,result)=>{
		if(err) res.send({success:0,err:"Invalid User"});
		else{
			res.send({success:1});
		}
	})
})


requestRouter.post("/acceptrequest",(req,res)=>{
	let {sender_id,receiver_id} = req.body;
	let sql = `update friend_requests set status = 1 where sender_id = ${sender_id} and receiver_id=${receiver_id}`;
	console.log("Accept Request",sql)
	connection.query(sql,(err,result)=>{
		console.log(result)
		if(err) res.json({err:err.message,success:0})
		else if(result.changedRows!=0)res.json({success:1})
		else res.send({success:0})
	})
})




export default requestRouter;
