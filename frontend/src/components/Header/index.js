import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import './style.css'

function Header() {

    const [ userid, setUserid ] = useState(null)
    const userToken = localStorage.getItem('@SuaAplicacao:JWT_TOKEN');

    useEffect(()=> {
        api.get('/users', {
            headers: {
                Authorization: `Bearer ${userToken}`,
            }
        }).then(resp => {
            setUserid(resp.data[0].id);
        })
    }, [userToken])

    return (
        <header>
            <ul>
                <li>
                    <Link to="/admin">Home</Link>
                    <Link to={`/my_links/${userid}`}>Ver Links</Link>
                    <Link to={`/config/${userid}`}>Configuraçõs</Link>
                </li>
            </ul>
        </header>
    )
}

export default Header
