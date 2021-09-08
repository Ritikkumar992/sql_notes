import React, { useState } from 'react'
import './AddComment.css';
import { database } from '../firebase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios"

export default function AddComment({ userData, postData, comments, setComments }) {
    const useStyles = makeStyles({
        cbtn: {

            marginRight: '1%',
            marginTop: '4%'
        },

    });
    const classes = useStyles();
    const [textu, setText] = useState('');
    const manageText = (e) => {
        let text = e.target.value;
        setText(text)
    }
    async function handleOnEnter() {
        // console.log(12312312)
        // console.log('enter', textu)
        // let obj = {
        //     text:textu,
        //     uName:userData.fullName,
        //     uUrl:userData.profileUrl
        // }
        // database.comments.add(obj).then(doc=>{
        //     database.posts.doc(postData.postId).update({
        //         comments:[...postData.comments,doc.id]
        //     })
        // }).catch(e=>{
        //     // console.log("This is the error "+e)
        // })

        try {
            let data = await axios.post("http://localhost:8080/api/doComment", {
                user_id: userData.id,
                post_id: postData.post_id,
                text: textu
            });
            let data1 = await axios.post("http://localhost:8080/api/comments", {
                post_id: postData.post_id
            })
            setComments(data1.data);
            // console.log(4545454, data1.data)
            setText('')
        } catch (err) {
            alert(err.message)
            console.log(err);
        }

    }
    return (
        <div className='emojibox'>
            <TextField fullWidth={true} value={textu} label="Add a comment" onChange={(e) => manageText(e)} />
            <Button onClick={handleOnEnter} disabled={textu == '' ? true : false} className={classes.cbtn} color="primary">Post</Button>
        </div>
    )
}
