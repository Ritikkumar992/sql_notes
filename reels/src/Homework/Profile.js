import React, { useState, useEffect } from 'react'
import Header from '../Components/Header';
import { useAuth } from '../Context/AuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import './Profile.css'
import SinglePost from "../Components/SinglePost"
import axios from "axios"
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
const useStyles = makeStyles({
  bavatar:
  {
    height: '23vh',
    width: '40%',
    margin: '0'
  },
  tfw: {
    fontWeight: '300'
  },
  tfw2: {
    fontWeight: '500',
    marginLeft: '2%'
  },
  seeComments: {
    height: '54vh',
    overflowY: 'auto'
  },
  buttonSt: {
    padding: "0",
    margin: "0",
    width: "50%"
  },
})

export default function Profile() {
  const [openId, setOpenId] = React.useState(null);
  const [comments, setComments] = useState({})
  // const [open, setOpen] = useState(false);
  const history = useHistory();
  const openSendRequest = () => {
    history.push('/sendRequest');
  }
  const handlePendingRequests = () => {
    history.push('/pendingrequests');
  }
  const classes = useStyles();
  // const [userData,setUserData]=useState(null);
  const [posts, setPosts] = useState(null);
  const { currentUser } = useAuth();
  let { id } = useParams();
  useEffect(() => {

    // const unsub= database.users.doc(id).onSnapshot((doc) => {
    //   // doc.data() is never undefined for query doc snapshots

    // console.log("current user", currentUser);
    // setUserData(currentUser);
    // })
    // return ()=>{unsub()};   
  }, [])


  useEffect(async () => {
    // console.log("after render")
    let data = await axios.post("http://localhost:8080/api/myposts", {
      user_id: currentUser.id
    });
    // console.log("data", data.data)
    if (data) {
      setPosts(data.data.posts)
      // console.log("data", data.data)
    }
  }, [])



  return (
    <>
      {
        posts == null ? <CircularProgress /> : <>
          <Header userData={currentUser} />
          <div className='spacer'></div>
          <div className='pg-container'>
            <div className='upper-part'>
              <div className='bimg'>
                <img src={currentUser?.profile_pic} />
              </div>
              <div className='info' style={{ marginBottom: 30 }}>

                <Typography align='center' variant='h6' className={classes.tfw}>
                  {currentUser?.fullName}
                </Typography>
                <div className='post-cal'>
                  <Typography display='inline' align='center' variant='subtitle1' className={classes.tfw}>
                    No of Posts
                  </Typography>
                  <Typography display='inline' align='center' variant='subtitle1' className={classes.tfw2} >
                    {posts.length} Posts
                  </Typography>
                </div>
                <div className='post-cal'>
                  <Typography display='inline' align='center' variant='subtitle1' className={classes.tfw}>
                    Email
                  </Typography>
                  <Typography display='inline' align='center' variant='subtitle1' className={classes.tfw2} >
                    {currentUser?.emailid}
                  </Typography>
                </div>
                <div style={{ display: "flex" }}>

                  <Button variant="contained" color="primary" className={classes.buttonSt} style={{ marginRight: "5px" }} onClick={openSendRequest}>
                    Add Friends
                  </Button>
                  <Button variant="contained" color="primary" className={classes.buttonSt} style={{ marginLeft: "5px" }} onClick={handlePendingRequests}>
                    Pending Requests
                  </Button>

                </div>
              </div>
            </div>

            <div className='uposts'>
              {
                posts.map((post, index) => (
                  <SinglePost key={index} post={post} userData={currentUser} />
                ))
              }
            </div>
          </div>

        </>
      }
    </>
  )
}
