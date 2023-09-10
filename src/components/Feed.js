import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

function Feed() {

    const { logout } = useContext(AuthContext);

    return (
        <div>
            <h1>Welcome to Feed</h1>
            <button onClick={logout}>Log Out</button>
        </div>
    )
}

export default Feed