import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import MovieIcon from '@mui/icons-material/Movie';
import { Button, LinearProgress } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { database, storage } from '../firebase';

function Upload(props) {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState('');

    const handleChange = async (file) => {

        if (file === null) {

            setError('Please upload a video!');
            setTimeout(() => {
                setError('');
            }, 3000);

            return;
        }

        if (file.size / (1024 * 1024) > 100) {

            setError('File size is too big!');
            setTimeout(() => {
                setError('');
            }, 3000);

            return;
        }

        setError('');
        setLoading(true);

        let uid = uuidv4();
        const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
        uploadTask.on('state_changed', fn1, fn2, fn3);

        function fn1(snapshot) {

            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress} done.`);
        }

        function fn2(err) {

            setError(err);
            setTimeout(() => {
                setError('');
            }, 3000);
        }

        function fn3() {

            console.log("fn3");

            uploadTask.snapshot.ref.getDownloadURL().then(url => {

                let obj = {

                    likes: [],
                    comments: [],
                    pId: uid,
                    pUrl: url,
                    uName:props.user?.fullName,
                    uProfile:props.user?.profileUrl,
                    userId:props.user?.userId,
                    createdAt: database.getTimeStamp()
                }

                database.posts.add(obj).then(async (ref) => {

                    let res = await database.users.doc(props.user?.userId).update({

                        postIds: props.user?.postIds !== null ? [...props.user?.postIds, ref.id] : [ref.id]
                    })

                    console.log(res);
                }).then(() => {

                    console.log("Data updated successfully")
                    setLoading(false);

                }).catch(err => {

                    console.log("error occurred");
                    setError(err);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                    setLoading(false);
                })
            })
        }
    }
    return (
        <div>
            {
                error !== '' ? <Alert severity="error">{error}</Alert> :
                    <>
                        <input type="file" accept='video/*' hidden id='upload-input' onChange={(e) => handleChange(e.target.files[0])} />
                        <label htmlFor='upload-input'>
                            <Button
                                variant='outlined'
                                color='secondary'
                                component='span'
                                disabled={loading}
                            >
                                <MovieIcon />&nbsp;Upload Video
                            </Button>
                        </label>

                        {loading && <LinearProgress color="secondary" style={{ marginTop: '3%' }} />}
                    </>
            }
        </div>
    )
}

export default Upload