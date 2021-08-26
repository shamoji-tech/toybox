import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Home from './components/Home/Home';
import Counter from './components/Counter/Counter';
import Calculator from './components/Calculator/Calculator';
import Timer from './components/Timer/Timer';
import MineSweeper from './components/MineSweeper/MineSweeper';
import Contact from './components/Contact/Contact';


class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/counter" component={Counter} />
                <Route path="/calc" component={Calculator} />
                <Route path="/timer" component={Timer} />
                <Route path="/mine_sweeper" component={MineSweeper} />
                <Route path="/contact" component={Contact} />
            </Switch>
        );
    }
}

export default Routes;