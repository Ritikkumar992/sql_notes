// create a new express server
import express from "express";
import router from './routes/auth.js'
import cors from "cors";
import postrouter from "./routes/post.js"
import requestRouter from "./routes/friend_request.js"
import { authenticateToken } from "./middleware/auth.js"

const app = express();
app.use(express.json());


var corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

app.get("/test", (req, res) => {
    res.send("hello world");
})

app.use("/api/auth", router);
app.use("/api", postrouter)
app.use("/api/friend_request", requestRouter);
const port = process.env.PORT || 8080;

//create a server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

