import * as React from 'react';
import { Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import Table from '../components/Table/Table';
import Modal from '../components/Modal/Modal';
import Login from '../components/Login/Login';

const Routers = () => {
    return (
        <React.Fragment>
            <Route exact path="/" component={Home} />
            <Route exact path="/oppgaver" component={Table} />
            <Route exact path="/create" component={Modal} />
            <Route exact path="/login" component={Login} />
        </React.Fragment>
    )
}

export default Routers;