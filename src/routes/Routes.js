import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Home from '../components/Home';
import Counter from '../components/Counter';
import Calculator from '../components/Calculator';

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/counter" component={Counter} />
                <Route path="/calc" component={Calculator} />
            </Switch>
        );
    }
}

export default Routes;