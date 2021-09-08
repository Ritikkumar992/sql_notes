import React, { useState, useEffect } from 'react'
import { database } from '../firebase';
import './Comments.css'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios"

export default function Comments(props) {
    let postData = props.postData;
    let setComments = props.setComments;
    let comments = props.comments;
    // console.log('rendered comments');

    const useStyles = makeStyles({
        da: {
            marginRight: '2%',
            marginTop: '2%'
        }
    })
    const classes = useStyles();
    useEffect(async () => {
        // console.log("The use Effect of comments was called.")
        // let arr=[];
        // // console.log(props.userData);
        // // console.log(props.postData.comments);        
        // for(let i=0;i<props.postData.comments.length;i++)
        // {  
        //     let cid=props.postData.comments[i];
        //     let data = await database.comments.doc(cid).get();
        //     // console.log(data.data());
        //     arr.push(data.data());
        // }
        // // let obj = {...props.comments,[props.postData.pId]:arr}
        try {
            let data = await axios.post("http://localhost:8080/api/comments", {
                post_id: postData.post_id
            })
            setComments(data.data);
        } catch (err) {
            alert(err.message)
        }
        // console.log(props.comments)
    }, [props.postData])

    return (
        <>
            {comments == null ? <CircularProgress />
                :
                comments.map((comment, index) => (
                    <div key={index} className='comment-div'>
                        <Avatar src={comment.profile_pic} className={classes.da} />
                        <p><span style={{ fontWeight: 'bold', display: 'inline-block' }}>{comment.fullname}</span>&nbsp;&nbsp;{comment.text}</p>
                    </div>
                ))}
        </>
    )
}