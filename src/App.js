import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Routes from './routes/Routes';

class App extends Component{
    render() {
        return (
            <div>
                <div>
                    <NavBar />
                    <Routes />
                </div>
            </div>
        );
    }
}

export default App