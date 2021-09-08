import { SECRET, REFRESH } from "../tokens.js";
import jwt from "jsonwebtoken";

function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	console.log("token", token, authHeader);
	if (token == null) return res.sendStatus(401);
	else {
		jwt.verify(token, SECRET, (err, user) => {
			if (err) return res.sendStatus(403);
			next();
		});
	}
}


export { authenticateToken }