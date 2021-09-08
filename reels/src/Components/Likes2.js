import React,{useState,useEffect}  from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { makeStyles } from '@material-ui/core/styles';
import {database} from '../firebase';
import axios from "axios";

export default function Likes2({userData=null,postData=null}) {
    const [like,setLike]=useState(null);

    const useStyles = makeStyles({
     like:{
         color:'#e74c3c',
         cursor:'pointer',
     },
     unlike:{
        cursor:'pointer',
       
        color:'black'
     }
 
      });
      
      useEffect(async() => {
        try{
          let user_id = userData.id
          let post_id = postData.post_id
          let data = await axios.post("http://localhost:8080/api/checkLike",{
            user_id,post_id
          })
          setLike(data.data.like);
        }catch(err){
          alert(err.message)
          console.log(err)
        }
      },[])
      
      const handleLike=async ()=>{
          if (like) {
          // TODO: unlike the post
          try{
            let data = await axios.post("http://localhost:8080/api/unlike",{
              post_id: postData.post_id,
              user_id:userData.id
            });
            if(data.data){
              if(data.data?.success == 1){
                setLike(false)
              }
            }
          }catch(err){
            alert(err)
            console.log(err)
          }
        }else{
          // TODO: like the post
          try{
            let data = await axios.post("http://localhost:8080/api/doLike",{
              post_id: postData.post_id,
              user_id:userData.id
            });
            if(data.data){
              if(data.data?.success == 1){
                setLike(true)
              }
            }
          }catch(err){
            alert(err)
            console.log(err)
          }
        }
      }
      const classes = useStyles();
    return (
        <div>
            {like!=null?
        <>
            {like==false?<FavoriteBorderIcon className={classes.unlike} onClick={handleLike}/>:
              <FavoriteIcon className={classes.like} onClick={handleLike} />}
        </>:<></>}
        </div>
    )
}
