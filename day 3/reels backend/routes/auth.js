import express from "express";
import connection from "../db.js";
import bcrypt from "bcrypt";
import cookie from 'cookie'
import jsonwebtoken from "jsonwebtoken";
import { SECRET, REFRESH } from "../tokens.js"

let router = express.Router();



router.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    connection.query('SELECT * FROM users WHERE emailid = ?', [email], async (err, results) => {
        console.log(results);
        if (err) {
            res.status(500).send(err);
        } else {
            if (results.length > 0) {
                // check if the password is correct
                let ans = await bcrypt.compare(password, results[0].password);
                if (ans) {
                    delete results[0].password;
                    res.set(
                        'Set-Cookie',
                        cookie.serialize('user', JSON.stringify(results[0]), {
                            httpOnly: true,
                            sameSite: 'strict',
                            maxAge: 3600,
                            path: '/',
                        })
                    );
                    results[0].token = await jsonwebtoken.sign({ ...results[0] }, SECRET, { expiresIn: '10h' });
                    res.status(200).json(results[0]);
                }
                else {
                    res.status(400).send('Incorrect password');
                }
            } else {
                res.status(400).send('Incorrect email');
            }
        }
    })
});

router.post('/signup', async (req, res) => {
    let { emailid, password, profile_pic, fullname } = req.body;
    password = await bcrypt.hash(password, 10);
    connection.query('INSERT INTO users (emailid, password, profile_pic, fullname) VALUES (?, ?, ?, ?)',
        [emailid, password, profile_pic, fullname], (err, results) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                connection.query('SELECT * FROM users WHERE emailid = ?', [emailid], (err, results) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        delete results[0].password;

                        res.set(
                            'Set-Cookie',
                            cookie.serialize('user', JSON.stringify(results[0]), {
                                httpOnly: true,
                                sameSite: 'strict',
                                maxAge: 3600,
                                path: '/',
                            })
                        )
                        res.status(200).json(results[0]);
                    }
                });
            }
        }
    );
});

export default router;