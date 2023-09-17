import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from '../firebase';

function Like({ userData, postData }) {

    const [like, setLike] = useState(null);

    useEffect(() => {

        console.log(postData);

        let check = postData.likes.includes(userData.userId) ? true : false;
        setLike(check);

    }, [postData])

    const handleLike = () => {

        if (like === true) {

            let narr = postData.likes.filter(el => {

                return el !== userData.userId
            })

            database.posts.doc(postData.postId).update({
                likes: narr
            })
        }

        else {

            let narr = [...postData.likes, userData.userId];

            database.posts.doc(postData.postId).update({
                likes: narr
            })
        }
    }

    return (
        <div>
            {
                like !== null ?
                    <>
                        {
                            like === true ? <FavoriteIcon onClick={handleLike} className={`icon-styling like`} /> : <FavoriteIcon onClick={handleLike} className={`icon-styling unlike`} />
                        }
                    </> : <></>
            }
        </div>
    )
}

export default Like