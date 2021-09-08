import React, { useState, useEffect } from 'react'
import { database } from '../firebase';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import './Posts.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import SinglePost from './SinglePost';
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
export default function Posts({ userData = null, posts = null, setPosts }) {
  const [openId, setOpenId] = useState(null);
  const history = useHistory();
  const handleProfileClick = (id) => {
    history.push(`/profile/${id}`)
  }
  const handleClickOpen = (id) => {
    setOpenId(id);
  };
  const handleClose = () => {
    setOpenId(null);
  };
  const classes = useStyles();


  // const [comments,setComments] =useState(null) 
  const callback = async entries => {
    // console.log(entries);
    entries.forEach(element => {
      let child = element.target.childNodes[0];
      let id = child.getAttribute("id");
      console.log(id);
      let el = document.getElementById(`${id}`);
      // if(element.intersectionRatio!=1 && !el.paused){

      //   el.pause();
      //   // console.log(p);
      // }
      // else if(element.isIntersecting==true && el.paused ) {
      //   // console.log(el)
      //     el.play(); 
      //   // console.log(p)

      // }
      // el.play is asynchronous
      el.play().then(() => {
        if (!el.paused && element.isIntersecting != true) {
          el.pause();
          // console.log(p);
        }
      })
    });
  };
  const observer = new IntersectionObserver(callback, {
    threshold: 0.85,
  });
  useEffect(async () => {
    let parr = [];
    // const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
    //   // console.log('The snapshot method was called')
    //   parr = [];
    //   querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     // console.log(doc.id, " => ", doc.data());
    //     // console.log("The loop was executed")
    //     let data = { ...doc.data(), postId: doc.id }
    //     // console.log(data);
    //     parr.push(data);
    //   });
    //   console.log(44444444, parr);
    //   setPosts(parr);
    // })
    // // .catch((error) => {
    //     console.log("Error getting documents: ", error);
    // });
    // unsub();

    // return unsub;

    // TODO: call get all posts api 
    try {
      let data = await axios.get("http://localhost:8080/api/allposts", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      console.log(data.data.posts);
      setPosts(data.data.posts);
    } catch (e) {
      console.log(e);
    }
  }, [])

  useEffect(() => {
    if (typeof window == 'object') {
      let elements = document.querySelectorAll('.videos')
      // console.log(elements)
      elements.forEach(el => {
        // console.log(el);
        observer.observe(el);
      })
      // console.log(posts)
      return () => {
        observer.disconnect();
        // console.log('removed');
      }
    }
  }, [posts])

  return (
    <>
      <div className='place'></div>
      {posts == null || userData == null ? <CircularProgress className={classes.loader} /> :
        <div className='video-container' id="video-container">
          {posts.map((post, index) => (
            <SinglePost key={index} post={post} userData={userData} handleClickOpen={handleClickOpen} handleClose={handleClose} />
          ))}
        </div>
      }
    </>
  )
}
