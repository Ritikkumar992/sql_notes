import React, { useEffect, useState } from 'react'
import Ticker from 'react-ticker';
import Likes from './Likes';
import Video from './Video';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Likes2 from './Likes2';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Comments from './Comments';
import AddComment from './AddComment';
import './Posts.css'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import axios from 'axios';

const useStyles = makeStyles({
    root: {
        width: '100%',
        padding: '0px'
    },
    loader: {
        position: 'absolute',
        left: '50%',
        top: '50%'
    },
    typo: {
        marginLeft: '2%'
    },
    vac: {
        marginLeft: '3.5%',
        color: '#8e8e8e',
        cursor: 'pointer'
    },
    dp: {
        marginLeft: '2%'
    },
    cc: {
        height: '50vh',
        overflowY: 'auto'
    },
    seeComments: {
        height: '54vh',
        overflowY: 'auto'
    },
    ci: {

        color: 'white',
        left: '9%',
        cursor: 'pointer'
    },
    mn: {
        color: 'white',
    },
    tmn: {
        color: 'white'
    }
});

export default function SinglePost(props) {
    let post = props.post;
    let userData = props.userData;
    let [likes, setLikes] = useState(null)
    // console.log("54546546465464654646465", post)
    const handleClickOpen = (id) => {
        setOpenId(id);
    };
    const handleClose = () => {
        setOpenId(null);
    };
    const [openId, setOpenId] = useState(null);
    const [comments, setComments] = useState(null)

    const history = useHistory();
    const handleProfileClick = (id) => {
        history.push(`/profile/${id}`)
    }

    const classes = useStyles();

    useEffect(async () => {
        try {
            // console.log(post)
            let data = await axios.post("http://localhost:8080/api/like", {
                post_id: post.post_id,
            });
            post.likes = data.data;
            setLikes(data.data)
            // console.log(post)
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <>
            <div className="videos">
                <Video source={post.video_url} id={post.post_id} />
                <div className='fa' style={{ display: 'flex' }}>
                    <Avatar src={post.profile_pic}></Avatar>
                    <h4>{post.fullname}</h4>
                </div>
                <div className='video-ticker'  >
                    <Ticker direction='toRight' offset='20%' mode='smooth'>
                        {({ index }) => (
                            <>
                                <Typography align='center' variant='subtitle2' className={classes.tmn}>
                                    <MusicNoteIcon fontSize='small' className={classes.mn} /> This is sample
                                </Typography>
                            </>
                        )}
                    </Ticker>
                </div>
                <Likes userData={userData} postData={post} />
                <ChatBubbleIcon onClick={() => handleClickOpen(post.post_id)} className={`${classes.ci} icon-styling`} />
                <Dialog maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={openId === post.post_id}>
                    <MuiDialogContent>
                        <div className='dcontainer'>
                            <div className='video-part'>
                                <video autoPlay={true} className='video-styles2' controls id={post.user_id} muted="muted" type="video/mp4" >
                                    <source src={post.video_url} type="video/webm" />
                                </video>
                            </div>
                            <div className='info-part'>
                                <Card>
                                    <CardHeader
                                        avatar={
                                            <Avatar src={post?.profile_pic} aria-label="recipe" className={classes.avatar}>
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton aria-label="settings">
                                                <MoreVertIcon />
                                            </IconButton>
                                        }
                                        title={post?.fullname}
                                    />
                                    <hr style={{ border: "none", height: "1px", color: "#dfe6e9", backgroundColor: "#dfe6e9" }} />
                                    <CardContent className={classes.seeComments}>
                                        <Comments userData={userData} postData={post} comments={comments} setComments={setComments} />
                                    </CardContent>
                                </Card>
                                <div className='extra'>
                                    <div className='likes'>
                                        <Likes2 userData={userData} postData={post} />
                                        <Typography className={classes.typo} variant='body2'>Liked By {likes ? likes[0]?.fullname : "nobody"}</Typography>
                                    </div>
                                    <AddComment userData={userData} postData={post} comments={comments} setComments={setComments} />
                                </div>

                            </div>
                        </div>
                    </MuiDialogContent>
                </Dialog>
            </div>
            <div className='place'>
            </div>
        </>
    )
}
