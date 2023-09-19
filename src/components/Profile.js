import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from './Navbar';
import { Typography } from '@mui/material';
import './Profile.css';

function Profile() {

    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [posts, setPosts] = useState(null);

    useEffect(() => {

        database.users.doc(id).onSnapshot(snapshot => {
            setUserData(snapshot.data());
        });

    }, [id])


    return (
        <div>
            {
                userData === null ? <CircularProgress color="secondary" /> :
                    <>
                        <Navbar userData={userData} />

                        <div className="spacer  "></div>

                        <div className='container'>

                            <div className='upper-part'>

                                <div className="profile-img">
                                    <img src={userData.profileUrl} />
                                </div>

                                <div className="info">

                                    <Typography variant="h4">
                                        Email : {userData.email}
                                    </Typography>

                                    <Typography variant="h4">
                                        Posts : {userData.postIds.length}
                                    </Typography>

                                </div>

                            </div>

                            <hr style={{ marginTop: '3rem', marginBottom: "3rem" }} />

                            <div className="profile-videos">

                            </div>
                        </div>

                    </>
            }
        </div>
    )
}

export default Profile