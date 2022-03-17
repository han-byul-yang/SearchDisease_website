import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import DetailPage from '../routes/DetailPage'
import Home from '../routes/Home'
import SearchResult from '../routes/SearchResult'

const Router = () => {
    return (
        <HashRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route path={"/"} component={Home} exact></Route>
                <Route path={"/result"} component={SearchResult} exact></Route>
                <Route path={"/detail"} component={DetailPage} exact></Route>
            </Switch>
        </HashRouter>
    )
}

export default Router