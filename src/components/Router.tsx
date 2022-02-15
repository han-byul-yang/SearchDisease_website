import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from '../routes/Home'

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/"} component={Home} exact></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router