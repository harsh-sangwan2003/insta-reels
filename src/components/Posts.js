import React, { useEffect, useState } from 'react'
import { database } from '../firebase'
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Like from './Like';
import Video from './Video';
import Like2 from './Like2';
import './Posts.css';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Comments from './Comments';
import AddComment from './AddComment';

function Posts({ userData }) {

    const [posts, setPosts] = useState(null);
    const [open, setOpen] = React.useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };

    useEffect(() => {

        let parr = [];
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {

            parr = [];
            querySnapshot.forEach(doc => {

                let data = { ...doc.data(), postId: doc.id };
                parr.push(data);
            })

            setPosts(parr);
        })

        return unsub;

    }, [])

    return (
        <div>
            {
                posts === null || userData === null ? <CircularProgress /> :
                    <div className="video-container">
                        {
                            posts.map((post, index) => (
                                <React.Fragment key={index}>
                                    <div className="videos">
                                        <Video src={post.pUrl} />
                                        <div className="fa" style={{ display: 'flex' }}>
                                            <Avatar src={userData.profileUrl} />
                                            <h4>{userData.fullname}</h4>
                                        </div>
                                        <Like userData={userData} postData={post} />
                                        <ChatBubbleIcon className="chat-styling" onClick={() => handleClickOpen(post.pId)} />
                                        <Dialog
                                            open={open === post.pId}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            fullWidth={true}
                                            maxWidth="md"
                                        >
                                            <div className="modal-container">

                                                <div className="video-modal">
                                                    <video muted="muted" autoPlay controls>
                                                        <source src={post.pUrl} />
                                                    </video>
                                                </div>

                                                <div className='comment-modal'>

                                                    <Card className="card1" style={{ padding: '1rem' }}>
                                                        <Comments postData={post} />
                                                    </Card>

                                                    <Card variant='outlined' className="card2">
                                                        <Typography style={{ padding: '0.4rem' }}>{post.likes.length === 0 ? '' : `Liked by ${post.likes.length} users`}</Typography>
                                                        <div style={{ display: 'flex' }}>
                                                            <Like2 userData={userData} postData={post} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
                                                            <AddComment style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} userData={userData} postData={post} className="add-comment" />
                                                        </div>
                                                    </Card>

                                                </div>
                                            </div>
                                        </Dialog>

                                    </div>
                                </React.Fragment>
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default Posts