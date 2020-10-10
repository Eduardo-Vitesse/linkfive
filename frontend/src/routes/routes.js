import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Private from './Private'

import Login from '../pages/Login'
import Register from '../pages/Register'
import Admin from '../pages/Admin'
import Links from '../pages/Links'
import Configure from '../pages/Configure'
import EditPage from '../pages/EditPage'
import NotFound from '../pages/NotFound'


function Routes() {
    const history = createBrowserHistory()

    return (
        <BrowserRouter history={history}>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/register" component={Register} />
                <Private path="/admin" component={Admin} />
                <Route path="/my_links/:id" component={Links} />
                <Private path="/config/:id" component={Configure} />
                <Private path="/edit/:id" component={EditPage} />
                <Route path="*" component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
