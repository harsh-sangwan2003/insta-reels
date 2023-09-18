import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { database } from '../firebase';
import './Posts.css';

function AddComment({ userData, postData }) {

    const [text, setText] = useState('');

    const handleClick = () => {

        let obj = {

            text: text,
            uProfileImage: userData.profileUrl,
            uName: userData.fullname
        }

        database.comments.add(obj).then(doc => {

            database.posts.doc(postData.postId).update({
                comments: [...postData.comments, doc.id]
            })

        })

        setText('');
    }

    return (
        <div style={{ width: '100%' }}>
            <TextField id="outlined-basic" label="Comment" sx={{ width: '70%' }} variant="outlined" size="small" value={text} onChange={(e) => setText(e.target.value)} />
            <Button variant="contained" onClick={handleClick}>Post</Button>
        </div>
    )
}

export default AddComment