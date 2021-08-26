import { Divider, Grid, Typography } from '@material-ui/core';
import React, { Component } from 'react'

class Home extends Component{
    render() {
        return (
            <div>
                <Grid container style={{margin:"8px"}} wrap="nowrap">
                    <Typography variant="h4">
                        ようこそ！
                    </Typography>
                </Grid>
                <Grid container style={{margin: "8px", color:"#9c9c9c",}} wrap="nowrap">
                    <Typography variant="body1" >ポートフォリオ紹介</Typography>
                </Grid>
                <Divider />
                <Grid container style={{margin: "8px"}}>
                    <Typography variant="body1" style={{margin:"4px"}}>こちらは、Shamoji101のReactを使用したポートフォリオになっています。Reactの技術を用いることで、さまざまな表現を行うことができます。</Typography>
                    <Typography variant="body1" style={{margin:"4px"}}>左のボードはそれぞれReactで作成した機能を表していて、クリックすることで機能のページに飛ぶことができます。ぜひお試しください。</Typography>
                </Grid>
                
            </div>
        );
    }
}

export default Home;
