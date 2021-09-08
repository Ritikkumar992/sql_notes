// create a new express server
import express from "express";
import router from './routes/auth.js'
import cors from "cors";
import postrouter from "./routes/post.js"
import requestRouter from "./routes/friend_request.js"
import connection from "./db.js";


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


// let sockets = io.listen(app);

// sockets.on("connection", (socket) => {
//     console.log("connected");

//     setInterval(() => {
//         let sql = `"select * from notifications where id > ${lastid}`
//         db.query(sql, (err, result) => {
//             if (err) throw err;
//             if (result.length > 0) {
//                 lastid = result[0].id;
//                 console.log(sockets);
//             }
//         })
//     }, 5000);

//     socket.on("disconnect", () => {
//         console.log("disconnected");
//     })
// })


app.post("/api/getNotification", (req, res) => {
    let lastid = req.body.lastid;
    let sql = `select * from notifications where id > ${lastid}`
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(200).send(err);
        } else {
            if (result.length > 0) {
                lastid = result[0].id;
                res.send(result);
            }
        }
    })
})




//create a server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

