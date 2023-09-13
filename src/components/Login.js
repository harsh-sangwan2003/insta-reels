import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';

import { CarouselProvider, Slider, Slide, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import insta from '../Assets/Instagram.jpg';
import bg from '../Assets/insta.jpg';
import img1 from '../Assets/img1.jpg';
import img2 from '../Assets/img2.jpg';
import img3 from '../Assets/img3.jpg';
import img4 from '../Assets/img4.jpg';
import img5 from '../Assets/img5.jpg';
import { AuthContext } from '../Context/AuthContext';
import { database, storage } from '../firebase';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const { login } = useContext(AuthContext);
    const history = useNavigate();

    const handleClick = async () => {

        try {

            setError('');
            setLoading(true);

            const res = await login(email, password);
            setLoading(false);
            history('/');

        } catch (err) {

            setError(err);

            setTimeout(() => {
                setError('');
            }, 3000);

            setLoading(false);
        }
    }
    return (
        <div className='loginWrapper'>

            <div className='imgcar' style={{ backgroundImage: 'url(' + bg + ')', backgroundSize: 'cover' }}>
                <div className='car'>
                    <CarouselProvider
                        visibleSlides={1}
                        totalSlides={5}
                        naturalSlideWidth={238}
                        naturalSlideHeight={423}
                        hasMasterSpinner
                        isPlaying={true}
                        infinite={true}
                        touchEnabled={false}
                        dragEnabled={false}
                    >
                        <Slider>
                            <Slide index={0}><Image src={img1} /></Slide>
                            <Slide index={1}><Image src={img2} /></Slide>
                            <Slide index={2}><Image src={img3} /></Slide>
                            <Slide index={3}><Image src={img4} /></Slide>
                            <Slide index={4}><Image src={img5} /></Slide>
                        </Slider>
                    </CarouselProvider>
                </div>
            </div>

            <div className='loginCard'>

                <Card variant='outlined'>

                    <div className='insta-logo'>
                        <img src={insta} alt="Instagram" />
                    </div>

                    <CardContent>

                        {error !== '' && <Alert severity="error">{error}</Alert>}

                        <TextField id="outlined-basic" label="Email" variant="outlined" size="small" margin="dense" fullWidth={true} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField id="outlined-basic" label="Password" variant="outlined" size="small" margin="dense" fullWidth={true} value={password} onChange={(e) => setPassword(e.target.value)} />


                        <Typography color='primary' variant='subtitle1' className='text2'>
                            Forgot Password?
                        </Typography>

                    </CardContent>

                    <CardActions>
                        <Button variant="contained" color="primary" fullWidth={true} disabled={loading} onClick={handleClick}>
                            Login
                        </Button>
                    </CardActions>

                </Card>

                <Card variant='outlined' className='card2'>
                    <CardContent>
                        <Typography className='text1' variant='subtitle1'>
                            Don't have an account? <Link to="/signup" style={{ textDecoration: 'none' }}>Sign Up</Link>
                        </Typography>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}