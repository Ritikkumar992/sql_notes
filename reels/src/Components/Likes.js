import React,{useState,useEffect}  from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import {database} from '../firebase';
import axios from "axios";

export default function Likes({userData=null,postData=null}) {
  // console.log('rendered');
    const useStyles = makeStyles({
     like:{
         color:'#e74c3c',
         cursor:'pointer',
     },
     unlike:{
        cursor:'pointer',
        color:'white'
     }
      });
      useEffect(async() => {
        let data = await axios.post("http://localhost:8080/api/checkLike",{
          post_id: postData.post_id,
          user_id:userData.id
        })
        setLike(data.data.like)
      },[])

      const [like,setLike]=useState(null);
      const handleLike=async()=>{
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
            {like==false?<FavoriteIcon className={`${classes.unlike} icon-styling`} onClick={handleLike}/>:
              <FavoriteIcon className={`${classes.like} icon-styling`} onClick={handleLike} />}
        </>:<></>}
        </div>
    )
}
