import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {loadUser} from '../action/authaction'

const Feed = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(loadUser())
     
    }, [dispatch])
    
    return (
        <div>
            <h1>feed pages</h1>
            {auth.user &&<p>hello {auth.user.lastname}</p>}
        </div>
    )
}

export default Feed
