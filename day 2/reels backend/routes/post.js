import express from "express";
import connection from "../db.js";
import { authenticateToken } from "../middleware/auth.js";
let postrouter = express.Router();
postrouter.post("/post", (req, res) => {
    let { video_url, user_id } = req.body;
    let sql = `INSERT INTO posts (video_url, user_id) VALUES ('${video_url}', '${user_id}')`;
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(400);
        } else {
            res.status(200).json({ post: result[0], success: 1 });
        }
    });
});
postrouter.get("/allposts", authenticateToken, (req, res) => {
    let sql = 'SELECT posts.id as post_id, users.id as user_id,users.fullname,users.profile_pic,posts.video_url from posts CROSS JOIN users on posts.user_id = users.id';
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(400);
        } else {
            res.status(200).json({ posts: result, success: 1 });
        }
    });
})


postrouter.post("/myposts", (req, res) => {
    let { user_id } = req.body;
    let sql = `SELECT posts.id as post_id, users.id as user_id,users.fullname,users.profile_pic,posts.video_url from posts CROSS JOIN users on posts.user_id = users.id where users.id = ${user_id}`;
    console.log(sql)
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            res.status(400);
        } else {
            res.status(200).json({ posts: result, success: 1 });
        }
    });
})

postrouter.post("/doLike", (req, res) => {
    console.log("doLike")
    let { user_id, post_id } = req.body;
    let sql = `INSERT INTO likes (user_id, post_id) VALUES (${user_id}, ${post_id})`;
    connection.query(sql, (err, result) => {
        console.log(result)
        if (err) {
            res.status(400);
        } else {
            res.status(200).json({ success: 1 });
        }
    });
});



postrouter.post("/unlike", (req, res) => {
    let { user_id, post_id } = req.body;
    let sql = `delete from likes WHERE user_id = ${user_id} and post_id = ${post_id}`;
    connection.query(sql, (err, result) => {
        console.log(result);
        if (err) {
            res.status(400);
        } else {
            res.status(200).json({ success: 1 });
        }
    });
})

postrouter.post("/checkLike", (req, res) => {
    let { user_id, post_id } = req.body;
    let sql = `SELECT COUNT(*) as liked FROM likes WHERE likes.user_id = ${user_id} and likes.post_id = ${post_id}`;
    connection.query(sql, (err, result) => {
        if (err) console.log(err);

        console.log(result);
        if (!result)
            res.send({ like: false });
        else if (result[0].liked == 0)
            res.send({ like: false });
        else
            res.send({ like: true })
    });
})

postrouter.post("/like", (req, res) => {
    let { post_id } = req.body;
    console.log(post_id);

    //get post id's likes   
    try {
        let sql = `SELECT fullname from users where users.id in (select likes.user_id from likes WHERE likes.post_id = ${post_id})`;
        connection.query(sql, (err, result) => {
            console.log(result);
            if (err) {
                res.status(400);
            } else {
                res.status(200).json(result);
            }
        });
    } catch (err) {
        res.status(400).send(err);
    }
})

postrouter.post("/doComment", (req, res) => {
    let { user_id, post_id, text } = req.body;
    console.log("docomment", user_id, post_id, text)
    try {
        let sql = `INSERT INTO comment (text, user_id, post_id) VALUES ('${text}', ${user_id}, ${post_id})`;
        connection.query(sql, (err, result) => {
            console.log(result);
            if (err) {
                res.status(400);
            } else {
                res.status(200).json({ success: 1 });
            }
        });
    } catch (err) {
        console.log(err)
    }
})


postrouter.post("/comments", (req, res) => {
    let { post_id } = req.body;
    let sql = `SELECT fullname,text,profile_pic from comment CROSS JOIN users on comment.user_id = users.id where post_id = ${post_id}`;
    connection.query(sql, (err, result) => {
        console.log(result);
        if (err) {
            res.status(400);
        } else {
            res.status(200).json(result);
        }
    });
})

export default postrouter;