import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';

import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import MovieIcon from '@mui/icons-material/Movie';
import './Signup.css';
import insta from '../Assets/Instagram.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { database, storage } from '../firebase';

export default function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useContext(AuthContext);
    const history = useNavigate();

    const handleChange = async () => {

        if (file === null) {

            setError('Please upload a profile image!');

            setTimeout(() => {
                setError('');
            }, 3000);


            return;
        }

        try {

            setError('');
            setLoading(true);

            const userObj = await signup(email, password);
            let uid = userObj.user.uid;

            const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
            uploadTask.on('state_changed', fn1, fn2, fn3);

            function fn1(snapshot) {

                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress} done.`);
            }

            function fn2(err) {

                setError('Please upload a profile image!');

                setTimeout(() => {
                    setError('');
                }, 3000);

                setLoading(false);
            }

            function fn3() {

                uploadTask.snapshot.ref.getDownloadURL().then((url) => {

                    database.users.doc(uid).set({

                        email: email,
                        userId: uid,
                        fullName: name,
                        profileUrl: url,
                        createdAt: database.getTimeStamp()
                    })

                    console.log(url);
                })

                setLoading(false);
                history('/');
            }

        } catch (err) {

            setError(err);

            setTimeout(() => {
                setError('');
            }, 3000);


        }
    }

    return (
        <div className='signupWrapper'>
            <div className='signupCard'>

                <Card variant='outlined'>

                    <div className='insta-logo'>
                        <img src={insta} alt="Instagram" />
                    </div>

                    <CardContent>

                        <Typography className='text1' variant="subtitle1">
                            Sign up to see photos and videos from your friends.
                        </Typography>

                        {error !== '' && <Alert severity="error">{error}</Alert>}

                        <TextField id="outlined-basic" label="Email" variant="outlined" size="small" margin="dense" fullWidth={true} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField id="outlined-basic" label="Password" variant="outlined" size="small" margin="dense" fullWidth={true} value={password} onChange={(e) => setPassword(e.target.value)} />
                        <TextField id="outlined-basic" label="Full Name" variant="outlined" size="small" margin="dense" fullWidth={true} value={name} onChange={(e) => setName(e.target.value)} />

                        <Button variant='outlined' margin="dense" size='small' color='secondary' fullWidth={true} component="label" startIcon={<MovieIcon />}>
                            Upload Profile Image
                            <input type="file" accept='image/*' hidden onChange={(e) => setFile(e.target.files[0])} />
                        </Button>
                    </CardContent>

                    <CardActions>
                        <Button variant="contained" color="primary" fullWidth={true} disabled={loading} onClick={handleChange}>
                            Sign Up
                        </Button>
                    </CardActions>

                    <CardContent>
                        <Typography className='text1' variant='subtitle1'>
                            By signing up, you agree to our Terms, Data Policy and Cookies Policy
                        </Typography>
                    </CardContent>
                </Card>

                <Card variant='outlined' className='card2'>
                    <CardContent>
                        <Typography className='text1' variant='subtitle1'>
                            Having an account? <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
                        </Typography>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}