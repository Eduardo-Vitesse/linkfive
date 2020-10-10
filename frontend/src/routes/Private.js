import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function Private(prosp) {
    const isLogged = localStorage.getItem('@SuaAplicacao:JWT_TOKEN')
    return isLogged ? <Route {...prosp}/> : <Redirect to="/"/>
}

export default Private
