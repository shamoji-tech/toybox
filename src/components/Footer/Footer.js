import { Grid, Typography } from '@material-ui/core'
import React, { Component } from 'react'

class Footer extends Component{
    render() {
        return (
            <Grid container justifyContent="center" alignItems="center" style={{height: "100px"}}>
                <Grid item xs></Grid>
                <Grid item xs={8} style={{textAlign: "center"}}>
                    <Typography variant="body1">shamoji's toybox 2021</Typography>
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        );
    }
}

export default Footer;
