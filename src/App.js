import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Routes from './routes/Routes';
import MenuDrawer from './components/MenuDrawer';

class App extends Component{
    render() {
        return (
            <div>
                <div>

                </div>
                <div>
                    <MenuDrawer />
                </div>
                <div>
                    <Routes />
                </div>
            </div>
        );
    }
}

export default App