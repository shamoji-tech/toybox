import { Divider, Grid, Typography } from '@material-ui/core';
import React, { Component } from 'react';

class Contact extends Component {

    render(){
        return (
            <div>
                <Grid container wrap="nowrap" style={{margin:"8px"}}>
                    <Typography variant="h4">Contact</Typography>
                </Grid>
                <Grid container wrap="nowrap" style={{margin:"8px", color:"#9c9c9c9c",}}>
                    <Typography variant="body1" >連絡先</Typography>
                </Grid>
                <Divider />
                <Grid container wrap="nowrap" style={{margin:"8px"}}>
                    <Typography variant="body1">mail: menushark@gmail.com</Typography>
                </Grid>
                
                
            </div>
        );
    }
}

export default Contact;
