import { Avatar, Button, Card, makeStyles, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { get } from 'react-scroll/modules/mixins/scroller';
import Header from '../Components/Header';
import { useAuth } from '../Context/AuthContext';

const classes = makeStyles({

});
export default function PendingRequests() {


    const { currentUser } = useAuth();
    const [allUsers, setallUsers] = useState(null)
    const [myFriends, setmyFriends] = useState(null)

    const getMyFriends = async () => {
        console.log("get My sfiends")
        let data2 = await axios.post("http://localhost:8080/api/friend_request/myfriends", {
            user_id: currentUser.id
        });
        console.log("my friends ", data2.data);
        setmyFriends(data2.data.result);
    }


    useEffect(async () => {
        try {
            console.log("current user", currentUser);
            let data = await axios.post("http://localhost:8080/api/friend_request/pendingrequests", {
                receiver_id: currentUser.id
            });
            console.log('datatatatat', data.data);
            // setallUsers(data.data);
            setallUsers(data.data.result)
            getMyFriends();
        } catch (error) {
            console.log(error);
        }
    }, [])

    const acceptRequest = async (user_id) => {
        try {
            let data = await axios.post("http://localhost:8080/api/friend_request/acceptrequest", {
                receiver_id: currentUser.id,
                sender_id: user_id
            });
            console.log(data.data);
            setallUsers(allUsers.filter(user => user.id !== user_id))
            getMyFriends();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div style={{ marginTop: 70 }}>
            <Header userData={currentUser} />
            <Paper>
                <h1>Pending Requests</h1>
                <div>
                    {allUsers && allUsers.map((user, index) => {
                        return (
                            <Card key={index} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", alignContent: "center", background: "lightgrey", marginLeft: 30, marginRight: 30 }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Avatar style={{ marginLeft: 10 }} src={user.profile_pic} />
                                    <Typography style={{ marginLeft: 10, align: "left" }}> {user.fullname}</Typography>
                                </div>
                                <Button variant="contained" color="primary" onClick={() => acceptRequest(user.id)}>Accept Request</Button>
                            </Card>
                        )
                    })}
                </div>
            </Paper>
            <h1>My Friends</h1>
            {myFriends && myFriends.map((user, index) => {
                return (
                    <Card key={index} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", alignContent: "center", background: "lightgrey", marginLeft: 30, marginRight: 30 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Avatar style={{ marginLeft: 10 }} src={user.profile_pic} />
                            <Typography style={{ marginLeft: 10, align: "left" }}> {user.fullname}</Typography>
                        </div>
                    </Card>
                )
            })}
        </div>)
}