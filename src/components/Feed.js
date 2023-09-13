import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

function Feed() {

    const { logout } = useContext(AuthContext);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div className='comp' style={{ width: '50%' }}>
                <h1>Welcome to Feed!</h1>
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

export default Feed