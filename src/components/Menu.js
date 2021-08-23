import React, { Component } from 'react';
import { Divider, List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AppsIcon from '@material-ui/icons/Apps';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { Link } from 'react-router-dom';

function MenuBtn(props){

    return (
        <Tooltip title={props.title} arrow disableHoverListener={props.isClose} placement="right">
            <ListItem button component={Link} to={props.link}>
                <ListItemIcon>{props.icon}</ListItemIcon>
                <ListItemText primary={props.title} />
            </ListItem>
        </Tooltip>
    );
}


class MainMenu extends Component {
    render(){
        return (
            <div>
                <List>
                    <MenuBtn title={"Counter"} isClose={this.props.openState} link={"/counter"} icon={<AddBoxIcon />}/>
                    <MenuBtn title={"Calculator"} isClose={this.props.openState} link={"/calc"} icon={<AppsIcon />} />
                    <MenuBtn title={"Timer"} isClose={this.props.openState} link={"/timer"} icon={<AccessAlarmIcon />} />
                    <MenuBtn title={"MineSweeper"} isClose={this.props.openState} link={"/mine_sweeper"} icon={<Brightness7Icon />} />
                </List>
                <Divider />
                <List>
                    <MenuBtn title={"Contact"} isClose={this.props.openState} link={"/contact"} icon={<ContactSupportIcon />}/>
                </List>
            </div>
        );
    }
}

export default MainMenu;
